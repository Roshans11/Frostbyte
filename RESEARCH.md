IceRoute India — Complete Product Research
Consolidated product-research master file for SIH26059.
The three supplied research documents are preserved in full, in their original order and wording. Only source-separator headings were added between documents.
Source Document 1: Pasted text(20260825-133207).txt
Research Agent 1 — Product Definition Research
SIH26059: AI-Enabled Antarctic Sea-Ice, Iceberg Trajectory, and Navigation Decision Support System
1. PRODUCT IDEA
What it actually is
A web/GIS-based decision-support platform (not autonomous control, not a hardware product) that fuses satellite, oceanographic, and meteorological data to give three outputs to a human navigator/planner:
1.	Sea-ice concentration forecast (short-range, 12–96 hr, per PolarNav SBIR precedent) for a defined operating area.
2.	Iceberg detection + trajectory prediction for known/tracked bergs in that area.
3.	Vessel-aware route recommendation — not a single "best route" but ranked options (fastest / safest / lowest fuel / minimal hull stress) given a specific ship's ice class, draft, speed and fuel profile.
The final human call always stays with the navigator — this mirrors the explicit design constraint in the analogous US Navy SBIR topic PolarNav: the envisioned tool combines multiple data sources with AI and first-principles algorithms to provide 12–96-hour sea ice forecasts and route suggestions, factoring in vessel ice resistance and fuel consumption, with final decisions left to the ship's navigation team.
Standalone Antarctic DSS vs. broader Polar Maritime Intelligence platform
Recommendation: build a single Southern-Ocean/Antarctic-first DSS, architected so the same pipeline can later ingest Arctic data — do not build a two-pole product for SIH.
Reasoning:
•	The PS is explicitly scoped to Antarctic sea-ice + iceberg + navigation.
•	Existing commercial products (IcySea) already do bipolar coverage and are the incumbent to differentiate against, not copy on day one — IcySea covers both the Arctic and Antarctic regions and is optimized for low-bandwidth connections, serving commercial shipping, fishing, expedition cruise, offshore infrastructure, academia and public-sector clients.
•	India's own operational need (Bharati–Maitri resupply voyages) is 100% Antarctic today; the Arctic angle is a *strategic roadmap*, not an MVP requirement (see §3).
Users / personas
•	Primary: NCPOR / Indian Antarctic voyage planners and ship's navigators on chartered ice-class vessels (the Bharati–Maitri–Cape Town supply run).
•	Secondary: Indian Coast Guard / Navy polar-training personnel (India and Russia signed an MoU specifically on training specialists for polar-water operations — see §3), maritime academics, and future Indian-flag operators considering NSR/Antarctic transits.
•	Tertiary (future): commercial shipping/insurance/logistics analysts assessing Arctic corridor feasibility.
Core workflows
4.	Pre-voyage planning: planner selects vessel profile + departure window → system shows historical/forecast ice climatology, recommends best departure dates and initial route corridor.
5.	En-route replanning: as new satellite passes come in, system re-forecasts ice/iceberg positions and re-ranks route options; flags when current route crosses a risk threshold for the vessel's ice class.
6.	Risk briefing: system outputs a POLARIS-style (IACS Risk Index Outcome) risk score per route segment given vessel ice class — the POLARIS framework expresses vessel–ice interaction risk as a Risk Index Outcome, with IACS recommending maximum operating speeds of 3 knots for non-ice-strengthened vessels and 5 knots for Polar Class 3–5 vessels under elevated-risk conditions.
7.	Post-voyage log / model feedback: actual AIS track vs. recommended route is logged to improve the model — a real academic precedent exists for exactly the India–Antarctic case: a 2021 study built a Dijkstra's-algorithm route optimizer between Bharati and Maitri using ScatSat-1 sea-ice extent, NSIDC concentration and ECMWF wind data, validated against the actual route sailed by the 33rd Indian Scientific Expedition to Antarctica. This is a directly reusable methodological baseline for the SIH team.
MUST HAVE
•	Sea-ice concentration ingestion + short-range forecast for a bounded region (e.g., Bharati–Maitri corridor / Prydz Bay / Weddell Sea).
•	Iceberg position ingestion (from open SAR-derived products) with simple trajectory extrapolation (drift model, not full physics).
•	Vessel profile input (ice class, draft, speed, fuel curve) affecting route ranking.
•	Route recommendation with 2–3 ranked options (safety/speed/fuel) + basic risk score (POLARIS-style).
•	Map-based GIS UI, exportable/printable briefing, works with intermittent connectivity (polar vessels have limited bandwidth — a real design constraint IcySea explicitly optimizes for).
HIGH-VALUE OPTIONAL
•	Historical climatology layer for pre-season planning (best departure windows).
•	Multi-vessel comparison ("which of these 3 ice-class options minimizes days to Maitri").
•	Simple convoy/icebreaker-escort advisory mode.
•	Alert/notification when forecast ice conditions cross a vessel's safe-operating threshold.
•	Offline-first / low-bandwidth sync mode for shipboard use.
AVOID / UNREALISTIC (for SIH scope)
•	Autonomous route execution or ship control — explicitly out of scope per PS and industry norm (PolarNav explicitly keeps "ultimate route decisions... left to the vessel's navigation team").
•	Real-time individual iceberg tracking with sub-km precision — SAR revisit times and processing latency make true real-time impossible with open data (see §4).
•	Full physics-based ice-mechanics/structural simulation of hull-ice interaction — this is a research-grade problem (see the VR/ship-ice-interaction simulation system in patent literature) and far beyond a hackathon prototype.
•	A simultaneous, symmetrical Arctic + Antarctic product at launch — scope discipline matters more than "impressive breadth."
•	Proprietary/classified naval-grade ice data or high-resolution commercial SAR tasking — unrealistic budget/access for a student team.
2. MARKET / COMPETITION
System / Org	Problem solved	Users	Capabilities	Limitations / Gaps	Data dependence	Positioning
IcySea (Drift+Noise / MET Norway)	Real-time-ish ice information for navigation, Polar Code compliance	Commercial shipping, fishing, expedition cruise, offshore, academia, public sector	Map-based app, bipolar (Arctic+Antarctic), low-bandwidth optimized, decision support	Not vessel-class-aware route optimization; general-purpose, not India/NCPOR-specific; commercial licensing	Copernicus/EU satellite + national ice services	Closest direct competitor; India has zero local presence in this space
US National Ice Center (NIC)	Authoritative ice/iceberg charts for navigation	Global (esp. US/NATO), commercial and government	ArcGIS/SIPAS-based analyst-produced charts — ice analysts process satellite imagery in GIS software to study ice conditions, with the majority of products generated from an enterprise geodatabase.	Human-analyst-in-the-loop → not fully automated; US-centric	Satellite + government infrastructure	Institutional gold standard, not a lightweight app
International Ice Patrol (IIP)	Iceberg monitoring for SOLAS compliance	North Atlantic shipping (Grand Banks)	Century-old monitoring program	IIP's SOLAS mandate is limited to the Grand Banks of Newfoundland, not a wider area, and does not cover sea ice — a 2024 IICWG white paper is only now proposing expanded monitoring.	Own aerial/satellite surveillance	Regional, legacy scope only — irrelevant to Antarctica directly, but the "gap" it reveals (no equivalent Antarctic body) is a market opening
PolarNav (US Navy SBIR, 2026)	Automated ice detection + polar navigation tool	US Navy / DoD	AI + first-principles fused forecasting, vessel-aware routing, 12–96 hr forecast	Defense-funded, not publicly available, Arctic-focused	Satellite, airborne, onboard, model data	Near-identical concept to SIH26059 — validates the approach; good proof that the concept is fundable/real, but it's a closed defense system, not something Indian shipping can license
NCPOR / Bharati–Maitri Dijkstra route model	Academic prototype: optimal route between Bharati and Maitri using ScatSat-1 + NSIDC + ECMWF	Indian Antarctic expedition planners (research use)	Grid-based Dijkstra route optimization validated against 33-ISEA actual track	One-off academic study, not operational software, no live UI, single-vessel case (Kapitan Khlebnikov icebreaker)	Open Indian (ISRO ScatSat) + NASA/global data	Direct precedent the SIH team should build on/cite — no one has turned this into an operational product
Esri / SIPAS-style GIS tools	General ice-chart production tooling	National ice centers	GIS editing/production environment	Tooling, not a decision-support recommender	Institutional	Infrastructure layer, not a competitor product per se
POLARIS (IACS)	Standardized risk scoring for vessel-ice interaction	Regulatory / classification societies, all polar operators	Risk Index Outcome methodology, industry standard	It's a *scoring framework*, not software — POLARIS does not account for human or situational factors such as crew experience or vessel maneuverability, and real-time ice awareness can lag chart publication time.	N/A (methodology)	Should be adopted as the scoring standard inside the product, not competed with

