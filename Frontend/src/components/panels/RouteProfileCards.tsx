import React from 'react';
import { useRouteContext } from '../../state/RouteContext';
import { Shield, Zap, Flame, Compass, AlertTriangle } from 'lucide-react';

export const RouteProfileCards: React.FC = () => {
  const { routesData, selectedProfileId, setSelectedProfileId } = useRouteContext();

  if (!routesData) {
    return <div style={{ color: '#94a3b8', fontSize: '12px' }}>Loading route profiles...</div>;
  }

  const profiles = [
    { key: 'SAFEST', icon: Shield, color: '#10b981' },
    { key: 'FASTEST', icon: Zap, color: '#3b82f6' },
    { key: 'FUEL_EFFICIENT', icon: Flame, color: '#f59e0b' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {profiles.map(({ key, icon: Icon, color }) => {
        const route = routesData.ranked_routes.find((r) => r.profile_id === key);
        if (!route) return null;

        const isSelected = selectedProfileId === key;

        return (
          <div
            key={key}
            onClick={() => setSelectedProfileId(key)}
            style={{
              backgroundColor: isSelected ? '#1e293b' : '#0f172a',
              border: isSelected ? `2px solid ${color}` : '1px solid #334155',
              borderRadius: '8px',
              padding: '10px 12px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon style={{ width: '15px', height: '15px', color }} />
                <span style={{ fontWeight: 700, fontSize: '13px', color: '#f8fafc' }}>
                  {route.name}
                </span>
              </div>
              <span style={{ fontSize: '10px', backgroundColor: '#334155', color: '#cbd5e1', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                {key}
              </span>
            </div>

            <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#94a3b8', lineHeight: '1.3' }}>
              {route.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', backgroundColor: '#020617', padding: '6px', borderRadius: '6px', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>DIST</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#f8fafc' }}>{route.total_distance_nm} NM</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>ETA</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#f8fafc' }}>{route.estimated_days} days</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>FUEL</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#f8fafc' }}>{route.estimated_fuel_tons} t</div>
              </div>
            </div>
          </div>
        );
      })}

      {routesData.naive_baseline && (
        <div
          onClick={() => setSelectedProfileId('NAIVE')}
          style={{
            backgroundColor: selectedProfileId === 'NAIVE' ? '#1e293b' : '#0f172a',
            border: selectedProfileId === 'NAIVE' ? '2px solid #94a3b8' : '1px dashed #475569',
            borderRadius: '8px',
            padding: '10px 12px',
            cursor: 'pointer',
            marginTop: '4px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass style={{ width: '15px', height: '15px', color: '#94a3b8' }} />
              <span style={{ fontWeight: 600, fontSize: '12px', color: '#e2e8f0' }}>
                Naive Shortest Path (Baseline)
              </span>
            </div>
            <AlertTriangle style={{ width: '13px', height: '13px', color: '#f59e0b' }} />
          </div>

          <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '6px' }}>
            Ignores sea-ice concentration & iceberg hazards. Pure distance line.
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '11px', color: '#cbd5e1' }}>
            <span>Dist: <strong>{routesData.naive_baseline.total_distance_nm} NM</strong></span>
            <span>ETA: <strong>{routesData.naive_baseline.estimated_days} days</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
