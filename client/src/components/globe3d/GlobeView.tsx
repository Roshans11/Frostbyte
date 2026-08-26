import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';

import {
  Viewer,
  CameraFlyTo,
  ImageryLayer,
  Entity,
  PolylineGraphics,
  PointGraphics,
  LabelGraphics,
} from 'resium';

import * as Cesium from 'cesium';

import { useRoute } from '../../state/RouteContext';

import {
  missionRoutes,
  locations,
  routeMetadata,
  icebergs,
  icebergTrajectory,
  type RouteType,
} from '../../data/mockData';


/* ============================================================
   GLOBE VIEW
============================================================ */

export default function GlobeView() {

  /* ==========================================================
     SHARED APPLICATION STATE
  ========================================================== */

  const {
    introFinished,
    setIntroFinished,

    selectedRoute,

    showTrajectory,

    mission,
  } = useRoute();


  /* ==========================================================
     CESIUM VIEWER REF
  ========================================================== */

  const viewerRef =
    useRef<Cesium.Viewer | null>(null);


  /* ==========================================================
     CURRENT ORIGIN
  ========================================================== */

  const origin = useMemo(() => {

    return locations.find(
      (location) =>
        location.id === mission.origin
    );

  }, [
    mission.origin,
  ]);


  /* ==========================================================
     CURRENT DESTINATION
  ========================================================== */

  const destination = useMemo(() => {

    return locations.find(
      (location) =>
        location.id === mission.destination
    );

  }, [
    mission.destination,
  ]);


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
     POLAR GRID
  ========================================================== */

  const gridImagery = useMemo(
    () =>
      new Cesium.GridImageryProvider(),
    []
  );


  /* ==========================================================
     CURRENT MISSION ROUTES
     
     IMPORTANT:
     Routes now depend on:
     
     mission.origin
     mission.destination
     
     So changing the origin/destination updates
     all three routes automatically.
  ========================================================== */

  const currentMissionRoutes =
    useMemo(() => {

      const originRoutes =
        missionRoutes[
          mission.origin
        ];

      if (!originRoutes) {
        return [];
      }

      const destinationRoutes =
        originRoutes[
          mission.destination
        ];

      if (!destinationRoutes) {
        return [];
      }

      const routeTypes: RouteType[] = [
        'safest',
        'fastest',
        'fuel',
      ];

      return routeTypes
        .map((routeType) => {

          const coordinates =
            destinationRoutes[
              routeType
            ];

          if (
            !coordinates ||
            coordinates.length < 2
          ) {
            return null;
          }

          const metadata =
            routeMetadata[
              routeType
            ];

          return {

            id: routeType,

            name:
              metadata.name,

            color:
              metadata.color,

            risk:
              metadata.risk,

            eta:
              metadata.eta,

            fuel:
              metadata.fuel,

            geoJsonCoords:
              coordinates,

          };

        })
        .filter(
          (
            route,
          ): route is NonNullable<
            typeof route
          > =>
            route !== null
        );

    }, [
      mission.origin,
      mission.destination,
    ]);


  /* ==========================================================
     ACTIVE ROUTE
     
     The selected route changes when the user clicks:
     
     Safest
     Fastest
     Fuel Efficient
  ========================================================== */

  const activeRoute =
    useMemo(() => {

      return (
        currentMissionRoutes.find(
          (route) =>
            route.id ===
            selectedRouteType
        )
        ??
        currentMissionRoutes[0]
      );

    }, [
      currentMissionRoutes,
      selectedRouteType,
    ]);


  /* ==========================================================
     CONVERT [LONGITUDE, LATITUDE]
     INTO CESIUM POSITIONS
  ========================================================== */

  const getCesiumPositions = (
    coordinates: number[][]
  ): Cesium.Cartesian3[] => {

    if (
      !coordinates ||
      coordinates.length < 2
    ) {
      return [];
    }

    return Cesium.Cartesian3.fromDegreesArray(
      coordinates.flat()
    );
  };


  /* ==========================================================
     SINGLE POSITION
  ========================================================== */

  const getPosition = (
    longitude: number,
    latitude: number
  ) => {

    return Cesium.Cartesian3.fromDegrees(
      longitude,
      latitude
    );

  };


  /* ==========================================================
     ICEBERG CURRENT POSITION
  ========================================================== */

  const icebergPosition = useMemo(() => {

    if (
      !icebergTrajectory?.geoJsonCoords ||
      icebergTrajectory.geoJsonCoords.length === 0
    ) {
      return undefined;
    }

    const lastPoint =
      icebergTrajectory.geoJsonCoords[
        icebergTrajectory.geoJsonCoords.length - 1
      ];

    return Cesium.Cartesian3.fromDegrees(
      lastPoint[0],
      lastPoint[1]
    );

  }, []);


  /* ==========================================================
     CAMERA AFTER INTRO
  ========================================================== */

  useEffect(() => {

    if (
      viewerRef.current &&
      introFinished
    ) {

      viewerRef.current.camera.setView({

        destination:
          Cesium.Cartesian3.fromDegrees(
            40,
            -68,
            6000000
          ),

      });

    }

  }, [
    introFinished,
  ]);


  /* ==========================================================
     RENDER
  ========================================================== */

  return (

    <div
      className={`
        absolute
        inset-0
        z-0
        transition-opacity
        duration-1000
        ${
          introFinished
            ? 'opacity-50'
            : 'opacity-100'
        }
      `}
    >

      <Viewer

        full

        ref={(element) => {

          if (
            element?.cesiumElement
          ) {

            viewerRef.current =
              element.cesiumElement;

          }

        }}

        timeline={false}

        animation={false}

        baseLayerPicker={false}

        navigationHelpButton={false}

        homeButton={false}

        geocoder={false}

        sceneModePicker={false}

        infoBox={false}

        selectionIndicator={false}

        requestRenderMode={false}

      >

        {/* ====================================================
            POLAR GRID
        ==================================================== */}

        <ImageryLayer
          imageryProvider={
            gridImagery
          }

          alpha={0.18}
        />


        {/* ====================================================
            ALL THREE NAVIGATION ROUTES
        ==================================================== */}

        {currentMissionRoutes.map(
          (route) => {

            const isSelected =
              route.id ===
              selectedRouteType;


            const positions =
              getCesiumPositions(
                route.geoJsonCoords
              );


            const routeColor =
              Cesium.Color.fromCssColorString(
                route.color
              );


            return (

              <React.Fragment
                key={route.id}
              >

                {/* ==================================================
                    SELECTED ROUTE GLOW
                ================================================== */}

                {isSelected && (

                  <Entity
                    name={
                      `${route.name} Glow`
                    }
                  >

                    <PolylineGraphics

                      positions={
                        positions
                      }

                      width={18}

                      material={
                        routeColor.withAlpha(
                          0.12
                        )
                      }

                      clampToGround={true}

                    />

                  </Entity>

                )}


                {/* ==================================================
                    ROUTE CASING
                ================================================== */}

                <Entity
                  name={
                    `${route.name} Casing`
                  }
                >

                  <PolylineGraphics

                    positions={
                      positions
                    }

                    width={
                      isSelected
                        ? 8
                        : 4
                    }

                    material={
                      Cesium.Color.BLACK.withAlpha(
                        isSelected
                          ? 0.85
                          : 0.35
                      )
                    }

                    clampToGround={true}

                  />

                </Entity>


                {/* ==================================================
                    MAIN ROUTE
                ================================================== */}

                <Entity

                  name={
                    route.name
                  }

                  description={`
Route: ${route.name}

Origin:
${
  origin?.name ??
  mission.origin
}

Destination:
${
  destination?.name ??
  mission.destination
}

Vessel:
${mission.vessel}

Departure:
${mission.departureDate}
${mission.departureTime}

Forecast:
${mission.forecastHours} hours

Risk:
${route.risk}

ETA:
${route.eta}

Fuel:
${route.fuel}
                  `}

                >

                  <PolylineGraphics

                    positions={
                      positions
                    }

                    width={
                      isSelected
                        ? 5
                        : 2
                    }

                    material={
                      routeColor.withAlpha(
                        isSelected
                          ? 1
                          : 0.25
                      )
                    }

                    clampToGround={true}

                  />

                </Entity>


                {/* ==================================================
                    ROUTE WAYPOINTS
                ================================================== */}

                {isSelected &&
                  route.geoJsonCoords
                    .slice(1, -1)
                    .map(
                      (
                        [
                          longitude,
                          latitude,
                        ],
                        index
                      ) => (

                        <Entity

                          key={
                            `${route.id}-waypoint-${index}`
                          }

                          name={
                            `${route.name} waypoint ${
                              index + 1
                            }`
                          }

                          position={
                            getPosition(
                              longitude,
                              latitude
                            )
                          }

                        >

                          <PointGraphics

                            pixelSize={6}

                            color={
                              routeColor
                            }

                            outlineColor={
                              Cesium.Color.WHITE
                            }

                            outlineWidth={1}

                            disableDepthTestDistance={
                              Number.POSITIVE_INFINITY
                            }

                          />

                        </Entity>

                      )
                    )}

              </React.Fragment>

            );

          }
        )}


        {/* ====================================================
            ACTIVE VESSEL
        ==================================================== */}

        {activeRoute &&
          activeRoute.geoJsonCoords.length > 0 &&
          (() => {

            const [
              longitude,
              latitude,
            ] =
              activeRoute.geoJsonCoords[0];

            return (

              <Entity

                name={
                  `RV ${mission.vessel}`
                }

                position={
                  getPosition(
                    longitude,
                    latitude
                  )
                }

              >

                <PointGraphics

                  pixelSize={15}

                  color={
                    Cesium.Color.fromCssColorString(
                      '#22c55e'
                    )
                  }

                  outlineColor={
                    Cesium.Color.WHITE
                  }

                  outlineWidth={2}

                  disableDepthTestDistance={
                    Number.POSITIVE_INFINITY
                  }

                />

                <LabelGraphics

                  text={
                    `RV ${mission.vessel}`
                  }

                  font="12px sans-serif"

                  fillColor={
                    Cesium.Color.CYAN
                  }

                  outlineColor={
                    Cesium.Color.BLACK
                  }

                  outlineWidth={3}

                  style={
                    Cesium.LabelStyle
                      .FILL_AND_OUTLINE
                  }

                  pixelOffset={
                    new Cesium.Cartesian2(
                      16,
                      0
                    )
                  }

                  disableDepthTestDistance={
                    Number.POSITIVE_INFINITY
                  }

                />

              </Entity>

            );

          })()}


        {/* ====================================================
            CURRENT ORIGIN
        ==================================================== */}

        {origin && (

          <Entity

            name={
              `Origin: ${origin.name}`
            }

            position={
              getPosition(
                origin.longitude,
                origin.latitude
              )
            }

          >

            <PointGraphics

              pixelSize={12}

              color={
                Cesium.Color.fromCssColorString(
                  '#22c55e'
                )
              }

              outlineColor={
                Cesium.Color.WHITE
              }

              outlineWidth={2}

              disableDepthTestDistance={
                Number.POSITIVE_INFINITY
              }

            />

            <LabelGraphics

              text={
                `ORIGIN • ${
                  origin.shortName
                    .toUpperCase()
                }`
              }

              font="11px sans-serif"

              fillColor={
                Cesium.Color.fromCssColorString(
                  '#86efac'
                )
              }

              outlineColor={
                Cesium.Color.BLACK
              }

              outlineWidth={3}

              style={
                Cesium.LabelStyle
                  .FILL_AND_OUTLINE
              }

              pixelOffset={
                new Cesium.Cartesian2(
                  18,
                  0
                )
              }

              showBackground

              backgroundColor={
                Cesium.Color.fromCssColorString(
                  '#06111a'
                ).withAlpha(
                  0.85
                )
              }

              backgroundPadding={
                new Cesium.Cartesian2(
                  6,
                  4
                )
              }

              disableDepthTestDistance={
                Number.POSITIVE_INFINITY
              }

            />

          </Entity>

        )}


        {/* ====================================================
            CURRENT DESTINATION
        ==================================================== */}

        {destination && (

          <Entity

            name={
              `Destination: ${
                destination.name
              }`
            }

            position={
              getPosition(
                destination.longitude,
                destination.latitude
              )
            }

          >

            <PointGraphics

              pixelSize={12}

              color={
                Cesium.Color.CYAN
              }

              outlineColor={
                Cesium.Color.WHITE
              }

              outlineWidth={2}

              disableDepthTestDistance={
                Number.POSITIVE_INFINITY
              }

            />

            <LabelGraphics

              text={
                `DESTINATION • ${
                  destination.shortName
                    .toUpperCase()
                }`
              }

              font="11px sans-serif"

              fillColor={
                Cesium.Color.CYAN
              }

              outlineColor={
                Cesium.Color.BLACK
              }

              outlineWidth={3}

              style={
                Cesium.LabelStyle
                  .FILL_AND_OUTLINE
              }

              pixelOffset={
                new Cesium.Cartesian2(
                  18,
                  0
                )
              }

              showBackground

              backgroundColor={
                Cesium.Color.fromCssColorString(
                  '#06111a'
                ).withAlpha(
                  0.85
                )
              }

              backgroundPadding={
                new Cesium.Cartesian2(
                  6,
                  4
                )
              }

              disableDepthTestDistance={
                Number.POSITIVE_INFINITY
              }

            />

          </Entity>

        )}


        {/* ====================================================
            CAPE TOWN
        ==================================================== */}

        <Entity

          name="Cape Town"

          position={
            getPosition(
              18.4232,
              -33.9249
            )
          }

        >

          <PointGraphics

            pixelSize={10}

            color={
              Cesium.Color.fromCssColorString(
                '#f59e0b'
              )
            }

            outlineColor={
              Cesium.Color.WHITE
            }

            outlineWidth={2}

            disableDepthTestDistance={
              Number.POSITIVE_INFINITY
            }

          />

          <LabelGraphics

            text="CAPE TOWN"

            font="11px sans-serif"

            fillColor={
              Cesium.Color.fromCssColorString(
                '#fbbf24'
              )
            }

            outlineColor={
              Cesium.Color.BLACK
            }

            outlineWidth={3}

            style={
              Cesium.LabelStyle
                .FILL_AND_OUTLINE
            }

            pixelOffset={
              new Cesium.Cartesian2(
                14,
                0
              )
            }

            disableDepthTestDistance={
              Number.POSITIVE_INFINITY
            }

          />

        </Entity>


        {/* ====================================================
            USNIC ICEBERGS
        ==================================================== */}

        {icebergs.map(
          (iceberg) => {

            const [
              longitude,
              latitude,
            ] =
              iceberg.geoJsonCoords[0];


            const pixelSize =
              Math.max(
                7,
                Math.min(
                  24,
                  7 +
                    Math.sqrt(
                      iceberg.areaSqNm
                    ) *
                    0.45
                )
              );


            return (

              <Entity

                key={
                  `usnic-iceberg-${iceberg.id}`
                }

                name={
                  `Iceberg ${iceberg.name}`
                }

                description={`
Source:
${iceberg.source}

Observation:
${iceberg.observationDate}

Area:
${iceberg.areaSqNm} NM²

Size:
${iceberg.sizeNm[0]} × ${
  iceberg.sizeNm[1]
} NM

Position:
${latitude.toFixed(3)}° S,
${longitude.toFixed(3)}° E
                `}

                position={
                  getPosition(
                    longitude,
                    latitude
                  )
                }

              >

                <PointGraphics

                  pixelSize={
                    pixelSize
                  }

                  color={
                    Cesium.Color.fromCssColorString(
                      '#06b6d4'
                    ).withAlpha(
                      0.95
                    )
                  }

                  outlineColor={
                    Cesium.Color.fromCssColorString(
                      '#a5f3fc'
                    )
                  }

                  outlineWidth={2}

                  disableDepthTestDistance={
                    Number.POSITIVE_INFINITY
                  }

                />

                <LabelGraphics

                  text={
                    iceberg.name
                  }

                  font="10px sans-serif"

                  fillColor={
                    Cesium.Color.fromCssColorString(
                      '#67e8f9'
                    )
                  }

                  outlineColor={
                    Cesium.Color.BLACK
                  }

                  outlineWidth={3}

                  style={
                    Cesium.LabelStyle
                      .FILL_AND_OUTLINE
                  }

                  verticalOrigin={
                    Cesium.VerticalOrigin.BOTTOM
                  }

                  pixelOffset={
                    new Cesium.Cartesian2(
                      0,
                      -12
                    )
                  }

                  showBackground

                  backgroundColor={
                    Cesium.Color.fromCssColorString(
                      '#06111a'
                    ).withAlpha(
                      0.8
                    )
                  }

                  backgroundPadding={
                    new Cesium.Cartesian2(
                      5,
                      3
                    )
                  }

                  disableDepthTestDistance={
                    Number.POSITIVE_INFINITY
                  }

                />

              </Entity>

            );

          }
        )}


        {/* ====================================================
            ICEBERG PREDICTED TRAJECTORY
        ==================================================== */}

        {showTrajectory &&
          icebergTrajectory &&
          icebergTrajectory.geoJsonCoords &&
          icebergTrajectory.geoJsonCoords.length > 1 && (

            <>

              {/* ==================================================
                  TRAJECTORY GLOW
              ================================================== */}

              <Entity
                name="Iceberg Trajectory Glow"
              >

                <PolylineGraphics

                  positions={
                    getCesiumPositions(
                      icebergTrajectory
                        .geoJsonCoords
                    )
                  }

                  width={10}

                  material={
                    Cesium.Color.fromCssColorString(
                      icebergTrajectory.color
                    ).withAlpha(
                      0.12
                    )
                  }

                  clampToGround={true}

                />

              </Entity>


              {/* ==================================================
                  DASHED TRAJECTORY
              ================================================== */}

              <Entity
                name="Iceberg Predicted Trajectory"
              >

                <PolylineGraphics

                  positions={
                    getCesiumPositions(
                      icebergTrajectory
                        .geoJsonCoords
                    )
                  }

                  width={3}

                  material={
                    new Cesium.PolylineDashMaterialProperty(
                      {
                        color:
                          Cesium.Color.fromCssColorString(
                            icebergTrajectory.color
                          ),

                        dashLength: 12,
                      }
                    )
                  }

                  clampToGround={true}

                />

              </Entity>


              {/* ==================================================
                  TRAJECTORY POINTS
              ================================================== */}

              {icebergTrajectory
                .geoJsonCoords
                .slice(0, -1)
                .map(
                  (
                    [
                      longitude,
                      latitude,
                    ],
                    index
                  ) => (

                    <Entity

                      key={
                        `trajectory-point-${index}`
                      }

                      name={
                        `Iceberg trajectory point ${
                          index + 1
                        }`
                      }

                      position={
                        getPosition(
                          longitude,
                          latitude
                        )
                      }

                    >

                      <PointGraphics

                        pixelSize={5}

                        color={
                          Cesium.Color.CYAN
                        }

                        outlineColor={
                          Cesium.Color.WHITE
                        }

                        outlineWidth={1}

                        disableDepthTestDistance={
                          Number.POSITIVE_INFINITY
                        }

                      />

                    </Entity>

                  )
                )}

            </>

          )}


        {/* ====================================================
            CURRENT ICEBERG
        ==================================================== */}

        {icebergPosition && (

          <Entity

            name="Iceberg A102"

            position={
              icebergPosition
            }

          >

            <PointGraphics

              pixelSize={15}

              color={
                Cesium.Color.fromCssColorString(
                  '#06b6d4'
                )
              }

              outlineColor={
                Cesium.Color.WHITE
              }

              outlineWidth={2}

              disableDepthTestDistance={
                Number.POSITIVE_INFINITY
              }

            />

            <LabelGraphics

              text="ICEBERG A102"

              font="11px sans-serif"

              fillColor={
                Cesium.Color.fromCssColorString(
                  '#67e8f9'
                )
              }

              outlineColor={
                Cesium.Color.BLACK
              }

              outlineWidth={3}

              style={
                Cesium.LabelStyle
                  .FILL_AND_OUTLINE
              }

              pixelOffset={
                new Cesium.Cartesian2(
                  18,
                  0
                )
              }

              showBackground

              backgroundColor={
                Cesium.Color.fromCssColorString(
                  '#06111a'
                ).withAlpha(
                  0.85
                )
              }

              backgroundPadding={
                new Cesium.Cartesian2(
                  6,
                  4
                )
              }

              disableDepthTestDistance={
                Number.POSITIVE_INFINITY
              }

            />

          </Entity>

        )}


        {/* ====================================================
            INTRO CAMERA
        ==================================================== */}

        {!introFinished && (

          <CameraFlyTo

            duration={5}

            destination={
              Cesium.Cartesian3.fromDegrees(
                40,
                -68,
                6000000
              )
            }

            onComplete={() => {

              setIntroFinished(
                true
              );

            }}

          />

        )}

      </Viewer>

    </div>

  );
}