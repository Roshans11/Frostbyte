import { useEffect, useRef, useMemo } from 'react';
import { Viewer, CameraFlyTo, ImageryLayer, Entity, PolylineGraphics } from 'resium';
import * as Cesium from 'cesium';
import { useRoute } from '../../state/RouteContext';
import { routes, icebergTrajectory } from '../../data/mockData';

export default function GlobeView() {
  const { introFinished, setIntroFinished } = useRoute();
  const viewerRef = useRef<Cesium.Viewer | null>(null);

  // Memoize the grid imagery provider so it's not recreated on every render
  const gridImagery = useMemo(() => new Cesium.GridImageryProvider(), []);

  useEffect(() => {
    if (viewerRef.current && introFinished) {
      viewerRef.current.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(40, -68, 6000000), 
      });
    }
  }, [introFinished]);

  return (
    <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${introFinished ? 'opacity-50' : 'opacity-100'}`}>
      <Viewer
        full
        ref={(e) => {
          if (e && e.cesiumElement) viewerRef.current = e.cesiumElement;
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
        requestRenderMode={true}
      >
        {/* Globe Grid Layer */}
        <ImageryLayer imageryProvider={gridImagery} alpha={0.5} />

        {/* Routes */}
        {routes.map(route => (
          <Entity key={route.id}>
            <PolylineGraphics
              positions={Cesium.Cartesian3.fromDegreesArray(route.coordinates)}
              width={4}
              material={Cesium.Color.fromCssColorString(route.color)}
              clampToGround={true}
            />
          </Entity>
        ))}

        {/* Iceberg Trajectory */}
        <Entity>
          <PolylineGraphics
            positions={Cesium.Cartesian3.fromDegreesArray(icebergTrajectory.coordinates)}
            width={3}
            material={new Cesium.PolylineDashMaterialProperty({
              color: Cesium.Color.fromCssColorString(icebergTrajectory.color),
            })}
            clampToGround={true}
          />
        </Entity>

        {!introFinished && (
          <CameraFlyTo
            duration={5}
            destination={Cesium.Cartesian3.fromDegrees(40, -68, 6000000)}
            onComplete={() => {
              setIntroFinished(true);
            }}
          />
        )}
      </Viewer>
    </div>
  );
}
