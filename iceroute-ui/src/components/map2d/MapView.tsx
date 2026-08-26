import Map, { Source, Layer, Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { routes, icebergTrajectory } from '../../data/mockData';
import { MapPin } from 'lucide-react';

const LOCATIONS = [
  { name: 'Cape Town', lng: 18.4232, lat: -33.9249 },
  { name: 'Bharati', lng: 76.3268, lat: -69.4068 },
  { name: 'Maitri', lng: 11.7397, lat: -70.7667 }
];

export default function MapView() {
  return (
    <div className="absolute inset-0 z-10">
      <Map
        initialViewState={{
          longitude: 40,
          latitude: -60,
          zoom: 3
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      >
        {/* Key Locations */}
        {LOCATIONS.map((loc, idx) => (
          <Marker key={idx} longitude={loc.lng} latitude={loc.lat} anchor="bottom">
            <div className="flex flex-col items-center">
              <div className="bg-slate-900/80 px-2 py-0.5 rounded text-[10px] font-bold text-slate-200 border border-slate-700 backdrop-blur mb-1 whitespace-nowrap">
                {loc.name}
              </div>
              <MapPin className="w-5 h-5 text-cyan-500 fill-cyan-900/50" />
            </div>
          </Marker>
        ))}
        {/* Render Routes */}
        {routes.map(route => (
          <Source
            key={route.id}
            id={route.id}
            type="geojson"
            data={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: route.geoJsonCoords
              },
              properties: {}
            }}
          >
            <Layer
              id={`layer-${route.id}`}
              type="line"
              source={route.id}
              layout={{
                'line-join': 'round',
                'line-cap': 'round'
              }}
              paint={{
                'line-color': route.color,
                'line-width': 4
              }}
            />
          </Source>
        ))}

        {/* Render Iceberg Trajectory */}
        <Source
          id={icebergTrajectory.id}
          type="geojson"
          data={{
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: icebergTrajectory.geoJsonCoords
            },
            properties: {}
          }}
        >
          <Layer
            id={`layer-${icebergTrajectory.id}`}
            type="line"
            source={icebergTrajectory.id}
            layout={{
              'line-join': 'round',
              'line-cap': 'round'
            }}
            paint={{
              'line-color': icebergTrajectory.color,
              'line-width': 3,
              'line-dasharray': [2, 2]
            }}
          />
        </Source>
      </Map>
    </div>
  );
}