Differentiation opportunity for the Indian product
No identified competitor is (a) India-specific/NCPOR-integrated, (b) built around the actual Bharati–Maitri resupply operating pattern, or (c) open/low-cost for an Indian government or PSU-shipping user. IcySea and NIC are the nearest functional analogs but are foreign, commercially licensed, or institutional-only. The gap: a low-cost, open-data-driven, vessel-aware DSS tuned to India's specific voyage corridors, built on the same open datasets (Copernicus, ScatSat-successor, NSIDC) the existing academic prototype already validated.
3. INDIA-SPECIFIC STRATEGY
Immediate, real operational need
•	India runs an annual Indian Scientific Expedition to Antarctica (ISEA) voyage via a chartered ice-class vessel (NCPOR does not currently own one) — a 2023 NCPOR global tender sought to time-charter one ice-class vessel capable of independent navigation in broken Antarctic sea ice for a ~55–65 day Indian Southern Ocean Research Expedition.
•	The standard route is Cape Town–Bharati–Maitri–Cape Town, with the route subject to change based on weather conditions.
•	India currently depends on chartered foreign vessels (e.g., South Africa's SA Agulhas) — a recent expedition used the chartered ice-class research vessel SA Agulhas, owned by the South African Maritime Safety Authority. This is a real pain point: route/ice planning is presumably done in an ad hoc, non-standardized way today.
•	India is actively planning to reduce this dependency: India intends to build its own polar research vessel within roughly five years, at an estimated cost of $310 million, so it can self-supply its Antarctic stations rather than depend on outside help. A future Indian-owned polar fleet is exactly the kind of asset that would need an in-house navigation DSS.
Government/agency fit
•	NCPOR (under Ministry of Earth Sciences) — the direct operational and scientific owner of this problem; already funds the underlying research (ScatSat-1/Dijkstra study) and runs the voyages.
•	INCOIS — relevant for ocean-state forecasting/data pipelines (though its core mandate is Indian Ocean, not Antarctic — do not overclaim direct INCOIS involvement without further confirmation).
•	Ministry of Ports, Shipping and Waterways — increasingly active in polar-adjacent strategy (see below), a plausible future stakeholder for any Arctic extension.
Strategic Arctic angle — verified as current and real, not speculative
This is a genuinely live and fast-moving area, not a "flashy but baseless" add-on:
•	India's Ministry of Ports, Shipping and Waterways and Russia's Ministry of Transport signed an MoU in December 2025 specifically on training specialists for ships operating in polar waters, alongside agreements to strengthen the Chennai–Vladivostok Eastern Maritime Corridor and India's broader Eurasian connectivity ambitions.
•	India's Shipping Ministry stated in August 2026 that it plans to send its first pilot cargo vessel through the Northern Sea Route in 2027, citing a 70% jump in Chennai–Vladivostok corridor cargo traffic and interest in the broader Trans-Arctic Transport Corridor.
•	Indian shipyards are reportedly discussing construction of conventional (non-nuclear) icebreaker vessels, which would mark a first step toward domestic polar shipping and maritime engineering expertise.
•	However, official commentary is careful to frame this as additive, not a replacement for existing routes: a successful pilot voyage is intended to let India evaluate transit time, cargo handling, insurance, ice conditions and port facilities, and is explicitly not meant to signal that India is shifting its major trade routes to the Arctic.
Implication for product design: the India-specific value proposition should be pitched in two honest layers —
8.	Now: solves a concrete, funded, recurring operational problem (annual ISEA voyage planning/routing), directly extending an existing NCPOR-affiliated academic prototype into real software.
9.	Later (roadmap, not MVP): as India commissions icebreakers and pilots NSR cargo voyages (2027 target), the same architecture (ice/iceberg ingestion + vessel-aware routing + POLARIS-style risk scoring) is directly reusable for Arctic operations — this is a credible, sourced growth story, not invented market demand.
Constraints to state explicitly
•	Insurance, regulatory (Polar Code compliance), and seasonal-access constraints are real and outside a software team's control — the product can *surface* these (e.g., flag Polar Code operational limits) but cannot solve them.
•	India currently has no independent Antarctic ice-class fleet and no operational Arctic fleet — near-term usage is bounded to a single annual voyage plus training/research use, which is a legitimate but small initial user base. Be honest about this in the pitch.
•	India's Arctic ambitions depend heavily on Russia-brokered access, sanctions exposure, and infrastructure still under construction — genuine geopolitical uncertainty, not a stable market.
4. REAL-WORLD FEASIBILITY
What's realistically available today (open data)
•	Sea-ice concentration: Copernicus Marine Service OSI-SAF products — OSI-SAF delivers global sea ice concentration, edge, type and drift products daily at 10 km resolution (drift at 62.5 km), covering both the Northern and Southern Hemispheres in polar stereographic projection, freely accessible via FTP or a Python API.
•	Higher-resolution Antarctic-specific SIC: the DMI-ASIP automated ice concentration product, derived from Sentinel-1 SAR merged with AMSR2 via optimal interpolation, covers Antarctic waters at 1×1 km resolution and is distributed through Copernicus Marine Service in near-real-time.
•	Iceberg detection: Copernicus's SAR-derived iceberg product provides gridded iceberg concentration (counts per 10×10 km cell) and individual iceberg positions as shapefiles, generated via a Constant False Alarm Rate algorithm on Sentinel-1/RCM SAR data — though the provider notes it is a generic automated product requiring expertise, and recommends deferring to national ice services for actual navigation.
•	Grounded iceberg mapping (Antarctic-specific, very recent): a 2026 study produced the first high-resolution circum-Antarctic grounded-iceberg dataset using a deep-learning (ResUNet) model on Sentinel-1 SAR imagery combined with bathymetry and sea-ice-concentration constraints. This is a strong open-source-able reference architecture for an SIH team's own detection module.
•	India's own precedent: ScatSat-1-derived sea ice extent + NSIDC concentration + ECMWF wind, already used successfully in the Bharati–Maitri Dijkstra study — this is the most directly reusable open pipeline.
What can realistically be built for an SIH prototype
•	Ingest 1–2 open datasets (Copernicus OSI-SAF concentration + one iceberg/SAR product), build a grid-based route optimizer (Dijkstra/A*, following the existing academic precedent) with a simple vessel-parameter model, and a POLARIS-inspired risk scorer. This is squarely feasible in a hackathon timeframe using published, open methodology.
•	A basic drift-extrapolation model for iceberg trajectory (e.g., linear/ocean-current-driven projection) rather than full physical iceberg dynamics modeling.
What requires proprietary data / is out of reach
•	True real-time (sub-daily, sub-km) iceberg tracking — even the well-funded PolarNav program notes that overhead satellite imagery has temporally limited operational value due to dynamic conditions, and augments it with shipboard radar systems that only detect within a few tens of kilometers. A student prototype cannot replicate onboard radar fusion.
•	Naval-grade or classified ice/route data.
•	High-frequency commercial SAR tasking (expensive, contract-based).
What should stay on the future roadmap, not MVP
•	Full ship-ice structural interaction simulation (VR/3D, per patent-literature systems).
•	Multi-vessel convoy/icebreaker escort optimization.
•	Arctic-region parity/expansion.
•	Insurance/regulatory-compliance automation.
5. PRODUCT VISION
A. Recommended product concept:
"IceRoute India" (working name) — an Antarctic-first, open-data-driven, vessel-aware navigation decision-support platform for Indian polar voyage planning, built by extending the existing NCPOR-affiliated academic route-optimization methodology (ScatSat/NSIDC/ECMWF + Dijkstra) into an operational GIS tool with iceberg-trajectory awareness and POLARIS-style risk scoring — architected for future Arctic extension but not attempting bipolar parity at launch.
B. Target users/personas: NCPOR expedition planners and ship navigators on the annual ISEA voyage; secondarily, Indian maritime training/research institutions and (roadmap) future Indian polar-shipping operators.
C. Core problem: India charters foreign ice-class vessels annually for a fixed, weather-dependent Antarctic supply route with no dedicated, India-specific software tool for ice/iceberg-aware, vessel-specific route planning — planning currently relies on ad hoc chart interpretation and one-off academic studies rather than an integrated operational tool.
D. Main workflows: pre-voyage route/window planning → en-route replanning as new satellite data arrives → risk briefing per route segment → post-voyage logging for model refinement.
E. Feature priority table:
Priority	Feature
MUST	SIC ingestion + short-range forecast; iceberg position ingestion; vessel profile input; ranked route recommendation; POLARIS-style risk score; GIS map UI; low-bandwidth mode
SHOULD	Historical climatology for departure planning; multi-vessel comparison; threshold alerts; offline sync
FUTURE	Icebreaker/convoy advisory; Arctic-region extension; insurance/regulatory overlays; ship-ice structural simulation

F. Competitive landscape + differentiation: IcySea (foreign, commercial, general-purpose) and US NIC (institutional, US-centric) are the closest functional analogs; PolarNav (US Navy SBIR) validates the concept but is closed/defense-only; no competitor is India-specific or built around NCPOR's actual voyage pattern — this is the differentiation.
G. India-specific value proposition: operationalizes an already-proven open-data academic methodology (Bharati–Maitri Dijkstra study) into real software for NCPOR's recurring, currently ad hoc voyage-planning need, while being architecturally positioned (not committed) to extend to Arctic operations as India's Northern Sea Route pilot program (targeted 2027) and icebreaker program mature.
H. Arctic + Antarctic strategic opportunity assessment: real and currently accelerating (MoUs, 2027 NSR pilot voyage, icebreaker construction talks) but still nascent and geopolitically contingent on Russia relations; correct positioning is "credible future roadmap," not "core MVP requirement."
I. Risks, assumptions and feasibility constraints:
•	Assumes continued open access to Copernicus/NSIDC/equivalent data (EU/int'l policy risk, low but nonzero).
•	Assumes NCPOR or an equivalent body would want to pilot/adopt such a tool — not yet validated with the actual users; a hackathon team should treat this as an assumption to flag, not a confirmed demand signal.
•	Small initial addressable user base (one annual voyage) — value proposition must lean on scientific/strategic value, not commercial volume, at least in the near term.
•	Real-time detection/tracking claims must be scoped honestly (near-real-time, satellite-revisit-limited) — do not oversell to "real-time."
J. Concise final product definition for Research Agent 2 (technical):
Build a decision-support (not autonomous) GIS-based platform that: (1) ingests open sea-ice-concentration data (Copernicus OSI-SAF / DMI-ASIP) and an open iceberg-detection product (Copernicus SAR iceberg product or a self-built Sentinel-1-based detector following published ResUNet-style methodology); (2) computes short-range ice/iceberg forecasts via straightforward extrapolation/drift modeling (not full physics); (3) runs a grid-based route optimizer (Dijkstra/A*, extending the existing published Bharati–Maitri methodology) parameterized by user-entered vessel profile (ice class, draft, speed, fuel curve); (4) scores route segments using a POLARIS-inspired Risk Index Outcome; (5) presents ranked route options (fastest/safest/lowest-fuel) on a low-bandwidth-friendly map UI; (6) keeps humans firmly in the loop for final routing decisions. Scope to the Antarctic Bharati–Maitri–Cape Town corridor as the primary demo case; architect data/model layers to be region-agnostic so an Arctic extension is a future configuration change, not a rebuild.
HANDOFF TO RESEARCH AGENT 2
•	Product: Antarctic-first, vessel-aware navigation DSS (not autonomous control), extending the published NCPOR-affiliated Bharati–Maitri Dijkstra-route-optimization methodology into operational software.
•	Core data sources to architect for: Copernicus OSI-SAF sea-ice concentration (10 km, near-real-time, free API); DMI-ASIP high-res (1 km) Antarctic SIC via Copernicus Marine Service; Copernicus SAR-derived iceberg concentration/position product (or self-built Sentinel-1 CFAR/ResUNet-style detector); ECMWF wind/ocean data; vessel-parameter input (ice class, draft, speed, fuel curve).
•	Core algorithmic components required: (1) short-range (12–96 hr class) ice/iceberg forecasting via extrapolation, not full physics; (2) grid-based route optimization (Dijkstra/A* baseline, ML-enhanced optional); (3) POLARIS-style Risk Index Outcome scoring per route segment per vessel class.
•	Hard exclusions: no autonomous ship control; no sub-km real-time iceberg tracking claims; no full structural ship-ice physics simulation; no proprietary/classified data dependencies; no simultaneous full Arctic feature parity at MVP — architect for future Arctic extension only.
•	Primary demo scenario: Cape Town–Bharati–Maitri–Cape Town corridor, validated conceptually against the existing published 33-ISEA case study.
•	UI/ops constraint: must assume low/intermittent bandwidth (shipboard use case) — offline-capable or low-bandwidth-optimized design is a functional requirement, not a nice-to-have.
•	Positioning constraint: MVP value proposition is grounded in a real, small, currently-underserved NCPOR/ISEA operational need; Arctic/NSR relevance is a legitimate, sourced future-roadmap narrative (India targeting first NSR pilot voyage in 2027) but must not be presented as current-scope functionality.
Source Document 2: Pasted markdown (2)(5).md
Research Agent 2 — Technical Blueprint
"IceRoute India" — SIH26059 Antarctic Sea-Ice, Iceberg Trajectory & Navigation DSS
This document converts Agent 1's validated product concept into a buildable technical plan. It does not re-litigate product scope; it resolves *how* to build the MUST-HAVE feature set within a hackathon-realistic engineering effort.
1. DATA ENGINEERING
1.1 Candidate datasets/APIs (final selection)
Data	Source	Access	Resolution	Update freq	License
Sea-ice concentration (primary)	Copernicus Marine Service — OSI-SAF global product	Free, registration-gated, programmatic	10 km daily (drift at 62.5 km), Arctic + Antarctic, polar stereographic	Daily	Free, open (Copernicus data policy)
Sea-ice concentration (high-res, Antarctic)	DMI-ASIP via Copernicus Marine	Same toolbox	1×1 km, SAR (Sentinel-1) + AMSR2 merged	Near-real-time daily	Free, open
Iceberg detection	Copernicus SAR iceberg product (Sentinel-1/RCM)	Same toolbox	10×10 km grid concentration + shapefile point positions	Per satellite pass (irregular, not continuous)	Free, open — but explicitly flagged by the provider as needing expert interpretation
Grounded iceberg baseline (reference/validation)	Published circum-Antarctic grounded-iceberg dataset (2026, ResUNet + Sentinel-1)	Academic dataset, cite for methodology	High-resolution, circumpolar	Static/research release	Open access (ESSD)
Weather / wind / ocean waves	Open-Meteo (aggregator of NOAA GFS, ECMWF IFS open-data, DWD ICON)	Free, no API key required, non-commercial CC BY 4.0	Global models 11–50 km; ocean wave height/period/direction updated every 6 hours; ECMWF IFS HRES now open-data at native 9 km since Oct 2025	6-hourly (waves), hourly (wind)	Free for non-commercial use, CC BY 4.0
Historical / training baseline	ScatSat-1 (ISRO) + NSIDC + ECMWF, per the published Bharati–Maitri study	Same open sources the existing academic study already used	—	Historical	Open, precedent-validated
Vessel / AIS (optional, stretch)	AISHub / MarineTraffic free tiers, or manual entry	Free tier is limited/rate-capped, community-sourced	Point positions	Variable	Free tier — not reliable enough to depend on for MVP; treat AIS as optional validation, not a live input

1.2 Licensing/access constraints
•	Copernicus Marine data requires a free account (registration, not payment) and use of the official `copernicusmarine` Python package — the toolbox offers metadata exploration, dataset subsetting to Zarr/NetCDF/CSV, and downloads with no quotas on volume or bandwidth, installable via pip install copernicusmarine.
•	Open-Meteo is free for non-commercial/hackathon use under CC BY 4.0 attribution — no API key required, CORS supported, servers in Europe and North America — ideal for a student team since there's zero auth friction.
•	The SAR iceberg product's own documentation explicitly says it is a generic automated product that needs expertise and should defer to national ice services for actual navigation — this must be stated as a limitation in the product itself (a disclaimer in the UI), not hidden.
•	No proprietary/classified data is used anywhere in the MVP — resolves Agent 1's "avoid proprietary dependencies" constraint directly.
1.3 Pipeline design: historical/training vs near-real-time inference
Two distinct pipelines, sharing a common geospatial grid:
A. Historical/offline pipeline (batch, run before/during hackathon, not at demo time):
10.	Bulk-download 2–5 years of OSI-SAF SIC + DMI-ASIP + ERA5/Open-Meteo historical wind/wave data for the target region (Bharati–Maitri corridor, roughly 60–70°S, 55–95°E).
11.	Regrid all sources onto a common regular lat/lon (or polar-stereographic) grid using xarray + xESMF/scipy interpolation.
12.	Build a labeled training set: (SIC(t), wind(t), previous SIC(t-1..t-n)) → SIC(t+Δ) for the forecasting model.
13.	Store as compact NetCDF/Zarr files checked into a data/processed/ directory (not raw multi-GB downloads) for reproducibility.
B. Near-real-time inference pipeline (what runs at demo time / would run operationally):
14.	Scheduled job (cron / Airflow-lite / simple Python scheduler) pulls latest OSI-SAF + DMI-ASIP SIC and latest Open-Meteo wind/wave for the bounding box.
15.	Cleaning: mask land, flag missing/cloud-obscured cells, reproject onto the same grid as training data.
16.	Feed into the trained forecasting model → short-range SIC forecast grid.
17.	Iceberg positions ingested separately (lower frequency, event-driven on new SAR pass) and drift-extrapolated.
18.	Outputs written to PostGIS as the current "risk/cost surface" for the routing engine to consume.
This split directly resolves Agent 1's ambiguity about forecasting cadence: training is a slow, offline, reproducible batch job; inference is a lightweight scheduled fetch-and-score job that a laptop can run for the demo.
2. ML / AI DESIGN
General principle applied throughout (per the brief): prefer interpretable/hybrid physics+ML over deep learning-by-default. Sea-ice and iceberg data for a single small corridor over a hackathon timeframe is not "big data" — a few years of 10km daily grids for one region is a modest tabular/gridded dataset, which favors gradient-boosted trees, ARIMA/persistence baselines, and simple CNNs over large deep nets that would overfit and be unexplainable to judges.
A. Sea-ice concentration forecasting
•	Problem formulation: short-range (12–96 hr) spatiotemporal regression: predict SIC(x, y, t+Δ) for each grid cell.
•	Input: current + lagged SIC grids (t, t-1, t-2 days), wind u/v components, sea surface temperature if available, day-of-year (seasonality).
•	Output: SIC grid (0–100%) at t+12h, +24h, +48h, +96h, plus a per-cell uncertainty estimate.
•	Baseline model: persistence (tomorrow = today) and climatological mean — mandatory baselines to prove any ML model adds value; also fast to implement and useful as a sanity check/fallback if the trained model is unavailable at demo time.
•	Recommended practical model: gradient-boosted trees (LightGBM/XGBoost) on engineered features per grid cell (lag values, wind, day-of-year, distance to coast) — this is exactly the "hybrid physics + ML" middle ground: cheap to train, interpretable via feature importance, and realistic for a small dataset. This is the single most defensible choice for a student team on a laptop.
•	Advanced/future model: a lightweight ConvLSTM or U-Net-style spatiotemporal CNN for full-grid forecasting once more historical data and GPU time are available — explicitly a future roadmap item, not MVP.
•	Training strategy: train/validation split by *time* (not random shuffle, to avoid leakage across days), walk-forward validation across the historical window.
•	Feature engineering: lagged SIC, wind speed/direction, seasonal encodings (sin/cos of day-of-year), distance-to-coast, prior-year same-date SIC as a climatological feature.
•	Evaluation metrics: MAE/RMSE on SIC percentage, plus Ice Edge Location Error (IELE) — distance between predicted and actual ice-edge line — because for navigation what matters is *where the edge is*, not exact concentration everywhere.
•	Uncertainty/confidence handling: for tree ensembles, use quantile regression (LightGBM quantile loss) or simple residual-based prediction intervals; surface as a confidence band on the map, feeding directly into the risk score (§ 5 below).
•	Computational requirements: trainable on a laptop CPU in minutes to low hours for a single-region, multi-year dataset — realistic for a hackathon.
•	Why realistic for the team: LightGBM/XGBoost are widely taught, well-documented, fast to iterate, and produce interpretable feature importances the team can explain to judges — versus a CNN/transformer which would need far more data, GPU time, and debugging the team likely doesn't have time for.
B. Iceberg trajectory prediction
•	Problem formulation: given a detected iceberg's current position (and, if available, recent positions from consecutive SAR passes), predict its position over the next 12–96 hours.
•	Input: last known position(s), local ocean current estimate (from Copernicus physics product if time permits, else wind-driven proxy), local wind.
•	Output: predicted drift track (point estimates per time step) + a growing uncertainty ellipse (since SAR revisit is irregular, uncertainty compounds quickly).
•	Baseline model: simple kinematic drift model — velocity = f(wind, current) using an empirical wind-drift factor (a well-established oceanographic approximation, ~2–3% of wind speed plus Coriolis deflection), i.e. physics-first, not ML-first for this sub-task.
•	Recommended practical model: the same kinematic drift model, calibrated against whatever historical iceberg-track data can be extracted from the Copernicus shapefile time series (fit the wind-drift coefficient empirically rather than using a textbook constant) — still fundamentally physics-based, lightly ML-tuned.
•	Advanced/future model: a Kalman filter or particle filter that fuses multiple SAR detections over time to reduce position uncertainty, or an ML drift-correction residual model layered on top of the kinematic baseline — future roadmap.
•	Training strategy: for the calibration step, fit the drift coefficient via least-squares regression against observed multi-pass iceberg tracks (limited dataset — a handful of coefficients, not a deep model, so this is realistic even with sparse data).
•	Feature engineering: wind vector, (if available) surface current vector, iceberg size proxy from the SAR product (larger bergs drift differently, but this is a stretch feature).
•	Evaluation metrics: track position error (km) at each forecast horizon vs. next actual SAR-observed position.
•	Uncertainty/confidence handling: growing circular/elliptical uncertainty buffer around the point prediction, radius increasing with forecast horizon and with time-since-last-detection — this is the single most important honesty feature, given SAR revisit gaps.
•	Computational requirements: trivial (closed-form kinematics + small regression) — runs instantly, no GPU.
•	Why realistic: iceberg drift is a genuinely well-studied physics problem; reinventing it with deep learning on a sparse, irregularly-sampled dataset would be both harder and less defensible than using the established wind/current-drift approximation.
C. Iceberg/sea-ice detection from imagery — include only if justified
Recommendation: do NOT build a custom SAR detector for MVP. Use the existing Copernicus SAR iceberg product and DMI-ASIP SIC product as-is.
•	Justification: a competent, published, open detector already exists (the 2026 ResUNet-based circum-Antarctic grounded-iceberg detector), and Copernicus already operationally runs CFAR-based detection and distributes the output. Rebuilding this from raw Sentinel-1 SAR scenes is a serious computer-vision research project (SAR despeckling, CFAR tuning, land-masking) that would consume most of a hackathon's time for a component the team can otherwise get for free.
•	If the team has a strong CV member and wants a differentiator: a lightweight demo-only detector (e.g., fine-tuning a small U-Net on a handful of public labeled Sentinel-1 SAR chips) can be shown as a "proof of technical capability" side-feature, clearly marked non-production, while the actual pipeline consumes the Copernicus product. This resolves Agent 1's ambiguity by making detection optional, judgment-gated, and never load-bearing for the core demo.
D. Fuel/ETA estimation
•	Problem formulation: given a route (sequence of waypoints/grid cells) and a vessel profile, estimate fuel burn and time to each waypoint.
•	Input: distance per segment, local SIC/ice-thickness proxy per segment, vessel speed-in-ice curve, vessel fuel-consumption-vs-speed curve, weather (wind/wave resistance).
•	Output: per-segment and cumulative ETA + fuel estimate.
•	Baseline model: simple physics-based formula: effective speed = design speed × ice-resistance-penalty(SIC, ice class) − weather-resistance-penalty(wind/wave); fuel = fuel-curve(effective speed) × time.
•	Recommended practical model: same formula, with ice-resistance-penalty curve calibrated from POLARIS speed limits (e.g., max 3 knots for non-ice-strengthened vessels, 5 knots for Polar Class 3–5 under elevated-risk ice conditions) — this ties fuel/ETA directly to the same risk framework as the safety model, keeping the system internally consistent.
•	Advanced/future model: regression-fitted resistance model using real AIS speed-vs-ice-condition data (if/when reliable AIS becomes available) — future roadmap, not MVP (AIS was flagged unreliable for MVP in §1).
•	Evaluation metrics: since no ground-truth Indian voyage fuel logs are available, validate qualitatively against the published Bharati–Maitri route case study's known transit times.
•	Why realistic: this is arithmetic over a physically-motivated formula, not a learned model — appropriate given the near-total absence of labeled fuel/speed training data for this exact use case.
E. Risk estimation
•	Problem formulation: per route segment, produce a single risk score usable both for route ranking and for pilot decision support.
•	Recommended approach: adopt POLARIS directly, not a custom-trained risk model. POLARIS Risk Index Outcome = f(ice concentration/type from forecast, vessel Polar Class) is a published, industry-standard, deterministic lookup-table method — it produces Risk Index Outcome values, with negative values indicating elevated operational risk.
•	Enhancement (still interpretable): combine the POLARIS ice-based RIO with an iceberg-proximity penalty (distance from route to nearest predicted-iceberg-position, weighted by that prediction's uncertainty) and a weather-severity penalty (wind/wave from Open-Meteo) into a single composite score via a transparent weighted sum — not a black-box learned risk model, so the team can explain every number in the demo.
•	Why realistic and why not ML here: risk scoring is exactly the place where an unexplainable model is actively harmful for a safety-adjacent decision-support tool, and where a regulator-recognized standard (POLARIS) already exists. Using it is both more defensible and less engineering effort than training a custom risk classifier on data the team doesn't have (no historical incident/near-miss dataset exists for this corridor).
3. ROUTE OPTIMIZATION
Graph/cost-map representation
Represent the operating region as a regular grid graph (the same grid used for SIC/weather data, e.g., ~10–25 km cells — matching OSI-SAF resolution and keeping graph size tractable), with each cell connected to its 8 neighbors. This directly extends the existing published methodology — the 2021 Bharati–Maitri study divided the region into grids with unique nodes studied for sea-ice and wind parameters, computing edge weights from ice/wind resistance and applying Dijkstra's algorithm, validated against the actual 33-ISEA track — so the SIH team is implementing a documented, previously-validated approach rather than inventing routing from scratch.
Recommended routing algorithm
A\* search (Dijkstra with an admissible straight-line-distance heuristic) over the grid graph — strictly better than plain Dijkstra for a bounded corridor since it prunes search space toward the destination, while remaining just as easy to implement and explain (networkx or a hand-rolled A* are both realistic for a student team). This resolves in favor of A* over the original study's Dijkstra as an incremental, low-risk improvement, not a different paradigm.
Multi-objective cost function
Edge cost between adjacent cells = weighted sum of:
cost = w1 * transit_time(cell)          # from fuel/ETA model (§2D)
     + w2 * fuel_burn(cell)
     + w3 * ice_risk_penalty(cell)       # from POLARIS RIO (§2E)
     + w4 * iceberg_proximity_penalty(cell)   # from trajectory model (§2B) + uncertainty
     + BIG_PENALTY if cell exceeds vessel's safe operating limit (hard constraint, not soft)
•	Present 3 pre-set weight profiles to the user rather than exposing raw weight-tuning: Safest (w3, w4 dominant, avoids anything above a conservative RIO threshold), Fastest (w1 dominant, subject to hard safety floor), Fuel-efficient (w2 dominant). This satisfies Agent 1's "2–3 ranked options" requirement cleanly and avoids a confusing free-form multi-objective UI.
Vessel-specific constraints
•	Hard constraint: any cell where computed RIO falls below the vessel's Polar-Class-specific safety threshold is excluded from the graph entirely for that vessel (not just penalized) — mirrors POLARIS's operational-limit philosophy directly.
•	Draft constraint: exclude cells with bathymetry shallower than vessel draft, if bathymetry data is included (GEBCO bathymetry is open and free — reasonable stretch addition).
•	Speed constraint: per-cell effective speed capped at the vessel's POLARIS-derived safe speed for that ice condition.
Dynamic re-routing
Re-run A* on a rolling schedule (e.g., every time a new SIC/iceberg update lands, roughly daily-to-twice-daily given data cadence) rather than continuously — matches the actual data refresh rate and avoids implying false real-time precision. If the currently-planned route's cost has increased materially or now crosses a hard constraint, flag it to the user as "replan recommended" rather than silently rerouting (keeps the human in the loop, per Agent 1's constraint).
Uncertainty/risk penalties
Iceberg-proximity penalty scales with the trajectory model's uncertainty ellipse (§2B) — a cell close to a *low-confidence* predicted iceberg position gets a smaller but nonzero penalty (not treated as certainly-safe), while a cell close to a *high-confidence* recent detection gets a much larger penalty. This is the direct link between the ML uncertainty outputs and the routing cost function that Agent 1's brief asked for.
How predictions feed the router
SIC forecast grid ──┐
                     ├─→ per-cell POLARIS RIO ──┐
Vessel profile ──────┘                          ├─→ edge cost ──→ A* ──→ ranked routes
Iceberg trajectory + uncertainty ────────────────┤
Weather (wind/wave) ─────────────────────────────┘
Fuel/ETA model ───────────────────────────────────┘
4. VESSEL INTELLIGENCE
Practical vessel profile schema
vessel_profile = {
  name, vessel_type,          # e.g. "ice-class research vessel"
  polar_class,                 # PC1–PC7 or "non-ice-strengthened" (IACS scale)
  draft_m,
  design_speed_knots,
  fuel_curve,                  # fuel burn (t/day) as function of speed — simple table or polynomial
  max_safe_speed_by_ice_type,  # derived from POLARIS lookup table for this Polar Class
}
This directly operationalizes Agent 1's "vessel profile input (ice class, draft, speed, fuel curve)" requirement, using POLARIS's own published Polar Class categories as the ice-capability field rather than inventing a new classification.
"Which vessel should be used?" — retain, but scope narrowly
Verdict: technically defensible in a narrow form; retain as a SHOULD, not a MUST.
•	Defensible version: given a fixed route/corridor and a small user-supplied set of candidate vessels (e.g., 2–4 vessels the user is choosing between, matching Agent 1's "multi-vessel comparison" HIGH-VALUE OPTIONAL feature), run the same routing engine once per vessel and compare resulting ETA/fuel/risk — this is just running the existing pipeline N times, not a new "recommend the ideal ship" model.
•	Not defensible: an open-ended "design/recommend the optimal ship specification" feature — that's naval architecture, not routing, and there is no dataset to train or validate such a recommendation against. Explicitly excluded.
5. SYSTEM ARCHITECTURE
Text architecture diagram
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Browser)                       │
│  React + MapLibre GL JS map · vessel profile form · route panel  │
│  · risk/ice legend · low-bandwidth mode (vector tiles, caching)  │
└───────────────────────────────┬────────────────────────────────┘
                                 │ REST/JSON (FastAPI)
┌───────────────────────────────▼────────────────────────────────┐
│                         BACKEND API (FastAPI)                    │
│  /forecast   /icebergs   /route   /vessels   /risk               │
└───────┬───────────────────────┬───────────────────┬─────────────┘
        │                       │                   │
┌───────▼────────┐   ┌──────────▼─────────┐  ┌──────▼───────────┐
│ ML SERVICE      │   │ ROUTING ENGINE      │  │ DATA INGESTION    │
│ (Python)        │   │ (Python, A*/        │  │ SCHEDULER         │
│ - SIC forecast  │   │  networkx or        │  │ (cron / Airflow-  │
│   (LightGBM)     │   │  custom grid graph) │  │  lite)            │
│ - Iceberg drift  │   │ - cost function     │  │ - Copernicus pull │
│   (kinematic)    │   │ - hard constraints  │  │ - Open-Meteo pull │
│ - Risk (POLARIS) │   │ - 3 route profiles  │  │ - clean/regrid    │
└───────┬─────────┘   └──────────┬──────────┘  └──────┬────────────┘
        │                        │                      │
        └────────────┬───────────┴──────────────────────┘
                      │
             ┌────────▼─────────┐
             │  PostGIS DATABASE │  (gridded rasters as tiles/rows,
             │  + Redis cache     │   iceberg points, vessel profiles,
             │                    │   route history)
             └────────────────────┘
Layer notes
•	Geospatial engine: PostGIS handles storage/query of gridded and point data; xarray/rioxarray handle in-memory raster manipulation before it lands in PostGIS or is served as map tiles.
•	Caching: Redis (or simple in-process cache) for the latest forecast grid and route results, since satellite data updates at most daily — no need to recompute on every request.
•	Model serving: the ML models here (LightGBM, kinematic drift) are lightweight enough to run in-process inside the FastAPI service or a small sidecar — no need for a heavyweight model-serving stack (no TorchServe/Triton) given the model sizes; this is an explicit "don't over-engineer" call.
•	Authentication: minimal — a single login gate (JWT or even basic auth) is enough for an SIH prototype meant for a defined institutional user (NCPOR planners), not public internet traffic.
•	Monitoring/logging: simple structured logging (Python logging + a log file or lightweight hosted log viewer) is sufficient; do not build a full observability stack for a hackathon prototype.
6. TECH STACK (final, not a shopping list)
Layer	Choice	Reason
Frontend framework	React + TypeScript	Team-learnable, huge ecosystem, works well with mapping libraries
Mapping	MapLibre GL JS (open-source Mapbox GL fork)	Free, vector-tile-based (good for low-bandwidth requirement), no vendor lock-in/API key needed
3D (only if time permits)	Skip for MVP; not needed for a 2D navigation chart use case	Avoids over-engineering; polar navigation charts are inherently 2D/planform
Backend	Python + FastAPI	Same language as the ML/geospatial stack (no context-switching for a small team), async-friendly, auto-generated API docs
Python ML stack	LightGBM/XGBoost, scikit-learn, numpy/pandas	Matches the interpretable-model choice in §2; avoids TensorFlow/PyTorch overhead where not needed
Geospatial stack	xarray, rioxarray, GDAL, Shapely, GeoPandas	Standard, well-documented open geospatial Python stack for exactly this kind of gridded+vector fusion
Database	PostgreSQL + PostGIS	Industry-standard geospatial database, free, handles both raster and vector (route/iceberg point) data
Caching	Redis	Simple, well-known, avoids recomputation of daily-cadence forecasts
Optimization/routing	networkx (A\*) or a custom lightweight grid A\*	networkx is quick to prototype with; a custom implementation is preferable only if grid size makes networkx too slow (test both)
Data access APIs	`copernicusmarine` Python package, Open-Meteo REST API	Both free, both directly confirmed accessible (§1)
Deployment (hackathon)	Docker Compose (frontend, backend, PostGIS, Redis as services) running locally or on a single free-tier cloud VM	Simplest path to a reliable, reproducible demo; avoids Kubernetes/cloud complexity the team doesn't need yet
Cloud/local dev	Local-first development, optional deploy to a free-tier host (Render/Railway/a college server) for the live demo	Matches team resources; no dependency on paid cloud credits
Model serving	In-process (loaded into the FastAPI app at startup)	Model sizes are small (LightGBM, kinematic formulas) — a separate serving layer (Triton/TorchServe) would be pure over-engineering here

7. PROJECT FILE / DOCUMENTATION SYSTEM
Trimmed to what a small team actually needs and will maintain — removed several from the illustrative list (no separate DESIGN_SYSTEM.md, MODEL_CARD.md per-submodel file, or EXPERIMENTS.md as standalone; merged into fewer, denser docs):
•	README.md — quick start, what the project is, how to run it locally (Docker Compose command).
•	PRD.md — condensed version of Agent 1's product vision (personas, MUST/SHOULD/FUTURE table, non-goals).
•	ARCHITECTURE.md — the system diagram and layer descriptions from §5 here.
•	DATA_SOURCES.md — the dataset table from §1.1, including license notes and access instructions (registration steps for Copernicus).
•	DATA_PIPELINE.md — historical vs near-real-time pipeline description (§1.3), including the regridding/cleaning steps.
•	ML.md — covers all five ML/AI sub-tasks (§2 A–E) in one file: problem formulation, model choice, and evaluation per task, plus the shared "why not deep learning" rationale — one file, not five, since each sub-model is small.
•	ROUTING_ENGINE.md — graph representation, cost function, algorithm, and the 3 route-profile presets (§3).
•	VESSEL_MODEL.md — vessel profile schema and the "which vessel" feature scoping decision (§4).
•	API.md — REST endpoint reference (auto-generated FastAPI docs can largely substitute here — keep this file thin, mostly a pointer).
•	DATABASE.md — PostGIS schema (tables for grid cells/rasters, iceberg points, vessel profiles, saved routes).
•	DEPLOYMENT.md — Docker Compose setup, environment variables, how to run the demo.
•	ROADMAP.md — the FUTURE-tier features from Agent 1 and this document (Arctic extension, convoy mode, AIS integration, advanced ML), explicitly separated from MVP scope.
•	LIMITATIONS.md *(added, not in the original illustrative list)* — a single honest file listing: SAR data latency, AIS unreliability, no ground-truth fuel validation, iceberg product's own "needs expertise" disclaimer, and the explicit "decision support, not autonomous control" boundary. This is genuinely necessary for a safety-adjacent tool and doubles as strong hackathon-judging material (shows engineering maturity).
Explicitly not created as separate files (folded into the above to avoid documentation sprawl a 4–6 person team can't maintain): SYSTEM_DESIGN.md (redundant with ARCHITECTURE.md), TECH_STACK.md (folded into README.md), SEA_ICE_MODEL.md/ICEBERG_MODEL.md (folded into ML.md), UI_UX.md/DESIGN_SYSTEM.md (a hackathon MVP doesn't need a formal design system doc), TESTING.md (a short section in README is enough at this stage), SECURITY.md (minimal auth as noted in §5 doesn't warrant a standalone doc yet — revisit post-hackathon).
8. DEVELOPMENT STRATEGY
Hackathon MVP (48–72 hr build)
•	Real: one region (Bharati–Maitri corridor), OSI-SAF SIC ingestion, Open-Meteo weather, LightGBM persistence-beating SIC forecast, kinematic iceberg drift on a small set of manually-seeded/sample iceberg positions, A* routing with the 3 preset profiles, POLARIS-based risk scoring, PostGIS + basic map UI.
•	Mocked/simplified: iceberg detection (use the Copernicus product's historical sample data or a small static demo dataset rather than a live pipeline if live access proves flaky mid-hackathon); vessel fuel curves (use published/approximate curves for 1–2 real vessel classes rather than a full library); bathymetry/draft constraint (nice-to-have, can be hardcoded/skipped); AIS (skip entirely, mention as roadmap).
•	Explicitly cut for MVP: multi-vessel comparison UI (do it as a script/notebook demo if time allows, not a polished feature), offline-sync mode (mention in demo narrative, don't build), convoy/icebreaker mode.
Strong demo version (if extra time/team capacity exists)
•	Add the multi-vessel comparison feature as real UI (already justified as technically defensible in §4).
•	Add historical climatology view for pre-season planning (straightforward once the historical pipeline exists — mostly a UI/aggregation task).
•	Polish the low-bandwidth mode (vector tile caching, reduced payload sizes) since it's a genuine differentiator versus generic tools and cheap to demonstrate.
•	Add the "LIMITATIONS.md"-driven in-app disclaimers as a visible UI panel — turns an engineering honesty point into a demo strength.
Post-hackathon production/research version
•	Replace the sample/static iceberg detection with a live scheduled Copernicus SAR product pull, and evaluate whether a self-built detector (per §2C's optional path) is worth the investment once real users are validating demand (per Agent 1's flagged assumption that NCPOR adoption is unvalidated — this should be resolved *before* investing further engineering here).
•	Move from LightGBM to the ConvLSTM/U-Net roadmap model once more historical data and compute are available, and only if the simpler model's IELE metric shows a real accuracy ceiling.
•	Add a real AIS integration once a reliable (likely paid/institutional) feed is available — do not build against the free-tier AIS APIs long-term given their reliability limits.
•	Formalize SECURITY.md and TESTING.md once there's an actual deployment target (e.g., an NCPOR-facing pilot) with real authentication/compliance requirements.
•	Investigate the Arctic-region extension only once the India NSR pilot program (targeted 2027, per Agent 1 §3) has concrete operational data needs — keep this strictly roadmap, not speculative build-ahead work.
HANDOFF TO RESEARCH AGENT 3
Finalized architecture: React/MapLibre frontend → FastAPI backend → in-process ML service (LightGBM SIC forecaster + kinematic iceberg drift + POLARIS-based risk scorer) → A*-based routing engine over a regular grid graph → PostGIS/Redis data layer, fed by a scheduled ingestion job pulling Copernicus Marine (OSI-SAF + DMI-ASIP SIC, SAR iceberg product) and Open-Meteo (wind/wave) data. Deployed via Docker Compose.
Feature set locked for MVP: SIC short-range forecast; iceberg drift prediction with growing uncertainty ellipse; 3-profile (safest/fastest/fuel-efficient) A* route recommendation with hard vessel-class safety constraints; POLARIS-based per-segment risk score; single-vessel-profile input; map UI with low-bandwidth consideration.
Explicitly deferred to roadmap: custom SAR-based detection model, multi-vessel "which ship should we buy" recommendation, AIS live integration, Arctic-region parity, convoy/icebreaker-escort mode, deep-learning (ConvLSTM/U-Net) forecasting upgrade, formal security/observability stack.
Development assumptions: team has general Python/web development skills but not necessarily prior geospatial/oceanographic ML experience — every model choice in §2 was selected to be learnable within a hackathon timeframe (gradient-boosted trees and closed-form kinematics, not custom deep learning). All data dependencies are free/open with no procurement lead time.
Key risks carried forward:
19.	Copernicus/Open-Meteo API access or rate limits failing live during the demo — mitigate by pre-caching a full demo dataset locally as a fallback (do not depend on live internet at judging time).
20.	SAR iceberg product's irregular revisit cadence may leave the "iceberg trajectory" demo thin on real detections for the chosen date window — mitigate by picking a demo date/region with known good coverage, verified in advance.
21.	Unvalidated NCPOR/end-user demand (carried over from Agent 1) — technical build should not over-invest in features (e.g., custom detector, AIS) that only make sense if real institutional adoption is confirmed.
22.	Grid resolution vs. routing performance trade-off untested at build time — recommend an early spike (day 1) to confirm A* over the chosen grid size runs fast enough for interactive demo use; fall back to a coarser grid if not.
Technical priorities, in build order: (1) data ingestion + regridding pipeline working end-to-end with cached fallback data; (2) A* router on a static/mocked cost grid (to de-risk the core interactive feature early); (3) LightGBM SIC forecaster; (4) kinematic iceberg drift + uncertainty; (5) POLARIS risk scoring wired into route cost; (6) frontend map + vessel profile UI; (7) polish (low-bandwidth mode, multi-vessel comparison, disclaimers UI) only after 1–6 are demo-stable.
Source Document 3: Pasted markdown (3)(3).md
Research Agent 3 — Execution Blueprint
"IceRoute India" — SIH26059 Final Product & Development Specification
This document takes Agent 1 (product/market) and Agent 2 (technical blueprint) as settled upstream decisions and converts them into a buildable, validated, demo-ready plan. Where upstream claims needed independent verification, sources are cited inline; where I diverge from or correct upstream (e.g., a metric name), it's flagged explicitly.
One correction to Agent 2 carried forward throughout this document: Agent 2's ML.md section named the ice-edge metric "IELE." The correct, standard, peer-reviewed name is the Integrated Ice-Edge Error (IIEE) — defined as the area where a forecast and the observed truth disagree on whether ice concentration is above or below a 15% threshold, decomposable into an extent error and a misplacement error, and it is the standard metric used by operational centers including ECMWF for verifying both Arctic and Antarctic sea-ice edge forecasts against a persistence baseline. This document uses IIEE throughout.
1. STAGE-WISE DEVELOPMENT PLAN
Adapted from the prompt's 13-stage template to the actual architecture — merged where stages would otherwise be trivial or artificially split (e.g., "improved prediction" folded into the ML stage as an explicit stretch goal rather than a separate stage; "testing/validation" split across stages rather than left to the end, since leaving validation to stage 11 is itself a common failure mode).
Stage	Objective	Inputs	Tasks	Output	Dependency	Success criterion	Common failure mode	SIH simplification
0. Problem framing & scoping	Lock the demo scenario and non-goals so the team doesn't scope-creep mid-build	SIH PS, Agent 1/2 outputs	Confirm Bharati–Maitri corridor as demo region; write LIMITATIONS.md skeleton and non-goals list; assign team roles by stage	Signed-off 1-page scope doc	None	Every team member can state the MVP chain in one sentence	Team either skips this or treats it as a formality	Do this in under 2 hours — it's a checklist, not a research task
1. Data acquisition	Get real credentials and real data flowing, not mocked	Copernicus account, Open-Meteo (no key needed)	Register Copernicus account; install `copernicusmarine`; pull a test OSI-SAF + DMI-ASIP subset for the target bbox; pull Open-Meteo wind/wave for same bbox/date range; pull one SAR iceberg product sample	Local raw data files (NetCDF/Zarr + JSON)	Stage 0	Successfully downloaded, non-empty files for all 3 sources	Registration approval delay, bbox/CRS mismatch between sources	Do this on day 1, hour 1 — it's the highest-risk external dependency; cache everything locally immediately
2. Data pipeline	Common grid, cleaned, ready for both training and inference	Stage 1 raw files	Regrid all sources to one common grid (polar stereographic or simple lat/lon); land-mask; build the historical training table (lag features); write the near-real-time fetch-and-clean job	`data/processed/` training table + a reusable `ingest.py` fetch job	Stage 1	Training table loads in pandas/xarray with no NaN gaps in the demo region/date range	Silent misalignment between grids (off-by-one-cell errors invisible until routes look wrong)	Use a single fixed small bbox and a single fixed resolution from day 1 — don't try to make this dataset-source-agnostic during the hackathon
3. Baseline + practical ML (SIC forecast)	A forecast that beats persistence, honestly measured	Stage 2 training table	Implement persistence + climatology baselines; train LightGBM regressor; compute IIEE and MAE on a held-out time period	Trained model file + baseline comparison numbers	Stage 2	LightGBM IIEE is measurably lower than persistence IIEE on held-out days	Team trains on random-shuffled data (temporal leakage) and gets falsely great numbers	Fine to use just 1–2 years of history if that's all that downloads cleanly in time — note the limitation, don't fake more
4. Iceberg drift model	Physics-based trajectory + honest uncertainty growth	Stage 2 wind/current data, SAR iceberg sample positions	Implement kinematic drift formula; calibrate wind-drift coefficient if multi-pass data exists, else use literature default; implement growing uncertainty ellipse	`iceberg_drift.py` module	Stage 2	Predicted drift track is within a plausible range of a held-out real multi-pass detection (or, if no such pair exists in the sample, at least physically sane direction/speed)	Treating a single detection as ground truth for "trajectory" when it's really just one point — team should be explicit this is drift *projection*, not track *fitting*, unless 2+ passes exist	If no usable multi-pass iceberg data is found in time, use literature-default drift coefficients and clearly label the demo icebergs as illustrative/seeded, not live-detected
5. Risk engine (POLARIS)	Deterministic, explainable per-cell/per-segment risk score	Stage 3 SIC forecast, vessel Polar Class	Implement POLARIS RIO lookup table; combine with iceberg-proximity + weather penalty into a composite score; expose per-cell risk as a layer	`risk_engine.py` + risk grid output	Stages 3, 4	Risk score matches hand-calculated POLARIS RIO for at least 3 manually-checked test cells	Silently deviating from the published POLARIS table without documenting the deviation (loses defensibility)	Implement only the ice-concentration-based RIO table; skip ice-thickness/multi-year-ice refinements that need data the team doesn't have
6. Routing engine	Grid graph + A* + 3 route profiles + hard constraints	Stage 5 risk grid, vessel profile	Build grid graph over the demo region; implement A* with the composite cost function; implement hard exclusion for cells below vessel's safety threshold; implement 3 preset weight profiles	`router.py`, returns 3 ranked GeoJSON routes	Stage 5	On a static/mocked cost grid, A* returns a plausible route (spike this before Stage 5 is done, per Agent 2's risk #4)	Grid too fine → A* too slow for interactive demo; not tested until integration	Do the A*-on-a-mocked-grid spike on day 1 in parallel with Stage 1, exactly as Agent 2 recommended
7. Vessel intelligence	Vessel profile schema + multi-vessel comparison	Stage 6 router	Implement vessel profile schema (Polar Class, draft, speed, fuel curve); implement fuel/ETA formula tied to POLARIS speed limits; wire multi-vessel comparison (run router N times)	`vessel.py` + 2–3 preset real vessel profiles (e.g., a Polar Class 6 research vessel, a non-ice-strengthened cargo profile)	Stage 6	Running the same route request with 2 different vessel profiles produces visibly different routes/ETAs	Inventing fuel curves with no basis — use published/approximate real fuel-curve shapes, state the approximation openly	Hardcode 2–3 vessel profiles rather than building a vessel-profile editor UI
8. Backend/API	Wire all engines behind a clean FastAPI service	Stages 3–7 modules	Build `/forecast`, `/icebergs`, `/route`, `/vessels`, `/risk` endpoints; wire Redis caching; wire PostGIS storage	Running FastAPI service with working endpoints (testable via `/docs`)	Stages 3–7	Each endpoint returns valid JSON/GeoJSON for the demo region within acceptable latency (<5s)	Building the API before the underlying engines are stable, causing repeated interface churn	Build thin endpoints that call already-tested Stage 3–7 functions directly — don't add business logic in the API layer
9. Dashboard/UI	Map-based frontend showing the full data→decision chain	Stage 8 API	React + MapLibre map; SIC/risk layer toggle; iceberg + uncertainty ellipse layer; vessel profile form; 3-route comparison panel; risk/limitations disclaimer panel	Working local frontend	Stage 8	A user can go from "pick vessel" to "see 3 ranked routes with risk scores" without touching code	Over-investing in visual polish before the underlying chain is demo-stable	Use MapLibre's default styling; skip custom cartographic design — judges care about correctness, not aesthetics, for this PS
10. Integration	Full pipeline runs end-to-end on one command	Stages 1–9	Docker Compose wiring; environment variables; seed script that pre-loads a known-good cached dataset	`docker compose up` brings up a fully working demo	Stages 1–9	A teammate who wasn't involved in the build can run one command and reach a working demo from a clean machine	Environment/dependency drift between team members' laptops discovered only at demo time	Freeze this stage's target environment by day 2 of the hackathon; no new dependencies after that
11. Validation	Confirm outputs are not just "runs without crashing" but plausible	Stages 3–10	Run backtests (see §3–4 below); sanity-check against the published 33-ISEA case; run the adverse-scenario checklist	A short validation summary (numbers + 2–3 backtest plots)	Stage 10	At least one backtest shows the system's route/forecast is directionally consistent with the published academic case study	Skipping this and only ever testing the "happy path" demo scenario	Even 1–2 backtest runs are enough to be honest and credible — don't need a full statistical study
12. Demo & deployment	A rehearsed, resilient live (or recorded-fallback) demo	Stage 11	Rehearse the exact demo script (§5); prepare offline/cached fallback in case live API access fails; prepare slides bridging PS → product → validation	Demo-ready package	Stage 11	Demo runs successfully at least twice in rehearsal without live-internet dependency failures	Depending on live Copernicus/Open-Meteo access during judging (a genuine risk per Agent 2 §Handoff)	Always demo from the pre-cached dataset; mention live-fetch capability but don't rely on it live

2. MVP DEFINITION
The smallest fully-integrated system that proves the PS is one that demonstrably runs the full chain below, on one real (or realistically cached) region, for one real voyage corridor:
Sea-ice + weather data (Copernicus + Open-Meteo)
        │
        ▼
SIC short-range forecast (LightGBM, beats persistence, IIEE-measured)
        │
        ▼
Iceberg position + drift projection (kinematic, with uncertainty ellipse)
        │
        ▼
POLARIS-based per-cell risk score (ice-concentration RIO + iceberg-proximity + weather penalty)
        │
        ▼
A* route optimization (3 profiles: safest / fastest / fuel-efficient; hard vessel-safety constraints)
        │
        ▼
Vessel-aware decision (2–3 preset vessel profiles change the recommended route/ETA/fuel)
        │
        ▼
Dashboard (map + route comparison + risk legend + explicit limitations panel)
Every arrow in this chain must be real and demonstrable, even if individually simplified (e.g., the iceberg positions can be a small curated real or realistic sample rather than a fully live pipeline) — what cannot be faked is the *connection*: a change in ice/weather data must visibly change the risk score, which must visibly change the recommended route, which must visibly change per-vessel ETA/fuel. That end-to-end causal chain, not any single component's sophistication, is what proves the PS.
Explicitly NOT built for the first version
•	Autonomous route execution/ship control (hard exclusion, per both upstream agents and the PS itself).
•	Custom SAR/CV iceberg detector — consume the existing Copernicus product; a CV detector is optional stretch only, never load-bearing (per Agent 2 §2C).
•	Live AIS integration — too unreliable at free tier (per Agent 2 §1.1); use it, if at all, only as a static validation reference (the 33-ISEA case).
•	Full Arctic-region parity — architecture is region-agnostic, but only the Antarctic corridor is populated for MVP (per Agent 1).
•	Multi-vessel convoy/icebreaker-escort optimization — SHOULD-tier at best, not MVP.
•	User accounts/multi-tenant auth beyond a single demo login — not relevant to proving the PS.
•	Bathymetry/draft hard-constraint — nice-to-have, skip unless time allows (per Agent 2 §8).
•	Any "recommend the ideal vessel design" feature — explicitly rejected as undefensible in Agent 2 §4.
3. MODEL VALIDATION
Train/validation/test strategy
•	Temporal split, not random split, for the SIC forecaster: e.g., train on years 1–N-1, validate on year N's early months, test on year N's later months (or, if only 1–2 years of data are feasible to pull in a hackathon window, a simple train-on-first-80%-of-timeline / test-on-last-20% split). This is the single most important correctness rule for any time-series model here.
•	Walk-forward validation (retrain or re-evaluate at successive time cutoffs) if time allows, to confirm the model isn't overfit to one particular season's ice pattern.
Temporal leakage prevention
•	Never let a lag feature at prediction time t include information from >t (e.g., don't accidentally use a centered rolling average that peeks into the future).
•	Ensure the train/test split boundary is strictly chronological — no shuffling across the boundary.
•	For the iceberg drift calibration (fitting the wind-drift coefficient), fit only on data strictly before the date range used for any demo/backtest evaluation.
Spatial leakage concerns
•	If the grid is fine enough that adjacent-in-space-and-time cells are highly correlated, a naive random train/test split by *cell* (rather than by *time*) could leak information (a test cell's neighbor in the training set effectively reveals the answer). Mitigation: since the primary split is already temporal (whole-grid-at-time-t is either train or test, never split within a single time snapshot), this is largely avoided by construction — but flag it explicitly in ML.md as a design decision, not an oversight.
Metrics
•	Sea-ice forecasting: MAE/RMSE on SIC (%) per cell, and IIEE (correcting Agent 2's "IELE") as the headline, user-relevant metric — IIEE is computed as the area of disagreement between forecast and observed ice edge at the standard 15% concentration threshold, and is explicitly recommended in the literature as a common headline score analogous to standard NWP verification metrics, decomposable into extent error and misplacement error for diagnosing *why* a forecast is off.
•	Trajectory prediction: point position error (km) at each forecast horizon vs. the next actual observed position, when a genuine multi-pass pair exists; otherwise report only the physically-motivated speed/direction sanity check and be explicit that true error cannot be measured without more detections.
•	Route safety metrics: fraction of the recommended route's cells that fall within each POLARIS RIO band; count of any hard-constraint violations (should be zero by construction, so this is really a code-correctness check).
•	Fuel/ETA metrics: compare model-estimated transit time for the Bharati–Maitri leg against the transit time reported in the published 2021 academic case study (qualitative match, not exact — no ground-truth fuel logs exist, as Agent 2 already flagged).
•	Uncertainty calibration: for the SIC quantile/interval predictions, check empirical coverage (e.g., does the 80% prediction interval actually contain the true value ~80% of the time on held-out data) — a lightweight but genuine calibration check, not a full reliability diagram unless time allows.
•	Baseline comparisons: persistence and climatology are mandatory baselines for the SIC model (already specified by Agent 2); the routing engine's baseline comparison is a simple pure-shortest-distance route (ignoring ice/risk entirely) to demonstrate that ice/risk-awareness actually changes the recommendation — this is a strong, cheap-to-produce demo artifact.
4. SYSTEM VALIDATION / REAL-WORLD VALIDITY
Historical replay/backtesting
The strongest available anchor is the existing published academic precedent: the 2021 Dijkstra-based study's route between Bharati and Maitri, validated against the actual track sailed by the 33rd Indian Scientific Expedition to Antarctica. Replaying the same corridor and comparing IceRoute India's recommended route/ETA against both (a) that published route and (b) the actual sailed track is the single most credible validation exercise available, since it's the only case with a real, citable ground truth for this exact operational context.
Known/simulated voyage scenarios
•	Known voyage: the 33-ISEA Bharati–Maitri leg (above).
•	Simulated voyages: construct 2–3 synthetic scenarios varying departure date across the ISEA season (Nov–Feb) to show the system's route/risk recommendation changes sensibly with seasonal ice retreat — this also doubles as the climatology-planning demo feature.
Adverse-weather scenarios
Manually construct (or find in the historical record) a high-wind/high-wave date and confirm the fuel/ETA model and route ranking respond (e.g., "fastest" profile ETA degrades, or the router shifts away from a wave-exposed open-water segment) — a cheap, high-value sanity test that's easy to show live in a demo.
Changing sea-ice scenarios
Show the system on two dates with meaningfully different SIC (e.g., early-season heavier ice vs. late-season lighter ice) and confirm the recommended route and RIO scores shift accordingly — this is a natural, low-effort demo sequence since the historical data already contains this variation.
Iceberg encounter scenarios
Manually seed a test scenario with an iceberg (real sample position or a clearly-labeled synthetic one) directly on the naive shortest-path route and show the risk-aware router diverts around it, with the diversion size scaling visibly with the uncertainty ellipse — this is the single clearest "AI is doing something real" demo moment and should be a centerpiece of the demo script.
Vessel capability scenarios
Run the same route request for a Polar Class-rated vessel vs. a non-ice-strengthened vessel and show the non-ice-strengthened vessel either gets routed further around ice or is denied a direct route entirely (hard constraint triggering) — directly demonstrates the vessel-aware differentiator.
5. DEMO / SIH STRATEGY
Principle: show measurable numbers changing in response to real inputs, not animations. Judges at this level of PS sophistication (Ministry of Earth Sciences, likely domain-literate evaluators) will be unimpressed by a spinning globe and will specifically probe whether the "AI" does anything beyond a static map.
Recommended demo sequence (8–10 minutes)
23.	Problem framing (30s): state the real, sourced pain point — India charters foreign ice-class vessels annually for the Bharati–Maitri run with no dedicated India-specific route-planning tool; cite the existing 2021 academic study as evidence the problem is real and previously only solved as a one-off research exercise.
24.	Data layer (1 min): show the live (or cached) SIC and iceberg layers on the map for the demo date — name the real data sources (Copernicus OSI-SAF, DMI-ASIP, SAR iceberg product) to establish credibility immediately.
25.	Forecast (1 min): show the SIC forecast vs. persistence baseline side by side, with the IIEE number displayed — this is the "we didn't just draw a map, we beat a real baseline" moment.
26.	Baseline route vs. risk-aware route (2 min): show the naive shortest-distance route running directly through high-ice-risk/near-iceberg cells; then show the risk-aware A* route diverting around it, with the POLARIS RIO numbers displayed per segment. This single comparison is the strongest evidence of real technical work and should be the visual centerpiece.
27.	Vessel-aware decision (2 min): switch vessel profile from a Polar Class vessel to a non-ice-strengthened vessel live, and show the route/ETA/risk changing — directly demonstrates the "vessel-aware" differentiator from Agent 1's product vision.
28.	Uncertainty honesty (1 min): show the iceberg uncertainty ellipse growing over the forecast horizon, and explicitly show the LIMITATIONS.md-derived disclaimer panel in the UI — turning engineering honesty into a demo strength (an explicit recommendation carried from Agent 2).
29.	Validation (1 min): show the backtest comparison against the published 33-ISEA route — "we validated against the only real precedent that exists for this exact problem."
30.	Roadmap/strategic close (1 min): briefly and honestly note the Arctic/NSR extension potential as architecturally-ready-but-not-built, citing the real 2027 pilot voyage plan — closes on strategic relevance without overclaiming current scope.
What NOT to do
•	Do not fake real-time claims — be explicit about data refresh cadence (daily-ish, satellite-pass-limited).
•	Do not present the multi-vessel or climatology features as fully built if they were cut per §2 — show them as roadmap slides, not live demo, if not actually built.
•	Do not let "AI" become a buzzword without a number attached — every AI/ML claim in the demo should have a metric next to it (IIEE, RIO, position error).
6. DIFFERENTIATION — validated, not assumed
Evaluating the candidate differentiators against three tests: technically defensible (built on something real, not hand-waved), operationally useful (actually changes a real decision), demonstrable (can be shown live with numbers).
Candidate	Verdict	Why
Uncertainty-aware routing (iceberg uncertainty ellipse feeding route cost)	KEEP — strongest differentiator	Passes all three tests: it's physically grounded (SAR revisit gaps are real, per Agent 1 §4), it changes actual route decisions (§5 step 4), and it's the single most visually/numerically demonstrable feature. No competitor product reviewed (IcySea, NIC) was found to expose this explicitly to the end user.
Vessel-aware routing with hard safety constraints	KEEP — strong, directly PS-aligned	The PS explicitly asks for vessel-aware navigation support; POLARIS gives it real regulatory grounding; demonstrable live by switching vessel profiles. This is arguably the most PS-literal differentiator.
Fuel/risk trade-off via 3 preset route profiles	KEEP — useful, moderately differentiating	Directly useful (a planner genuinely needs to choose safest vs. fastest vs. cheapest), technically simple but defensible since it's grounded in the same POLARIS-based cost function as the safety features, not a separate gimmick. Moderate differentiation since "give me route options" is a fairly standard DSS feature — the *vessel-and-risk-aware* cost function underneath is the real differentiator, not the "3 options" UI pattern itself.
Dynamic re-routing (data-refresh-triggered replan flag)	KEEP, but scope down the claim	Real and useful, but must be presented honestly as "replan-when-new-data-arrives" (daily/pass-cadence), not framed as continuous/real-time — overclaiming this would be the single easiest point for a technically literate judge to puncture.
Combined Antarctic + Arctic maritime intelligence	REJECT as an MVP differentiator; KEEP only as roadmap narrative	This does not pass the "demonstrable" test for MVP (no Arctic data is actually ingested), and Agent 1 already correctly identified IcySea as an existing bipolar competitor — claiming *this* as a differentiator for a system that doesn't yet touch the Arctic would be an actively weak claim in front of judges who might know IcySea exists. The real, defensible version of this idea is "architecturally region-agnostic, roadmap-ready for the 2027 NSR pilot" — a forward-looking narrative point, not a built differentiator.
India-specific NCPOR/ISEA operational grounding *(added — not in the prompt's candidate list, but the strongest one found across both upstream agents)*	KEEP — arguably the single best differentiator	This is the one thing literally no competitor (IcySea, NIC, PolarNav) has: a system built around and validated against India's actual, real, annual, citable voyage (the 33-ISEA case). It's maximally hard for a judge to dismiss as "just another map" because it's tied to a specific, real, sourced Indian operational fact pattern, not a generic capability claim.

Final recommended differentiation to lead with in the pitch: uncertainty-aware, vessel-aware, POLARIS-grounded routing, validated against India's own real Antarctic voyage record — in that order.
7. ARCTIC + INDIAN STRATEGIC EXTENSION
Current state of NSR viability — verified, current as of August 2026
•	Seasonality is real and narrow: the Northern Sea Route currently remains open only during a narrow late-summer window, with ice conditions and weather varying drastically year to year; Russian navigation rules formally restrict independent (unescorted) navigation for non-ice-strengthened vessels to open water only, with icebreaker-assisted navigation permitted from July to mid-November.
•	Escort/permitting is mandatory and burdensome, not optional infrastructure: Russia's NSR Administration (under Rosatom since 2022) requires mandatory Russian icebreaker and pilotage services and issues route-specific permits; operators must file for a permit four months in advance — versus 48 hours for the Suez Canal — a major planning burden most operators are unwilling or unable to absorb.
•	Cost economics are genuinely marginal, not obviously favorable: ice-class vessel construction/charter costs run 20–30% higher than conventional vessels, and one advisor's real case study found additional insurance costs of nearly $500,000 for a single transit made the route commercially unviable versus a longer but safer route.
•	Scale is currently tiny relative to Suez: a record 23 vessels transited the NSR last year (up from 15 the year before) — compared to roughly 35 ships per day through Suez even amid Red Sea disruptions — with only about 3.5% of relevant traffic currently betting on the northern route.
•	2026 is a genuine inflection point but still experimental: China's Sea Legend Shipping opened the first weekly scheduled Arctic container service in August 2026, an 8-sailing, 7-week seasonal program using small-to-medium boxships, with insurance running 5–10x normal levels; the largest vessel deployed (4,890 TEU) is modest next to the 20,000–24,000 TEU ships dominating Suez routes, and the route is expected to become ice-free year-round only from 2060.
•	India's position is confirmed as real interest, not yet operational commitment: India is noted as interested in developing the NSR, primarily to secure Yamal LNG energy supplies, and is building icebreakers — this is consistent with, and mildly more specific than, Agent 1's earlier findings (the December 2025 MoU, the 2027 pilot-voyage target).
Verdict on product scope: Antarctic-only, Arctic-only, or common architecture?
Confirmed: common architecture, Antarctic-only build. This validates rather than overturns Agent 1's original recommendation, now with stronger evidence for *why*:
•	Building for the Arctic now would mean building for a route that is still (as of Aug 2026) a narrow, permit-gated, escort-mandatory, insurance-punitive, ~7-week seasonal experiment with no confirmed Indian vessel transit yet — there is no operational Indian user to design for today.
•	The Antarctic corridor, by contrast, has a real, annual, Indian-government-run voyage happening *right now* with a citable academic precedent.
•	The architecture (SIC forecast + iceberg-adjacent-hazard + POLARIS-based vessel-aware routing) is region-agnostic by construction — extending to the NSR later requires new data-source configuration (Russian/Arctic-specific ice charts, NSR permit-zone boundaries, mandatory-escort-zone flags as additional hard constraints) rather than a rebuild, exactly as both upstream agents specified.
Realistic assessment of how Indian firms/government/research organizations could benefit
•	Now (Antarctic): NCPOR and its chartered-vessel voyage planning — the only currently-real, currently-operational beneficiary.
•	Near-future contingency (Arctic, energy-driven): if India does pursue Yamal LNG-linked NSR transits, the same risk/routing architecture (re-parameterized with NSR-specific permit-zone and mandatory-escort constraints) would give an Indian shipping or PSU operator a planning tool for a genuinely high-stakes, narrow-window, expensive route — where planning quality has outsized value precisely *because* the insurance/escort economics are so unforgiving (per the $500K real-case-study insurance example above).
•	Not a benefit case to oversell: general Indian container/bulk shipping diversifying to the NSR — the traffic-share numbers (23 vessels/year vs. ~35/day at Suez) make this a niche, not a mainstream, opportunity for the foreseeable future. Any pitch framing NSR as "the new Suez" for India would be factually indefensible against current data and should be explicitly avoided.
This directly satisfies the prompt's instruction not to frame Arctic routes as a guaranteed replacement — the sourced evidence base independently supports treating NSR as a narrow, high-cost, high-value-only-in-specific-cases contingency route, not a supplement at scale, at least through the visible 2026–2027 horizon.
8. BUSINESS / DEPLOYMENT PATH
User segment	Realistic near-term fit	Deployment model	What's monetizable vs. public/research
Research institutions (NCPOR and peers)	Strongest, most realistic near-term user — direct extension of an existing academic need	Free/institutional pilot deployment; likely government-funded post-SIH rather than commercial licensing	Should remain public/research-oriented — this is a public-good scientific-logistics tool, not a profit center
Government (MoES, Ministry of Ports Shipping & Waterways)	Plausible sponsor/adopter, especially given the Ministry's active current NSR/polar-training engagement (per Agent 1 §3)	Government pilot/procurement, potentially bundled with the icebreaker-training MoU activity	Public infrastructure; not a monetization target
Shipping/logistics firms (Chennai–Vladivostok corridor operators, future NSR entrants)	Real but currently small and speculative — only relevant once/if Indian firms actually operate ice-class or NSR-transiting vessels	Future B2B SaaS or per-voyage planning service, contingent on the NSR pilot program actually materializing	Legitimate future monetization path, but should not be built or priced around before the 2027 pilot outcome is known
Fleet operators (future Indian polar research vessel, future icebreakers)	Real, tied to the confirmed ~5-year Indian polar vessel program (per Agent 1 §3)	Bundled operational software for the future Indian-owned vessel(s)	Natural extension of the institutional-pilot path above, not separately monetizable in the near term
Insurance/risk organizations	Plausible but unvalidated — insurers price NSR/polar risk today using their own models; no evidence this team's output is currently sought by insurers	Not a near-term deployment target; a possible future data-licensing conversation only if the risk model develops a track record	Not part of MVP business scope at all — flag as pure future-roadmap speculation, not a current opportunity
Maritime intelligence providers (IcySea-type competitors)	Realistic only as a potential technology-partnership or acquisition scenario, not a customer	N/A for MVP	N/A

Overall recommendation: treat this as a public-good, government/research-sector tool first, not a commercial SaaS product, at least through the SIH and immediate post-SIH period — this matches both the real near-term user base (one annual NCPOR voyage) and India's stated non-commercial framing of the Antarctic program. Any monetization narrative should be scoped strictly to the *future*, *contingent* NSR/commercial-shipping case, and explicitly labeled as such in any pitch — inventing near-term commercial demand here would contradict Agent 1's own honestly-flagged "unvalidated demand" risk.
9. FINAL DOCUMENTATION / MD PLAN
Building on Agent 2's already-trimmed §7 doc list (12 files), here is the write order and dependency structure — since a hackathon team needs to know not just *what* to write but *when*, given limited time:
Write first (before/during Stage 0–2, cheap and unblocking):
31.	README.md — even a stub, immediately, so the repo is navigable from hour 1.
32.	PRD.md — condense Agent 1's output; this is copy-editing, not new research, so do it first.
33.	DATA_SOURCES.md — write *while* doing Stage 1 (data acquisition) so registration steps/gotchas are captured in real time, not reconstructed later.
34.	LIMITATIONS.md — start a running list from day 1; every simplification made in Stages 1–9 should be logged here immediately, not reconstructed at the end (reconstructing this file late is a common failure mode — teams forget their own shortcuts).
Write during build (Stages 2–8, as each component stabilizes):
35.	DATA_PIPELINE.md — once Stage 2 is stable.
36.	ML.md — once Stage 3–5 models are trained and evaluated (write the metrics into this doc, don't just describe intended methodology — include actual IIEE/error numbers).
37.	ROUTING_ENGINE.md — once Stage 6 is stable.
38.	VESSEL_MODEL.md — once Stage 7 is stable.
39.	ARCHITECTURE.md — once Stage 8 (API) is wired, since this is where the real (not just planned) architecture is finally known.
40.	DATABASE.md — alongside Stage 8.
Write last (Stages 9–12, once the system is stable enough to describe accurately):
41.	API.md — thin, mostly a pointer to FastAPI's auto-docs, written once endpoints are frozen.
42.	DEPLOYMENT.md — written once Stage 10 (integration/Docker Compose) actually works end-to-end — writing this earlier risks documenting a setup that changes.
43.	ROADMAP.md — written last, explicitly listing everything cut per §2 of this document plus the Arctic-extension narrative from §7 — this doubles as both engineering honesty and the demo's closing slide content (§5 step 8).
Explicitly not creating (confirming Agent 2's trims, no additions needed beyond LIMITATIONS.md which Agent 2 already added): no SYSTEM_DESIGN.md, TECH_STACK.md, per-submodel model files, UI_UX.md/DESIGN_SYSTEM.md, TESTING.md, or SECURITY.md for the hackathon version — all correctly deferred to post-hackathon per Agent 2 §8.
10. FINAL PRODUCT SPECIFICATION (consolidated)
•	Product definition: "IceRoute India" — an Antarctic-first (Bharati–Maitri corridor), open-data-driven, vessel-aware navigation decision-support platform, extending the published NCPOR-affiliated Bharati–Maitri route-optimization methodology into operational software with iceberg-trajectory-uncertainty awareness and POLARIS-standard risk scoring. Decision support only — no autonomous control.
•	Feature priority:
•	MUST (MVP): SIC short-range forecast (LightGBM, IIEE-validated vs. persistence); iceberg drift projection with growing uncertainty ellipse; POLARIS-based composite risk scoring; A* routing with 3 preset profiles (safest/fastest/fuel-efficient) and hard vessel-safety constraints; 2–3 preset vessel profiles; map-based dashboard with disclaimers panel; backtest validation against the 33-ISEA case.
•	SHOULD (strong-demo tier): full multi-vessel comparison UI; historical climatology view; low-bandwidth mode polish.
•	FUTURE (explicit roadmap, not built): custom SAR/CV detector; live AIS; Arctic/NSR data configuration; convoy/icebreaker-escort mode; ConvLSTM/U-Net forecasting upgrade; formal security/observability stack; insurance/regulatory-compliance overlays.
•	Architecture: React/MapLibre frontend → FastAPI backend → in-process ML service (LightGBM SIC forecaster, kinematic iceberg drift, POLARIS risk scorer) → A* routing engine over a regular grid graph → PostGIS/Redis data layer ← scheduled ingestion (Copernicus Marine copernicusmarine package + Open-Meteo REST) → Docker Compose deployment.
•	Data stack: Copernicus Marine OSI-SAF (10 km SIC) + DMI-ASIP (1 km Antarctic SIC) + SAR iceberg product; Open-Meteo (wind/wave, no-key REST); historical ScatSat-1/NSIDC/ECMWF precedent for methodology validation.
•	ML stack: LightGBM/XGBoost + scikit-learn for SIC forecasting (persistence/climatology baselines mandatory); closed-form kinematic drift model (empirically calibrated where data allows) for iceberg trajectory; POLARIS lookup-table method (not a trained model) for risk scoring; physics-based formula (POLARIS-speed-limit-calibrated) for fuel/ETA. Deep learning explicitly deferred to roadmap.
•	Routing methodology: regular grid graph (~10–25 km cells) + A* search; multi-objective weighted cost function (time, fuel, ice risk, iceberg-proximity-with-uncertainty) collapsed into 3 user-facing presets; hard exclusion of cells below vessel-specific POLARIS safety threshold; replan-on-new-data (not continuous) re-routing.
•	Vessel model: Polar Class (IACS scale), draft, design speed, fuel curve, POLARIS-derived max safe speed per ice condition; multi-vessel comparison via re-running the router per candidate vessel; explicit rejection of open-ended "recommend optimal ship design" as undefensible.
•	Validation strategy: temporal (not random) train/test splits; IIEE + MAE/RMSE for SIC; position error + physical sanity checks for drift; hard-constraint-violation count and RIO-band distribution for route safety; qualitative ETA comparison against the published 33-ISEA case; empirical coverage check for uncertainty calibration; mandatory baseline comparisons (persistence/climatology for forecasting, naive-shortest-path for routing).
•	MVP scope: the full data→forecast→risk→route→vessel-decision→dashboard chain, real and connected end-to-end, on one region, with 2–3 vessel profiles and a small curated iceberg dataset — explicitly not a fully live, fully general, multi-region, multi-vessel-editor, Arctic-capable production system.
•	Roadmap: custom detection model, live AIS, Arctic/NSR configuration (contingent on India's 2027 NSR pilot outcome), deep-learning forecasting upgrade, convoy mode, formal security posture, institutional pilot deployment with NCPOR.
•	Risks: (1) live external API access failing at demo time — mitigated by cached fallback dataset; (2) sparse iceberg detection coverage in the chosen demo window — mitigated by verifying data availability in advance; (3) unvalidated NCPOR/end-user demand — mitigated by not over-building speculative features; (4) untested grid-size-vs-routing-performance trade-off — mitigated by an early Day 1 spike; (5) NSR/Arctic narrative overclaiming — mitigated by the sourced, current (Aug 2026) evidence in §7 showing NSR remains a narrow, seasonal, high-cost contingency route, not a guaranteed opportunity.
•	Assumptions: continued open access to Copernicus/Open-Meteo data; NCPOR or an equivalent body would plausibly value such a tool (flagged, unvalidated); team has general Python/web skills, not necessarily prior oceanographic ML experience.
•	Success metrics (for the SIH submission itself): (1) LightGBM SIC forecast beats persistence baseline on IIEE for the demo region/period; (2) risk-aware route measurably diverges from naive-shortest-path route around real/seeded hazards; (3) vessel-profile switch measurably changes recommended route/ETA/risk; (4) system output is directionally consistent with the published 33-ISEA case in at least one backtest; (5) full demo chain runs reliably from a cached dataset with no live-internet dependency at judging time.
FINAL BUILD BLUEPRINT
Product: IceRoute India — Antarctic-first (Bharati–Maitri corridor) AI-assisted navigation decision-support platform for NCPOR-style Antarctic voyage planning. Decision support only; human navigator retains final authority at all times.
Core proven chain (the thing that must work, end-to-end, for the PS to be satisfied):
Copernicus (OSI-SAF + DMI-ASIP SIC, SAR iceberg product) + Open-Meteo (wind/wave) → cleaned/regridded common grid → LightGBM SIC forecast (beats persistence, IIEE-measured) + kinematic iceberg drift (with growing uncertainty ellipse) → POLARIS-based composite risk score per grid cell → A* routing over the grid graph with hard vessel-safety constraints, producing 3 ranked route profiles (safest/fastest/fuel-efficient) → vessel-profile-aware ETA/fuel/risk output for 2–3 preset vessels → map-based dashboard (MapLibre) surfacing all of the above plus explicit uncertainty/limitations disclosures.
Stack: React + TypeScript + MapLibre GL JS (frontend) · Python + FastAPI (backend) · LightGBM/scikit-learn (ML) · xarray/rioxarray/GDAL/GeoPandas (geospatial) · PostgreSQL + PostGIS + Redis (data/cache) · copernicusmarine + Open-Meteo REST (data access) · networkx or custom A* (routing) · Docker Compose (deployment). No proprietary data, no heavyweight model-serving infra, no deep learning at MVP — all choices selected for a student team to realistically build and defend within a hackathon timeframe.
Build order (13 stages, Stage 0–12 per §1): scope lock → data acquisition (Day 1, highest external-dependency risk, cache immediately) → data pipeline → SIC baseline+LightGBM (with mandatory persistence/climatology comparison) → iceberg drift model → POLARIS risk engine → A* routing engine (spike on mocked grid in parallel with Day 1) → vessel intelligence (2–3 hardcoded profiles) → backend API (thin wrapper over already-tested modules) → dashboard UI (default MapLibre styling, function over polish) → Docker Compose integration → validation (33-ISEA backtest + adverse/iceberg/vessel scenario checklist) → rehearsed demo from a cached, internet-independent dataset.
Non-negotiable exclusions: no autonomous ship control; no fabricated real-time claims beyond actual satellite-pass/daily data cadence; no custom SAR detector as a load-bearing MVP component; no open-ended "recommend the ideal vessel" feature; no framing of the Northern Sea Route as a near-term replacement for existing Indian trade corridors (the current, sourced 2026 evidence shows NSR remains a narrow, permit-gated, ~7-week seasonal, insurance-punitive contingency route, not a mainstream alternative).
Strongest differentiators to lead the pitch with, in order: (1) validation against India's own real, citable Antarctic voyage record (the 33-ISEA precedent) — the hardest-to-dismiss claim available; (2) uncertainty-aware routing around iceberg drift projections; (3) vessel-aware routing with POLARIS-grounded hard safety constraints; (4) transparent fuel/safety/speed trade-off via 3 route profiles built on one consistent, explainable cost function.
What "done" looks like for SIH judging: a judge can watch the system ingest real (or realistically cached) satellite/weather data, watch a forecast beat a stated baseline with a real number, watch a risk-aware route visibly avoid a hazard that a naive shortest-path route would not, watch that route change when the vessel profile changes, and see the team's own explicit, written acknowledgment of what is simplified and why — that combination (real chain + real numbers + real honesty) is what separates this from "just another map."
