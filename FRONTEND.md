# IceRoute India — Frontend Specification (SIH26059)
This extends the architecture locked in ARCHITECTURE.md (React + MapLibre GL JS, FastAPI backend) with one addition: a CesiumJS 3D globe module for viewing the Bharati–Maitri corridor and ML-generated routes in 3D. It does not change any backend, ML, or routing decisions from Agent 1–3 — it only specifies how the frontend consumes their outputs.

Guiding rule for this doc: one screen, one job, nothing decorative. A planner should be able to go from "pick vessel" to "see 3 ranked routes with risk scores" in four clicks, on a slow ship-board connection, without hunting through panels.

## 1. Why add CesiumJS (and why it's scoped carefully)
MapLibre GL JS remains the default, primary view — it's the low-bandwidth workhorse the PS requires (§ARCHITECTURE.md, §DATA_SOURCES.md low-bandwidth constraint). CesiumJS is added as a secondary, opt-in 3D globe view, specifically because:

* A flat Mercator/polar-stereographic 2D map badly distorts high-latitude geometry (60–70°S) — a 3D globe shows the true curvature of the Bharati–Maitri corridor and iceberg drift cones without projection distortion, which matters for a polar-navigation product.
* It is the single strongest demo visual (Agent 3, §5 Demo Strategy: "judges... will be unimpressed by a spinning globe" — noted, so the globe is not decoration; it exists to make the risk-aware routing genuinely legible in 3D, not to spin for its own sake).
* Cesium's Entity API (polylines, ellipsoids, ellipses, walls) maps directly onto the exact objects this product already produces: routes, uncertainty ellipses, risk-colored segments, vessel position.
* Explicit scope discipline: Cesium is not used for terrain-following ice physics, no Cesium Ion account dependency at demo time (self-hosted imagery/terrain only — see §5), and it is never the only way to view a route. If Cesium fails to load (WebGL unavailable, low-bandwidth ship connection), the app must degrade to the 2D MapLibre view with zero loss of functionality.

## 2. Tech stack (delta from ARCHITECTURE.md)
| Layer | Choice | Notes |
| :--- | :--- | :--- |
| 2D map (primary) | MapLibre GL JS | Unchanged from Agent 2/3 — low-bandwidth default |
| 3D globe (secondary) | CesiumJS (open-source, `cesium` npm package) | Loaded lazily, only on user opt-in |
| 3D React glue | Resium (`resium`) | Thin React-component wrapper over Cesium; avoids hand-rolling imperative Cesium code inside React lifecycle |
| Terrain | Cesium's default `EllipsoidTerrainProvider` (no elevation data) | Polar bathymetry/terrain is not needed for a navigation-routing demo and avoids a Cesium World Terrain / Ion dependency |
| Base imagery (3D) | Self-hosted static tile set (pre-cached Sentinel-1 / Copernicus browse imagery for the demo bbox), served from the same backend as the 2D vector tiles | No Cesium Ion token, no live external imagery fetch required at judging time — matches Agent 3's "no live-internet dependency at judging time" success criterion |
| State management | React Context + `useReducer` (or Zustand if the team prefers less boilerplate) | Single shared `RouteState` consumed by both the 2D and 3D views so they never desync |
| Data fetching | `fetch` + a thin typed API client (`api/client.ts`) against FastAPI's `/forecast` `/icebergs` `/route` `/vessels` `/risk` | Matches Agent 2 §5/§6 exactly |

Package additions to `package.json`:
* `cesium`
* `resium`

No other new dependencies — deliberately not adding a 3D asset pipeline, physics engine, or animation library.

## 3. Design principles for "less crowded"
* One primary panel at a time. Never show the vessel form, the route comparison table, and a risk legend simultaneously by default — they live in a single collapsible side drawer, one section open at a time (accordion, not three-column clutter).
* The map/globe is the page. Chrome (header, nav, drawer) occupies a thin fixed strip; everything else is canvas. No dashboard-style grid of cards competing with the map.
* Progressive disclosure of numbers. Headline numbers only by default (ETA, fuel, RIO band); exact IIEE/coverage/backtest numbers live one click away in a "Validation" tab, not on the main screen — keeps the primary view from turning into a spreadsheet.
* Default view = 2D. 3D globe is a single toggle, not the landing state — respects the low-bandwidth constraint and avoids loading Cesium's ~2.5MB core bundle unless asked for.
* No decorative motion. The only animation with a functional job is the uncertainty-ellipse growth over the forecast horizon (a scrubber, not autoplay) and route-diversion morphing when comparing naive vs. risk-aware routes. Nothing else moves.
* Disclaimers are structural, not a popup. The LIMITATIONS.md-derived disclaimer lives as a persistent, dismissible-but-reopenable thin footer bar — visible, never modal, never blocking the map.

