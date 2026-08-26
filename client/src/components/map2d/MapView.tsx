import React from 'react';

import Map, {
  Source,
  Layer,
  Marker,
  NavigationControl,
} from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';

import {
  routes,
  icebergTrajectory,
} from '../../data/mockData';

import { useRoute } from '../../state/RouteContext';

import {
  MapPin,
  Navigation,
  Snowflake,
} from 'lucide-react';


/* ============================================================
   LOCATIONS
============================================================ */

const LOCATIONS = [
  {
    id: 'cape-town',
    name: 'Cape Town',
    lng: 18.4232,
    lat: -33.9249,
    type: 'origin',
  },

  {
    id: 'bharati',
    name: 'Bharati',
    lng: 76.3268,
    lat: -69.4068,
    type: 'station',
  },

  {
    id: 'maitri',
    name: 'Maitri',
    lng: 11.7397,
    lat: -70.7667,
    type: 'station',
  },
];


/* ============================================================
   DARK MATTER RASTER BASEMAP
============================================================ */

const MAP_STYLE = {
  version: 8 as const,

  sources: {
    'dark-matter': {
      type: 'raster' as const,

      tiles: [
        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        'https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
      ],

      tileSize: 256,

      attribution:
        '&copy; OpenStreetMap contributors &copy; CARTO',
    },
  },

  layers: [
    {
      id: 'dark-matter-layer',

      type: 'raster' as const,

      source: 'dark-matter',

      paint: {
        'raster-opacity': 1,
      },
    },
  ],
};


/* ============================================================
   MAP VIEW
============================================================ */

