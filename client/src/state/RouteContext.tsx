import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import {
  defaultMission,
  type RouteType,
} from '../data/mockData';


/* ============================================================
   MISSION CONFIG
============================================================ */

export interface MissionConfig {
  origin: string;

  destination: string;

  vessel: string;

  departureDate: string;

  departureTime: string;

  forecastHours: number;
}


/* ============================================================
   LAYER VISIBILITY
============================================================ */

export interface LayerVisibility {

  /* ----------------------------------------------------------
     ENVIRONMENTAL LAYERS
  ---------------------------------------------------------- */

  seaIce: boolean;

  wind: boolean;

  waves: boolean;

  temperature: boolean;


  /* ----------------------------------------------------------
     ICEBERG LAYERS
  ---------------------------------------------------------- */

  icebergs: boolean;

  trajectory: boolean;


  /* ----------------------------------------------------------
     ROUTE LAYERS
  ---------------------------------------------------------- */

  routeRisk: boolean;
}


/* ============================================================
   ROUTE STATE
============================================================ */

interface RouteState {

  /* ----------------------------------------------------------
     VIEW
  ---------------------------------------------------------- */

  viewMode: '2D' | '3D';

  setViewMode: (
    mode: '2D' | '3D'
  ) => void;


  /* ----------------------------------------------------------
     VESSEL
  ---------------------------------------------------------- */

  vessel: string;

  setVessel: (
    vessel: string
  ) => void;


  /* ----------------------------------------------------------
     INTRO
  ---------------------------------------------------------- */

  introFinished: boolean;

  setIntroFinished: (
    finished: boolean
  ) => void;


  /* ----------------------------------------------------------
     SELECTED ROUTE
  ---------------------------------------------------------- */

  selectedRoute: RouteType;

  setSelectedRoute: (
    route: RouteType
  ) => void;


  /* ----------------------------------------------------------
     ICEBERG TRAJECTORY
  ---------------------------------------------------------- */

  showTrajectory: boolean;

  setShowTrajectory: (
    show: boolean
  ) => void;


  /* ----------------------------------------------------------
     MISSION
  ---------------------------------------------------------- */

  mission: MissionConfig;

  setMission: React.Dispatch<
    React.SetStateAction<MissionConfig>
  >;


  /* ----------------------------------------------------------
     DATA LAYERS
  ---------------------------------------------------------- */

  layerVisibility: LayerVisibility;

  setLayerVisibility: React.Dispatch<
    React.SetStateAction<LayerVisibility>
  >;
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
}> = ({
  children,
}) => {


  /* ==========================================================
     VIEW MODE
  ========================================================== */

  const [
    viewMode,
    setViewMode,
  ] = useState<'2D' | '3D'>(
    '3D'
  );


  /* ==========================================================
     VESSEL
  ========================================================== */

  const [
    vessel,
    setVessel,
  ] = useState(
    defaultMission.vessel
  );


  /* ==========================================================
     INTRO
  ========================================================== */

  const [
    introFinished,
    setIntroFinished,
  ] = useState(
    false
  );


  /* ==========================================================
     SELECTED ROUTE
  ========================================================== */

  const [
    selectedRoute,
    setSelectedRoute,
  ] = useState<RouteType>(
    defaultMission.selectedRoute
  );


  /* ==========================================================
     ICEBERG TRAJECTORY
  ========================================================== */

  const [
    showTrajectory,
    setShowTrajectory,
  ] = useState(
    true
  );


  /* ==========================================================
     MISSION
  ========================================================== */

  const [
    mission,
    setMission,
  ] = useState<MissionConfig>({

    origin:
      defaultMission.origin,

    destination:
      defaultMission.destination,

    vessel:
      defaultMission.vessel,

    departureDate:
      defaultMission.departureDate,

    departureTime:
      defaultMission.departureTime,

    forecastHours:
      defaultMission.forecastHours,

  });


  /* ==========================================================
     DATA LAYER VISIBILITY
  ========================================================== */

  const [
    layerVisibility,
    setLayerVisibility,
  ] = useState<LayerVisibility>({

    /* --------------------------------------------------------
       SEA ICE
       -------------------------------------------------------- */

    seaIce: true,


    /* --------------------------------------------------------
       ICEBERGS
       -------------------------------------------------------- */

    icebergs: true,


    /* --------------------------------------------------------
       TRAJECTORY
       -------------------------------------------------------- */

    trajectory: true,


    /* --------------------------------------------------------
       ENVIRONMENTAL DATA
       -------------------------------------------------------- */

    wind: false,

    waves: false,

    temperature: false,


    /* --------------------------------------------------------
       ROUTE RISK
       -------------------------------------------------------- */

    routeRisk: true,

  });


  /* ==========================================================
     MISSION UPDATE
  ========================================================== */

  const updateMission: React.Dispatch<
    React.SetStateAction<MissionConfig>
  > = (
    value
  ) => {

    setMission(
      (current) => {

        const next =
          typeof value === 'function'
            ? value(current)
            : value;


        /* ----------------------------------------------------
           KEEP TOP-LEVEL VESSEL STATE SYNCHRONIZED
        ---------------------------------------------------- */

        if (
          next.vessel !== vessel
        ) {
          setVessel(
            next.vessel
          );
        }


        return next;

      }
    );

  };


  /* ==========================================================
     PROVIDER
  ========================================================== */

  return (

    <RouteContext.Provider
      value={{

        /* ----------------------------------------------------
           VIEW
        ---------------------------------------------------- */

        viewMode,

        setViewMode,


        /* ----------------------------------------------------
           VESSEL
        ---------------------------------------------------- */

        vessel,

        setVessel,


        /* ----------------------------------------------------
           INTRO
        ---------------------------------------------------- */

        introFinished,

        setIntroFinished,


        /* ----------------------------------------------------
           ROUTE
        ---------------------------------------------------- */

        selectedRoute,

        setSelectedRoute,


        /* ----------------------------------------------------
           ICEBERG
        ---------------------------------------------------- */

        showTrajectory,

        setShowTrajectory,


        /* ----------------------------------------------------
           MISSION
        ---------------------------------------------------- */

        mission,

        setMission:
          updateMission,


        /* ----------------------------------------------------
           DATA LAYERS
        ---------------------------------------------------- */

        layerVisibility,

        setLayerVisibility,

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
    useContext(
      RouteContext
    );


  if (!context) {

    throw new Error(
      'useRoute must be used within RouteProvider'
    );

  }


  return context;

};