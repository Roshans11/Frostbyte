import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
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
<<<<<<< HEAD
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
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

  viewMode: '2D' | '3D';

  setViewMode: (
    mode: '2D' | '3D'
  ) => void;


<<<<<<< HEAD
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
=======
  /* ----------------------------------------------------------
     VESSEL
  ---------------------------------------------------------- */
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

  vessel: string;

  setVessel: (
    vessel: string
  ) => void;


<<<<<<< HEAD
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
=======
  /* ----------------------------------------------------------
     INTRO
  ---------------------------------------------------------- */
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

  introFinished: boolean;

  setIntroFinished: (
    finished: boolean
  ) => void;


<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
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
<<<<<<< HEAD
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
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

  showTrajectory: boolean;

  setShowTrajectory: (
    show: boolean
  ) => void;
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3


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
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
}> = ({
  children,
}) => {


  /* ==========================================================
     VIEW MODE
<<<<<<< HEAD
=======
>>>>>>> main
}> = ({ children }) => {

  /* ==========================================================
     VIEW
<<<<<<< HEAD
=======
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
  ========================================================== */

  const [
    viewMode,
    setViewMode,
<<<<<<< HEAD
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
=======
  ] = useState<'2D' | '3D'>(
    '3D'
  );
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3


  /* ==========================================================
     VESSEL
  ========================================================== */

  const [
    vessel,
    setVessel,
<<<<<<< HEAD
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
=======
  ] = useState(
    defaultMission.vessel
  );
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3


  /* ==========================================================
     INTRO
  ========================================================== */

  const [
    introFinished,
    setIntroFinished,
<<<<<<< HEAD
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
=======
  ] = useState(
    false
  );
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3


  /* ==========================================================
     SELECTED ROUTE
  ========================================================== */

  const [
    selectedRoute,
    setSelectedRoute,
<<<<<<< HEAD
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
=======
  ] = useState<RouteType>(
    defaultMission.selectedRoute
  );
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3


  /* ==========================================================
     ICEBERG TRAJECTORY
  ========================================================== */

  const [
    showTrajectory,
    setShowTrajectory,
<<<<<<< HEAD
<<<<<<< HEAD
  ] = useState(true);


=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
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

<<<<<<< HEAD
=======
  ] = useState(true);


>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
  return (

    <RouteContext.Provider
      value={{

<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
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

<<<<<<< HEAD
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
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
      }}
    >

      {children}

    </RouteContext.Provider>
<<<<<<< HEAD
<<<<<<< HEAD
  );
=======
<<<<<<< HEAD

  );

=======
  );
>>>>>>> ice
>>>>>>> main
=======

  );

>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
};


/* ============================================================
   HOOK
============================================================ */

export const useRoute = () => {

  const context =
<<<<<<< HEAD
<<<<<<< HEAD
    useContext(RouteContext);
=======
<<<<<<< HEAD
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
    useContext(
      RouteContext
    );

<<<<<<< HEAD
=======
    useContext(RouteContext);
>>>>>>> ice
>>>>>>> main
=======
>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3

  if (!context) {

    throw new Error(
      'useRoute must be used within RouteProvider'
    );

  }

<<<<<<< HEAD
<<<<<<< HEAD
  return context;
=======
<<<<<<< HEAD

  return context;

=======
  return context;
>>>>>>> ice
>>>>>>> main
=======

  return context;

>>>>>>> c1d91b3c42c1f7ff3b29b906db3cd264ef6158d3
};