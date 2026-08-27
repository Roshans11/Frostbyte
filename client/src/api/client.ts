/**
 * Standalone API Client for IceRoute India Application
 * Provides full mock data generators for sea-ice grids, icebergs, POLARIS risk metrics, and routes
 * so the frontend runs standalone with zero external dependencies.
 */

const API_BASE = 'http://localhost:8000';

export interface VesselProfile {
  id: string;
  name: string;
  type: string;
  polar_class: string;
  description: string;
  draft_m: number;
  design_speed_knots: number;
  base_fuel_tons_per_day: number;
  polaris_rio_threshold: number;
}

export interface GridCell {
  lat: number;
  lon: number;
  base_sic: number;
  forecast_sic: number;
  horizon_hours: number;
  wind_speed_knots: number;
  wave_height_m: number;
}

export interface Iceberg {
  id: string;
  name: string;
  length_m: number;
  confidence: number;
  initial_position: { lat: number; lon: number };
  projected_position: { lat: number; lon: number };
  horizon_hours: number;
  drift_speed_knots: number;
  uncertainty_ellipse: {
    semi_major_km: number;
    semi_minor_km: number;
    orientation_deg: number;
  };
}

export interface RouteWaypoint {
  lat: number;
  lon: number;
  sic_percent: number;
  polaris_rio: number;
  risk_band: string;
  risk_label: string;
  composite_risk: number;
}

export interface RankedRoute {
  profile_id: string;
  name: string;
  description: string;
  total_distance_nm: number;
  estimated_hours: number;
  estimated_days: number;
  estimated_fuel_tons: number;
  risk_summary: {
    low_risk_percent: number;
    moderate_risk_percent: number;
    high_risk_percent: number;
  };
  waypoints: RouteWaypoint[];
}

export interface RouteResponse {
  horizon_hours: number;
  vessel: VesselProfile;
  naive_baseline: RankedRoute;
  ranked_routes: RankedRoute[];
}

export interface ValidationResponse {
  model_validation: {
    horizon_hours: number;
    total_evaluated_cells: number;
    mae_lightgbm_percent: number;
    mae_persistence_percent: number;
    iiee_lightgbm_km2: number;
    iiee_persistence_km2: number;
    iiee_improvement_percent: number;
  };
  historical_backtest: {
    reference_expedition: string;
    vessel_used: string;
    historical_transit_days: number;
    iceroute_safest_model_days: number;
    iceroute_fuel_saved_tons: number;
    risk_mitigation_score: string;
    waypoints: any[];
  };
}

// Standalone Mock Datasets
export const MOCK_VESSELS: VesselProfile[] = [
  {
    id: "PC6_RESEARCH",
    name: "SA Agulhas II (Expedition Vessel)",
    type: "Ice-Strengthened Supply & Research Ship",
    polar_class: "PC6",
    description: "Medium ice-strengthened vessel for summer/autumn operation in medium first-year ice.",
    draft_m: 7.6,
    design_speed_knots: 14.0,
    base_fuel_tons_per_day: 20.0,
    polaris_rio_threshold: 0
  },
  {
    id: "PC3_ICEBREAKER",
    name: "MV Kapitan Khlebnikov / Indian Polar Research Vessel",
    type: "Polar Icebreaker",
    polar_class: "PC3",
    description: "Heavy icebreaker capable of year-round operation in second-year ice including multi-year ice inclusions.",
    draft_m: 8.5,
    design_speed_knots: 15.0,
    base_fuel_tons_per_day: 28.0,
    polaris_rio_threshold: -10
  },
  {
    id: "NON_ICE_STRENGTHENED",
    name: "Conventional Cargo Vessel (Non-Ice)",
    type: "Standard Ocean Freight Cargo",
    polar_class: "NON_ICE",
    description: "Standard hull vessel with no structural ice reinforcement. Restricted to open water.",
    draft_m: 10.2,
    design_speed_knots: 16.0,
    base_fuel_tons_per_day: 24.0,
    polaris_rio_threshold: 10
  }
];

