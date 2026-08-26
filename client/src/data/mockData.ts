<<<<<<< HEAD
/* ============================================================
   ICEROUTE INDIA
   Antarctic Navigation Intelligence
   ============================================================

   DATA SOURCES

   USNIC:
   - Antarctic iceberg observations
   - Iceberg size
   - Iceberg area
   - Iceberg position
   - Observation/update date

   COPERNICUS MARINE:
   - Sea-ice concentration
   - Sea-ice edge
   - Sea-ice drift
   - High-resolution Antarctic sea-ice information

   ROUTING:
   - Mission origin
   - Mission destination
   - Route type
   - Departure date
   - Departure time
   - Forecast duration

   IMPORTANT:
   Copernicus product definitions are included below, but
   real numerical Copernicus observations should be loaded
   from the Copernicus Marine data service rather than invented
   in frontend mock data.
============================================================ */


/* ============================================================
   1. TYPES
============================================================ */

export type RouteType =
  | 'safest'
  | 'fastest'
  | 'fuel';


export interface Location {
  id: string;
  name: string;
  shortName: string;

  longitude: number;
  latitude: number;

  type:
    | 'research-station'
    | 'port';
}


export interface RouteDefinition {
  id: RouteType;

  name: string;

  color: string;

  risk: string;

  eta: string;

  fuel: string;

  geoJsonCoords: number[][];
}


/* ============================================================
   2. KEY ANTARCTIC / MISSION LOCATIONS
============================================================ */

export const locations: Location[] = [

  /* ----------------------------------------------------------
     BHARATI
  ---------------------------------------------------------- */

  {
    id: 'bharati',

    name:
      'Bharati Research Station',

    shortName:
      'Bharati',

    longitude:
      76.3268,

    latitude:
      -69.4068,

    type:
      'research-station',
  },


  /* ----------------------------------------------------------
     MAITRI
  ---------------------------------------------------------- */

  {
    id: 'maitri',

    name:
      'Maitri Research Station',

    shortName:
      'Maitri',

    longitude:
      11.7397,

    latitude:
      -70.7667,

    type:
      'research-station',
  },


  /* ----------------------------------------------------------
     CAPE TOWN
  ---------------------------------------------------------- */

  {
    id: 'cape-town',

    name:
      'Cape Town',

    shortName:
      'Cape Town',

    longitude:
      18.4232,

    latitude:
      -33.9249,

    type:
      'port',
  },

];


/* ============================================================
   3. DEFAULT ROUTES
============================================================

   These are the original Bharati → Maitri routes.

   They remain here for compatibility with components that
   currently import:

      import { routes } from '../data/mockData';

============================================================ */

