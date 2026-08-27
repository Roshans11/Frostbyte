import React, { useState } from 'react';
import { Database, RefreshCw, Satellite, Radio, Globe, Layers, Maximize2 } from 'lucide-react';
import { useRoute } from '../../../state/RouteContext';
import { copernicusDatasets, dataStatus } from '../../../data/mockData';

export const DatasetsPanel: React.FC = () => {
  const { setIsFullScreen } = useRoute();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSync, setLastSync] = useState('JUST NOW');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastSync('LIVE SYNCED');
    }, 1200);
  };

  return (
    <div className="p-4 space-y-4 text-slate-100">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold tracking-wider text-cyan-300 uppercase">
            Datasets & API Feeds
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
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 font-mono">
            {lastSync}
          </span>
        </div>
      </div>

      {/* SYNC ACTIONS CARD */}
      <div className="rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border border-cyan-400/20 p-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <div>
            <div className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest">
              SATELLITE DATA PIPELINE
            </div>
            <div className="text-xs font-bold text-slate-200">
              Copernicus + USNIC Streams
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-3 py-1.5 rounded-lg bg-cyan-400 text-black text-[9px] font-bold tracking-wider hover:bg-cyan-300 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(34,211,238,0.3)] disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'SYNCING...' : 'FORCE REFRESH'}
        </button>
      </div>

      {/* DATASET LIST */}
      <div className="space-y-2.5">
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>ACTIVE DATASETS</span>
          <span className="text-[8px] text-slate-500">4 CONFIGURED</span>
        </div>

        {/* USNIC ICEBERGS */}
        <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Satellite className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-200">USNIC Antarctic Iceberg Database</span>
            </div>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-mono font-bold">
              AVAILABLE
            </span>
          </div>
          <p className="text-[9px] text-slate-400">
            {dataStatus.usnic.description}. Tracked via US National Ice Center observations.
          </p>
          <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 pt-1 border-t border-white/5">
            <span>Last Obs: {dataStatus.usnic.lastObservation}</span>
            <span className="text-cyan-300">{dataStatus.usnic.recordCount} Records</span>
          </div>
        </div>

        {/* COPERNICUS GLOBAL SEA ICE */}
        <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold text-slate-200">Copernicus Global Sea Ice</span>
            </div>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-mono font-bold">
              OPERATIONAL
            </span>
          </div>
          <p className="text-[9px] text-slate-400">
            {copernicusDatasets.globalSeaIce.name}
          </p>
          <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 pt-1 border-t border-white/5">
            <span>Provider: {copernicusDatasets.globalSeaIce.provider}</span>
            <span className="text-cyan-300">Res: {copernicusDatasets.globalSeaIce.resolution}</span>
          </div>
        </div>

        {/* COPERNICUS ANTARCTIC HIGH RES */}
        <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold text-slate-200">Antarctic High-Res SAR</span>
            </div>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 font-mono font-bold">
              NEAR REAL TIME
            </span>
          </div>
          <p className="text-[9px] text-slate-400">
            {copernicusDatasets.antarcticHighResolution.name}
          </p>
          <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 pt-1 border-t border-white/5">
            <span>ID: {copernicusDatasets.antarcticHighResolution.id}</span>
            <span className="text-cyan-300">Res: 1 km</span>
          </div>
        </div>

        {/* COPERNICUS DRIFT */}
        <div className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-slate-200">Antarctic Sea Ice Drift</span>
            </div>
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10 font-mono font-bold">
              REPROCESSED
            </span>
          </div>
          <p className="text-[9px] text-slate-400">
            {copernicusDatasets.antarcticDrift.name}
          </p>
          <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 pt-1 border-t border-white/5">
            <span>Daily Vector Drift</span>
            <span className="text-cyan-300">Res: 62.5 km</span>
          </div>
        </div>
      </div>
    </div>
  );
};