export const generateMockGrid = (horizonHours: number): GridCell[] => {
  const cells: GridCell[] = [];
  for (let lat = -70.0; lat <= -60.0; lat += 0.8) {
    for (let lon = 55.0; lon <= 95.0; lon += 1.5) {
      const latFactor = (-60.0 - lat) / 10.0;
      const baseSic = Math.min(100, Math.max(0, Math.sin(latFactor * Math.PI / 2) * 85 + ((lat * lon) % 15 - 7)));
      const shift = (horizonHours / 96.0) * Math.cos(lon * 0.1) * 8.0;
      cells.push({
        lat: Math.round(lat * 100) / 100,
        lon: Math.round(lon * 100) / 100,
        base_sic: Math.round(baseSic * 10) / 10,
        forecast_sic: Math.round(Math.min(100, Math.max(0, baseSic + shift)) * 10) / 10,
        horizon_hours: horizonHours,
        wind_speed_knots: 14.5,
        wave_height_m: 1.8
      });
    }
  }
  return cells;
};

export const generateMockIcebergs = (horizonHours: number): Iceberg[] => {
  const growth = Math.pow(horizonHours / 12.0, 1.15);
  return [
    {
      id: "BERG-2026-001",
      name: "A-74 Sub-fragment Alpha",
      length_m: 850,
      confidence: 0.94,
      initial_position: { lat: -67.20, lon: 68.50 },
      projected_position: { lat: -67.35, lon: 68.95 },
      horizon_hours: horizonHours,
      drift_speed_knots: 0.49,
      uncertainty_ellipse: {
        semi_major_km: Math.round((1.5 + growth * 3.2) * 10) / 10,
        semi_minor_km: Math.round((1.1 + growth * 1.8) * 10) / 10,
        orientation_deg: 335.0
      }
    },
    {
      id: "BERG-2026-002",
      name: "B-15 K-remnant",
      length_m: 1200,
      confidence: 0.98,
      initial_position: { lat: -65.80, lon: 74.10 },
      projected_position: { lat: -65.92, lon: 74.70 },
      horizon_hours: horizonHours,
      drift_speed_knots: 0.62,
      uncertainty_ellipse: {
        semi_major_km: Math.round((1.5 + growth * 3.5) * 10) / 10,
        semi_minor_km: Math.round((1.1 + growth * 2.0) * 10) / 10,
        orientation_deg: 345.0
      }
    },
    {
      id: "BERG-2026-003",
      name: "D-28 Fast Berg",
      length_m: 450,
      confidence: 0.89,
      initial_position: { lat: -68.50, lon: 82.00 },
      projected_position: { lat: -68.75, lon: 82.35 },
      horizon_hours: horizonHours,
      drift_speed_knots: 0.46,
      uncertainty_ellipse: {
        semi_major_km: Math.round((1.5 + growth * 2.8) * 10) / 10,
        semi_minor_km: Math.round((1.1 + growth * 1.5) * 10) / 10,
        orientation_deg: 310.0
      }
    }
  ];
};

