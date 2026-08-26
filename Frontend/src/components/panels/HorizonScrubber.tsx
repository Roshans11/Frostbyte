import React from 'react';
import { useRouteContext } from '../../state/RouteContext';
import { Clock } from 'lucide-react';

export const HorizonScrubber: React.FC = () => {
  const { horizonHours, setHorizonHours } = useRouteContext();
  const horizons = [12, 24, 48, 96];

  return (
    <div style={{
      position: 'absolute',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(15, 23, 42, 0.92)',
      backdropFilter: 'blur(8px)',
      border: '1px solid #334155',
      borderRadius: '8px',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      zIndex: 30,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#38bdf8' }}>
        <Clock style={{ width: '15px', height: '15px' }} />
        <span>Forecast Horizon:</span>
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        {horizons.map((h) => (
          <button
            key={h}
            onClick={() => setHorizonHours(h)}
            style={{
              backgroundColor: horizonHours === h ? '#0284c7' : '#1e293b',
              color: horizonHours === h ? '#ffffff' : '#94a3b8',
              border: horizonHours === h ? '1px solid #38bdf8' : '1px solid #334155',
              borderRadius: '4px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            +{h}h
          </button>
        ))}
      </div>
    </div>
  );
};
