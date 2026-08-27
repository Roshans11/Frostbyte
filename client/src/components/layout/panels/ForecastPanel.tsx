import React from 'react';
import { Activity, Wind, Waves, Thermometer, Snowflake, Layers, Maximize2 } from 'lucide-react';
import { useRoute } from '../../../state/RouteContext';

export const ForecastPanel: React.FC = () => {
  const { layerVisibility, setLayerVisibility, mission, setMission, setIsFullScreen } = useRoute();

  return (
    <div className="p-4 space-y-4 text-slate-100">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold tracking-wider text-cyan-300 uppercase">
            Oceanic Forecast
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
            COPERNICUS
          </span>
        </div>
      </div>

      {/* LIVE TELEMETRY METRICS GRID */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase text-slate-500">
            <Snowflake className="w-3 h-3 text-cyan-400" /> Sea Ice Conc.
          </div>
          <div className="text-base font-mono font-bold text-cyan-300">42.8%</div>
          <div className="text-[8px] text-slate-400">Moderate Pack Ice</div>
        </div>

        <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase text-slate-500">
            <Thermometer className="w-3 h-3 text-sky-400" /> Sea Surface Temp
          </div>
          <div className="text-base font-mono font-bold text-sky-300">-1.2°C</div>
          <div className="text-[8px] text-slate-400">Near Freezing Point</div>
        </div>

        <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase text-slate-500">
            <Wind className="w-3 h-3 text-teal-400" /> Wind Velocity
          </div>
          <div className="text-base font-mono font-bold text-teal-300">12 kts</div>
          <div className="text-[8px] text-slate-400">Vector: 240° (SW)</div>
        </div>

        <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase text-slate-500">
            <Waves className="w-3 h-3 text-blue-400" /> Wave Height
          </div>
          <div className="text-base font-mono font-bold text-blue-300">4.1 m</div>
          <div className="text-[8px] text-slate-400 font-mono">Period: 8.4s</div>
        </div>
      </div>

      {/* LAYER CONTROLS */}
      <div className="space-y-2">
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Layers className="w-3.5 h-3.5" /> Forecast Data Layers
          </span>
          <span className="text-[8px] text-slate-500">REAL-TIME OVERLAYS</span>
        </div>

        <div className="space-y-1.5 text-xs">
          {/* SEA ICE */}
          <div
            onClick={() => setLayerVisibility((p) => ({ ...p, seaIce: !p.seaIce }))}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
              layerVisibility.seaIce
                ? 'bg-cyan-400/10 border-cyan-300/30 text-cyan-200'
                : 'bg-black/20 border-white/5 text-slate-400 hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Snowflake className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-xs font-semibold">Sea Ice Concentration</div>
                <div className="text-[8px] text-slate-500 font-mono">10km OSI-SAF Satellite L4</div>
              </div>
            </div>
            <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${layerVisibility.seaIce ? 'bg-cyan-400 text-black' : 'bg-white/10 text-slate-400'}`}>
              {layerVisibility.seaIce ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* ICEBERGS */}
          <div
            onClick={() => setLayerVisibility((p) => ({ ...p, icebergs: !p.icebergs }))}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
              layerVisibility.icebergs
                ? 'bg-cyan-400/10 border-cyan-300/30 text-cyan-200'
                : 'bg-black/20 border-white/5 text-slate-400 hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-xs font-semibold">Iceberg Positions</div>
                <div className="text-[8px] text-slate-500 font-mono">USNIC Weekly Radar Analysis</div>
              </div>
            </div>
            <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${layerVisibility.icebergs ? 'bg-cyan-400 text-black' : 'bg-white/10 text-slate-400'}`}>
              {layerVisibility.icebergs ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* WIND VECTORS */}
          <div
            onClick={() => setLayerVisibility((p) => ({ ...p, wind: !p.wind }))}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
              layerVisibility.wind
                ? 'bg-cyan-400/10 border-cyan-300/30 text-cyan-200'
                : 'bg-black/20 border-white/5 text-slate-400 hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-teal-400" />
              <div>
                <div className="text-xs font-semibold">Wind Vector Field</div>
                <div className="text-[8px] text-slate-500 font-mono">ECMWF 10m Surface Wind</div>
              </div>
            </div>
            <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${layerVisibility.wind ? 'bg-cyan-400 text-black' : 'bg-white/10 text-slate-400'}`}>
              {layerVisibility.wind ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* WAVES */}
          <div
            onClick={() => setLayerVisibility((p) => ({ ...p, waves: !p.waves }))}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
              layerVisibility.waves
                ? 'bg-cyan-400/10 border-cyan-300/30 text-cyan-200'
                : 'bg-black/20 border-white/5 text-slate-400 hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-xs font-semibold">Wave Height Heatmap</div>
                <div className="text-[8px] text-slate-500 font-mono">Significant Wave Height (SWH)</div>
              </div>
            </div>
            <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${layerVisibility.waves ? 'bg-cyan-400 text-black' : 'bg-white/10 text-slate-400'}`}>
              {layerVisibility.waves ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* TEMPERATURE */}
          <div
            onClick={() => setLayerVisibility((p) => ({ ...p, temperature: !p.temperature }))}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
              layerVisibility.temperature
                ? 'bg-cyan-400/10 border-cyan-300/30 text-cyan-200'
                : 'bg-black/20 border-white/5 text-slate-400 hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-sky-400" />
              <div>
                <div className="text-xs font-semibold">Sea Surface Temperature</div>
                <div className="text-[8px] text-slate-500 font-mono">Copernicus SST Anomaly</div>
              </div>
            </div>
            <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${layerVisibility.temperature ? 'bg-cyan-400 text-black' : 'bg-white/10 text-slate-400'}`}>
              {layerVisibility.temperature ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </div>

      {/* FORECAST TIMELINE SELECTOR */}
      <div className="rounded-lg bg-black/30 border border-white/5 p-3 space-y-2">
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>FORECAST TIMELINE PROJECTION</span>
          <span className="text-cyan-300 font-mono">{mission.forecastHours} HOURS</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-[9px] font-mono">
          {[24, 48, 72, 96, 120, 168].map((hrs) => (
            <button
              key={hrs}
              onClick={() => setMission((m) => ({ ...m, forecastHours: hrs }))}
              className={`py-1.5 rounded text-center border font-bold transition-all ${
                mission.forecastHours === hrs
                  ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                  : 'bg-black/20 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              +{hrs}h
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
