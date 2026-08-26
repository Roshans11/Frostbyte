import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { useRouteContext } from '../../state/RouteContext';

export const MapView: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  const {
    forecastGrid,
    icebergs,
    routesData,
    selectedProfileId,
    layerToggles
  } = useRouteContext();

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'dark-background',
            type: 'background',
            paint: { 'background-color': '#070d19' }
          },
          {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm-tiles',
            paint: { 'raster-opacity': 0.25, 'raster-brightness-max': 0.4 }
          }
        ]
      },
      center: [70.0, -66.5],
      zoom: 4.2,
      pitch: 0
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const m = map.current;
    if (!m || !m.isStyleLoaded()) return;

    const updateSource = (sourceId: string, geojson: any) => {
      const src = m.getSource(sourceId) as maplibregl.GeoJSONSource;
      if (src) {
        src.setData(geojson);
      } else {
        m.addSource(sourceId, { type: 'geojson', data: geojson });
      }
    };

    if (layerToggles.sic && forecastGrid.length > 0) {
      const sicGeoJSON = {
        type: 'FeatureCollection',
        features: forecastGrid.map((c) => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [c.lon, c.lat] },
          properties: {
            sic: c.forecast_sic,
            color: c.forecast_sic > 70 ? '#0284c7' : c.forecast_sic > 30 ? '#38bdf8' : '#7dd3fc'
          }
        }))
      };

      updateSource('sic-source', sicGeoJSON);

      if (!m.getLayer('sic-layer')) {
        m.addLayer({
          id: 'sic-layer',
          type: 'circle',
          source: 'sic-source',
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 3, 6, 6, 16],
            'circle-color': ['get', 'color'],
            'circle-opacity': 0.4,
            'circle-blur': 0.5
          }
        });
      }
    } else if (m.getLayer('sic-layer')) {
      m.setLayoutProperty('sic-layer', 'visibility', 'none');
    }

    if (layerToggles.sic && m.getLayer('sic-layer')) {
      m.setLayoutProperty('sic-layer', 'visibility', 'visible');
    }

    if (layerToggles.icebergs && icebergs.length > 0) {
      const bergGeoJSON = {
        type: 'FeatureCollection',
        features: icebergs.map((b) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [b.projected_position.lon, b.projected_position.lat]
          },
          properties: {
            id: b.id,
            name: b.name,
            length: b.length_m,
            semi_major_km: b.uncertainty_ellipse.semi_major_km
          }
        }))
      };

      updateSource('berg-source', bergGeoJSON);

      if (!m.getLayer('berg-layer')) {
        m.addLayer({
          id: 'berg-layer',
          type: 'circle',
          source: 'berg-source',
          paint: {
            'circle-radius': 7,
            'circle-color': '#ef4444',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });
      }

      if (!m.getLayer('berg-halo')) {
        m.addLayer({
          id: 'berg-halo',
          type: 'circle',
          source: 'berg-source',
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 3, 14, 6, 38],
            'circle-color': '#ef4444',
            'circle-opacity': 0.2,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ef4444'
          }
        });
      }
    }

    if (routesData) {
      const activeRoute = selectedProfileId === 'NAIVE'
        ? routesData.naive_baseline
        : routesData.ranked_routes.find((r) => r.profile_id === selectedProfileId);

      if (activeRoute && activeRoute.waypoints.length > 0) {
        const routeGeoJSON = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: activeRoute.waypoints.map((w) => [w.lon, w.lat])
              },
              properties: {
                profile: selectedProfileId
              }
            }
          ]
        };

        updateSource('active-route-source', routeGeoJSON);

        const routeColor = selectedProfileId === 'SAFEST'
          ? '#10b981'
          : selectedProfileId === 'FASTEST'
          ? '#3b82f6'
          : selectedProfileId === 'FUEL_EFFICIENT'
          ? '#f59e0b'
          : '#94a3b8';

        if (!m.getLayer('active-route-layer')) {
          m.addLayer({
            id: 'active-route-layer',
            type: 'line',
            source: 'active-route-source',
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: {
              'line-color': routeColor,
              'line-width': 4,
              'line-opacity': 0.95
            }
          });
        } else {
          m.setPaintProperty('active-route-layer', 'line-color', routeColor);
        }
      }

      if (layerToggles.naiveBaseline && selectedProfileId !== 'NAIVE' && routesData.naive_baseline.waypoints.length > 0) {
        const naiveGeoJSON = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: routesData.naive_baseline.waypoints.map((w) => [w.lon, w.lat])
              }
            }
          ]
        };

        updateSource('naive-route-source', naiveGeoJSON);

        if (!m.getLayer('naive-route-layer')) {
          m.addLayer({
            id: 'naive-route-layer',
            type: 'line',
            source: 'naive-route-source',
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: {
              'line-color': '#94a3b8',
              'line-width': 2,
              'line-dasharray': [2, 2],
              'line-opacity': 0.7
            }
          });
        }
      } else if (m.getLayer('naive-route-layer')) {
        m.setLayoutProperty('naive-route-layer', 'visibility', 'none');
      }
    }
  }, [forecastGrid, icebergs, routesData, selectedProfileId, layerToggles]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#070d19',
        position: 'relative'
      }}
    />
  );
};
