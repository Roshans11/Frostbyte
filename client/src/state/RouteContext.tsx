import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

<<<<<<< HEAD
=======
<<<<<<< HEAD
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
=======
>>>>>>> main
interface RouteState {

  /* =========================================================
     VIEW MODE
  ========================================================= */
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main

  viewMode: '2D' | '3D';

  setViewMode: (
    mode: '2D' | '3D'
  ) => void;


<<<<<<< HEAD
  /* =========================================================
     VESSEL
  ========================================================= */
=======
<<<<<<< HEAD
  /* ----------------------------------------------------------
     VESSEL
  ---------------------------------------------------------- */
=======
  /* =========================================================
     VESSEL
  ========================================================= */
>>>>>>> ice
>>>>>>> main

  vessel: string;

  setVessel: (
    vessel: string
  ) => void;


<<<<<<< HEAD
  /* =========================================================
     INTRO
  ========================================================= */
=======
<<<<<<< HEAD
  /* ----------------------------------------------------------
     INTRO
  ---------------------------------------------------------- */
=======
  /* =========================================================
     INTRO
  ========================================================= */
>>>>>>> ice
>>>>>>> main

  introFinished: boolean;

  setIntroFinished: (
    finished: boolean
  ) => void;


<<<<<<< HEAD
=======
<<<<<<< HEAD
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
=======
>>>>>>> main
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
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main

  showTrajectory: boolean;

  setShowTrajectory: (
    show: boolean
  ) => void;
<<<<<<< HEAD
=======
<<<<<<< HEAD


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
=======
>>>>>>> ice
>>>>>>> main
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
}> = ({
  children,
}) => {


  /* ==========================================================
     VIEW MODE
=======
>>>>>>> main
}> = ({ children }) => {

  /* ==========================================================
     VIEW
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
  ========================================================== */

  const [
    viewMode,
    setViewMode,
<<<<<<< HEAD
  ] = useState<'2D' | '3D'>('3D');
=======
<<<<<<< HEAD
  ] = useState<'2D' | '3D'>(
    '3D'
  );
=======
  ] = useState<'2D' | '3D'>('3D');
>>>>>>> ice
>>>>>>> main


  /* ==========================================================
     VESSEL
  ========================================================== */

  const [
    vessel,
    setVessel,
<<<<<<< HEAD
  ] = useState('PC6');
=======
<<<<<<< HEAD
  ] = useState(
    defaultMission.vessel
  );
=======
  ] = useState('PC6');
>>>>>>> ice
>>>>>>> main


  /* ==========================================================
     INTRO
  ========================================================== */

  const [
    introFinished,
    setIntroFinished,
<<<<<<< HEAD
  ] = useState(false);
=======
<<<<<<< HEAD
  ] = useState(
    false
  );
=======
  ] = useState(false);
>>>>>>> ice
>>>>>>> main


  /* ==========================================================
     SELECTED ROUTE
  ========================================================== */

  const [
    selectedRoute,
    setSelectedRoute,
<<<<<<< HEAD
  ] = useState('safest');
=======
<<<<<<< HEAD
  ] = useState<RouteType>(
    defaultMission.selectedRoute
  );
=======
  ] = useState('safest');
>>>>>>> ice
>>>>>>> main


  /* ==========================================================
     ICEBERG TRAJECTORY
  ========================================================== */

  const [
    showTrajectory,
    setShowTrajectory,
<<<<<<< HEAD
  ] = useState(true);


=======
<<<<<<< HEAD
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

=======
  ] = useState(true);


>>>>>>> ice
>>>>>>> main
  return (

    <RouteContext.Provider
      value={{

<<<<<<< HEAD
=======
<<<<<<< HEAD
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

=======
>>>>>>> main
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

<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
      }}
    >

      {children}

    </RouteContext.Provider>
<<<<<<< HEAD
  );
=======
<<<<<<< HEAD

  );

=======
  );
>>>>>>> ice
>>>>>>> main
};


/* ============================================================
   HOOK
============================================================ */

export const useRoute = () => {

  const context =
<<<<<<< HEAD
    useContext(RouteContext);
=======
<<<<<<< HEAD
    useContext(
      RouteContext
    );

=======
    useContext(RouteContext);
>>>>>>> ice
>>>>>>> main

  if (!context) {

    throw new Error(
      'useRoute must be used within RouteProvider'
    );

  }

<<<<<<< HEAD
  return context;
=======
<<<<<<< HEAD

  return context;

=======
  return context;
>>>>>>> ice
>>>>>>> main
};