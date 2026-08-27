import React, { useMemo } from 'react';

import Map, {
  Source,
  Layer,
  Marker,
  NavigationControl,
} from 'react-map-gl/maplibre';

import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

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


/* ============================================================
   MAP VIEW
============================================================ */

export default function MapView() {

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


  /* ==========================================================
     ACTIVE ROUTE
  ========================================================== */

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
      style={{
        touchAction: 'none',
      }}
    >

      <Map
        key={`${mission.origin}-${mission.destination}`}
        mapLib={maplibregl as any}

        initialViewState={{
          longitude:
            mapCenter.longitude,

          latitude:
            mapCenter.latitude,

          zoom:
            mapZoom,
        }}

        mapStyle={MAP_STYLE}

        attributionControl={false}

        reuseMaps

        /* ====================================================
           MAP INTERACTION

           Keep all normal MapLibre interactions enabled.
           These explicitly enable mouse-wheel and touchpad
           zoom/pan gestures without changing your UI.
        ==================================================== */

        scrollZoom={true}

        dragPan={true}

        dragRotate={true}

        doubleClickZoom={true}

        touchZoomRotate={true}

        keyboard={true}

        cooperativeGestures={false}
      >

        {/* ====================================================
            NAVIGATION
        ==================================================== */}

        <NavigationControl
          position="bottom-right"
          showCompass
          showZoom
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

              <Layer
                id={`route-casing-${route.id}`}
                type="line"
                source={`route-source-${route.id}`}

                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}

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

              <Layer
                id={`route-main-${route.id}`}
                type="line"
                source={`route-source-${route.id}`}

                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}

                paint={{
                  'line-color':
                    route.color,

                  'line-width':
                    isSelected ? 5 : 2.5,

                  'line-opacity':
                    isSelected
                      ? 1
                      : 0.38,
                }}
              />

            </Source>

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

                </Marker>

              )
            )}


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

              </div>

            </div>

          </Marker>

        )}


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

          </div>

        </div>

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

              <button
                key={route.id}
                type="button"

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

          </button>

        </div>

      </div>

    </div>

  );
}