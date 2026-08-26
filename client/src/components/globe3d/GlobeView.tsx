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
  routes,
  icebergTrajectory,
} from '../../data/mockData';


/* ============================================================
   GLOBE VIEW
============================================================ */

export default function GlobeView() {

  /* ==========================================================
     SHARED ROUTE STATE
  ========================================================== */

  const {
    introFinished,
    setIntroFinished,
    selectedRoute,
  } = useRoute();


  /* ==========================================================
     CESIUM VIEWER REF
  ========================================================== */

  const viewerRef =
    useRef<Cesium.Viewer | null>(null);


  /* ==========================================================
     GRID IMAGERY
  ========================================================== */

  const gridImagery = useMemo(
    () => new Cesium.GridImageryProvider(),
    []
  );


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
          imageryProvider={gridImagery}
          alpha={0.18}
        />


        {/* ====================================================
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
                >

                  <PolylineGraphics

                    positions={positions}

                    width={14}

                    material={
                      routeColor.withAlpha(
                        0.10
                      )
                    }

                    clampToGround={true}

                  />

                </Entity>

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
                          `${route.name} waypoint ${index + 1}`
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
                            routeColor
                          }

                          outlineColor={
                            Cesium.Color.WHITE
                          }

                          outlineWidth={1}

                        />

                      </Entity>

                    )
                  )}

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

            />

            <LabelGraphics

              text="RV PC6"

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

            />

          </Entity>

        )}


        {/* ====================================================
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
            }

          >

            <PointGraphics

              pixelSize={14}

              color={
                Cesium.Color.fromCssColorString(
                  '#06b6d4'
                )
              }

              outlineColor={
                Cesium.Color.WHITE
              }

              outlineWidth={2}

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

            />

          </Entity>

        )}


        {/* ====================================================
            BHARATI RESEARCH STATION
        ==================================================== */}

        <Entity

          name="Bharati Research Station"

          position={
            Cesium.Cartesian3.fromDegrees(
              76.3268,
              -69.4068
            )
          }

        >

          <PointGraphics

            pixelSize={10}

            color={
              Cesium.Color.fromCssColorString(
                '#60a5fa'
              )
            }

            outlineColor={
              Cesium.Color.WHITE
            }

            outlineWidth={2}

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

          />

        </Entity>


        {/* ====================================================
            MAITRI RESEARCH STATION
        ==================================================== */}

        <Entity

          name="Maitri Research Station"

          position={
            Cesium.Cartesian3.fromDegrees(
              11.7397,
              -70.7667
            )
          }

        >

          <PointGraphics

            pixelSize={10}

            color={
              Cesium.Color.fromCssColorString(
                '#22d3ee'
              )
            }

            outlineColor={
              Cesium.Color.WHITE
            }

            outlineWidth={2}

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
                40,
                -68,
                6000000
              )
            }

            onComplete={() => {

              setIntroFinished(true);

            }}

          />

        )}

      </Viewer>

    </div>

  );
}