export const routes: RouteDefinition[] = [

  /* ==========================================================
     SAFEST
  ========================================================== */

  {
    id: 'safest',

    name:
      'Safest Route',

    color:
      '#10b981',

    risk:
      'LOW',

    eta:
      '74h',

    fuel:
      '18.4t',

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


  /* ==========================================================
     FASTEST
  ========================================================== */

  {
    id: 'fastest',

    name:
      'Fastest Route',

    color:
      '#f59e0b',

    risk:
      'MED',

    eta:
      '62h',

    fuel:
      '21.2t',

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


  /* ==========================================================
     FUEL EFFICIENT
  ========================================================== */

  {
    id: 'fuel',

    name:
      'Fuel Efficient Route',

    color:
      '#38bdf8',

    risk:
      'LOW',

    eta:
      '69h',

    fuel:
      '16.9t',

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


/* ============================================================
   4. MISSION ROUTE DATA
============================================================

   The frontend can select:

      Cape Town → Maitri
      Bharati → Maitri
      Maitri → Bharati

   and then choose:

      safest
      fastest
      fuel

   Coordinates are [longitude, latitude].

============================================================ */

export const missionRoutes: Record<
  string,
  Record<
    string,
    Record<RouteType, number[][]>
  >
> = {


  /* ==========================================================
     CAPE TOWN → MAITRI
  ========================================================== */

  'cape-town': {

    maitri: {

      /* ------------------------------------------------------
         SAFEST
      ------------------------------------------------------ */

      safest: [

        [18.4232, -33.9249],

        [17.0, -40.0],

        [15.0, -48.0],

        [12.0, -55.0],

        [10.0, -61.0],

        [10.5, -66.0],

        [11.7397, -70.7667],

      ],


      /* ------------------------------------------------------
         FASTEST
      ------------------------------------------------------ */

      fastest: [

        [18.4232, -33.9249],

        [16.0, -42.0],

        [14.0, -50.0],

        [12.0, -58.0],

        [11.0, -65.0],

        [11.7397, -70.7667],

      ],


      /* ------------------------------------------------------
         FUEL EFFICIENT
      ------------------------------------------------------ */

      fuel: [

        [18.4232, -33.9249],

        [17.0, -40.0],

        [14.5, -48.0],

        [12.5, -56.0],

        [10.5, -63.0],

        [11.7397, -70.7667],

      ],

    },

  },


  /* ==========================================================
     BHARATI → MAITRI
  ========================================================== */

  bharati: {

    maitri: {

      /* ------------------------------------------------------
         SAFEST
      ------------------------------------------------------ */

      safest: [

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


      /* ------------------------------------------------------
         FASTEST
      ------------------------------------------------------ */

      fastest: [

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


      /* ------------------------------------------------------
         FUEL EFFICIENT
      ------------------------------------------------------ */

      fuel: [

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

  },


  /* ==========================================================
     MAITRI → BHARATI
  ========================================================== */

  maitri: {

    bharati: {

      /* ------------------------------------------------------
         SAFEST
      ------------------------------------------------------ */

      safest: [

        [11.7397, -70.7667],

        [19.0, -70.0],

        [25.0, -69.0],

        [31.0, -68.0],

        [37.0, -67.0],

        [43.0, -66.2],

        [49.0, -66.0],

        [55.0, -66.4],

        [61.0, -67.2],

        [67.0, -68.1],

        [72.0, -68.8],

        [76.3268, -69.4068],

      ],


      /* ------------------------------------------------------
         FASTEST
      ------------------------------------------------------ */

      fastest: [

        [11.7397, -70.7667],

        [20.0, -70.4],

        [28.0, -70.0],

        [35.0, -69.5],

        [42.0, -69.0],

        [49.0, -68.6],

        [56.0, -68.5],

        [63.0, -68.7],

        [70.0, -69.0],

        [76.3268, -69.4068],

      ],


      /* ------------------------------------------------------
         FUEL EFFICIENT
      ------------------------------------------------------ */

      fuel: [

        [11.7397, -70.7667],

        [17.0, -70.0],

        [23.0, -69.0],

        [29.0, -68.0],

        [35.0, -67.0],

        [41.0, -66.3],

        [47.0, -65.8],

        [53.0, -65.7],

        [59.0, -66.0],

        [65.0, -66.8],

        [71.0, -67.8],

        [76.3268, -69.4068],

      ],

    },

  },


  /* ==========================================================
     CAPE TOWN → BHARATI
  ========================================================== */

  'cape-town-to-bharati': {

    bharati: {

      safest: [

        [18.4232, -33.9249],

        [25.0, -42.0],

        [35.0, -50.0],

        [45.0, -57.0],

        [55.0, -63.0],

        [65.0, -67.0],

        [76.3268, -69.4068],

      ],

      fastest: [

        [18.4232, -33.9249],

        [28.0, -44.0],

        [40.0, -52.0],

        [52.0, -60.0],

        [65.0, -66.0],

        [76.3268, -69.4068],

      ],

      fuel: [

        [18.4232, -33.9249],

        [25.0, -43.0],

        [37.0, -51.0],

        [49.0, -59.0],

        [62.0, -65.0],

        [76.3268, -69.4068],

      ],

    },

  },

};


/* ============================================================
   5. ROUTE METADATA
============================================================

   These values drive the dashboard cards.

============================================================ */

export const routeMetadata: Record<
  RouteType,
  {
    name: string;
    color: string;
    risk: string;
    eta: string;
    fuel: string;
  }
> = {

  safest: {

    name:
      'Safest Route',

    color:
      '#10b981',

    risk:
      'LOW',

    eta:
      '74h',

    fuel:
      '18.4t',

  },

  fastest: {

    name:
      'Fastest Route',

    color:
      '#f59e0b',

    risk:
      'MED',

    eta:
      '62h',

    fuel:
      '21.2t',

  },

  fuel: {

    name:
      'Fuel Efficient Route',

    color:
      '#38bdf8',

    risk:
      'LOW',

    eta:
      '69h',

    fuel:
      '16.9t',

  },

};


/* ============================================================
   6. GET LOCATION
============================================================ */

export const getLocationById = (
  id: string
): Location | undefined => {

  return locations.find(
    (location) =>
      location.id === id
  );

};


/* ============================================================
   7. GET MISSION ROUTE
============================================================

   This is the MOST IMPORTANT helper for your map/globe.

   Example:

   getMissionRoute(
      'bharati',
      'maitri',
      'safest'
   );

============================================================ */

export const getMissionRoute = (
  origin: string,
  destination: string,
  routeType: RouteType
): number[][] => {

  const originRoutes =
    missionRoutes[origin];

  if (!originRoutes) {

    return [];

  }

  const destinationRoutes =
    originRoutes[destination];

  if (!destinationRoutes) {

    return [];

  }

  return (
    destinationRoutes[routeType] ??
    []
  );

};


/* ============================================================
   8. GET COMPLETE ROUTE OBJECT
============================================================ */

export const getMissionRouteData = (
  origin: string,
  destination: string,
  routeType: RouteType
): RouteDefinition | null => {

  const coordinates =
    getMissionRoute(
      origin,
      destination,
      routeType
    );

  if (
    coordinates.length === 0
  ) {

    return null;

  }

  const metadata =
    routeMetadata[routeType];

  return {

    id:
      routeType,

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

};


/* ============================================================
   9. CREATE ROUTES FOR A MISSION
============================================================

   Returns all 3 routes for the selected
   origin → destination.

============================================================ */

export const getMissionRoutes = (
  origin: string,
  destination: string
): RouteDefinition[] => {

  const routeTypes: RouteType[] = [

    'safest',

    'fastest',

    'fuel',

  ];

  return routeTypes

    .map(
      (routeType) =>
        getMissionRouteData(
          origin,
          destination,
          routeType
        )
    )

    .filter(
      (
        route
      ): route is RouteDefinition =>
        route !== null
    );

};


/* ============================================================
   10. DEFAULT MISSION
============================================================ */

export const defaultMission = {

  origin:
    'cape-town',

  destination:
    'maitri',

  vessel:
    'PC6',

  departureDate:
    '2026-08-26',

  departureTime:
    '12:00',

  forecastHours:
    96,

  selectedRoute:
    'safest' as RouteType,

};


/* ============================================================
   11. USNIC ANTARCTIC ICEBERG DATA
============================================================ */

export const icebergs = [

  /* ---------------- D23 ---------------- */

  {
    id: 'D23',
    name: 'D23',
    color: '#06b6d4',

    geoJsonCoords: [
      [74.7167, -69.4333],
    ],

    longitude: 74.7167,
    latitude: -69.4333,

    sizeNm: [7, 6],
    lengthNm: 7,
    widthNm: 6,

    areaSqNm: 30.79,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'D',
  },


  /* ---------------- B09G ---------------- */

  {
    id: 'B09G',
    name: 'B09G',
    color: '#06b6d4',

    geoJsonCoords: [
      [41.5167, -68.1833],
    ],

    longitude: 41.5167,
    latitude: -68.1833,

    sizeNm: [12, 7],
    lengthNm: 12,
    widthNm: 7,

    areaSqNm: 46.66,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'B',
  },


  /* ---------------- C18B ---------------- */

  {
    id: 'C18B',
    name: 'C18B',
    color: '#06b6d4',

    geoJsonCoords: [
      [47.3667, -67.0333],
    ],

    longitude: 47.3667,
    latitude: -67.0333,

    sizeNm: [10, 4],
    lengthNm: 10,
    widthNm: 4,

    areaSqNm: 32.19,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'C',
  },


  /* ---------------- C18C ---------------- */

  {
    id: 'C18C',
    name: 'C18C',
    color: '#06b6d4',

    geoJsonCoords: [
      [39.0667, -68.4667],
    ],

    longitude: 39.0667,
    latitude: -68.4667,

    sizeNm: [10, 2],
    lengthNm: 10,
    widthNm: 2,

    areaSqNm: 15.47,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'C',
  },


  /* ---------------- D37 ---------------- */

  {
    id: 'D37',
    name: 'D37',
    color: '#06b6d4',

    geoJsonCoords: [
      [36.3667, -69.2167],
    ],

    longitude: 36.3667,
    latitude: -69.2167,

    sizeNm: [30, 7],
    lengthNm: 30,
    widthNm: 7,

    areaSqNm: 139.29,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'D',
  },


  /* ---------------- D34 ---------------- */

  {
    id: 'D34',
    name: 'D34',
    color: '#06b6d4',

    geoJsonCoords: [
      [82.0667, -67.15],
    ],

    longitude: 82.0667,
    latitude: -67.15,

    sizeNm: [11, 8],
    lengthNm: 11,
    widthNm: 8,

    areaSqNm: 48.34,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'D',
  },


  /* ---------------- D15A ---------------- */

  {
    id: 'D15A',
    name: 'D15A',
    color: '#06b6d4',

    geoJsonCoords: [
      [81.9167, -66.6333],
    ],

    longitude: 81.9167,
    latitude: -66.6333,

    sizeNm: [51, 22],
    lengthNm: 51,
    widthNm: 22,

    areaSqNm: 885.59,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'D',
  },


  /* ---------------- D15B ---------------- */

  {
    id: 'D15B',
    name: 'D15B',
    color: '#06b6d4',

    geoJsonCoords: [
      [81.5667, -67.0167],
    ],

    longitude: 81.5667,
    latitude: -67.0167,

    sizeNm: [20, 12],
    lengthNm: 20,
    widthNm: 12,

    areaSqNm: 178.0,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'D',
  },


  /* ---------------- D15C ---------------- */

  {
    id: 'D15C',
    name: 'D15C',
    color: '#06b6d4',

    geoJsonCoords: [
      [79.4667, -67.2],
    ],

    longitude: 79.4667,
    latitude: -67.2,

    sizeNm: [14, 7],
    lengthNm: 14,
    widthNm: 7,

    areaSqNm: 33.71,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'D',
  },


  /* ---------------- C39 ---------------- */

  {
    id: 'C39',
    name: 'C39',
    color: '#06b6d4',

    geoJsonCoords: [
      [64.8333, -66.8167],
    ],

    longitude: 64.8333,
    latitude: -66.8167,

    sizeNm: [8, 3],
    lengthNm: 8,
    widthNm: 3,

    areaSqNm: 15.2,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'C',
  },


  /* ---------------- C36 ---------------- */

  {
    id: 'C36',
    name: 'C36',
    color: '#06b6d4',

    geoJsonCoords: [
      [146.4667, -67.5167],
    ],

    longitude: 146.4667,
    latitude: -67.5167,

    sizeNm: [23, 16],
    lengthNm: 23,
    widthNm: 16,

    areaSqNm: 249.5,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'C',
  },


  /* ---------------- C21B ---------------- */

  {
    id: 'C21B',
    name: 'C21B',
    color: '#06b6d4',

    geoJsonCoords: [
      [95.8333, -64.9833],
    ],

    longitude: 95.8333,
    latitude: -64.9833,

    sizeNm: [12, 8],
    lengthNm: 12,
    widthNm: 8,

    areaSqNm: 75.5,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'C',
  },


  /* ---------------- C24 ---------------- */

  {
    id: 'C24',
    name: 'C24',
    color: '#06b6d4',

    geoJsonCoords: [
      [96.0167, -64.8333],
    ],

    longitude: 96.0167,
    latitude: -64.8333,

    sizeNm: [11, 3],
    lengthNm: 11,
    widthNm: 3,

    areaSqNm: 16.87,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'C',
  },


  /* ---------------- C30 ---------------- */

  {
    id: 'C30',
    name: 'C30',
    color: '#06b6d4',

    geoJsonCoords: [
      [96.2833, -64.7833],
    ],

    longitude: 96.2833,
    latitude: -64.7833,

    sizeNm: [9, 3],
    lengthNm: 9,
    widthNm: 3,

    areaSqNm: 21.89,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'C',
  },


  /* ---------------- C31 ---------------- */

  {
    id: 'C31',
    name: 'C31',
    color: '#06b6d4',

    geoJsonCoords: [
      [96.4833, -64.6833],
    ],

    longitude: 96.4833,
    latitude: -64.6833,

    sizeNm: [9, 3],
    lengthNm: 9,
    widthNm: 3,

    areaSqNm: 21.3,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'C',
  },


  /* ---------------- B22A ---------------- */

  {
    id: 'B22A',
    name: 'B22A',
    color: '#06b6d4',

    geoJsonCoords: [
      [174.9167, -69.35],
    ],

    longitude: 174.9167,
    latitude: -69.35,

    sizeNm: [29, 25],
    lengthNm: 29,
    widthNm: 25,

    areaSqNm: 414.92,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'B',
  },


  /* ---------------- B22F ---------------- */

  {
    id: 'B22F',
    name: 'B22F',
    color: '#06b6d4',

    geoJsonCoords: [
      [178.2667, -66.75],
    ],

    longitude: 178.2667,
    latitude: -66.75,

    sizeNm: [14, 7],
    lengthNm: 14,
    widthNm: 7,

    areaSqNm: 69.2,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'B',
  },


  /* ---------------- B22H ---------------- */

  {
    id: 'B22H',
    name: 'B22H',
    color: '#06b6d4',

    geoJsonCoords: [
      [164.1833, -70.25],
    ],

    longitude: 164.1833,
    latitude: -70.25,

    sizeNm: [8, 6],
    lengthNm: 8,
    widthNm: 6,

    areaSqNm: 22.18,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'B',
  },


  /* ==========================================================
     A76C
  ========================================================== */

  {
    id: 'A76C',
    name: 'A76C',
    color: '#06b6d4',

    geoJsonCoords: [
      [-32.3833, -54.1167],
    ],

    longitude: -32.3833,
    latitude: -54.1167,

    sizeNm: [16, 7],
    lengthNm: 16,
    widthNm: 7,

    areaSqNm: 84.9,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'A',
  },


  /* ==========================================================
     A81
  ========================================================== */

  {
    id: 'A81',
    name: 'A81',
    color: '#06b6d4',

    geoJsonCoords: [
      [-54.2, -62.4],
    ],

    longitude: -54.2,
    latitude: -62.4,

    sizeNm: [28, 25],
    lengthNm: 28,
    widthNm: 25,

    areaSqNm: 411.88,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'A',
  },


  /* ==========================================================
     A83
  ========================================================== */

  {
    id: 'A83',
    name: 'A83',
    color: '#06b6d4',

    geoJsonCoords: [
      [-52.5833, -63.7667],
    ],

    longitude: -52.5833,
    latitude: -63.7667,

    sizeNm: [12, 7],
    lengthNm: 12,
    widthNm: 7,

    areaSqNm: 55.34,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'A',
  },


  /* ==========================================================
     A84
  ========================================================== */

  {
    id: 'A84',
    name: 'A84',
    color: '#06b6d4',

    geoJsonCoords: [
      [-108.6, -72.35],
    ],

    longitude: -108.6,
    latitude: -72.35,

    sizeNm: [12, 6],
    lengthNm: 12,
    widthNm: 6,

    areaSqNm: 57.43,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'A',
  },


  /* ==========================================================
     A85
  ========================================================== */

  {
    id: 'A85',
    name: 'A85',
    color: '#06b6d4',

    geoJsonCoords: [
      [-55.5167, -66.2167],
    ],

    longitude: -55.5167,
    latitude: -66.2167,

    sizeNm: [10, 3],
    lengthNm: 10,
    widthNm: 3,

    areaSqNm: 18.26,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'A',
  },


  /* ==========================================================
     B09B
  ========================================================== */

  {
    id: 'B09B',
    name: 'B09B',
    color: '#06b6d4',

    geoJsonCoords: [
      [143.2333, -66.0833],
    ],

    longitude: 143.2333,
    latitude: -66.0833,

    sizeNm: [27, 10],
    lengthNm: 27,
    widthNm: 10,

    areaSqNm: 148.38,

    observationDate: '2026-06-25',

    source: 'USNIC',

    region: 'B',
  },

];


/* ============================================================
   12. COPERNICUS DATA PRODUCTS
============================================================ */

export const copernicusDatasets = {

  /* ----------------------------------------------------------
     GLOBAL SEA ICE
  ---------------------------------------------------------- */

  globalSeaIce: {

    id:
      'SEAICE_GLO_SEAICE_L4_NRT_OBSERVATIONS_011_001',

    name:
      'Global Ocean - Arctic and Antarctic - Sea Ice Concentration, Edge, Type and Drift',

    provider:
      'Copernicus Marine / OSI-SAF',

    source:
      'Satellite observations',

    resolution:
      '10 km concentration/edge/type; 62.5 km drift',

    temporalResolution:
      'Daily',

    variables: [

      'seaIceConcentration',

      'seaIceClassification',

      'seaIceXDisplacement',

      'seaIceYDisplacement',

    ],

    region:
      'Antarctic Ocean',

    status:
      'operational',

  },


  /* ----------------------------------------------------------
     ANTARCTIC HIGH RESOLUTION
  ---------------------------------------------------------- */

  antarcticHighResolution: {

    id:
      'SEAICE_ANT_PHY_AUTO_L3_NRT_011_012',

    name:
      'Antarctic Ocean - High Resolution Sea Ice Information',

    provider:
      'Copernicus Marine',

    source:
      'Satellite observations',

    resolution:
      '1 km',

    temporalResolution:
      'Daily / irregular',

    variables: [

      'seaIceConcentration',

      'seaIceEdge',

    ],

    region:
      'Antarctic Ocean',

    status:
      'near-real-time',

  },


  /* ----------------------------------------------------------
     ANTARCTIC DRIFT
  ---------------------------------------------------------- */

  antarcticDrift: {

    id:
      'SEAICE_ANT_PHY_L3_MY_011_018',

    name:
      'Antarctic Ocean Sea Ice Drift REPROCESSED',

    provider:
      'Copernicus Marine',

    source:
      'Satellite observations',

    resolution:
      '62.5 km',

    temporalResolution:
      'Daily',

    variables: [

      'eastwardSeaIceVelocity',

      'northwardSeaIceVelocity',

    ],

    region:
      'Antarctic Ocean',

    status:
      'reprocessed',

  },

};


/* ============================================================
   13. COPERNICUS ENVIRONMENT
============================================================

   These are placeholders for values returned by your future
   Copernicus backend/API.

============================================================ */

export const copernicusEnvironment = {

  seaIce: {

    concentration:
      null as number | null,

    edgeDistanceKm:
      null as number | null,

    classification:
      null as string | null,

    eastwardDriftMs:
      null as number | null,

    northwardDriftMs:
      null as number | null,

  },


  ocean: {

    seaSurfaceTemperatureC:
      null as number | null,

    oceanCurrentEastMs:
      null as number | null,

    oceanCurrentNorthMs:
      null as number | null,

    salinityPsu:
      null as number | null,

  },


  weather: {

    windSpeedMs:
      null as number | null,

    windDirectionDeg:
      null as number | null,

    waveHeightM:
      null as number | null,

  },

};


/* ============================================================
   14. SELECTED ICEBERG TRAJECTORY
============================================================

   Temporary compatibility object.

============================================================ */

export const icebergTrajectory = {

  id:
    'D23',

  name:
    'D23',

  color:
    '#06b6d4',

  geoJsonCoords: [

    [74.7167, -69.4333],

  ],

  coordinates: [

    74.7167,

    -69.4333,

  ],

};


/* ============================================================
   15. ICEBERG MOTION DATA
============================================================ */

export const icebergMotionData = [

  {
    day:
      'Day 1',

    speed:
      1.2,

    distance:
      0,
  },

  {
    day:
      'Day 2',

    speed:
      1.5,

    distance:
      25,
  },

  {
    day:
      'Day 3',

    speed:
      2.1,

    distance:
      58,
  },

  {
    day:
      'Day 4',

    speed:
      1.8,

    distance:
      92,
  },

];


/* ============================================================
   16. DATASET STATUS
============================================================ */

export const dataStatus = {

  usnic: {

    name:
      'USNIC',

    status:
      'available',

    lastObservation:
      '2026-06-25',

    recordCount:
      icebergs.length,

    description:
      'Antarctic iceberg observations',

  },


  copernicus: {

    name:
      'Copernicus Marine',

    status:
      'dataset-configured',

    description:
      'Sea-ice concentration, edge, classification and drift datasets',

  },

};


/* ============================================================
   17. ICEBERG HELPERS
============================================================ */


/**
 * Find an iceberg by ID.
 */
export const getIcebergById = (
  id: string
) => {

  return icebergs.find(
    (iceberg) =>
      iceberg.id === id
  );

};


/**
 * Return all iceberg positions.
 */
export const getIcebergPositions = () => {

  return icebergs.map(
    (iceberg) => ({

      id:
        iceberg.id,

      name:
        iceberg.name,

      color:
        iceberg.color,

      longitude:
        iceberg.longitude,

      latitude:
        iceberg.latitude,

      lengthNm:
        iceberg.lengthNm,

      widthNm:
        iceberg.widthNm,

      areaSqNm:
        iceberg.areaSqNm,

      observationDate:
        iceberg.observationDate,

      source:
        iceberg.source,

    })
  );

};


/**
 * Find all icebergs in a USNIC region.
 */
export const getIcebergsByRegion = (
  region: string
) => {

  return icebergs.filter(
    (iceberg) =>
      iceberg.region === region
  );

};


/**
 * Get largest iceberg.
 */
export const getLargestIceberg = () => {

  return icebergs.reduce(

    (largest, iceberg) => {

      if (
        iceberg.areaSqNm >
        largest.areaSqNm
      ) {

        return iceberg;

      }

      return largest;

    },

    icebergs[0]

  );

};


/**
 * Convert iceberg records into
 * GeoJSON FeatureCollection.
 */
export const getIcebergGeoJSON = () => {

  return {

    type:
      'FeatureCollection' as const,

    features:

      icebergs.map(
        (iceberg) => ({

          type:
            'Feature' as const,

          geometry: {

            type:
              'Point' as const,

            coordinates: [

              iceberg.longitude,

              iceberg.latitude,

            ],

          },

          properties: {

            id:
              iceberg.id,

            name:
              iceberg.name,

            lengthNm:
              iceberg.lengthNm,

            widthNm:
              iceberg.widthNm,

            areaSqNm:
              iceberg.areaSqNm,

            observationDate:
              iceberg.observationDate,

            source:
              iceberg.source,

          },

        })
      ),

  };

};


/* ============================================================
   18. ROUTE GEOJSON HELPER
============================================================

   Useful for MapLibre / Leaflet / Mapbox / OpenLayers.

============================================================ */

export const getRouteGeoJSON = (
  origin: string,
  destination: string,
  routeType: RouteType
) => {

  const coordinates =
    getMissionRoute(
      origin,
      destination,
      routeType
    );

  return {

    type:
      'Feature' as const,

    geometry: {

      type:
        'LineString' as const,

      coordinates,

    },

    properties: {

      routeId:
        routeType,

      routeName:
        routeMetadata[routeType].name,

      color:
        routeMetadata[routeType].color,

      risk:
        routeMetadata[routeType].risk,

      eta:
        routeMetadata[routeType].eta,

      fuel:
        routeMetadata[routeType].fuel,

      origin,

      destination,

    },

  };

};


/* ============================================================
   19. ALL ROUTES GEOJSON
============================================================ */

export const getAllRoutesGeoJSON = (
  origin: string,
  destination: string
) => {

  return {

    type:
      'FeatureCollection' as const,

    features: (

      [
        'safest',
        'fastest',
        'fuel',
      ] as RouteType[]

    ).map(
      (routeType) =>
        getRouteGeoJSON(
          origin,
          destination,
          routeType
        )
    ),

  };

};
=======
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
>>>>>>> ice
