import React, { useState } from 'react';
import { Crosshair, Search, ShieldAlert, Eye, Calendar, Layers, Activity, Sparkles, Navigation, Maximize2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useRoute } from '../../../state/RouteContext';
import { icebergs, icebergMotionData, getLargestIceberg } from '../../../data/mockData';

export const IcebergsPanel: React.FC = () => {
  const { showTrajectory, setShowTrajectory, setIsFullScreen } = useRoute();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedIcebergId, setSelectedIcebergId] = useState<string>('D23');
  const [forecastStep, setForecastStep] = useState<number>(96);

  const largestIceberg = getLargestIceberg();

  const filteredIcebergs = icebergs.filter((iceberg) => {
    const matchesSearch =
      iceberg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iceberg.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'ALL' || iceberg.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const activeIceberg = icebergs.find((i) => i.id === selectedIcebergId) || icebergs[0];

  return (
    <div className="p-4 space-y-4 text-slate-100">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold tracking-wider text-cyan-300 uppercase">
            Iceberg Intelligence
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
            {icebergs.length} TRACKED
          </span>
        </div>
      </div>

      {/* TRAJECTORY TOGGLE BANNER */}
      <div className="rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border border-cyan-400/20 p-3 flex items-center justify-between shadow-lg">
        <div>
          <div className="text-[8px] font-bold text-cyan-400 uppercase tracking-wider">
            DRIFT TRAJECTORY PREDICTION
          </div>
          <div className="text-xs font-semibold text-slate-200">
            Show Predicted Drift Paths
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowTrajectory(!showTrajectory)}
          className={`px-3 py-1.5 rounded-lg text-[9px] font-bold tracking-wider transition-all flex items-center gap-1.5 ${
            showTrajectory
              ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]'
              : 'bg-white/10 text-slate-400 border border-white/10'
          }`}
        >
          <Navigation className="w-3 h-3" />
          {showTrajectory ? 'ENABLED' : 'DISABLED'}
        </button>
      </div>

      {/* FORECAST TIMELINE SLIDER */}
      <div className="rounded-lg bg-black/30 border border-white/5 p-3 space-y-2">
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400">
          <span>FORECAST TIMELINE HORIZON</span>
          <span className="text-cyan-300 font-mono">+{forecastStep} HOURS</span>
        </div>
        <input
          type="range"
          min="0"
          max="96"
          step="24"
          value={forecastStep}
          onChange={(e) => setForecastStep(Number(e.target.value))}
          className="w-full accent-cyan-400 bg-slate-800 cursor-pointer"
        />
        <div className="flex justify-between text-[8px] font-mono text-slate-500">
          <span>NOW (0h)</span>
          <span>+24h</span>
          <span>+48h</span>
          <span>+72h</span>
          <span className="text-cyan-300 font-bold">+96h</span>
        </div>
      </div>

      {/* SEARCH AND REGION FILTERS */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search iceberg ID (e.g. D23, B09G)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400/50"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto text-[8px] font-bold uppercase pb-1">
          {['ALL', 'A', 'B', 'C', 'D'].map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedRegion === region
                  ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-300/30'
                  : 'bg-black/20 text-slate-500 border border-white/5 hover:text-slate-300'
              }`}
            >
              {region === 'ALL' ? 'ALL REGIONS' : `REGION ${region}`}
            </button>
          ))}
        </div>
      </div>

      {/* TRACKED ICEBERGS LIST */}
      <div className="space-y-2">
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>USNIC ICEBERG LIST</span>
          <span className="text-[8px] text-slate-500">{filteredIcebergs.length} Records</span>
        </div>

        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
          {filteredIcebergs.map((iceberg) => {
            const isSelected = selectedIcebergId === iceberg.id;

            return (
              <div
                key={iceberg.id}
                onClick={() => setSelectedIcebergId(iceberg.id)}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-400/10 border-cyan-300/40 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                    : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                    <span className="text-xs font-bold text-slate-200 font-mono">{iceberg.name}</span>
                    <span className="text-[8px] px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-slate-400">
                      REG {iceberg.region}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-cyan-300">{iceberg.areaSqNm} sq NM</span>
                </div>

                <div className="grid grid-cols-3 gap-1 text-[8px] font-mono text-slate-400">
                  <div>
                    <span className="text-slate-600 block">LAT/LON</span>
                    <span>{iceberg.latitude.toFixed(1)}°, {iceberg.longitude.toFixed(1)}°</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block">SIZE (L×W)</span>
                    <span>{iceberg.lengthNm}×{iceberg.widthNm} NM</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block">SOURCE</span>
                    <span className="text-emerald-400 font-bold">{iceberg.source}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SELECTED ICEBERG MOTION GRAPH */}
      <div className="rounded-lg bg-black/30 border border-white/5 p-3 space-y-2">
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Activity className="w-3 h-3 text-cyan-400" /> Drift Velocity ({activeIceberg.name})
          </span>
          <span className="text-[8px] text-slate-500 font-mono">kts / day</span>
        </div>

        <div className="h-28 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={icebergMotionData}>
              <defs>
                <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#64748b" fontSize={9} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '10px' }}
              />
              <Area type="monotone" dataKey="speed" stroke="#22d3ee" fillOpacity={1} fill="url(#speedGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
