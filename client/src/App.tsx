import React from 'react';
import { RouteProvider, useRoute } from './state/RouteContext';
import GlobeView from './components/globe3d/GlobeView';
import MapView from './components/map2d/MapView';
import DashboardLayout from './components/layout/DashboardLayout';

function AppContent() {
  const { viewMode, introFinished } = useRoute();

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Globe is ALWAYS mounted. It handles the intro animation and serves as the background.
          When intro finishes, it becomes transparent to serve as a background layer, 
          OR it stays active if viewMode === '3D'. */}
      <GlobeView />

      {/* 2D MapView is only shown when viewMode is '2D' AND intro is finished */}
      {introFinished && viewMode === '2D' && (
        <MapView />
      )}

      {/* The Dashboard UI overlay */}
      <DashboardLayout />
    </div>
  );
}

function App() {
  return (
    <RouteProvider>
      <AppContent />
    </RouteProvider>
  );
}

export default App;
