import React, { useState, useEffect } from 'react';
import { useRouteContext } from '../../state/RouteContext';
import { Cartesian3, Color } from 'cesium';
import { Viewer, Entity, PolylineGraphics, PointGraphics, EllipseGraphics } from 'resium';
import { AlertCircle } from 'lucide-react';

export const GlobeView: React.FC = () => {
  const { routesData, selectedProfileId, icebergs, layerToggles } = useRouteContext();
  const [hasWebGl, setHasWebGl] = useState<boolean>(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGl(false);
      }
    } catch (e) {
      setHasWebGl(false);
    }
  }, []);

  if (!hasWebGl) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f8fafc',
        gap: '12px',
        padding: '24px',
        boxSizing: 'border-box',
        textAlign: 'center'
      }}>
        <AlertCircle style={{ width: '36px', height: '36px', color: '#f59e0b' }} />
        <h3 style={{ margin: 0 }}>WebGL Unavailable for 3D Globe</h3>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px', maxWidth: '400px' }}>
          3D Globe view requires WebGL rendering context. Showing 2D MapLibre map with full functionality.
        </p>
      </div>
    );
  }

  const activeRoute = selectedProfileId === 'NAIVE'
    ? routesData?.naive_baseline
    : routesData?.ranked_routes.find((r) => r.profile_id === selectedProfileId);

  const routePositions = activeRoute
    ? activeRoute.waypoints.map((w) => Cartesian3.fromDegrees(w.lon, w.lat, 100))
    : [];

  const routeColor = selectedProfileId === 'SAFEST'
    ? Color.fromCssColorString('#10b981')
    : selectedProfileId === 'FASTEST'
    ? Color.fromCssColorString('#3b82f6')
    : selectedProfileId === 'FUEL_EFFICIENT'
    ? Color.fromCssColorString('#f59e0b')
    : Color.fromCssColorString('#94a3b8');

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Viewer
        full
        timeline={false}
        animation={false}
        navigationHelpButton={false}
        sceneModePicker={false}
        baseLayerPicker={false}
        geocoder={false}
        homeButton={false}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {routePositions.length > 1 && (
          <Entity name={activeRoute?.name || 'Active Route'}>
            <PolylineGraphics
              positions={routePositions}
              width={5}
              material={routeColor}
            />
          </Entity>
        )}

        {layerToggles.icebergs &&
          icebergs.map((b) => (
            <Entity
              key={b.id}
              name={b.name}
              position={Cartesian3.fromDegrees(b.projected_position.lon, b.projected_position.lat, 50)}
            >
              <PointGraphics pixelSize={10} color={Color.RED} outlineColor={Color.WHITE} outlineWidth={2} />
              <EllipseGraphics
                semiMajorAxis={b.uncertainty_ellipse.semi_major_km * 1000}
                semiMinorAxis={b.uncertainty_ellipse.semi_minor_km * 1000}
                material={Color.RED.withAlpha(0.25)}
                outline
                outlineColor={Color.RED}
              />
            </Entity>
          ))}
      </Viewer>
    </div>
  );
};
