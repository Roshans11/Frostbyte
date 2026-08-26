import React, { useState } from 'react';
import { RouteProvider, useRouteContext } from './state/RouteContext';
import { LandingPage } from './components/landing/LandingPage';
import { AppHeader } from './components/layout/AppHeader';
import { AppFooter } from './components/layout/AppFooter';
import { SideDrawer } from './components/layout/SideDrawer';
import { MapView } from './components/map2d/MapView';
import { GlobeView } from './components/globe3d/GlobeView';
import { HorizonScrubber } from './components/panels/HorizonScrubber';
import { AlertCircle } from 'lucide-react';

const DashboardLayout: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const { viewMode, error } = useRouteContext();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#070d19',
      color: '#f8fafc',
      overflow: 'hidden'
    }}>
      <AppHeader onBackToHome={onBackToHome} />

      <div style={{
        display: 'flex',
        flex: 1,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <SideDrawer />

        <main style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#070d19'
        }}>
          {error && (
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(239, 68, 68, 0.95)',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
            }}>
              <AlertCircle style={{ width: '16px', height: '16px' }} />
              <span>{error}</span>
            </div>
          )}

          {viewMode === '2D' ? <MapView /> : <GlobeView />}

          <HorizonScrubber />
        </main>
      </div>

      <AppFooter />
    </div>
  );
};

export const AppContent: React.FC = () => {
  const [screen, setScreen] = useState<'LANDING' | 'DASHBOARD'>('LANDING');
  const { setViewMode } = useRouteContext();

  const handleLaunchDashboard = (targetMode?: '2D' | '3D' | 'ROUTE' | 'RISK') => {
    if (targetMode === '3D') {
      setViewMode('3D');
    } else {
      setViewMode('2D');
    }
    setScreen('DASHBOARD');
  };

  if (screen === 'LANDING') {
    return <LandingPage onLaunchDashboard={handleLaunchDashboard} />;
  }

  return <DashboardLayout onBackToHome={() => setScreen('LANDING')} />;
};

export const App: React.FC = () => {
  return (
    <RouteProvider>
      <AppContent />
    </RouteProvider>
  );
};

export default App;
