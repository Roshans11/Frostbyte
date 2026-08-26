import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RouteState {
  viewMode: '2D' | '3D';
  setViewMode: (mode: '2D' | '3D') => void;
  vessel: string;
  setVessel: (v: string) => void;
  introFinished: boolean;
  setIntroFinished: (finished: boolean) => void;
}

const RouteContext = createContext<RouteState | undefined>(undefined);

export const RouteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('3D'); // Default to 3D since it starts there
  const [vessel, setVessel] = useState('PC6');
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <RouteContext.Provider value={{ viewMode, setViewMode, vessel, setVessel, introFinished, setIntroFinished }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => {
  const ctx = useContext(RouteContext);
  if (!ctx) throw new Error('useRoute must be used within RouteProvider');
  return ctx;
};
