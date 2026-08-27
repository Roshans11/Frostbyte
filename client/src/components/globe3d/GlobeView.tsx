import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Viewer,
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
     VIEWER READY
  ========================================================== */

  const [
    viewerReady,
    setViewerReady,
  ] = useState(false);


  /* ==========================================================
     ROUTE CONTEXT
  ========================================================== */

  const {
    introFinished,
    setIntroFinished,
    selectedRoute,
    showTrajectory,
    mission,
  } = useRoute();


  /* ==========================================================
     CESIUM VIEWER
  ========================================================== */

  const viewerRef =
    useRef<Cesium.Viewer | null>(null);


  /* ==========================================================
     INTRO STATE
  ========================================================== */

  const introRunningRef =
    useRef(false);


  /* ==========================================================
     TIMER
  ========================================================== */

  const stageOneTimerRef =
    useRef<number | null>(null);


  /* ==========================================================
     CURRENT ORIGIN
  ========================================================== */

  const origin = useMemo(() => {

    return locations.find(
      location =>
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
      location =>
        location.id === mission.destination
    );

  }, [
    mission.destination,
  ]);


  /* ==========================================================
     SELECTED ROUTE
  ========================================================== */

  const selectedRouteType: RouteType =
    selectedRoute === 'fastest' ||
    selectedRoute === 'fuel' ||
    selectedRoute === 'safest'
      ? selectedRoute
      : 'safest';


  /* ==========================================================
     GRID
  ========================================================== */

  const gridImagery = useMemo(
    () =>
      new Cesium.GridImageryProvider(),
    []
  );


  /* ==========================================================
     CURRENT MISSION ROUTES
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
        .map(routeType => {

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


          return {

            id: routeType,

            name:
              routeMetadata[
                routeType
              ].name,

            color:
              routeMetadata[
                routeType
              ].color,

            risk:
              routeMetadata[
                routeType
              ].risk,

            eta:
              routeMetadata[
                routeType
              ].eta,

            fuel:
              routeMetadata[
                routeType
              ].fuel,

            geoJsonCoords:
              coordinates,

          };

        })
        .filter(
          (
            route
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
  ========================================================== */

  const activeRoute =
    useMemo(() => {

      return (
        currentMissionRoutes.find(
          route =>
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
     CESIUM POSITIONS
  ========================================================== */

  const getCesiumPositions = (
    coordinates: number[][]
  ) => {

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
     CINEMATIC INTRO
     
     FULL GLOBE
          ↓
     ANTARCTICA
          ↓
     ICEBERG REGION
          ↓
     DASHBOARD
  ========================================================== */

  useEffect(() => {

    if (!viewerReady) {
      return;
    }


    const viewer =
      viewerRef.current;


    if (
      !viewer ||
      viewer.isDestroyed() ||
      introFinished ||
      introRunningRef.current
    ) {

      return;

    }


    introRunningRef.current =
      true;


    const camera =
      viewer.camera;


    /* ========================================================
       STAGE 0
       
       FULL EARTH
       
       IMPORTANT:
       This is intentionally very far away so the complete
       globe is visible before the cinematic zoom begins.
    ======================================================== */

    camera.setView({

      destination:
        Cesium.Cartesian3.fromDegrees(
          20,
          -5,
          42000000
        ),

      orientation: {

        heading:
          Cesium.Math.toRadians(
            0
          ),

        pitch:
          Cesium.Math.toRadians(
            -90
          ),

        roll: 0,

      },

    });


    /* ========================================================
       STAGE 1
       
       LET THE USER SEE THE FULL GLOBE
    ======================================================== */

    stageOneTimerRef.current =
      window.setTimeout(() => {

        if (
          !viewer ||
          viewer.isDestroyed()
        ) {

          return;

        }


        /* ====================================================
           STAGE 2
           
           MOVE TOWARD ANTARCTICA
        ==================================================== */

        camera.flyTo({

          destination:
            Cesium.Cartesian3.fromDegrees(
              30,
              -40,
              18000000
            ),

          orientation: {

            heading:
              Cesium.Math.toRadians(
                10
              ),

            pitch:
              Cesium.Math.toRadians(
                -90
              ),

            roll: 0,

          },

          duration: 4.0,

          complete: () => {

            if (
              viewer.isDestroyed()
            ) {

              return;

            }


            /* ==============================================
               STAGE 3
               
               ANTARCTICA
            ============================================== */

            camera.flyTo({

              destination:
                Cesium.Cartesian3.fromDegrees(
                  60,
                  -66,
                  6500000
                ),

              orientation: {

                heading:
                  Cesium.Math.toRadians(
                    5
                  ),

                pitch:
                  Cesium.Math.toRadians(
                    -90
                  ),

                roll: 0,

              },

              duration: 3.0,

              complete: () => {

                if (
                  viewer.isDestroyed()
                ) {

                  return;

                }


                /* ==========================================
                   STAGE 4
                   
                   ICEBERG OPERATING REGION
                   
                   IMPORTANT:
                   Pitch = -90°
                   
                   This keeps the geographic target centered
                   while the user zooms in and out.
                ========================================== */

                camera.flyTo({

                  destination:
                    Cesium.Cartesian3.fromDegrees(
                      65,
                      -68,
                      3000000
                    ),

                  orientation: {

                    heading:
                      Cesium.Math.toRadians(
                        0
                      ),

                    pitch:
                      Cesium.Math.toRadians(
                        -90
                      ),

                    roll: 0,

                  },

                  duration: 3.0,

                  complete: () => {

                    if (
                      viewer.isDestroyed()
                    ) {

                      return;

                    }


                    introRunningRef.current =
                      false;


                    setIntroFinished(
                      true
                    );

                  },

                });

              },

            });

          },

        });

      }, 1800);


    /* ========================================================
       CLEANUP
    ======================================================== */

    return () => {

      if (
        stageOneTimerRef.current !== null
      ) {

        window.clearTimeout(
          stageOneTimerRef.current
        );

        stageOneTimerRef.current =
          null;

      }


      if (
        viewer &&
        !viewer.isDestroyed()
      ) {

        viewer.camera.cancelFlight();

      }


      introRunningRef.current =
        false;

    };

  }, [
    viewerReady,
    introFinished,
    setIntroFinished,
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

        ref={element => {

          if (
            element?.cesiumElement
          ) {

            const viewer =
              element.cesiumElement;


            viewerRef.current =
              viewer;


            /* ================================================
               CAMERA CONTROLS
               
               Mouse:
               - Wheel = zoom
               - Left drag = rotate
               - Right drag = tilt
               - Middle drag = pan

               Touchpad:
               - Scroll = zoom
               - Pinch = zoom
            ================================================= */

            const controller =
              viewer.scene
                .screenSpaceCameraController;


            controller.enableInputs =
              true;

            controller.enableZoom =
              true;

            controller.enableRotate =
              true;

            controller.enableTranslate =
              true;

            controller.enableTilt =
              true;

            controller.enableLook =
              true;


            setViewerReady(
              true
            );

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
            GRID
        ==================================================== */}

        <ImageryLayer

          imageryProvider={
            gridImagery
          }

          alpha={0.18}

        />


        {/* ====================================================
            ROUTES
        ==================================================== */}

        {currentMissionRoutes.map(
          route => {

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

                {/* ROUTE GLOW */}

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

                      width={20}

                      material={
                        routeColor.withAlpha(
                          0.12
                        )
                      }

                      clampToGround

                    />

                  </Entity>

                )}


                {/* ROUTE CASING */}

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
                        ? 9
                        : 5
                    }

                    material={
                      Cesium.Color.BLACK.withAlpha(
                        isSelected
                          ? 0.9
                          : 0.55
                      )
                    }

                    clampToGround

                  />

                </Entity>


                {/* MAIN ROUTE */}

                <Entity

                  name={
                    route.name
                  }

                  description={`
Route: ${route.name}
Origin: ${
                    origin?.name ??
                    mission.origin
                  }
Destination: ${
                    destination?.name ??
                    mission.destination
                  }
Vessel: ${mission.vessel}
Departure: ${
                    mission.departureDate
                  } ${
                    mission.departureTime
                  }
Forecast: ${
                    mission.forecastHours
                  } hours
Risk: ${route.risk}
ETA: ${route.eta}
Fuel: ${route.fuel}
                  `}

                >

                  <PolylineGraphics

                    positions={
                      positions
                    }

                    width={
                      isSelected
                        ? 5
                        : 3
                    }

                    material={
                      routeColor.withAlpha(
                        isSelected
                          ? 1
                          : 0.55
                      )
                    }

                    clampToGround

                  />

                </Entity>


                {/* WAYPOINTS */}

                {route.geoJsonCoords
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

                        position={
                          getPosition(
                            longitude,
                            latitude
                          )
                        }

                      >

                        <PointGraphics

                          pixelSize={
                            isSelected
                              ? 6
                              : 3
                          }

                          color={
                            routeColor.withAlpha(
                              isSelected
                                ? 0.95
                                : 0.55
                            )
                          }

                          outlineColor={
                            Cesium.Color.WHITE
                          }

                          outlineWidth={
                            isSelected
                              ? 1
                              : 0
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
              activeRoute
                .geoJsonCoords[0];


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

                  pixelSize={14}

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
            ORIGIN
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
                `ORIGIN • ${
                  origin.shortName.toUpperCase()
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
            DESTINATION
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

              pixelSize={15}

              color={
                Cesium.Color.fromCssColorString(
                  '#22d3ee'
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
                `DESTINATION • ${
                  destination.shortName.toUpperCase()
                }`
              }

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
            ICEBERGS
        ==================================================== */}

        {icebergs.map(iceberg => {

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
Source: ${iceberg.source}
Observation: ${iceberg.observationDate}
Area: ${iceberg.areaSqNm} NM²
Size: ${
                iceberg.sizeNm[0]
              } × ${
                iceberg.sizeNm[1]
              } NM
Position: ${
                latitude.toFixed(3)
              }° S, ${
                longitude.toFixed(3)
              }° E
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

        })}


        {/* ====================================================
            ICEBERG TRAJECTORY
        ==================================================== */}

        {showTrajectory &&
          icebergTrajectory.geoJsonCoords.length > 1 && (

            <>

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

                  clampToGround

                />

              </Entity>


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

                  clampToGround

                />

              </Entity>


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

                      />

                    </Entity>

                  )
                )}

            </>

          )}


        {/* ====================================================
            BHARATI
        ==================================================== */}

        <Entity

          name="Bharati Research Station"

          position={
            getPosition(
              76.3268,
              -69.4068
            )
          }

        >

          <PointGraphics

            pixelSize={11}

            color={
              Cesium.Color.fromCssColorString(
                '#60a5fa'
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

            text="BHARATI"

            font="11px sans-serif"

            fillColor={
              Cesium.Color.fromCssColorString(
                '#93c5fd'
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
            MAITRI
        ==================================================== */}

        <Entity

          name="Maitri Research Station"

          position={
            getPosition(
              11.7397,
              -70.7667
            )
          }

        >

          <PointGraphics

            pixelSize={11}

            color={
              Cesium.Color.fromCssColorString(
                '#22d3ee'
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

            text="MAITRI"

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

      </Viewer>

    </div>

  );

}