## 4. Screen layout (wireframe)
```text
┌──────────────────────────────────────────────────────────────────────┐
│  IceRoute India        [2D Map | 3D Globe]           [Vessel: PC6 ▾]  │  <- header, 48px
├───────────────┬──────────────────────────────────────────────────────┤
│               │                                                      │
│  ▸ Route      │                                                      │
│    profile    │                                                      │
│    (Safest /  │              MAP / GLOBE CANVAS                      │
│    Fastest /  │        (MapLibre or Cesium, same route data)         │
│    Fuel-eff.) │                                                      │
│               │      route lines · risk color · iceberg + ellipse    │
│  ▸ Layers     │      vessel marker · SIC layer toggle                │
│    (SIC,      │                                                      │
│    iceberg,   │                                                      │
│    risk)      │                                                      │
│               │                                                      │
│  ▸ Validation │                                                      │
│    (metrics)  │                                                      │
│               │                                                      │
├───────────────┴──────────────────────────────────────────────────────┤
│  ⚠ Decision support only — human navigator has final authority.       │
│     Forecasts are daily-cadence, not real-time.  [details ▾]          │  <- footer, 32px
└──────────────────────────────────────────────────────────────────────┘
```

Only one left-drawer accordion section is expanded at a time. The canvas is the only element that resizes; the header/footer are fixed-height. This is the entire information architecture — there is no second page, no modal-heavy flow. Route comparison (3 profiles) renders as a compact horizontal strip of 3 small cards inside the canvas top-right corner, not a separate screen.

## 5. CesiumJS module — implementation detail

### 5.1 Bundle & load strategy
* Cesium is code-split into its own chunk and dynamically `import()`-ed only when the user first clicks "3D Globe." The 2D view never pays this cost.
* `CESIUM_BASE_URL` is set to point at locally-bundled Cesium static assets (workers, widgets CSS) copied into the build output — no CDN dependency, consistent with the "no live-internet dependency at judging time" constraint.
* Terrain: new `Cesium.EllipsoidTerrainProvider()` — flat WGS84 ellipsoid, no elevation fetch, no Ion token.
* Imagery: a custom `UrlTemplateImageryProvider` pointed at the same pre-cached tile directory the backend already serves for MapLibre (reuse one tile cache for both views rather than maintaining two).

### 5.2 Camera
* On load, camera flies to a fixed initial view over the Bharati–Maitri corridor bounding box (not the whole globe) — `Cesium.Camera.flyTo` with a hardcoded rectangle, so the demo never starts by awkwardly spinning to find Antarctica.
* Camera controls: rotate/zoom/pan enabled; no orbit-forever "cinematic" auto-rotate — reinforces principle #5 (no decorative motion).

### 5.3 Rendering the ML outputs as Cesium entities
| Data from backend | Cesium representation |
| :--- | :--- |
| Ranked route (GeoJSON LineString, one of 3 profiles) | `PolylineGraphics`, `clampToGround: false`, `width: 4`, color driven by the route's dominant POLARIS RIO band (green/amber/red), one entity per profile, only the selected profile at full opacity — the other two rendered at low opacity so all 3 are visible for comparison without visual clutter |
| Naive shortest-path baseline route | Same polyline type, dashed material, muted grey — always available as a toggle, per Agent 3 §5 step 4 ("baseline vs. risk-aware" is the demo centerpiece) |
| Per-segment POLARIS RIO | Polyline material colored per-vertex/per-segment rather than a separate heatmap layer — keeps risk info on the route instead of adding another overlapping layer |
| Iceberg position | `PointGraphics` (or small billboard icon), colored by detection confidence |
| Iceberg uncertainty ellipse (growing with forecast horizon) | `EllipseGraphics`, `semiMajorAxis`/`semiMinorAxis` driven by the trajectory model's uncertainty radius at the currently-scrubbed forecast hour; a single horizon scrubber control (12h/24h/48h/96h) redraws the ellipse — this is the one intentional animation in the app |
| SIC forecast grid | `Cesium.SingleTileImageryProvider` or a `Rectangle`/`Primitive` grid at reduced opacity, toggleable — off by default to avoid crowding the globe; the 2D view remains the primary place to inspect the raw SIC layer in detail |
| Vessel current/selected position | `PointGraphics` with a small ship glyph billboard |

### 5.4 Sync with 2D view
Both views read from the same `RouteState` (route GeoJSON, selected vessel profile, selected route index, forecast-horizon scrubber value, layer toggles). Switching from 2D↔3D never refetches data — it re-renders the same in-memory state in the other renderer. This is what keeps the app feeling like one product instead of two bolted-together tools.

