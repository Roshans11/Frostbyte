import Map, {
  Source,
  Layer,
  Marker,
  NavigationControl,
} from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';

import { routes, icebergTrajectory } from '../../data/mockData';
import { useRoute } from '../../state/RouteContext';

import {
  Anchor,
  Navigation,
  Crosshair,
  Ship,
  Snowflake,
  Route as RouteIcon,
} from 'lucide-react';

/* ============================================================
   IMPORTANT LOCATIONS
============================================================ */

const LOCATIONS = [
  {
    name: 'Cape Town',
    short: 'CPT',
    lng: 18.4232,
    lat: -33.9249,
    type: 'origin',
  },

  {
    name: 'Bharati',
    short: 'BHA',
    lng: 76.3268,
    lat: -69.4068,
    type: 'station',
  },

  {
    name: 'Maitri',
    short: 'MAI',
    lng: 11.7397,
    lat: -70.7667,
    type: 'destination',
  },
];

/* ============================================================
   MAP VIEW
============================================================ */

export default function MapView() {

  /*
   * Route and map state are shared through RouteContext.
   *
   * DashboardLayout and MapView therefore always show
   * the same selected route.
   */

  const {
    selectedRoute,
    setSelectedRoute,
    showTrajectory,
    setShowTrajectory,
  } = useRoute();

  /* ==========================================================
     ACTIVE ROUTE
  ========================================================== */

  const activeRoute =
    routes.find(
      (route) => route.id === selectedRoute
    ) ?? routes[0];

  /*
   * Safety check in case backend/mock data temporarily
   * contains an empty route.
   */

  const activeCoordinates =
    activeRoute?.geoJsonCoords ?? [];

  /*
   * Current iceberg position = last point in trajectory.
   */

  const icebergCoordinates =
    icebergTrajectory?.geoJsonCoords ?? [];

  const icebergPosition =
    icebergCoordinates.length > 0
      ? icebergCoordinates[
          icebergCoordinates.length - 1
        ]
      : [40, -65];

  return (
    <div className="absolute inset-0 z-10 bg-[#06111a]">

      {/* =====================================================
          MAP
      ===================================================== */}

      <Map
        initialViewState={{
          longitude: 40,
          latitude: -60,
          zoom: 3,
        }}

        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"

        attributionControl={false}

        reuseMaps
      >

        {/* ===================================================
            MAP CONTROLS
        =================================================== */}

        <NavigationControl
          position="bottom-right"
          showCompass
          showZoom
        />

        {/* ===================================================
            ROUTES
        =================================================== */}

        {routes.map((route) => {

          const isSelected =
            route.id === selectedRoute;

          const sourceId =
            `route-source-${route.id}`;

          return (
            <Source
              key={route.id}
              id={sourceId}
              type="geojson"
              data={{
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: route.geoJsonCoords,
                },
                properties: {
                  routeId: route.id,
                  routeName: route.name,
                },
              }}
            >

              {/* =================================================
                  ROUTE GLOW
              ================================================= */}

              <Layer
                id={`route-glow-${route.id}`}
                type="line"
                source={sourceId}
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': route.color,

                  /*
                   * Selected route gets strong glow.
                   * Other routes remain very subtle.
                   */

                  'line-width': isSelected
                    ? 14
                    : 7,

                  'line-opacity': isSelected
                    ? 0.13
                    : 0.025,

                  'line-blur': 5,
                }}
              />

              {/* =================================================
                  DARK CASING
              ================================================= */}

              <Layer
                id={`route-casing-${route.id}`}
                type="line"
                source={sourceId}
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': '#02080d',

                  'line-width': isSelected
                    ? 7
                    : 4,

                  'line-opacity': isSelected
                    ? 0.9
                    : 0.35,
                }}
              />

              {/* =================================================
                  MAIN ROUTE
              ================================================= */}

              <Layer
                id={`route-main-${route.id}`}
                type="line"
                source={sourceId}
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': route.color,

                  'line-width': isSelected
                    ? 4
                    : 2,

                  'line-opacity': isSelected
                    ? 1
                    : 0.25,

                  /*
                   * Selected route = solid.
                   * Non-selected = dashed.
                   */

                  'line-dasharray': isSelected
                    ? [1, 0]
                    : [3, 3],
                }}
              />

            </Source>
          );
        })}

        {/* =====================================================
            SELECTED ROUTE WAYPOINTS
        ===================================================== */}

        {routes.map((route) => {

          if (route.id !== selectedRoute) {
            return null;
          }

          /*
           * Don't create markers for the first and last
           * points because those are already represented
           * by vessel/destination markers.
           */

          const waypoints =
            route.geoJsonCoords.slice(1, -1);

          return waypoints.map(
            ([longitude, latitude], index) => (

              <Marker
                key={`${route.id}-waypoint-${index}`}
                longitude={longitude}
                latitude={latitude}
                anchor="center"
              >

                <div
                  className="w-2 h-2 rounded-full border border-white/40"
                  style={{
                    background: route.color,
                    boxShadow:
                      `0 0 8px ${route.color}`,
                  }}
                />

              </Marker>

            )
          );
        })}

        {/* =====================================================
            ICEBERG TRAJECTORY
        ===================================================== */}

        {showTrajectory &&
          icebergCoordinates.length > 1 && (

          <Source
            id="iceberg-trajectory-source"
            type="geojson"
            data={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: icebergCoordinates,
              },
              properties: {
                type: 'iceberg-trajectory',
              },
            }}
          >

            {/* Trajectory glow */}

            <Layer
              id="iceberg-trajectory-glow"
              type="line"
              source="iceberg-trajectory-source"
              layout={{
                'line-join': 'round',
                'line-cap': 'round',
              }}
              paint={{
                'line-color': '#55d6ff',
                'line-width': 9,
                'line-opacity': 0.08,
                'line-blur': 5,
              }}
            />

            {/* Trajectory casing */}

            <Layer
              id="iceberg-trajectory-casing"
              type="line"
              source="iceberg-trajectory-source"
              layout={{
                'line-join': 'round',
                'line-cap': 'round',
              }}
              paint={{
                'line-color': '#031019',
                'line-width': 4,
                'line-opacity': 0.75,
                'line-dasharray': [2, 2],
              }}
            />

            {/* Main trajectory */}

            <Layer
              id="iceberg-trajectory-line"
              type="line"
              source="iceberg-trajectory-source"
              layout={{
                'line-join': 'round',
                'line-cap': 'round',
              }}
              paint={{
                'line-color': '#55d6ff',
                'line-width': 2,
                'line-opacity': 0.9,
                'line-dasharray': [2, 2],
              }}
            />

          </Source>
        )}

        {/* =====================================================
            ICEBERG TRAJECTORY WAYPOINTS
        ===================================================== */}

        {showTrajectory &&
          icebergCoordinates
            .slice(0, -1)
            .map(
              ([longitude, latitude], index) => (

                <Marker
                  key={`iceberg-point-${index}`}
                  longitude={longitude}
                  latitude={latitude}
                  anchor="center"
                >

                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-300/70 shadow-[0_0_7px_rgba(85,214,255,0.7)]" />

                </Marker>

              )
            )}

        {/* =====================================================
            IMPORTANT LOCATIONS
        ===================================================== */}

        {LOCATIONS.map((location) => (

          <Marker
            key={location.short}
            longitude={location.lng}
            latitude={location.lat}
            anchor="bottom"
          >

            <div className="flex flex-col items-center group">

              {/* Location label */}

              <div className="mb-1 px-2 py-1 rounded-md bg-[#07151f]/95 border border-cyan-300/15 backdrop-blur-md shadow-lg whitespace-nowrap">

                <div className="text-[8px] text-slate-500 uppercase tracking-wider">

                  {location.type === 'station'
                    ? 'RESEARCH STATION'
                    : location.type === 'origin'
                      ? 'ORIGIN'
                      : 'DESTINATION'}

                </div>

                <div className="text-[10px] font-semibold text-slate-200">
                  {location.name}
                </div>

              </div>

              {/* Location marker */}

              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full border ${
                  location.type === 'origin'
                    ? 'bg-emerald-400/10 border-emerald-400/40'
                    : location.type === 'destination'
                      ? 'bg-cyan-400/10 border-cyan-400/40'
                      : 'bg-blue-400/10 border-blue-400/40'
                }`}
              >

                <div
                  className={`absolute inset-0 rounded-full animate-ping opacity-10 ${
                    location.type === 'origin'
                      ? 'bg-emerald-400'
                      : 'bg-cyan-400'
                  }`}
                />

                {location.type === 'origin' ? (

                  <Anchor className="w-3.5 h-3.5 text-emerald-300" />

                ) : location.type === 'destination' ? (

                  <Navigation className="w-3.5 h-3.5 text-cyan-300" />

                ) : (

                  <Crosshair className="w-3.5 h-3.5 text-blue-300" />

                )}

              </div>

            </div>

          </Marker>

        ))}

        {/* =====================================================
            VESSEL
        ===================================================== */}

        {activeCoordinates.length > 0 && (

          <Marker
            longitude={activeCoordinates[0][0]}
            latitude={activeCoordinates[0][1]}
            anchor="center"
          >

            <div className="relative">

              {/* Radar pulse */}

              <div className="absolute -inset-5 rounded-full border border-cyan-400/20 animate-ping" />

              <div className="absolute -inset-2 rounded-full border border-cyan-400/10" />

              {/* Vessel marker */}

              <div className="relative w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-300/40 flex items-center justify-center shadow-[0_0_25px_rgba(85,214,255,0.25)]">

                <Ship className="w-5 h-5 text-cyan-300" />

              </div>

              {/* Vessel label */}

              <div className="absolute left-12 top-1 whitespace-nowrap">

                <div className="px-2 py-1 rounded-md bg-[#07151f]/95 border border-cyan-300/15 backdrop-blur-md">

                  <div className="text-[8px] text-cyan-400 font-bold tracking-wider">
                    RV PC6
                  </div>

                  <div className="text-[7px] text-slate-500">
                    ACTIVE VESSEL
                  </div>

                </div>

              </div>

            </div>

          </Marker>

        )}

        {/* =====================================================
            ICEBERG
        ===================================================== */}

        <Marker
          longitude={icebergPosition[0]}
          latitude={icebergPosition[1]}
          anchor="center"
        >

          <div className="relative">

            {/* Outer radar */}

            <div className="absolute -inset-6 rounded-full border border-cyan-400/15 animate-ping" />

            {/* Inner radar */}

            <div className="absolute -inset-3 rounded-full border border-cyan-400/15" />

            {/* Iceberg marker */}

            <button
              type="button"
              className="relative w-9 h-9 rounded-full bg-cyan-400/10 border border-cyan-300/50 flex items-center justify-center shadow-[0_0_25px_rgba(85,214,255,0.3)] hover:bg-cyan-400/20 transition"
              aria-label="Iceberg A102"
            >

              <Snowflake className="w-5 h-5 text-cyan-300" />

            </button>

            {/* Iceberg label */}

            <div className="absolute left-11 top-0 whitespace-nowrap">

              <div className="px-2 py-1 rounded-md bg-[#07151f]/95 border border-cyan-300/15 backdrop-blur-md">

                <div className="text-[8px] text-cyan-300 font-bold">
                  ICEBERG A102
                </div>

                <div className="text-[7px] text-slate-500">
                  PREDICTED POSITION
                </div>

              </div>

            </div>

          </div>

        </Marker>

      </Map>

      {/* =====================================================
          MAP HUD
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none">

        {/* ===================================================
            TOP LEFT
        =================================================== */}

        <div className="absolute top-4 left-4">

          <div className="ice-panel rounded-lg px-3 py-2">

            <div className="flex items-center gap-2">

              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(85,214,255,0.8)]" />

              <span className="text-[8px] text-slate-500 uppercase tracking-[0.15em]">
                LIVE NAVIGATION VIEW
              </span>

            </div>

            <div className="text-[10px] text-slate-300 mt-1 font-mono">
              SOUTHERN OCEAN / ANTARCTIC SECTOR
            </div>

          </div>

        </div>

        {/* ===================================================
            TOP RIGHT — ROUTE SELECTOR
        =================================================== */}

        <div className="absolute top-4 right-4 pointer-events-auto">

          <div className="ice-panel rounded-lg p-1 flex gap-1">

            <div className="flex items-center px-2">

              <RouteIcon className="w-3 h-3 text-slate-600" />

            </div>

            {routes.map((route) => (

              <button
                key={route.id}
                type="button"
                onClick={() =>
                  setSelectedRoute(route.id)
                }
                className={`px-3 py-1.5 rounded-md text-[8px] font-bold uppercase tracking-wider transition ${
                  selectedRoute === route.id
                    ? 'bg-white/10 text-slate-100'
                    : 'text-slate-600 hover:text-slate-300'
                }`}
              >

                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
                  style={{
                    background: route.color,
                    boxShadow:
                      selectedRoute === route.id
                        ? `0 0 6px ${route.color}`
                        : 'none',
                  }}
                />

                {route.name.replace(
                  ' Route',
                  ''
                )}

              </button>

            ))}

          </div>

        </div>

        {/* ===================================================
            ACTIVE ROUTE INFO
        =================================================== */}

        <div className="absolute top-20 left-4">

          <div className="ice-panel rounded-lg px-3 py-2">

            <div className="text-[7px] text-slate-600 uppercase tracking-wider">
              Active Route
            </div>

            <div className="flex items-center gap-2 mt-1">

              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: activeRoute.color,
                  boxShadow:
                    `0 0 8px ${activeRoute.color}`,
                }}
              />

              <span className="text-[10px] font-bold text-slate-200">
                {activeRoute.name}
              </span>

            </div>

          </div>

        </div>

        {/* ===================================================
            BOTTOM LEFT — COORDINATES
        =================================================== */}

        <div className="absolute bottom-4 left-4">

          <div className="ice-panel rounded-lg px-3 py-2">

            <div className="text-[7px] text-slate-600 uppercase tracking-wider">
              Map Center
            </div>

            <div className="text-[9px] text-slate-400 font-mono mt-0.5">
              60.000° S&nbsp;&nbsp;40.000° E
            </div>

          </div>

        </div>

        {/* ===================================================
            BOTTOM RIGHT — TRAJECTORY TOGGLE
        =================================================== */}

        <div className="absolute bottom-4 right-4 pointer-events-auto">

          <button
            type="button"
            onClick={() =>
              setShowTrajectory(!showTrajectory)
            }
            className={`ice-panel rounded-lg px-3 py-2 flex items-center gap-2 text-[8px] font-bold uppercase tracking-wider transition ${
              showTrajectory
                ? 'text-cyan-300'
                : 'text-slate-600'
            }`}
          >

            <span
              className={`w-1.5 h-1.5 rounded-full ${
                showTrajectory
                  ? 'bg-cyan-400 shadow-[0_0_8px_rgba(85,214,255,0.7)]'
                  : 'bg-slate-600'
              }`}
            />

            Iceberg Trajectory

          </button>

        </div>

      </div>

    </div>
  );
}