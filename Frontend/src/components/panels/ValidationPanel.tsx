import React from 'react';
import { useRouteContext } from '../../state/RouteContext';
import { Award, CheckCircle2, TrendingUp } from 'lucide-react';

export const ValidationPanel: React.FC = () => {
  const { validationData } = useRouteContext();

  if (!validationData) {
    return <div style={{ color: '#94a3b8', fontSize: '12px' }}>Loading validation metrics...</div>;
  }

  const { model_validation, historical_backtest } = validationData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: 700, marginBottom: '8px' }}>
          <TrendingUp style={{ width: '15px', height: '15px' }} />
          <span>Integrated Ice-Edge Error (IIEE)</span>
        </div>

        <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#94a3b8', lineHeight: '1.4' }}>
          Evaluated area of disagreement at 15% ice-edge threshold over +{model_validation.horizon_hours}h forecast horizon:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', backgroundColor: '#0f172a', borderRadius: '4px' }}>
            <span style={{ color: '#cbd5e1' }}>LightGBM Model IIEE:</span>
            <strong style={{ color: '#10b981' }}>{model_validation.iiee_lightgbm_km2.toLocaleString()} km²</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', backgroundColor: '#0f172a', borderRadius: '4px' }}>
            <span style={{ color: '#cbd5e1' }}>Persistence Baseline:</span>
            <span style={{ color: '#ef4444' }}>{model_validation.iiee_persistence_km2.toLocaleString()} km²</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', paddingTop: '4px', borderTop: '1px solid #334155' }}>
            <span style={{ color: '#94a3b8', fontSize: '11px' }}>Forecast Improvement:</span>
            <span style={{ color: '#10b981', fontWeight: 700, fontSize: '13px' }}>
              +{model_validation.iiee_improvement_percent}% vs Persistence
            </span>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 700, marginBottom: '8px' }}>
          <Award style={{ width: '15px', height: '15px' }} />
          <span>33-ISEA Antarctic Voyage Backtest</span>
        </div>

        <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>
          <strong>Reference:</strong> {historical_backtest.reference_expedition} ({historical_backtest.vessel_used})
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: '#0f172a', padding: '8px', borderRadius: '6px', fontSize: '11px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#cbd5e1' }}>Historical Sailed Days:</span>
            <strong style={{ color: '#cbd5e1' }}>{historical_backtest.historical_transit_days} days</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#38bdf8' }}>IceRoute Safest Model:</span>
            <strong style={{ color: '#38bdf8' }}>{historical_backtest.iceroute_safest_model_days} days</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#10b981' }}>Fuel Saved:</span>
            <strong style={{ color: '#10b981' }}>{historical_backtest.iceroute_fuel_saved_tons} tons</strong>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', color: '#10b981', fontSize: '11px', fontWeight: 600 }}>
          <CheckCircle2 style={{ width: '14px', height: '14px' }} />
          <span>{historical_backtest.risk_mitigation_score}</span>
        </div>
      </div>
    </div>
  );
};