### 5.5 Low-bandwidth / degrade path
* If `WebGLRenderingContext` is unavailable, or Cesium's dynamic import fails/times out, the 3D toggle button is disabled with a tooltip ("3D view needs WebGL — showing 2D map"), and the app silently stays on MapLibre. This is a hard requirement, not a nice-to-have, given the shipboard-connectivity constraint carried through every upstream document.
* 3D imagery tiles are capped at the same low zoom levels already cached for the 2D vector tiles — no separate, heavier 3D-only imagery fetch.

## 6. Component structure
```text
src/
  api/
    client.ts              # typed fetch wrappers for /forecast /icebergs /route /vessels /risk
  state/
    RouteContext.tsx        # shared state: selected vessel, selected route profile,
                             # forecast-horizon scrubber, layer toggles
  components/
    layout/
      AppHeader.tsx          # title, 2D/3D toggle, vessel selector
      AppFooter.tsx          # disclaimer bar (LIMITATIONS.md-derived), expandable
      SideDrawer.tsx          # accordion: Route profile / Layers / Validation
    map2d/
      MapView.tsx             # MapLibre instance, reads RouteContext
      layers/
        SicLayer.tsx
        IcebergLayer.tsx
        RouteLayer.tsx
    globe3d/
      GlobeView.tsx            # lazy-loaded, Resium <Viewer>, reads RouteContext
      entities/
        RouteEntities.tsx        # 3 profiles + naive baseline
        IcebergEntities.tsx       # position + growing uncertainty ellipse
        VesselEntity.tsx
      HorizonScrubber.tsx        # 12h/24h/48h/96h control shared visually with 2D
    panels/
      RouteProfileCards.tsx      # 3 compact cards: Safest / Fastest / Fuel-efficient
      VesselProfileForm.tsx      # 2–3 preset vessels (per Agent 3 §7 — no free-form editor)
      ValidationPanel.tsx        # IIEE, backtest-vs-33-ISEA numbers, RIO-band distribution
  App.tsx
```
Nothing under `globe3d/` is imported anywhere except behind the dynamic `import()` in `GlobeView.tsx` — this is what keeps Cesium out of the default bundle.

## 7. Data flow (frontend perspective)
* FastAPI `/vessels` → `VesselProfileForm` → `RouteContext.vessel`
* FastAPI `/forecast` → `RouteContext.sicGrid` → `SicLayer` (2D) / SIC rectangle (3D, off by default)
* FastAPI `/icebergs` → `RouteContext.icebergs` → `IcebergLayer` (2D) / `IcebergEntities` (3D)
* FastAPI `/route` (×3 profiles + naive baseline) → `RouteContext.routes` → `RouteLayer` (2D) / `RouteEntities` (3D)
* FastAPI `/risk` → embedded per-segment in the `/route` response, not a separate fetch

* **User: pick vessel** → refetch `/route` only (forecast/iceberg data unchanged)
* **User: switch 2D↔3D** → no refetch, re-render `RouteContext` in the other view
* **User: move horizon scrubber** → no refetch; recompute ellipse radius client-side from the uncertainty model's per-horizon values already in `/icebergs` response

Only one network round-trip class changes anything on screen: changing the vessel profile. Everything else (view switching, scrubbing, toggling layers) is a pure client-side re-render — this keeps the app usable on an intermittent ship connection, per the low-bandwidth requirement carried through every upstream document.

## 8. Accessibility & performance floor
* Keyboard focus visible on every control in the drawer and header (route profile cards, vessel selector, 2D/3D toggle, horizon scrubber).
* Color is never the only risk signal — each RIO band also gets a text label ("Elevated risk") next to the color swatch, for colorblind accessibility and because risk bands matter for a safety-adjacent tool.
* `prefers-reduced-motion` disables the ellipse-growth transition and any camera fly-to easing (snaps instead of animates).
* Cesium `requestRenderMode: true` is set so the globe only re-renders on state change / camera move, not continuously — meaningfully reduces CPU/battery draw on a laptop running the demo for hours.

## 9. Explicitly out of scope for this frontend
* No Cesium Ion account, no Cesium World Terrain, no photorealistic 3D tiles — flat ellipsoid + cached imagery only.
* No animated ship-transit playback / cinematic flythrough beyond the single fixed initial camera fly-to.
* No mobile-native app shell — responsive down to tablet width (a bridge/ops-room use case), not phone-first.
* No user-editable vessel profile builder in the UI (per Agent 3 §4/§7 — hardcoded 2–3 presets only).
* No offline PWA/service-worker caching layer for MVP — the pre-cached demo dataset served from the backend is sufficient per Agent 3's stated success criterion; a real offline-sync mode stays on ROADMAP.md.
