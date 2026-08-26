import React, { useState } from 'react';
import { useRouteContext } from '../../state/RouteContext';
import { RouteProfileCards } from '../panels/RouteProfileCards';
import { ValidationPanel } from '../panels/ValidationPanel';
import { Navigation, Layers, ShieldCheck, ChevronRight, ChevronDown, Eye, EyeOff } from 'lucide-react';

export const SideDrawer: React.FC = () => {
  const { layerToggles, toggleLayer } = useRouteContext();
  const [activeSection, setActiveSection] = useState<'ROUTE' | 'LAYERS' | 'VALIDATION'>('ROUTE');

  const toggleSection = (section: 'ROUTE' | 'LAYERS' | 'VALIDATION') => {
    setActiveSection((prev) => (prev === section ? section : section));
  };

  return (
    <aside style={{
      width: '320px',
      backgroundColor: '#0f172a',
      borderRight: '1px solid #1e293b',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 40,
      boxSizing: 'border-box',
      overflowY: 'auto'
    }}>
      {/* SECTION 1: ROUTE PROFILES */}
      <div style={{ borderBottom: '1px solid #1e293b' }}>
        <button
          onClick={() => toggleSection('ROUTE')}
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: activeSection === 'ROUTE' ? '#1e293b' : 'transparent',
            border: 'none',
            color: '#f8fafc',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Navigation style={{ width: '16px', height: '16px', color: '#38bdf8' }} />
            <span>Route Optimization Profiles</span>
          </div>
          {activeSection === 'ROUTE' ? <ChevronDown style={{ width: '16px', height: '16px' }} /> : <ChevronRight style={{ width: '16px', height: '16px' }} />}
        </button>

        {activeSection === 'ROUTE' && (
          <div style={{ padding: '12px 16px' }}>
            <RouteProfileCards />
          </div>
        )}
      </div>

      {/* SECTION 2: MAP LAYERS TOGGLE */}
      <div style={{ borderBottom: '1px solid #1e293b' }}>
        <button
          onClick={() => toggleSection('LAYERS')}
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: activeSection === 'LAYERS' ? '#1e293b' : 'transparent',
            border: 'none',
            color: '#f8fafc',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers style={{ width: '16px', height: '16px', color: '#38bdf8' }} />
            <span>GIS Map Layer Toggles</span>
          </div>
          {activeSection === 'LAYERS' ? <ChevronDown style={{ width: '16px', height: '16px' }} /> : <ChevronRight style={{ width: '16px', height: '16px' }} />}
        </button>

        {activeSection === 'LAYERS' && (
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#e2e8f0' }}>
              <span>Sea-Ice Concentration Overlay</span>
              <button
                onClick={() => toggleLayer('sic')}
                style={{ background: 'none', border: 'none', color: layerToggles.sic ? '#38bdf8' : '#64748b', cursor: 'pointer' }}
              >
                {layerToggles.sic ? <Eye style={{ width: '16px', height: '16px' }} /> : <EyeOff style={{ width: '16px', height: '16px' }} />}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#e2e8f0' }}>
              <span>Icebergs & Uncertainty Ellipses</span>
              <button
                onClick={() => toggleLayer('icebergs')}
                style={{ background: 'none', border: 'none', color: layerToggles.icebergs ? '#38bdf8' : '#64748b', cursor: 'pointer' }}
              >
                {layerToggles.icebergs ? <Eye style={{ width: '16px', height: '16px' }} /> : <EyeOff style={{ width: '16px', height: '16px' }} />}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#e2e8f0' }}>
              <span>POLARIS Risk Matrix Colors</span>
              <button
                onClick={() => toggleLayer('risk')}
                style={{ background: 'none', border: 'none', color: layerToggles.risk ? '#38bdf8' : '#64748b', cursor: 'pointer' }}
              >
                {layerToggles.risk ? <Eye style={{ width: '16px', height: '16px' }} /> : <EyeOff style={{ width: '16px', height: '16px' }} />}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#e2e8f0' }}>
              <span>Naive Shortest Path Baseline</span>
              <button
                onClick={() => toggleLayer('naiveBaseline')}
                style={{ background: 'none', border: 'none', color: layerToggles.naiveBaseline ? '#e2e8f0' : '#64748b', cursor: 'pointer' }}
              >
                {layerToggles.naiveBaseline ? <Eye style={{ width: '16px', height: '16px' }} /> : <EyeOff style={{ width: '16px', height: '16px' }} />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: VALIDATION & METRICS */}
      <div>
        <button
          onClick={() => toggleSection('VALIDATION')}
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: activeSection === 'VALIDATION' ? '#1e293b' : 'transparent',
            border: 'none',
            color: '#f8fafc',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck style={{ width: '16px', height: '16px', color: '#38bdf8' }} />
            <span>IIEE & 33-ISEA Validation</span>
          </div>
          {activeSection === 'VALIDATION' ? <ChevronDown style={{ width: '16px', height: '16px' }} /> : <ChevronRight style={{ width: '16px', height: '16px' }} />}
        </button>

        {activeSection === 'VALIDATION' && (
          <div style={{ padding: '12px 16px' }}>
            <ValidationPanel />
          </div>
        )}
      </div>
    </aside>
  );
};
