import React, { useState } from 'react';
import { AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';

export const AppFooter: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <footer style={{
      height: expanded ? 'auto' : '32px',
      backgroundColor: '#0f172a',
      borderTop: '1px solid #1e293b',
      color: '#cbd5e1',
      fontSize: '11px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 16px',
      zIndex: 50,
      position: 'relative',
      boxSizing: 'border-box',
      transition: 'all 0.2s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
          <span>
            <strong>Decision Support System Only:</strong> Human navigator retains ultimate authority for vessel operations.
          </span>
          <span style={{ color: '#64748b' }}>|</span>
          <span style={{ color: '#94a3b8' }}>
            Copernicus OSI-SAF / DMI-ASIP satellite data pipeline
          </span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none',
            border: 'none',
            color: '#38bdf8',
            fontSize: '11px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Info style={{ width: '12px', height: '12px' }} />
          {expanded ? 'Hide Limits' : 'System Disclaimers'}
          {expanded ? <ChevronDown style={{ width: '12px', height: '12px' }} /> : <ChevronUp style={{ width: '12px', height: '12px' }} />}
        </button>
      </div>

      {expanded && (
        <div style={{
          padding: '8px 0 12px 0',
          borderTop: '1px solid #334155',
          fontSize: '11px',
          color: '#94a3b8',
          lineHeight: '1.5'
        }}>
          <p style={{ margin: '0 0 4px 0' }}>
            <strong>Operational Boundaries & Limitations (LIMITATIONS.md):</strong>
          </p>
          <ul style={{ margin: 0, paddingLeft: '18px' }}>
            <li>SAR satellite pass revisits occur at sub-daily to daily intervals; real-time individual iceberg positions have spatial uncertainty ellipses.</li>
            <li>POLARIS Risk Index Outcome (RIO) calculations are deterministic lookup scores per IACS guidelines.</li>
            <li>Primary target region: Antarctic Bharati–Maitri Southern Ocean corridor (-60°S to -70°S, 55°E to 95°E).</li>
          </ul>
        </div>
      )}
    </footer>
  );
};
