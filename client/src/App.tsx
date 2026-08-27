import React, {
  useCallback,
} from 'react';

import {
  RouteProvider,
  useRoute,
} from './state/RouteContext';

import { LandingPage } from './components/landing/LandingPage';

import DashboardLayout from './components/layout/DashboardLayout';

import GlobeView from './components/globe3d/GlobeView';

import MapView from './components/map2d/MapView';


/* ============================================================
   APPLICATION CONTENT
============================================================ */

function AppContent() {

  const {
    viewMode,

    heroLaunched,

    introFinished,

    setHeroLaunched,

    setViewMode,

  } = useRoute();


  /* ==========================================================
     HERO → CINEMATIC GLOBE
  ========================================================== */

  const handleLaunchDashboard = useCallback(
    (
      initialView?: '2D' | '3D' | 'ROUTE' | 'RISK'
    ) => {

      /* ------------------------------------------------------
         SELECT INITIAL VIEW
         
         2D:
           Open dashboard in 2D mode.

         3D:
           Open dashboard in 3D mode.

         ROUTE / RISK:
           Currently open in 3D.
           These can later be connected to specific
           dashboard panels.
      ------------------------------------------------------ */

      if (
        initialView === '2D'
      ) {

        setViewMode(
          '2D'
        );

      } else {

        setViewMode(
          '3D'
        );

      }


      /* ------------------------------------------------------
         START CINEMATIC GLOBE
         
         IMPORTANT:
         
         We DO NOT set introFinished here.
         
         GlobeView controls the cinematic sequence:
         
         FULL EARTH
              ↓
         ANTARCTICA
              ↓
         ICEBERG REGION
              ↓
         setIntroFinished(true)
      ------------------------------------------------------ */

      setHeroLaunched(
        true
      );

    },
    [
      setHeroLaunched,
      setViewMode,
    ]
  );


  /* ==========================================================
     STEP 1 — LANDING / HERO
     
     IMPORTANT:
     
     Do NOT use:
     
       h-screen
       overflow-hidden
     
     around LandingPage.
     
     LandingPage contains multiple sections and therefore needs
     normal vertical page scrolling.
  ========================================================== */

  if (
    !heroLaunched
  ) {

    return (

      <main
        className="
          relative
          w-full
          min-h-screen
          bg-black
          overflow-x-hidden
          overflow-y-auto
        "
      >

        <LandingPage
          onLaunchDashboard={
            handleLaunchDashboard
          }
        />

      </main>

    );

  }


  /* ==========================================================
     STEP 2 — CINEMATIC GLOBE
     
     Dashboard is NOT rendered yet.
     
     This gives GlobeView complete control over:
     
       Full globe
          ↓
       Antarctica
          ↓
       Icebergs
          ↓
       Dashboard
  ========================================================== */

  if (
    heroLaunched &&
    !introFinished
  ) {

    return (

      <div
        className="
          relative
          w-full
          h-screen
          bg-black
          overflow-hidden
        "
      >

        <GlobeView />

      </div>

    );

  }


  /* ==========================================================
     STEP 3 — DASHBOARD
     
     At this point the cinematic intro has completed.
     
     The dashboard becomes a fixed full-screen application.
  ========================================================== */

  return (

    <div
      className="
        relative
        w-full
        h-screen
        bg-black
        overflow-hidden
      "
    >

      {/* ======================================================
          3D GLOBE
      ====================================================== */}

      {viewMode === '3D' && (

        <GlobeView />

      )}


      {/* ======================================================
          2D MAP
      ====================================================== */}

      {viewMode === '2D' && (

        <MapView />

      )}


      {/* ======================================================
          EXISTING DASHBOARD
          
          IMPORTANT:
          DashboardLayout is untouched.
      ====================================================== */}

      <DashboardLayout />

    </div>

  );

}


/* ============================================================
   ROOT APPLICATION
============================================================ */

function App() {

  return (

    <RouteProvider>

      <AppContent />

    </RouteProvider>

  );

}


export default App;