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
<<<<<<< HEAD
  missionRoutes,
  locations,
  routeMetadata,
  icebergs,
  icebergTrajectory,
  type RouteType,
=======
  routes,
  icebergTrajectory,
>>>>>>> ice
} from '../../data/mockData';


/* ============================================================
   GLOBE VIEW
============================================================ */

export default function GlobeView() {

<<<<<<< HEAD
  const {
    introFinished,
    setIntroFinished,

    selectedRoute,

    showTrajectory,

    mission,
=======
  /* ==========================================================
     SHARED ROUTE STATE
  ========================================================== */

  const {
    introFinished,
    setIntroFinished,
    selectedRoute,
>>>>>>> ice
  } = useRoute();


  /* ==========================================================
<<<<<<< HEAD
     VIEWER
=======
     CESIUM VIEWER REF
>>>>>>> ice
  ========================================================== */

  const viewerRef =
    useRef<Cesium.Viewer | null>(null);


  /* ==========================================================
<<<<<<< HEAD
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
=======
     GRID IMAGERY
  ========================================================== */

  const gridImagery = useMemo(
    () => new Cesium.GridImageryProvider(),
>>>>>>> ice
    []
  );


  /* ==========================================================
<<<<<<< HEAD
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
     CAMERA
=======
     CAMERA AFTER INTRO
>>>>>>> ice
  ========================================================== */

  useEffect(() => {

    if (
      viewerRef.current &&
      introFinished
    ) {

      viewerRef.current.camera.setView({

        destination:
          Cesium.Cartesian3.fromDegrees(
<<<<<<< HEAD
            55,
            -68,
            8500000
=======
            40,
            -68,
            6000000
>>>>>>> ice
          ),

      });

    }

<<<<<<< HEAD
  }, [
    introFinished,
  ]);
=======
  }, [introFinished]);


  /* ==========================================================
     ACTIVE ROUTE
  ========================================================== */

  const activeRoute =
    routes.find(
      (route) =>
        route.id === selectedRoute
    ) ?? routes[0];


  /* ==========================================================
     CONVERT [LNG, LAT] ARRAYS TO CESIUM POSITIONS

     Input:

     [
       [76, -69],
       [60, -68],
       [40, -67]
     ]

     Cesium expects:

     [
       76, -69,
       60, -68,
       40, -67
     ]
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
     ROUTE POSITION
  ========================================================== */

  const getRouteStartPosition = (
    route: {
      geoJsonCoords: number[][];
    }
  ) => {

    if (
      !route.geoJsonCoords ||
      route.geoJsonCoords.length === 0
    ) {
      return undefined;
    }

    const [
      longitude,
      latitude,
    ] = route.geoJsonCoords[0];

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
>>>>>>> ice


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
<<<<<<< HEAD

=======
>>>>>>> ice
        ${
          introFinished
            ? 'opacity-50'
            : 'opacity-100'
        }
      `}
    >

      <Viewer

        full

<<<<<<< HEAD
        ref={element => {
=======
        ref={(element) => {
>>>>>>> ice

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
<<<<<<< HEAD
            GRID
        ==================================================== */}

        <ImageryLayer
          imageryProvider={
            gridImagery
          }
=======
            POLAR GRID
        ==================================================== */}

        <ImageryLayer
          imageryProvider={gridImagery}
>>>>>>> ice
          alpha={0.18}
        />


        {/* ====================================================
<<<<<<< HEAD
            ALL THREE ROUTES
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

                {/* ==================================================
                    GLOW
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


                {/* ==================================================
                    CASING
                ================================================== */}

                <Entity
                  name={
                    `${route.name} Casing`
                  }
=======
            NAVIGATION ROUTES
        ==================================================== */}

        {routes.map((route) => {

          const isSelected =
            route.id === selectedRoute;


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

              {/* =================================================
                  SELECTED ROUTE GLOW
              ================================================= */}

              {isSelected && (

                <Entity
                  name={`${route.name} Glow`}
>>>>>>> ice
                >

                  <PolylineGraphics

<<<<<<< HEAD
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


                {/* ==================================================
                    MAIN ROUTE
                ================================================== */}

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
=======
                    positions={positions}

                    width={14}

                    material={
                      routeColor.withAlpha(
                        0.10
                      )
                    }

                    clampToGround={true}

>>>>>>> ice
                  />

                </Entity>

<<<<<<< HEAD

                {/* ==================================================
                    WAYPOINTS
                ================================================== */}

                {route.geoJsonCoords
=======
              )}


              {/* =================================================
                  ROUTE CASING
              ================================================= */}

              <Entity
                name={`${route.name} Casing`}
              >

                <PolylineGraphics

                  positions={positions}

                  width={
                    isSelected
                      ? 7
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


              {/* =================================================
                  MAIN ROUTE
              ================================================= */}

              <Entity
                name={route.name}

                description={
                  `AI navigation route: ${route.name}`
                }

              >

                <PolylineGraphics

                  positions={positions}

                  width={
                    isSelected
                      ? 4
                      : 2
                  }

                  material={
                    routeColor.withAlpha(
                      isSelected
                        ? 1
                        : 0.22
                    )
                  }

                  clampToGround={true}

                />

              </Entity>


              {/* =================================================
                  ROUTE WAYPOINTS
              ================================================= */}

              {isSelected &&
                route.geoJsonCoords
>>>>>>> ice
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

<<<<<<< HEAD
                        position={
                          getPosition(
=======
                        name={
                          `${route.name} waypoint ${index + 1}`
                        }

                        position={
                          Cesium.Cartesian3.fromDegrees(
>>>>>>> ice
                            longitude,
                            latitude
                          )
                        }

                      >

                        <PointGraphics

<<<<<<< HEAD
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
=======
                          pixelSize={5}

                          color={
                            routeColor
>>>>>>> ice
                          }

                          outlineColor={
                            Cesium.Color.WHITE
                          }

<<<<<<< HEAD
                          outlineWidth={
                            isSelected
                              ? 1
                              : 0
                          }
=======
                          outlineWidth={1}
>>>>>>> ice

                        />

                      </Entity>

                    )
                  )}

<<<<<<< HEAD
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
=======
            </React.Fragment>

          );

        })}


        {/* ====================================================
            ACTIVE VESSEL — RV PC6
        ==================================================== */}

        {activeRoute &&
          activeRoute.geoJsonCoords &&
          activeRoute.geoJsonCoords.length > 0 && (

          <Entity

            name="RV PC6"

            position={
              getRouteStartPosition(
                activeRoute
>>>>>>> ice
              )
            }

          >

            <PointGraphics

<<<<<<< HEAD
              pixelSize={15}

              color={
                Cesium.Color.fromCssColorString(
                  '#22c55e'
                )
=======
              pixelSize={12}

              color={
                Cesium.Color.CYAN
>>>>>>> ice
              }

              outlineColor={
                Cesium.Color.WHITE
              }

              outlineWidth={2}

<<<<<<< HEAD
              disableDepthTestDistance={
                Number.POSITIVE_INFINITY
              }

=======
>>>>>>> ice
            />

            <LabelGraphics

<<<<<<< HEAD
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
=======
              text="RV PC6"

              font="12px sans-serif"

              fillColor={
                Cesium.Color.CYAN
>>>>>>> ice
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
<<<<<<< HEAD
                  18,
=======
                  16,
>>>>>>> ice
                  0
                )
              }

<<<<<<< HEAD
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

=======
>>>>>>> ice
            />

          </Entity>

        )}


        {/* ====================================================
<<<<<<< HEAD
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
=======
            ICEBERG TRAJECTORY
        ==================================================== */}

        {icebergTrajectory &&
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
                    icebergTrajectory.geoJsonCoords
                  )
                }

                width={9}

                material={
                  Cesium.Color.fromCssColorString(
                    '#06b6d4'
                  ).withAlpha(0.10)
                }

                clampToGround={true}

              />

            </Entity>


            {/* ==================================================
                DASHED TRAJECTORY
            ================================================== */}

            <Entity
              name="Iceberg A102 Trajectory"
            >

              <PolylineGraphics

                positions={
                  getCesiumPositions(
                    icebergTrajectory.geoJsonCoords
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
                TRAJECTORY WAYPOINTS
            ================================================== */}

            {icebergTrajectory.geoJsonCoords
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
                      `iceberg-point-${index}`
                    }

                    name={
                      `Iceberg trajectory point ${index + 1}`
                    }

                    position={
                      Cesium.Cartesian3.fromDegrees(
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
            CURRENT ICEBERG
        ==================================================== */}

        {icebergPosition && (

          <Entity

            name="Iceberg A102"

            position={
              icebergPosition
>>>>>>> ice
            }

          >

            <PointGraphics

<<<<<<< HEAD
              pixelSize={15}

              color={
                Cesium.Color.fromCssColorString(
                  '#22d3ee'
=======
              pixelSize={14}

              color={
                Cesium.Color.fromCssColorString(
                  '#06b6d4'
>>>>>>> ice
                )
              }

              outlineColor={
                Cesium.Color.WHITE
              }

              outlineWidth={2}

<<<<<<< HEAD
              disableDepthTestDistance={
                Number.POSITIVE_INFINITY
              }

=======
>>>>>>> ice
            />

            <LabelGraphics

<<<<<<< HEAD
              text={
                `DESTINATION • ${
                  destination.shortName.toUpperCase()
                }`
              }
=======
              text="ICEBERG A102"
>>>>>>> ice

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

<<<<<<< HEAD
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

=======
>>>>>>> ice
            />

          </Entity>

        )}


        {/* ====================================================
<<<<<<< HEAD
            USNIC ICEBERGS
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

              {/* GLOW */}

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


              {/* DASHED LINE */}

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


              {/* TRAJECTORY POINTS */}

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
=======
            BHARATI RESEARCH STATION
>>>>>>> ice
        ==================================================== */}

        <Entity

          name="Bharati Research Station"

          position={
<<<<<<< HEAD
            getPosition(
=======
            Cesium.Cartesian3.fromDegrees(
>>>>>>> ice
              76.3268,
              -69.4068
            )
          }

        >

          <PointGraphics
<<<<<<< HEAD
            pixelSize={11}
=======

            pixelSize={10}
>>>>>>> ice

            color={
              Cesium.Color.fromCssColorString(
                '#60a5fa'
              )
            }

            outlineColor={
              Cesium.Color.WHITE
            }

            outlineWidth={2}

<<<<<<< HEAD
            disableDepthTestDistance={
              Number.POSITIVE_INFINITY
            }
=======
>>>>>>> ice
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

<<<<<<< HEAD
            disableDepthTestDistance={
              Number.POSITIVE_INFINITY
            }

=======
>>>>>>> ice
          />

        </Entity>


        {/* ====================================================
<<<<<<< HEAD
            MAITRI
=======
            MAITRI RESEARCH STATION
>>>>>>> ice
        ==================================================== */}

        <Entity

          name="Maitri Research Station"

          position={
<<<<<<< HEAD
            getPosition(
=======
            Cesium.Cartesian3.fromDegrees(
>>>>>>> ice
              11.7397,
              -70.7667
            )
          }

        >

          <PointGraphics

<<<<<<< HEAD
            pixelSize={11}
=======
            pixelSize={10}
>>>>>>> ice

            color={
              Cesium.Color.fromCssColorString(
                '#22d3ee'
              )
            }

            outlineColor={
              Cesium.Color.WHITE
            }

            outlineWidth={2}

<<<<<<< HEAD
            disableDepthTestDistance={
              Number.POSITIVE_INFINITY
            }

=======
>>>>>>> ice
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

<<<<<<< HEAD
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

=======
>>>>>>> ice
          />

        </Entity>


        {/* ====================================================
            INTRO CAMERA
        ==================================================== */}

        {!introFinished && (

          <CameraFlyTo

            duration={5}

            destination={
              Cesium.Cartesian3.fromDegrees(
<<<<<<< HEAD
                55,
                -68,
                8500000
              )
            }

            onComplete={() =>
              setIntroFinished(true)
            }
=======
                40,
                -68,
                6000000
              )
            }

            onComplete={() => {

              setIntroFinished(true);

            }}
>>>>>>> ice

          />

        )}

      </Viewer>

    </div>

  );
}