export const generateMockRoutes = (vesselId: string, horizonHours: number): RouteResponse => {
  const vessel = MOCK_VESSELS.find(v => v.id === vesselId) || MOCK_VESSELS[0];
  
  const safestWaypoints: RouteWaypoint[] = [
    { lat: -63.50, lon: 64.00, sic_percent: 5.0, polaris_rio: 3, risk_band: "LOW_RISK", risk_label: "Normal Operation", composite_risk: 3.0 },
    { lat: -64.20, lon: 66.50, sic_percent: 18.0, polaris_rio: 2, risk_band: "LOW_RISK", risk_label: "Normal Operation", composite_risk: 2.5 },
    { lat: -65.50, lon: 70.20, sic_percent: 28.0, polaris_rio: 2, risk_band: "LOW_RISK", risk_label: "Normal Operation", composite_risk: 2.1 },
    { lat: -67.10, lon: 73.80, sic_percent: 38.0, polaris_rio: 1, risk_band: "LOW_RISK", risk_label: "Normal Operation", composite_risk: 1.5 },
    { lat: -69.41, lon: 76.19, sic_percent: 45.0, polaris_rio: 0, risk_band: "MODERATE_RISK", risk_label: "Elevated Caution Required", composite_risk: 0.2 }
  ];

  const fastestWaypoints: RouteWaypoint[] = [
    { lat: -63.50, lon: 64.00, sic_percent: 5.0, polaris_rio: 3, risk_band: "LOW_RISK", risk_label: "Normal Operation", composite_risk: 3.0 },
    { lat: -65.00, lon: 68.00, sic_percent: 32.0, polaris_rio: 2, risk_band: "LOW_RISK", risk_label: "Normal Operation", composite_risk: 1.8 },
    { lat: -67.00, lon: 72.00, sic_percent: 52.0, polaris_rio: 0, risk_band: "MODERATE_RISK", risk_label: "Elevated Caution Required", composite_risk: 0.1 },
    { lat: -69.41, lon: 76.19, sic_percent: 65.0, polaris_rio: -2, risk_band: "MODERATE_RISK", risk_label: "Elevated Caution Required", composite_risk: -1.5 }
  ];

  const fuelWaypoints: RouteWaypoint[] = [
    { lat: -63.50, lon: 64.00, sic_percent: 5.0, polaris_rio: 3, risk_band: "LOW_RISK", risk_label: "Normal Operation", composite_risk: 3.0 },
    { lat: -64.80, lon: 67.20, sic_percent: 22.0, polaris_rio: 2, risk_band: "LOW_RISK", risk_label: "Normal Operation", composite_risk: 2.2 },
    { lat: -66.50, lon: 71.50, sic_percent: 34.0, polaris_rio: 1, risk_band: "LOW_RISK", risk_label: "Normal Operation", composite_risk: 1.4 },
    { lat: -69.41, lon: 76.19, sic_percent: 48.0, polaris_rio: 0, risk_band: "MODERATE_RISK", risk_label: "Elevated Caution Required", composite_risk: 0.0 }
  ];

  const naiveWaypoints: RouteWaypoint[] = [
    { lat: -63.50, lon: 64.00, sic_percent: 5.0, polaris_rio: 3, risk_band: "LOW_RISK", risk_label: "Normal Operation", composite_risk: 3.0 },
    { lat: -66.45, lon: 70.10, sic_percent: 68.0, polaris_rio: -4, risk_band: "HIGH_RISK", risk_label: "Severe Operational Hazard", composite_risk: -5.2 },
    { lat: -69.41, lon: 76.19, sic_percent: 85.0, polaris_rio: -8, risk_band: "HIGH_RISK", risk_label: "Severe Operational Hazard", composite_risk: -9.1 }
  ];

  return {
    horizon_hours: horizonHours,
    vessel,
    naive_baseline: {
      profile_id: "NAIVE",
      name: "Naive Shortest Path (Baseline)",
      description: "Direct geographic route ignoring sea-ice concentration and iceberg hazard risk.",
      total_distance_nm: 442.0,
      estimated_hours: 88.4,
      estimated_days: 3.7,
      estimated_fuel_tons: 18.5,
      risk_summary: { low_risk_percent: 33.3, moderate_risk_percent: 0.0, high_risk_percent: 66.7 },
      waypoints: naiveWaypoints
    },
    ranked_routes: [
      {
        profile_id: "SAFEST",
        name: "Safest Route",
        description: "Maximizes ice clearance & iceberg buffer distance. Strictly avoids elevated risk zones.",
        total_distance_nm: 496.6,
        estimated_hours: 98.2,
        estimated_days: 4.1,
        estimated_fuel_tons: 12.2,
        risk_summary: { low_risk_percent: 80.0, moderate_risk_percent: 20.0, high_risk_percent: 0.0 },
        waypoints: safestWaypoints
      },
      {
        profile_id: "FASTEST",
        name: "Fastest Route",
        description: "Prioritizes minimal transit duration, utilizing maximum safe speed limits.",
        total_distance_nm: 462.1,
        estimated_hours: 79.5,
        estimated_days: 3.3,
        estimated_fuel_tons: 15.8,
        risk_summary: { low_risk_percent: 50.0, moderate_risk_percent: 50.0, high_risk_percent: 0.0 },
        waypoints: fastestWaypoints
      },
      {
        profile_id: "FUEL_EFFICIENT",
        name: "Fuel-Efficient Route",
        description: "Minimizes heavy engine loading and hull ice resistance to reduce fuel burn.",
        total_distance_nm: 478.4,
        estimated_hours: 91.0,
        estimated_days: 3.8,
        estimated_fuel_tons: 10.9,
        risk_summary: { low_risk_percent: 75.0, moderate_risk_percent: 25.0, high_risk_percent: 0.0 },
        waypoints: fuelWaypoints
      }
    ]
  };
};

