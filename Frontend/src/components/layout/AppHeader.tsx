import React from 'react';
import { useRouteContext } from '../../state/RouteContext';
import { Compass, Globe, Map, Anchor, Home, ChevronDown } from 'lucide-react';

interface AppHeaderProps {
  onBackToHome?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onBackToHome }) => {
  const {
    viewMode,
    setViewMode,
    vessels,
    selectedVesselId,
    setSelectedVesselId
  } = useRouteContext();

  return (
    <header style={{
      height: '56px',
      background: 'linear-gradient(180deg, #131c31 0%, #0f172a 100%)',
      borderBottom: '1px solid rgba(56, 189, 248, 0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      zIndex: 50,
      position: 'relative',
      boxSizing: 'border-box',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(255,255,255,0.03) inset'
    }}>
      {/* Brand Title + Home Link */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#28354d';
              e.currentTarget.style.borderColor = '#3d5170';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1e293b';
              e.currentTarget.style.borderColor = '#334155';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1e293b',
              color: '#38bdf8',
              border: '1px solid #334155',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Home style={{ width: '14px', height: '14px' }} />
            Home
          </button>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            boxShadow: '0 0 0 1px rgba(56, 189, 248, 0.3), 0 4px 12px rgba(2, 132, 199, 0.4)'
          }}>
            <Compass style={{ color: '#ffffff', width: '18px', height: '18px' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '0.3px', color: '#f8fafc', lineHeight: 1.1 }}>
              IceRoute India
            </div>
            <div style={{
              fontSize: '9px',
              fontWeight: 600,
              color: '#5eead4',
              letterSpacing: '0.8px',
              marginTop: '1px'
            }}>
              SIH26059
            </div>
          </div>
        </div>
      </div>

      {/* Center Controls: View Switcher 2D / 3D */}
      <div style={{
        display: 'flex',
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        padding: '4px',
        borderRadius: '8px',
        border: '1px solid #334155',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)'
      }}>
        <button
          onClick={() => setViewMode('2D')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 600,
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            background: viewMode === '2D' ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' : 'transparent',
            color: viewMode === '2D' ? '#ffffff' : '#94a3b8',
            boxShadow: viewMode === '2D' ? '0 2px 8px rgba(2, 132, 199, 0.5)' : 'none',
            transition: 'all 0.18s ease'
          }}
        >
          <Map style={{ width: '14px', height: '14px' }} />
          2D Map
        </button>

        <button
          onClick={() => setViewMode('3D')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 600,
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            background: viewMode === '3D' ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' : 'transparent',
            color: viewMode === '3D' ? '#ffffff' : '#94a3b8',
            boxShadow: viewMode === '3D' ? '0 2px 8px rgba(2, 132, 199, 0.5)' : 'none',
            transition: 'all 0.18s ease'
          }}
        >
          <Globe style={{ width: '14px', height: '14px' }} />
          3D Globe
        </button>
      </div>

      {/* Right Controls: Vessel Selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        border: '1px solid #334155',
        borderRadius: '8px',
        padding: '5px 10px 5px 12px'
      }}>
        <Anchor style={{ width: '14px', height: '14px', color: '#38bdf8' }} />
        <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>Vessel</span>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <select
            value={selectedVesselId}
            onChange={(e) => setSelectedVesselId(e.target.value)}
            style={{
              appearance: 'none',
              backgroundColor: 'transparent',
              color: '#f8fafc',
              border: 'none',
              borderRadius: '6px',
              padding: '2px 20px 2px 6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {vessels.map((v) => (
              <option key={v.id} value={v.id} style={{ backgroundColor: '#1e293b' }}>
                {v.polar_class} — {v.name}
              </option>
            ))}
          </select>
          <ChevronDown style={{
            width: '12px',
            height: '12px',
            color: '#64748b',
            position: 'absolute',
            right: '2px',
            pointerEvents: 'none'
          }} />
        </div>
      </div>
    </header>
  );
};