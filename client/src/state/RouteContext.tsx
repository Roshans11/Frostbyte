import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

interface RouteState {

  /* =========================================================
     VIEW MODE
  ========================================================= */

  viewMode: '2D' | '3D';

  setViewMode: (
    mode: '2D' | '3D'
  ) => void;


  /* =========================================================
     VESSEL
  ========================================================= */

  vessel: string;

  setVessel: (
    vessel: string
  ) => void;


  /* =========================================================
     INTRO
  ========================================================= */

  introFinished: boolean;

  setIntroFinished: (
    finished: boolean
  ) => void;


  /* =========================================================
     SELECTED ROUTE
  ========================================================= */

  selectedRoute: string;

  setSelectedRoute: (
    route: string
  ) => void;


  /* =========================================================
     ICEBERG TRAJECTORY
  ========================================================= */

  showTrajectory: boolean;

  setShowTrajectory: (
    show: boolean
  ) => void;
}


/* ============================================================
   CONTEXT
============================================================ */

const RouteContext =
  createContext<RouteState | undefined>(
    undefined
  );


/* ============================================================
   PROVIDER
============================================================ */

export const RouteProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {

  /* ==========================================================
     VIEW
  ========================================================== */

  const [
    viewMode,
    setViewMode,
  ] = useState<'2D' | '3D'>('3D');


  /* ==========================================================
     VESSEL
  ========================================================== */

  const [
    vessel,
    setVessel,
  ] = useState('PC6');


  /* ==========================================================
     INTRO
  ========================================================== */

  const [
    introFinished,
    setIntroFinished,
  ] = useState(false);


  /* ==========================================================
     SELECTED ROUTE
  ========================================================== */

  const [
    selectedRoute,
    setSelectedRoute,
  ] = useState('safest');


  /* ==========================================================
     ICEBERG TRAJECTORY
  ========================================================== */

  const [
    showTrajectory,
    setShowTrajectory,
  ] = useState(true);


  return (

    <RouteContext.Provider
      value={{

        viewMode,
        setViewMode,

        vessel,
        setVessel,

        introFinished,
        setIntroFinished,

        selectedRoute,
        setSelectedRoute,

        showTrajectory,
        setShowTrajectory,

      }}
    >

      {children}

    </RouteContext.Provider>
  );
};


/* ============================================================
   HOOK
============================================================ */

export const useRoute = () => {

  const context =
    useContext(RouteContext);

  if (!context) {

    throw new Error(
      'useRoute must be used within RouteProvider'
    );

  }

  return context;
};