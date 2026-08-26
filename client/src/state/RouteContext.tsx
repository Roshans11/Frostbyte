import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import {
  defaultMission,
} from '../data/mockData';

import type {
  RouteType,
} from '../data/mockData';


/* ============================================================
   MISSION TYPE
============================================================ */

export interface MissionState {

  /* Origin location ID */
  origin: string;

  /* Destination location ID */
  destination: string;

  /* Vessel / polar class */
  vessel: string;

  /* Departure date */
  departureDate: string;

  /* Departure time */
  departureTime: string;

  /* Forecast duration in hours */
  forecastHours: number;

}


/* ============================================================
   ROUTE STATE
============================================================ */

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

  selectedRoute: RouteType;

  setSelectedRoute: (
    route: RouteType
  ) => void;


  /* =========================================================
     MISSION
  ========================================================= */

  mission: MissionState;

  setMission: React.Dispatch<
    React.SetStateAction<MissionState>
  >;


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
  ] = useState<string>(
    defaultMission.vessel
  );


  /* ==========================================================
     INTRO
  ========================================================== */

  const [
    introFinished,
    setIntroFinished,
  ] = useState<boolean>(
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
     MISSION
  ========================================================== */

  const [
    mission,
    setMission,
  ] = useState<MissionState>({
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
     ICEBERG TRAJECTORY
  ========================================================== */

  const [
    showTrajectory,
    setShowTrajectory,
  ] = useState<boolean>(
    true
  );


  /* ==========================================================
     KEEP VESSEL STATE + MISSION VESSEL IN SYNC
  ========================================================== */

  const handleSetVessel = (
    newVessel: string
  ) => {

    setVessel(
      newVessel
    );

    setMission(
      (current) => ({
        ...current,
        vessel:
          newVessel,
      })
    );
  };


  /* ==========================================================
     PROVIDER
  ========================================================== */

  return (
    <RouteContext.Provider
      value={{

        /* VIEW */

        viewMode,

        setViewMode,


        /* VESSEL */

        vessel,

        setVessel:
          handleSetVessel,


        /* INTRO */

        introFinished,

        setIntroFinished,


        /* ROUTE */

        selectedRoute,

        setSelectedRoute,


        /* MISSION */

        mission,

        setMission,


        /* ICEBERG */

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

export const useRoute = (): RouteState => {

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