<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
import React, { useMemo } from 'react';

=======
>>>>>>> ice
>>>>>>> main
=======
import React, { useMemo } from 'react';

>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
import Map, {
  Source,
  Layer,
  Marker,
  NavigationControl,
} from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
import {
  missionRoutes,
  locations,
  routeMetadata,
  icebergs,
  icebergTrajectory,
  type RouteType,
} from '../../data/mockData';

import { useRoute } from '../../state/RouteContext';

import {
  MapPin,
  Navigation,
  Snowflake,
} from 'lucide-react';


/* ============================================================
   MAP STYLE
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

<<<<<<< HEAD
=======
>>>>>>> main
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
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

/* ============================================================
   MAP VIEW
============================================================ */

export default function MapView() {

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
  const {
    selectedRoute,
    setSelectedRoute,

    showTrajectory,
    setShowTrajectory,

    mission,
  } = useRoute();


  /* ==========================================================
     ORIGIN
  ========================================================== */

  const origin = useMemo(() => {

    return locations.find(
      location =>
        location.id === mission.origin
    );

  }, [mission.origin]);


  /* ==========================================================
     DESTINATION
  ========================================================== */

  const destination = useMemo(() => {

    return locations.find(
      location =>
        location.id === mission.destination
    );

  }, [mission.destination]);


  /* ==========================================================
     SELECTED ROUTE TYPE
  ========================================================== */

  const selectedRouteType: RouteType =
    selectedRoute === 'fastest' ||
    selectedRoute === 'fuel' ||
    selectedRoute === 'safest'
      ? selectedRoute
      : 'safest';


  /* ==========================================================
     CURRENT MISSION ROUTES
  ========================================================== */

  const currentMissionRoutes = useMemo(() => {

    const originRoutes =
      missionRoutes[mission.origin];

    if (!originRoutes) {
      return [];
    }

    const destinationRoutes =
      originRoutes[mission.destination];

    if (!destinationRoutes) {
      return [];
    }

    const routeTypes: RouteType[] = [
      'safest',
      'fastest',
      'fuel',
    ];

    return routeTypes
      .map(routeType => {

        const coordinates =
          destinationRoutes[routeType];

        if (
          !coordinates ||
          coordinates.length < 2
        ) {
          return null;
        }

        return {
          id: routeType,

          name:
            routeMetadata[routeType].name,

          color:
            routeMetadata[routeType].color,

          risk:
            routeMetadata[routeType].risk,

          eta:
            routeMetadata[routeType].eta,

          fuel:
            routeMetadata[routeType].fuel,

          geoJsonCoords:
            coordinates,
        };
      })
      .filter(
        (
          route
        ): route is NonNullable<typeof route> =>
          route !== null
      );

  }, [
    mission.origin,
    mission.destination,
  ]);


<<<<<<< HEAD
=======
>>>>>>> main
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

<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
  /* ==========================================================
     ACTIVE ROUTE
  ========================================================== */

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
  const activeRoute = useMemo(() => {

    return (
      currentMissionRoutes.find(
        route =>
          route.id === selectedRouteType
      )
      ??
      currentMissionRoutes[0]
    );

  }, [
    currentMissionRoutes,
    selectedRouteType,
  ]);


  /* ==========================================================
     MAP CENTER
  ========================================================== */

  const mapCenter = useMemo(() => {

    if (origin && destination) {

      return {
        longitude:
          (
            origin.longitude +
            destination.longitude
          ) / 2,

        latitude:
          (
            origin.latitude +
            destination.latitude
          ) / 2,
      };

    }

    return {
      longitude: 55,
      latitude: -68,
    };

  }, [
    origin,
    destination,
  ]);


  /* ==========================================================
     MAP ZOOM
  ========================================================== */

  const mapZoom = useMemo(() => {

    if (origin && destination) {

      const distance =
        Math.abs(
          origin.longitude -
          destination.longitude
        );

      if (distance > 40) {
        return 2.4;
      }

      return 3;
    }

    return 2.5;

  }, [
    origin,
    destination,
  ]);


  /* ============================================================
     RENDER
  ============================================================ */

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
        key={`${mission.origin}-${mission.destination}`}

        initialViewState={{
          longitude:
            mapCenter.longitude,

          latitude:
            mapCenter.latitude,

          zoom:
            mapZoom,
        }}

        mapStyle={MAP_STYLE}

        attributionControl
<<<<<<< HEAD
=======
>>>>>>> main
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
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

        reuseMaps
      >

<<<<<<< HEAD
<<<<<<< HEAD
        {/* ===================================================
            MAP CONTROLS
        =================================================== */}
=======
<<<<<<< HEAD
        {/* ====================================================
            NAVIGATION
        ==================================================== */}
=======
        {/* ===================================================
            MAP CONTROLS
        =================================================== */}
>>>>>>> ice
>>>>>>> main
=======
        {/* ====================================================
            NAVIGATION
        ==================================================== */}
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

        <NavigationControl
          position="bottom-right"
          showCompass
          showZoom
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
          visualizePitch
        />


        {/* ====================================================
            ALL THREE ROUTES
        ==================================================== */}

        {currentMissionRoutes.map(route => {

          const isSelected =
            route.id === selectedRouteType;

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

              {/* ROUTE GLOW */}

              {isSelected && (

                <Layer
                  id={`route-glow-${route.id}`}
                  type="line"
                  source={`route-source-${route.id}`}

                  layout={{
                    'line-join': 'round',
                    'line-cap': 'round',
                  }}

                  paint={{
                    'line-color':
                      route.color,

                    'line-width': 16,

                    'line-opacity': 0.14,

                    'line-blur': 5,
                  }}
                />

              )}


              {/* ROUTE CASING */}
<<<<<<< HEAD
=======
>>>>>>> main
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
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

              <Layer
                id={`route-casing-${route.id}`}
                type="line"
<<<<<<< HEAD
<<<<<<< HEAD
                source={sourceId}
=======
<<<<<<< HEAD
                source={`route-source-${route.id}`}

=======
                source={sourceId}
>>>>>>> ice
>>>>>>> main
=======
                source={`route-source-${route.id}`}

>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

                paint={{
                  'line-color':
                    '#02080d',

                  'line-width':
                    isSelected ? 9 : 6,

                  'line-opacity':
                    isSelected
                      ? 0.95
                      : 0.55,
                }}
              />


              {/* MAIN ROUTE */}
<<<<<<< HEAD
=======
>>>>>>> main
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
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

              <Layer
                id={`route-main-${route.id}`}
                type="line"
<<<<<<< HEAD
<<<<<<< HEAD
                source={sourceId}
=======
<<<<<<< HEAD
                source={`route-source-${route.id}`}

=======
                source={sourceId}
>>>>>>> ice
>>>>>>> main
=======
                source={`route-source-${route.id}`}

>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

                paint={{
                  'line-color':
                    route.color,

                  'line-width':
                    isSelected ? 5 : 2.5,

                  'line-opacity':
                    isSelected
                      ? 1
                      : 0.38,
<<<<<<< HEAD
=======
>>>>>>> main
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
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
                }}
              />

            </Source>
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

          );

        })}


        {/* ====================================================
            ACTIVE ROUTE WAYPOINTS
        ==================================================== */}

        {activeRoute &&
          activeRoute.geoJsonCoords
            .slice(1, -1)
            .map(
              (
                [longitude, latitude],
                index
              ) => (

                <Marker
                  key={
                    `waypoint-${activeRoute.id}-${index}`
                  }

                  longitude={longitude}

                  latitude={latitude}

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
<<<<<<< HEAD
=======
>>>>>>> main
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
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

                </Marker>

              )
            )}

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

        {/* ====================================================
            ORIGIN
        ==================================================== */}

        {origin && (

          <Marker
            longitude={origin.longitude}
            latitude={origin.latitude}
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
                  border-emerald-400/30
                  bg-[#06111a]/95
                  backdrop-blur-md
                  text-[10px]
                  font-semibold
                  tracking-wide
                  text-emerald-300
                  whitespace-nowrap
                "
              >

                ORIGIN • {
                  origin.shortName.toUpperCase()
                }

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
                  border-emerald-400/60
                  bg-emerald-500/10
                  shadow-[0_0_20px_rgba(74,222,128,0.3)]
                "
              >

                <MapPin
                  className="
                    w-4
                    h-4
                    text-emerald-400
                  "
                />

<<<<<<< HEAD
=======
>>>>>>> main
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

<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
              </div>

            </div>

          </Marker>

        )}

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

        {/* ====================================================
            DESTINATION
        ==================================================== */}

        {destination && (

          <Marker
            longitude={destination.longitude}
            latitude={destination.latitude}
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
                  border-cyan-400/30
                  bg-[#06111a]/95
                  backdrop-blur-md
                  text-[10px]
                  font-semibold
                  tracking-wide
                  text-cyan-200
                  whitespace-nowrap
                "
              >

                DESTINATION • {
                  destination.shortName.toUpperCase()
                }

              </div>

              <div
                className="
                  w-4
                  h-4
                  rounded-full
                  bg-cyan-400
                  border
                  border-white
                  shadow-[0_0_20px_rgba(85,214,255,0.9)]
                "
              />

            </div>

          </Marker>

        )}


        {/* ====================================================
            USNIC ICEBERGS
        ==================================================== */}

        {icebergs.map(iceberg => {

          const [
            longitude,
            latitude,
          ] = iceberg.geoJsonCoords[0];

          const markerSize =
            Math.max(
              14,
              Math.min(
                34,
                12 +
                  Math.sqrt(
                    iceberg.areaSqNm
                  ) *
                  0.55
              )
            );

          return (

            <Marker
              key={
                `usnic-iceberg-${iceberg.id}`
              }

              longitude={longitude}
              latitude={latitude}
              anchor="center"
            >

              <div
                className="
                  group
                  relative
                  flex
                  items-center
                  justify-center
                "
              >

                <div
                  className="
                    absolute
                    rounded-full
                    bg-cyan-400/20
                    blur-md
                  "
                  style={{
                    width:
                      markerSize * 2.2,

                    height:
                      markerSize * 2.2,
                  }}
                />

                <div
                  className="
                    absolute
                    rounded-full
                    border
                    border-cyan-400/30
                  "
                  style={{
                    width:
                      markerSize * 1.8,

                    height:
                      markerSize * 1.8,
                  }}
                />

                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-cyan-200
                    bg-cyan-400/20
                    shadow-[0_0_20px_rgba(6,182,212,0.75)]
                  "
                  style={{
                    width:
                      markerSize,

                    height:
                      markerSize,
                  }}
                >

                  <Snowflake
                    className="
                      text-cyan-200
                    "
                    size={
                      Math.max(
                        9,
                        markerSize * 0.55
                      )
                    }
                  />

                </div>


                {/* TOOLTIP */}

                <div
                  className="
                    absolute
                    bottom-full
                    left-1/2
                    mb-2
                    hidden
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded-md
                    border
                    border-cyan-400/20
                    bg-[#06111a]/95
                    px-3
                    py-2
                    shadow-xl
                    backdrop-blur-md
                    group-hover:block
                    z-50
                  "
                >

                  <div
                    className="
                      text-[10px]
                      font-bold
                      tracking-wider
                      text-cyan-200
                    "
                  >

                    ICEBERG {iceberg.name}

                  </div>

                  <div
                    className="
                      mt-1
                      text-[8px]
                      font-mono
                      text-slate-400
                    "
                  >

                    {latitude.toFixed(3)}° S
                    {' • '}
                    {longitude.toFixed(3)}° E

                  </div>

                  <div
                    className="
                      mt-1
                      text-[8px]
                      text-slate-400
                    "
                  >

                    SIZE:{' '}
                    {iceberg.sizeNm
                      ? `${iceberg.sizeNm[0]} × ${iceberg.sizeNm[1]} NM`
                      : 'N/A'}

                  </div>

                  <div
                    className="
                      text-[8px]
                      text-slate-400
                    "
                  >

                    AREA:{' '}
                    {iceberg.areaSqNm} NM²

                  </div>

                  <div
                    className="
                      mt-1
                      text-[8px]
                      text-cyan-400
                    "
                  >

                    SOURCE: {iceberg.source}

                  </div>

                  <div
                    className="
                      text-[8px]
                      text-slate-500
                    "
                  >

                    OBSERVED:
                    {' '}
                    {iceberg.observationDate}

                  </div>

                </div>

              </div>

            </Marker>

          );

        })}


        {/* ====================================================
            ICEBERG TRAJECTORY
        ==================================================== */}

        {showTrajectory &&
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

              <Layer
                id="iceberg-trajectory-glow"
                type="line"
                source="iceberg-trajectory-source"

                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}

                paint={{
                  'line-color':
                    icebergTrajectory.color,

                  'line-width': 10,

                  'line-opacity': 0.12,

                  'line-blur': 4,
                }}
              />

              <Layer
                id="iceberg-trajectory"
                type="line"
                source="iceberg-trajectory-source"

                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}

                paint={{
                  'line-color':
                    icebergTrajectory.color,

                  'line-width': 3,

                  'line-opacity': 0.95,

                  'line-dasharray': [
                    2,
                    2,
                  ],
                }}
              />

            </Source>

          )}


        {/* ====================================================
            TRAJECTORY CURRENT POSITION
        ==================================================== */}

        {showTrajectory &&
          icebergTrajectory.geoJsonCoords.length > 0 &&
          (() => {

            const last =
              icebergTrajectory.geoJsonCoords[
                icebergTrajectory.geoJsonCoords.length - 1
              ];

            return (

              <Marker
                longitude={last[0]}
                latitude={last[1]}
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
                longitude={start[0]}
                latitude={start[1]}
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

                    RV {mission.vessel}

                  </div>

                </div>

              </Marker>

            );

          })()}

      </Map>


      {/* ======================================================
          HUD GRID
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
          MISSION HUD
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

            {origin?.name ?? mission.origin}

            {' → '}

            {destination?.name ??
              mission.destination}

          </span>

          {activeRoute && (

            <span
              className="
                text-[10px]
                font-bold
              "
              style={{
                color:
                  activeRoute.color,
              }}
            >

              {activeRoute.name}

            </span>

          )}

        </div>

        <div
          className="
            mt-2
            grid
            grid-cols-2
            gap-x-4
            gap-y-1
            text-[8px]
            font-mono
            text-slate-500
          "
        >

          <span>
            VESSEL: {mission.vessel}
          </span>

          <span>
            FORECAST: {mission.forecastHours}H
          </span>

          <span>
            DATE: {mission.departureDate}
          </span>

          <span>
            TIME: {mission.departureTime}
          </span>

        </div>

        <div
          className="
            mt-2
            text-[9px]
            font-mono
            text-slate-500
          "
        >

          USNIC ICEBERGS: {icebergs.length}

        </div>

      </div>


      {/* ======================================================
          NO ROUTE
      ====================================================== */}

      {currentMissionRoutes.length === 0 && (

        <div
          className="
            absolute
            top-1/2
            left-1/2
            z-30
            -translate-x-1/2
            -translate-y-1/2
            ice-panel
            rounded-xl
            px-6
            py-5
            text-center
            border
            border-amber-400/20
          "
        >

          <div
            className="
              text-sm
              font-semibold
              text-amber-300
            "
          >

            Route data unavailable

          </div>

          <div
            className="
              mt-2
              text-[10px]
              text-slate-500
            "
          >

            No route is configured for:

          </div>

          <div
            className="
              mt-2
              text-[10px]
              font-mono
              text-slate-300
            "
          >

            {mission.origin}
            {' → '}
            {mission.destination}
<<<<<<< HEAD
=======
>>>>>>> main
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
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

          </div>

        </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
      )}


      {/* ======================================================
          BOTTOM HUD
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

        <div
          className="
            text-[9px]
            font-mono
            tracking-wide
            text-slate-400
          "
        >

          ANTARCTIC NAVIGATION GRID

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
              text-[8px]
              text-cyan-400
            "
          >

            ● USNIC

          </span>

          <span
            className="
              text-[8px]
              text-slate-500
            "
          >

            {icebergs.length} ICEBERGS

          </span>

          <span
            className="
              text-[8px]
              text-slate-500
            "
          >

            {mission.forecastHours}H FORECAST

          </span>

        </div>

      </div>


      {/* ======================================================
          ROUTE CONTROL
      ====================================================== */}

      <div
        className="
          absolute
          top-5
          right-5
          z-20
          ice-panel
          rounded-xl
          p-3
          w-52
        "
      >

        <div
          className="
            mb-2
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-slate-500
          "
        >

          Route Analysis

        </div>

        <div className="space-y-1">

          {currentMissionRoutes.map(route => {

            const selected =
              route.id === selectedRouteType;

            return (
<<<<<<< HEAD
=======
>>>>>>> main
        {/* ===================================================
            TOP RIGHT — ROUTE SELECTOR
        =================================================== */}

        <div className="absolute top-4 right-4 pointer-events-auto">

          <div className="ice-panel rounded-lg p-1 flex gap-1">

            <div className="flex items-center px-2">

              <RouteIcon className="w-3 h-3 text-slate-600" />

            </div>

            {routes.map((route) => (
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

              <button
                key={route.id}
                type="button"
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

                onClick={() =>
                  setSelectedRoute(
                    route.id
                  )
                }

                className={`
                  w-full
                  flex
                  items-center
                  gap-2
                  rounded-md
                  px-2
                  py-2
                  text-left
                  transition-all

                  ${
                    selected
                      ? 'bg-white/10 border border-white/10'
                      : 'hover:bg-white/5 border border-transparent'
                  }
                `}
              >

                <span
                  className="
                    h-[3px]
                    w-6
                    rounded-full
                  "
                  style={{
                    background:
                      route.color,
                  }}
                />

                <span
                  className={`
                    text-[9px]
                    ${
                      selected
                        ? 'text-slate-100'
                        : 'text-slate-500'
                    }
                  `}
                >

                  {route.name}

                </span>

              </button>

            );

          })}

        </div>


        {/* TRAJECTORY TOGGLE */}

        <div
          className="
            mt-3
            border-t
            border-white/5
            pt-3
          "
        >

          <button
            type="button"

            onClick={() =>
              setShowTrajectory(
                !showTrajectory
              )
            }

            className="
              w-full
              flex
              items-center
              justify-between
              rounded-md
              px-2
              py-2
              bg-cyan-400/5
              hover:bg-cyan-400/10
              transition-colors
            "
          >

            <span
              className="
                text-[9px]
                text-cyan-200
              "
            >

              Iceberg Trajectory

            </span>

            <span
              className={`
                h-2
                w-2
                rounded-full

                ${
                  showTrajectory
                    ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]'
                    : 'bg-slate-600'
                }
              `}
            />

<<<<<<< HEAD
=======
>>>>>>> main
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

<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
          </button>

        </div>

      </div>

    </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD

=======
>>>>>>> ice
>>>>>>> main
=======

>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
  );
}