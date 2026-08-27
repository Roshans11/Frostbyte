import React, { useState } from 'react';
import {
  Shield,
  Activity,
  Navigation,
  Crosshair,
  Maximize2,
  TrendingUp,
  Wind,
  Waves,
  Compass,
  Clock,
  Terminal,
  Layers,
  MapPin,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useRoute } from '../../../state/RouteContext';
import { icebergs } from '../../../data/mockData';

/* DRIFT TRAJECTORY MOCK DATA PER ICEBERG */
const icebergTrajectoriesData: Record<string, Array<{ hour: string; speed: number; distance: number; heading: number }>> = {
  D23: [
    { hour: '+0h', speed: 0.4, distance: 0, heading: 240 },
    { hour: '+16h', speed: 0.7, distance: 8.8, heading: 242 },
    { hour: '+32h', speed: 1.1, distance: 23.2, heading: 248 },
    { hour: '+48h', speed: 0.9, distance: 39.2, heading: 251 },
    { hour: '+64h', speed: 1.4, distance: 57.6, heading: 255 },
    { hour: '+80h', speed: 1.2, distance: 78.4, heading: 258 },
    { hour: '+96h', speed: 0.8, distance: 94.4, heading: 260 },
  ],
  B09G: [
    { hour: '+0h', speed: 0.3, distance: 0, heading: 180 },
    { hour: '+16h', speed: 0.5, distance: 6.4, heading: 185 },
    { hour: '+32h', speed: 0.8, distance: 16.8, heading: 192 },
    { hour: '+48h', speed: 1.2, distance: 32.8, heading: 198 },
    { hour: '+64h', speed: 1.0, distance: 50.4, heading: 202 },
    { hour: '+80h', speed: 0.7, distance: 64.0, heading: 205 },
    { hour: '+96h', speed: 0.5, distance: 73.6, heading: 210 },
  ],
  D15A: [
    { hour: '+0h', speed: 0.5, distance: 0, heading: 310 },
    { hour: '+16h', speed: 0.9, distance: 11.2, heading: 315 },
    { hour: '+32h', speed: 1.3, distance: 28.8, heading: 320 },
    { hour: '+48h', speed: 1.6, distance: 52.0, heading: 322 },
    { hour: '+64h', speed: 1.2, distance: 74.4, heading: 325 },
    { hour: '+80h', speed: 1.0, distance: 92.0, heading: 328 },
    { hour: '+96h', speed: 0.6, distance: 104.8, heading: 330 },
  ],
};

export const SystemPanel: React.FC = () => {
  const { setIsFullScreen } = useRoute();

  const [selectedIcebergId, setSelectedIcebergId] = useState<string>('D23');
  const [logs] = useState<string[]>([
    '[PINN] Iceberg trajectory drift dynamics initialized',
    '[USNIC] 24 active Antarctic iceberg vectors tracked',
    '[DRIFT] PINN physics engine velocity loss: 0.012 NM',
    '[HYDRO] Wind (C_da 0.0018) & Current (C_dw 0.0045) coupled',
    '[TRAJECTORY] 96h forward prediction curve updated',
    '[SAFETY] Clearance buffer > 18.2 NM maintained',
  ]);

  const activeIceberg = icebergs.find((i) => i.id === selectedIcebergId) || icebergs[0];
  const activeTrajectory = icebergTrajectoriesData[selectedIcebergId] || icebergTrajectoriesData['D23'];

  return (
    <div className="p-4 space-y-4 text-slate-100">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold tracking-wider text-cyan-300 uppercase">
            Iceberg Trajectory & Movement Graph
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsFullScreen(true)}
            title="View in Full Screen"
            className="p-1 rounded-md bg-cyan-400/10 border border-cyan-300/20 text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all flex items-center gap-1 text-[8px] font-bold"
          >
            <Maximize2 className="w-3 h-3" /> FULLSCREEN
          </button>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-300/20 text-cyan-300 font-mono">
            96H FORECAST
          </span>
        </div>
      </div>

      {/* ICEBERG SELECTION CHIPS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {['D23', 'B09G', 'D15A'].map((id) => (
          <button
            key={id}
            onClick={() => setSelectedIcebergId(id)}
            className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold transition-all ${
              selectedIcebergId === id
                ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                : 'bg-black/30 border border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {id} DRIFT GRAPH
          </button>
        ))}
      </div>

      {/* ICEBERG METRICS HUD */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border border-cyan-400/20 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold font-mono text-slate-100">{activeIceberg.name} Movement Dynamics</span>
          </div>
          <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-bold">
            REG {activeIceberg.region}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono pt-2 border-t border-white/5">
          <div>
            <span className="text-slate-500 block text-[8px]">AREA</span>
            <span className="font-bold text-cyan-300">{activeIceberg.areaSqNm} sq NM</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[8px]">DRIFT SPEED</span>
            <span className="font-bold text-emerald-400">{activeTrajectory[3].speed} knots</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[8px]">MAX DISPLACEMENT</span>
            <span className="font-bold text-slate-200">{activeTrajectory[6].distance} NM</span>
          </div>
        </div>
      </div>

      {/* DRIFT VELOCITY GRAPH */}
      <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400" /> Drift Velocity Curve ({selectedIcebergId})
          </span>
          <span className="text-[8px] text-slate-500 font-mono">0h → 96h KNOTS</span>
        </div>

        <div className="h-44 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeTrajectory}>
              <defs>
                <linearGradient id="sysIcebergGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={9} />
              <YAxis stroke="#64748b" fontSize={9} unit=" kts" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
              <Area type="monotone" dataKey="speed" stroke="#22d3ee" fillOpacity={1} fill="url(#sysIcebergGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CUMULATIVE DISPLACEMENT GRAPH */}
      <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1.5 text-teal-300">
            <Compass className="w-3.5 h-3.5 text-teal-400" /> Cumulative Drift Displacement
          </span>
          <span className="text-[8px] text-slate-500 font-mono">NAUTICAL MILES</span>
        </div>

        <div className="h-36 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activeTrajectory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={9} />
              <YAxis stroke="#64748b" fontSize={9} unit=" NM" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
              <Line type="monotone" dataKey="distance" stroke="#2dd4bf" strokeWidth={2} dot={{ fill: '#2dd4bf', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TRAJECTORY LOGS */}
      <div className="rounded-lg bg-black/40 border border-white/10 p-3 space-y-2">
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Movement Telemetry Feed
          </span>
          <span className="text-[8px] text-emerald-400 font-mono">PINN ONLINE</span>
        </div>

        <div className="font-mono text-[8px] space-y-1 max-h-24 overflow-y-auto pr-1 text-slate-400">
          {logs.map((log, i) => (
            <div key={i} className="leading-tight flex items-start gap-1">
              <span className="text-cyan-500 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
