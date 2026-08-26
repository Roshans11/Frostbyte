import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  VesselProfile,
  GridCell,
  Iceberg,
  RouteResponse,
  ValidationResponse,
  fetchVessels,
  fetchForecastGrid,
  fetchIcebergs,
  fetchRoutes,
  fetchValidation,
  MOCK_VESSELS
} from '../api/client';

export interface LayerToggles {
  sic: boolean;
  icebergs: boolean;
  risk: boolean;
  naiveBaseline: boolean;
}

interface RouteContextType {
  viewMode: '2D' | '3D';
  setViewMode: (mode: '2D' | '3D') => void;
  vessels: VesselProfile[];
  selectedVesselId: string;
  setSelectedVesselId: (id: string) => void;
  horizonHours: number;
  setHorizonHours: (hours: number) => void;
  selectedProfileId: string;
  setSelectedProfileId: (id: string) => void;
  layerToggles: LayerToggles;
  toggleLayer: (key: keyof LayerToggles) => void;
  forecastGrid: GridCell[];
  icebergs: Iceberg[];
  routesData: RouteResponse | null;
  validationData: ValidationResponse | null;
  loading: boolean;
  error: string | null;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const [vessels, setVessels] = useState<VesselProfile[]>(MOCK_VESSELS);
  const [selectedVesselId, setSelectedVesselId] = useState<string>('PC6_RESEARCH');
  const [horizonHours, setHorizonHours] = useState<number>(24);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('SAFEST');
  const [layerToggles, setLayerToggles] = useState<LayerToggles>({
    sic: true,
    icebergs: true,
    risk: true,
    naiveBaseline: true
  });

  const [forecastGrid, setForecastGrid] = useState<GridCell[]>([]);
  const [icebergs, setIcebergs] = useState<Iceberg[]>([]);
  const [routesData, setRoutesData] = useState<RouteResponse | null>(null);
  const [validationData, setValidationData] = useState<ValidationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVessels()
      .then((data) => setVessels(data))
      .catch(() => setVessels(MOCK_VESSELS));
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      fetchForecastGrid(horizonHours),
      fetchIcebergs(horizonHours),
      fetchRoutes(selectedVesselId, horizonHours),
      fetchValidation(horizonHours)
    ])
      .then(([fg, ib, rt, val]) => {
        if (!isMounted) return;
        setForecastGrid(fg.grid || []);
        setIcebergs(ib.icebergs || []);
        setRoutesData(rt);
        setValidationData(val);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('Data fetch error:', err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedVesselId, horizonHours]);

  const toggleLayer = (key: keyof LayerToggles) => {
    setLayerToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <RouteContext.Provider
      value={{
        viewMode,
        setViewMode,
        vessels,
        selectedVesselId,
        setSelectedVesselId,
        horizonHours,
        setHorizonHours,
        selectedProfileId,
        setSelectedProfileId,
        layerToggles,
        toggleLayer,
        forecastGrid,
        icebergs,
        routesData,
        validationData,
        loading,
        error
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useRouteContext = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRouteContext must be used within a RouteProvider');
  }
  return context;
};
