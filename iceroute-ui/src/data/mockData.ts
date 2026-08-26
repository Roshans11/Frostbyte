export const routes = [
  {
    id: 'safest',
    name: 'Safest Route',
    color: '#10b981', // green
    coordinates: [76.18, -69.4, 60.0, -65.0, 40.0, -64.0, 20.0, -66.0, 11.73, -70.76],
    geoJsonCoords: [
      [76.18, -69.4], [60.0, -65.0], [40.0, -64.0], [20.0, -66.0], [11.73, -70.76]
    ]
  },
  {
    id: 'fastest',
    name: 'Fastest Route',
    color: '#f59e0b', // amber
    coordinates: [76.18, -69.4, 50.0, -68.0, 30.0, -69.0, 11.73, -70.76],
    geoJsonCoords: [
      [76.18, -69.4], [50.0, -68.0], [30.0, -69.0], [11.73, -70.76]
    ]
  }
];

export const icebergTrajectory = {
  id: 'iceberg-1',
  color: '#06b6d4', // cyan
  coordinates: [50.0, -67.0, 48.0, -66.5, 45.0, -65.8, 42.0, -65.0],
  geoJsonCoords: [
    [50.0, -67.0], [48.0, -66.5], [45.0, -65.8], [42.0, -65.0]
  ]
};

// Data for the recharts graph
export const icebergMotionData = [
  { day: 'Day 1', speed: 1.2, distance: 0 },
  { day: 'Day 2', speed: 1.5, distance: 25 },
  { day: 'Day 3', speed: 2.1, distance: 58 },
  { day: 'Day 4', speed: 1.8, distance: 92 },
];