export const MOCK_VALIDATION: ValidationResponse = {
  model_validation: {
    horizon_hours: 24,
    total_evaluated_cells: 861,
    mae_lightgbm_percent: 3.2,
    mae_persistence_percent: 8.7,
    iiee_lightgbm_km2: 15510.0,
    iiee_persistence_km2: 36190.0,
    iiee_improvement_percent: 57.1
  },
  historical_backtest: {
    reference_expedition: "33rd Indian Scientific Expedition to Antarctica (33-ISEA)",
    vessel_used: "MV Kapitan Khlebnikov (Polar Class 3 Icebreaker)",
    historical_transit_days: 18.5,
    iceroute_safest_model_days: 17.2,
    iceroute_fuel_saved_tons: 38.5,
    risk_mitigation_score: "100% Zero POLARIS Violations",
    waypoints: []
  }
};

export const fetchVessels = async (): Promise<VesselProfile[]> => {
  try {
    const res = await fetch(`${API_BASE}/vessels`);
    if (res.ok) return await res.json();
  } catch (e) {}
  return MOCK_VESSELS;
};

export const fetchForecastGrid = async (horizonHours: number = 24): Promise<{ grid: GridCell[] }> => {
  try {
    const res = await fetch(`${API_BASE}/forecast?horizon_hours=${horizonHours}`);
    if (res.ok) return await res.json();
  } catch (e) {}
  return { grid: generateMockGrid(horizonHours) };
};

export const fetchIcebergs = async (horizonHours: number = 24): Promise<{ icebergs: Iceberg[] }> => {
  try {
    const res = await fetch(`${API_BASE}/icebergs?horizon_hours=${horizonHours}`);
    if (res.ok) return await res.json();
  } catch (e) {}
  return { icebergs: generateMockIcebergs(horizonHours) };
};

export const fetchRoutes = async (vesselId: string, horizonHours: number): Promise<RouteResponse> => {
  try {
    const res = await fetch(`${API_BASE}/route?vessel_id=${vesselId}&horizon_hours=${horizonHours}&origin_lat=-63.5&origin_lon=64.0&dest_lat=-69.41&dest_lon=76.19`);
    if (res.ok) return await res.json();
  } catch (e) {}
  return generateMockRoutes(vesselId, horizonHours);
};

export const fetchValidation = async (horizonHours: number = 24): Promise<ValidationResponse> => {
  try {
    const res = await fetch(`${API_BASE}/validation?horizon_hours=${horizonHours}`);
    if (res.ok) return await res.json();
  } catch (e) {}
  return MOCK_VALIDATION;
};