export default function MapView() {

  /* ==========================================================
     SHARED STATE
  ========================================================== */

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
      (route) =>
        route.id === selectedRoute
    ) ?? routes[0];


  /* ==========================================================
     MAP
  ========================================================== */

  return (

    <div
      className="
        absolute
        inset-0
        z-10
        overflow-hidden
        bg-[#06111a]
      "
    >

      <Map

        initialViewState={{
          longitude: 40,
          latitude: -60,
          zoom: 2.8,
        }}

        mapStyle={MAP_STYLE}

        attributionControl={true}

        reuseMaps={true}

      >

        {/* ====================================================
            NAVIGATION CONTROL
        ==================================================== */}

        <NavigationControl
          position="bottom-right"
          showCompass={true}
          showZoom={true}
          visualizePitch={true}
        />


        {/* ====================================================
            ROUTES
        ==================================================== */}

        {routes.map((route) => {

          const isSelected =
            route.id === selectedRoute;


          const routeGeoJSON = {

            type: 'Feature' as const,

            geometry: {

              type: 'LineString' as const,

              coordinates:
                route.geoJsonCoords,

            },

            properties: {

              id: route.id,

              name: route.name,

            },

          };


          return (

            <Source

              key={route.id}

              id={`route-source-${route.id}`}

              type="geojson"

              data={routeGeoJSON}

            >

              {/* ==============================================
                  SELECTED ROUTE GLOW
              ============================================== */}

              {isSelected && (

                <Layer

                  id={`route-glow-${route.id}`}

                  type="line"

                  source={`route-source-${route.id}`}

                  layout={{

                    'line-join':
                      'round',

                    'line-cap':
                      'round',

                  }}

                  paint={{

                    'line-color':
                      route.color,

                    'line-width':
                      14,

                    'line-opacity':
                      0.12,

                    'line-blur':
                      4,

                  }}

                />

              )}


              {/* ==============================================
                  ROUTE CASING
              ============================================== */}

              <Layer

                id={`route-casing-${route.id}`}

                type="line"

                source={`route-source-${route.id}`}

                layout={{

                  'line-join':
                    'round',

                  'line-cap':
                    'round',

                }}

                paint={{

                  'line-color':
                    '#02080d',

                  'line-width':
                    isSelected
                      ? 8
                      : 5,

                  'line-opacity':
                    isSelected
                      ? 0.95
                      : 0.5,

                }}

              />


              {/* ==============================================
                  MAIN ROUTE
              ============================================== */}

              <Layer

                id={`route-main-${route.id}`}

                type="line"

                source={`route-source-${route.id}`}

                layout={{

                  'line-join':
                    'round',

                  'line-cap':
                    'round',

                }}

                paint={{

                  'line-color':
                    route.color,

                  'line-width':
                    isSelected
                      ? 4
                      : 2,

                  'line-opacity':
                    isSelected
                      ? 1
                      : 0.25,

                }}

              />

            </Source>

          );

        })}


        {/* ====================================================
            ROUTE WAYPOINTS
        ==================================================== */}

        {activeRoute &&
          activeRoute.geoJsonCoords
            .slice(1, -1)
            .map(
              (
                [
                  longitude,
                  latitude,
                ],
                index
              ) => (

                <Marker

                  key={
                    `waypoint-${index}`
                  }

                  longitude={
                    longitude
                  }

                  latitude={
                    latitude
                  }

                  anchor="center"

                >

                  <div
                    className="
                      w-2
                      h-2
                      rounded-full
                      bg-cyan-400
                      border
                      border-white
                      shadow-[0_0_10px_rgba(85,214,255,0.9)]
                    "
                  />

                </Marker>

              )
            )}


        {/* ====================================================
            CAPE TOWN
        ==================================================== */}

        <Marker

          longitude={
            LOCATIONS[0].lng
          }

          latitude={
            LOCATIONS[0].lat
          }

          anchor="bottom"

        >

          <div
            className="
              flex
              flex-col
              items-center
              pointer-events-none
            "
          >

            <div
              className="
                px-3
                py-1
                mb-1
                rounded
                border
                border-cyan-400/20
                bg-[#06111a]/90
                backdrop-blur-md
                text-[10px]
                font-semibold
                tracking-wide
                text-slate-200
                whitespace-nowrap
              "
            >
              CAPE TOWN
            </div>

            <div
              className="
                flex
                items-center
                justify-center
                w-8
                h-8
                rounded-full
                border
                border-cyan-400/50
                bg-cyan-500/10
                shadow-[0_0_20px_rgba(85,214,255,0.25)]
              "
            >

              <MapPin
                className="
                  w-4
                  h-4
                  text-cyan-400
                "
              />

            </div>

          </div>

        </Marker>


        {/* ====================================================
            BHARATI
        ==================================================== */}

        <Marker

          longitude={
            LOCATIONS[1].lng
          }

          latitude={
            LOCATIONS[1].lat
          }

          anchor="bottom"

        >

          <div
            className="
              flex
              flex-col
              items-center
              pointer-events-none
            "
          >

            <div
              className="
                px-3
                py-1
                mb-1
                rounded
                border
                border-blue-400/20
                bg-[#06111a]/90
                backdrop-blur-md
                text-[10px]
                font-semibold
                tracking-wide
                text-blue-200
                whitespace-nowrap
              "
            >
              BHARATI
            </div>

            <div
              className="
                w-3
                h-3
                rounded-full
                bg-blue-400
                border
                border-white
                shadow-[0_0_15px_rgba(96,165,250,0.8)]
              "
            />

          </div>

        </Marker>


        {/* ====================================================
            MAITRI
        ==================================================== */}

        <Marker

          longitude={
            LOCATIONS[2].lng
          }

          latitude={
            LOCATIONS[2].lat
          }

          anchor="bottom"

        >

          <div
            className="
              flex
              flex-col
              items-center
              pointer-events-none
            "
          >

            <div
              className="
                px-3
                py-1
                mb-1
                rounded
                border
                border-cyan-400/20
                bg-[#06111a]/90
                backdrop-blur-md
                text-[10px]
                font-semibold
                tracking-wide
                text-cyan-200
                whitespace-nowrap
              "
            >
              MAITRI
            </div>

            <div
              className="
                w-3
                h-3
                rounded-full
                bg-cyan-400
                border
                border-white
                shadow-[0_0_15px_rgba(85,214,255,0.8)]
              "
            />

          </div>

        </Marker>


        {/* ====================================================
            ICEBERG TRAJECTORY
        ==================================================== */}

        {showTrajectory &&
          icebergTrajectory &&
          icebergTrajectory.geoJsonCoords.length > 1 && (

          <Source

            id="iceberg-trajectory-source"

            type="geojson"

            data={{

              type: 'Feature',

              geometry: {

                type: 'LineString',

                coordinates:
                  icebergTrajectory.geoJsonCoords,

              },

              properties: {},

            }}

          >

            {/* ==================================================
                TRAJECTORY GLOW
            ================================================== */}

            <Layer

              id="iceberg-trajectory-glow"

              type="line"

              source="iceberg-trajectory-source"

              layout={{

                'line-join':
                  'round',

                'line-cap':
                  'round',

              }}

              paint={{

                'line-color':
                  icebergTrajectory.color,

                'line-width':
                  10,

                'line-opacity':
                  0.12,

                'line-blur':
                  4,

              }}

            />


            {/* ==================================================
                DASHED TRAJECTORY
            ================================================== */}

            <Layer

              id="iceberg-trajectory"

              type="line"

              source="iceberg-trajectory-source"

              layout={{

                'line-join':
                  'round',

                'line-cap':
                  'round',

              }}

              paint={{

                'line-color':
                  icebergTrajectory.color,

                'line-width':
                  3,

                'line-opacity':
                  0.95,

                'line-dasharray': [
                  2,
                  2,
                ],

              }}

            />

          </Source>

        )}


        {/* ====================================================
            CURRENT ICEBERG
        ==================================================== */}

        {icebergTrajectory &&
          icebergTrajectory.geoJsonCoords.length > 0 &&
          (() => {

            const last =
              icebergTrajectory
                .geoJsonCoords[
                  icebergTrajectory
                    .geoJsonCoords.length - 1
                ];


            return (

              <Marker

                longitude={
                  last[0]
                }

                latitude={
                  last[1]
                }

                anchor="center"

              >

                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-center
                  "
                >

                  {/* Radar ring */}

                  <div
                    className="
                      absolute
                      w-12
                      h-12
                      rounded-full
                      border
                      border-cyan-400/30
                      animate-ping
                    "
                  />


                  {/* Iceberg marker */}

                  <div
                    className="
                      relative
                      flex
                      items-center
                      justify-center
                      w-7
                      h-7
                      rounded-full
                      bg-cyan-400/15
                      border
                      border-cyan-300
                      shadow-[0_0_25px_rgba(6,182,212,0.7)]
                    "
                  >

                    <Snowflake
                      className="
                        w-4
                        h-4
                        text-cyan-300
                      "
                    />

                  </div>


                  {/* Label */}

                  <div
                    className="
                      absolute
                      left-9
                      top-1/2
                      -translate-y-1/2
                      whitespace-nowrap
                      px-2
                      py-1
                      rounded
                      border
                      border-cyan-400/20
                      bg-[#06111a]/90
                      backdrop-blur-md
                      text-[9px]
                      font-bold
                      tracking-wide
                      text-cyan-300
                    "
                  >
                    ICEBERG A102
                  </div>

                </div>

              </Marker>

            );

          })()}


        {/* ====================================================
            ACTIVE VESSEL
        ==================================================== */}

        {activeRoute &&
          activeRoute.geoJsonCoords.length > 0 &&
          (() => {

            const start =
              activeRoute.geoJsonCoords[0];


            return (

              <Marker

                longitude={
                  start[0]
                }

                latitude={
                  start[1]
                }

                anchor="center"

              >

                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-center
                  "
                >

                  {/* Vessel radar ring */}

                  <div
                    className="
                      absolute
                      w-12
                      h-12
                      rounded-full
                      border
                      border-cyan-400/20
                    "
                  />


                  {/* Vessel */}

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      w-9
                      h-9
                      rounded-full
                      bg-cyan-500/10
                      border
                      border-cyan-400/70
                      shadow-[0_0_25px_rgba(85,214,255,0.4)]
                    "
                  >

                    <Navigation
                      className="
                        w-4
                        h-4
                        text-cyan-300
                      "
                    />

                  </div>


                  {/* Vessel label */}

                  <div
                    className="
                      absolute
                      left-11
                      top-1/2
                      -translate-y-1/2
                      whitespace-nowrap
                      px-2
                      py-1
                      rounded
                      border
                      border-cyan-400/20
                      bg-[#06111a]/90
                      backdrop-blur-md
                      text-[9px]
                      font-bold
                      text-cyan-300
                    "
                  >
                    RV PC6
                  </div>

                </div>

              </Marker>

            );

          })()}

      </Map>


      {/* ======================================================
          MAP HUD GRID
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          hud-grid
          opacity-20
        "
      />


      {/* ======================================================
          MAP TOP LEFT STATUS
      ====================================================== */}

      <div
        className="
          absolute
          top-5
          left-5
          z-20
          ice-panel
          rounded-xl
          px-4
          py-3
          pointer-events-none
        "
      >

        <div
          className="
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-slate-500
          "
        >
          Active Mission
        </div>

        <div
          className="
            mt-1
            flex
            items-center
            gap-3
          "
        >

          <span
            className="
              text-sm
              font-semibold
              text-slate-200
            "
          >
            CAPE TOWN → MAITRI
          </span>

          <span
            className="
              text-[10px]
              font-bold
              text-emerald-400
            "
          >
            {activeRoute.name}
          </span>

        </div>

      </div>


      {/* ======================================================
          MAP COORDINATE HUD
      ====================================================== */}

      <div
        className="
          absolute
          bottom-5
          left-5
          z-20
          ice-panel
          rounded-lg
          px-3
          py-2
          pointer-events-none
        "
      >

        <span
          className="
            text-[9px]
            font-mono
            tracking-wide
            text-slate-400
          "
        >
          ANTARCTIC NAVIGATION GRID
        </span>

      </div>

    </div>
  );
}