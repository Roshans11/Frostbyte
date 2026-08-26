export const routes = [
  {
    id: 'safest',
    name: 'Safest Route',
    color: '#10b981',

    // Bharati → Maitri
    geoJsonCoords: [
      [76.3268, -69.4068],
      [72.0, -68.8],
      [67.0, -68.1],
      [61.0, -67.2],
      [55.0, -66.4],
      [49.0, -66.0],
      [43.0, -66.2],
      [37.0, -67.0],
      [31.0, -68.0],
      [25.0, -69.0],
      [19.0, -70.0],
      [11.7397, -70.7667],
    ],
  },

  {
    id: 'fastest',
    name: 'Fastest Route',
    color: '#f59e0b',

    geoJsonCoords: [
      [76.3268, -69.4068],
      [70.0, -69.0],
      [63.0, -68.7],
      [56.0, -68.5],
      [49.0, -68.6],
      [42.0, -69.0],
      [35.0, -69.5],
      [28.0, -70.0],
      [20.0, -70.4],
      [11.7397, -70.7667],
    ],
  },

  {
    id: 'fuel',
    name: 'Fuel Efficient Route',
    color: '#38bdf8',

    geoJsonCoords: [
      [76.3268, -69.4068],
      [71.0, -67.8],
      [65.0, -66.8],
      [59.0, -66.0],
      [53.0, -65.7],
      [47.0, -65.8],
      [41.0, -66.3],
      [35.0, -67.0],
      [29.0, -68.0],
      [23.0, -69.0],
      [17.0, -70.0],
      [11.7397, -70.7667],
    ],
  },
];

export const icebergTrajectory = {
  id: 'iceberg-1',
  color: '#06b6d4',

  geoJsonCoords: [
    [50.0, -67.0],
    [48.0, -66.5],
    [46.0, -66.1],
    [44.0, -65.7],
    [42.0, -65.2],
    [40.0, -64.8],
  ],
};

export const icebergMotionData = [
  {
    day: 'Day 1',
    speed: 1.2,
    distance: 0,
  },
  {
    day: 'Day 2',
    speed: 1.5,
    distance: 25,
  },
  {
    day: 'Day 3',
    speed: 2.1,
    distance: 58,
  },
  {
    day: 'Day 4',
    speed: 1.8,
    distance: 92,
  },
];