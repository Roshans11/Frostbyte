import React from 'react';
import { Route as RouteIcon, Shield, Zap, Flame, Check, Compass, Maximize2 } from 'lucide-react';
import { useRoute } from '../../../state/RouteContext';
import { routeMetadata, getMissionRoute, type RouteType } from '../../../data/mockData';

export const RoutesPanel: React.FC = () => {
  const { selectedRoute, setSelectedRoute, mission, setIsFullScreen } = useRoute();

  const routeTypes: RouteType[] = ['safest', 'fastest', 'fuel'];
  const activeRouteType: RouteType = routeTypes.includes(selectedRoute as RouteType)
    ? (selectedRoute as RouteType)
    : 'safest';

  const activeWaypoints = getMissionRoute(mission.origin, mission.destination, activeRouteType);

  return (
    <div className="p-4 space-y-4 text-slate-100">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <RouteIcon className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold tracking-wider text-cyan-300 uppercase">
            Route Optimization
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
            3 ROUTES
          </span>
        </div>
      </div>

      {/* ACTIVE ROUTE BANNER */}
      <div className="rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border border-cyan-400/20 p-3.5 shadow-lg">
        <div className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest mb-1">
          CURRENTLY ACTIVE ROUTE
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: routeMetadata[activeRouteType].color,
                boxShadow: `0 0 10px ${routeMetadata[activeRouteType].color}`,
              }}
            />
            {routeMetadata[activeRouteType].name}
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
            {routeMetadata[activeRouteType].risk} RISK
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3 text-[10px] pt-2 border-t border-white/5">
          <div>
            <span className="text-slate-500 block text-[8px]">ESTIMATED ETA</span>
            <span className="font-mono font-bold text-slate-200">{routeMetadata[activeRouteType].eta}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[8px]">FUEL BURN</span>
            <span className="font-mono font-bold text-slate-200">{routeMetadata[activeRouteType].fuel}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[8px]">WAYPOINTS</span>
            <span className="font-mono font-bold text-cyan-300">{activeWaypoints.length} PTS</span>
          </div>
        </div>
      </div>

      {/* ROUTE SELECTION COMPARISON CARDS */}
      <div className="space-y-2.5">
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>COMPARE PATHWAYS</span>
          <span className="text-[8px] text-slate-500">AI POLAR ENGINE</span>
        </div>

        {/* SAFEST ROUTE */}
        <div
          onClick={() => setSelectedRoute('safest')}
          className={`p-3 rounded-lg border transition-all cursor-pointer ${
            activeRouteType === 'safest'
              ? 'bg-emerald-500/10 border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
              : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300">Safest Route</span>
            </div>
            {activeRouteType === 'safest' ? (
              <span className="text-[8px] px-2 py-0.5 rounded bg-emerald-400 text-black font-bold flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" /> ACTIVE
              </span>
            ) : (
              <span className="text-[8px] px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 font-semibold">
                AI RECOMMENDED
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 mb-2">
            Maximizes open-water channels, avoids high-density sea ice (&gt;60%) and maintains &gt;15 NM buffer from iceberg drift paths.
          </p>
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-300 pt-2 border-t border-white/5">
            <span>ETA: 74 Hours</span>
            <span>Fuel: 18.4t</span>
            <span className="text-emerald-400 font-bold">Risk: LOW</span>
          </div>
        </div>

        {/* FASTEST ROUTE */}
        <div
          onClick={() => setSelectedRoute('fastest')}
          className={`p-3 rounded-lg border transition-all cursor-pointer ${
            activeRouteType === 'fastest'
              ? 'bg-amber-500/10 border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.12)]'
              : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300">Fastest Route</span>
            </div>
            {activeRouteType === 'fastest' ? (
              <span className="text-[8px] px-2 py-0.5 rounded bg-amber-400 text-black font-bold flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" /> ACTIVE
              </span>
            ) : (
              <span className="text-[8px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 font-semibold">
                TIME OPTIMIZED
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 mb-2">
            Direct great-circle route through moderate pack ice. Reduces transit time by 12 hours with higher engine load and hull stress.
          </p>
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-300 pt-2 border-t border-white/5">
            <span>ETA: 62 Hours</span>
            <span>Fuel: 21.2t</span>
            <span className="text-amber-400 font-bold">Risk: MEDIUM</span>
          </div>
        </div>

        {/* FUEL EFFICIENT ROUTE */}
        <div
          onClick={() => setSelectedRoute('fuel')}
          className={`p-3 rounded-lg border transition-all cursor-pointer ${
            activeRouteType === 'fuel'
              ? 'bg-sky-500/10 border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.12)]'
              : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-bold text-sky-300">Fuel Efficient Route</span>
            </div>
            {activeRouteType === 'fuel' ? (
              <span className="text-[8px] px-2 py-0.5 rounded bg-sky-400 text-black font-bold flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" /> ACTIVE
              </span>
            ) : (
              <span className="text-[8px] px-2 py-0.5 rounded bg-sky-400/10 text-sky-400 border border-sky-400/20 font-semibold">
                ECO SAVER
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 mb-2">
            Leverages favorable Antarctic current drift (0.8 kts) and wind assistance to minimize fuel burn (16.9 tons).
          </p>
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-300 pt-2 border-t border-white/5">
            <span>ETA: 69 Hours</span>
            <span>Fuel: 16.9t</span>
            <span className="text-sky-400 font-bold">Risk: LOW</span>
          </div>
        </div>
      </div>

      {/* WAYPOINT COORDINATES BREAKDOWN */}
      <div className="rounded-lg bg-black/30 border border-white/5 p-3 space-y-2">
        <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Compass className="w-3 h-3 text-cyan-400" /> Waypoint Coordinates
          </span>
          <span className="text-[8px] text-cyan-300 font-mono">{activeWaypoints.length} Nodes</span>
        </div>

        <div className="max-h-36 overflow-y-auto space-y-1 pr-1 font-mono text-[9px]">
          {activeWaypoints.map(([lon, lat], idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/[0.04] text-slate-300"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 w-4">#{idx + 1}</span>
                <span>{lat > 0 ? `${lat.toFixed(2)}°N` : `${Math.abs(lat).toFixed(2)}°S`}</span>
                <span className="text-slate-600">|</span>
                <span>{lon > 0 ? `${lon.toFixed(2)}°E` : `${Math.abs(lon).toFixed(2)}°W`}</span>
              </div>
              <span className="text-[8px] px-1.5 py-0.2 rounded bg-cyan-400/10 text-cyan-300">
                {idx === 0 ? 'START' : idx === activeWaypoints.length - 1 ? 'DEST' : 'WAYPOINT'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
