import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation,
  Ship,
  Clock3,
  MapPin,
  Target,
  CheckCircle2,
  Loader2,
  Play,
  Brain,
  Route as RouteIcon,
  Layers,
  Snowflake,
  Wind,
  Waves,
  Thermometer,
} from 'lucide-react';
import { useRoute } from '../../../state/RouteContext';
import {
  locations,
  routeMetadata,
  missionRoutes,
  type RouteType,
} from '../../../data/mockData';

import { Maximize2 } from 'lucide-react';

interface DashboardPanelProps {
  isAnalyzing: boolean;
  analysisComplete: boolean;
  analysisProgress: number;
  runRouteAnalysis: () => void;
  handleRouteChange: (route: RouteType) => void;
  updateMission: (changes: any) => void;
}

export const DashboardPanel: React.FC<DashboardPanelProps> = ({
  isAnalyzing,
  analysisComplete,
  analysisProgress,
  runRouteAnalysis,
  handleRouteChange,
  updateMission,
}) => {
  const {
    mission,
    selectedRoute,
    layerVisibility,
    setLayerVisibility,
    showTrajectory,
    setShowTrajectory,
    setIsFullScreen,
  } = useRoute();

  const availableRoutes: RouteType[] = ['safest', 'fastest', 'fuel'];
  const activeRouteType: RouteType = availableRoutes.includes(selectedRoute as RouteType)
    ? (selectedRoute as RouteType)
    : 'safest';
  const activeRouteMetadata = routeMetadata[activeRouteType];

  const activeOrigin = locations.find((l) => l.id === mission.origin);
  const activeDestination = locations.find((l) => l.id === mission.destination);
  const missionRouteExists = Boolean(
    missionRoutes?.[mission.origin]?.[mission.destination]
  );

  return (
    <div className="space-y-4">
      {/* MISSION PLANNER */}
      <section className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-cyan-300 uppercase">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span>Mission Planner</span>
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
            <span
              className={`text-[8px] font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                isAnalyzing
                  ? 'text-cyan-300 bg-cyan-400/5 border-cyan-300/15'
                  : analysisComplete
                  ? 'text-emerald-300 bg-emerald-400/5 border-emerald-400/15'
                  : 'text-slate-500 bg-white/[0.02] border-white/5'
              }`}
            >
              {isAnalyzing ? 'ANALYZING' : analysisComplete ? 'COMPLETE' : 'READY'}
            </span>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {/* ORIGIN */}
          <div>
            <label className="text-[8px] font-bold tracking-wider text-slate-500 uppercase block mb-1">
              ORIGIN
            </label>
            <select
              value={mission.origin}
              onChange={(e) => updateMission({ origin: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400/50"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-200">
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* DESTINATION */}
          <div>
            <label className="text-[8px] font-bold tracking-wider text-slate-500 uppercase block mb-1">
              DESTINATION
            </label>
            <select
              value={mission.destination}
              onChange={(e) => updateMission({ destination: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400/50"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-200">
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* VESSEL */}
          <div>
            <label className="text-[8px] font-bold tracking-wider text-slate-500 uppercase block mb-1">
              VESSEL
            </label>
            <select
              value={mission.vessel}
              onChange={(e) => updateMission({ vessel: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400/50"
            >
              <option value="PC6" className="bg-slate-900 text-slate-200">Research Vessel · PC6</option>
              <option value="PC5" className="bg-slate-900 text-slate-200">Research Vessel · PC5</option>
              <option value="PC4" className="bg-slate-900 text-slate-200">Research Vessel · PC4</option>
              <option value="PC3" className="bg-slate-900 text-slate-200">Research Vessel · PC3</option>
            </select>
          </div>

          {/* DATE & TIME */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[8px] font-bold tracking-wider text-slate-500 uppercase block mb-1">
                DEPARTURE DATE
              </label>
              <input
                type="date"
                value={mission.departureDate}
                onChange={(e) => updateMission({ departureDate: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
            <div>
              <label className="text-[8px] font-bold tracking-wider text-slate-500 uppercase block mb-1">
                TIME
              </label>
              <input
                type="time"
                value={mission.departureTime}
                onChange={(e) => updateMission({ departureTime: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
          </div>

          {/* FORECAST HORIZON */}
          <div>
            <label className="text-[8px] font-bold tracking-wider text-slate-500 uppercase block mb-1">
              FORECAST HORIZON
            </label>
            <select
              value={String(mission.forecastHours)}
              onChange={(e) => updateMission({ forecastHours: Number(e.target.value) })}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400/50"
            >
              <option value="24" className="bg-slate-900 text-slate-200">24 HOURS</option>
              <option value="48" className="bg-slate-900 text-slate-200">48 HOURS</option>
              <option value="72" className="bg-slate-900 text-slate-200">72 HOURS</option>
              <option value="96" className="bg-slate-900 text-slate-200">96 HOURS</option>
              <option value="120" className="bg-slate-900 text-slate-200">120 HOURS</option>
              <option value="168" className="bg-slate-900 text-slate-200">168 HOURS</option>
            </select>
          </div>

          {/* MISSION SUMMARY */}
          <div className="rounded-lg bg-black/20 border border-white/5 p-3">
            <div className="text-[8px] text-slate-500 uppercase tracking-wider mb-2">
              Mission Summary
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-[10px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">{activeOrigin?.shortName ?? mission.origin}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Target className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">{activeDestination?.shortName ?? mission.destination}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Ship className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{mission.vessel}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock3 className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{mission.forecastHours}H Horizon</span>
              </div>
            </div>
          </div>

          {/* AI ANALYSIS PROGRESS BAR */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-lg border border-cyan-300/15 bg-cyan-400/5 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
                      <span className="text-[8px] text-cyan-300 font-semibold uppercase tracking-wider">
                        AI Processing
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-cyan-300">{analysisProgress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-black/40 overflow-hidden">
                    <motion.div
                      className="h-full bg-cyan-300 rounded-full shadow-[0_0_12px_rgba(85,214,255,0.6)]"
                      initial={{ width: '0%' }}
                      animate={{ width: `${analysisProgress}%` }}
                      transition={{ duration: 0.25 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RUN AI ROUTE BUTTON */}
          <button
            type="button"
            disabled={isAnalyzing || !missionRouteExists}
            onClick={runRouteAnalysis}
            className={`w-full py-2.5 rounded-lg text-[9px] font-bold tracking-[0.13em] transition-all flex items-center justify-center gap-2 ${
              isAnalyzing
                ? 'bg-cyan-400/10 text-cyan-300 border border-cyan-300/20 cursor-wait'
                : missionRouteExists
                ? 'bg-cyan-400 text-[#031019] hover:bg-cyan-300 shadow-[0_0_24px_rgba(85,214,255,0.16)]'
                : 'bg-slate-700/40 text-slate-600 border border-white/5 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ANALYZING MISSION
              </>
            ) : analysisComplete ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                RE-RUN AI ANALYSIS
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                GENERATE AI ROUTE
              </>
            )}
          </button>
        </div>
      </section>

      {/* RECOMMENDED ROUTES */}
      <section className="p-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-cyan-300 uppercase mb-3">
          <RouteIcon className="w-4 h-4 text-cyan-400" />
          <span>Recommended Routes</span>
        </div>

        <div className="space-y-2">
          {availableRoutes.map((routeId) => {
            const route = routeMetadata[routeId];
            const isSelected = activeRouteType === routeId;

            return (
              <button
                key={routeId}
                type="button"
                disabled={isAnalyzing}
                onClick={() => handleRouteChange(routeId)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-cyan-400/10 border-cyan-300/40 shadow-[0_0_20px_rgba(85,214,255,0.1)]'
                    : 'bg-black/15 border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: route.color, boxShadow: `0 0 8px ${route.color}` }}
                    />
                    <span className="text-xs font-semibold text-slate-200">{route.name}</span>
                  </div>
                  {isSelected && (
                    <span className="text-[7px] px-1.5 py-0.5 rounded bg-cyan-400/10 border border-cyan-300/20 text-cyan-300 font-bold">
                      ACTIVE
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 mt-2 text-[9px]">
                  <div>
                    <span className="text-slate-500 block text-[7px]">RISK</span>
                    <span className="font-bold text-slate-200">{route.risk}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[7px]">ETA</span>
                    <span className="font-bold text-slate-200">{route.eta}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[7px]">FUEL</span>
                    <span className="font-bold text-slate-200">{route.fuel}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* QUICK DATA LAYERS */}
      <section className="p-4">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-cyan-300 uppercase mb-3">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Active Data Layers</span>
        </div>

        <div className="space-y-1.5 text-xs">
          <label className="flex items-center justify-between p-2 rounded bg-black/20 border border-white/5 cursor-pointer">
            <span className="flex items-center gap-2 text-slate-300 text-[11px]">
              <Snowflake className="w-3.5 h-3.5 text-cyan-400" /> Sea Ice Concentration
            </span>
            <input
              type="checkbox"
              checked={layerVisibility.seaIce}
              onChange={(e) => setLayerVisibility((prev) => ({ ...prev, seaIce: e.target.checked }))}
              className="accent-cyan-400"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-black/20 border border-white/5 cursor-pointer">
            <span className="flex items-center gap-2 text-slate-300 text-[11px]">
              <Target className="w-3.5 h-3.5 text-cyan-400" /> Iceberg Positions
            </span>
            <input
              type="checkbox"
              checked={layerVisibility.icebergs}
              onChange={(e) => setLayerVisibility((prev) => ({ ...prev, icebergs: e.target.checked }))}
              className="accent-cyan-400"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-black/20 border border-white/5 cursor-pointer">
            <span className="flex items-center gap-2 text-slate-300 text-[11px]">
              <Navigation className="w-3.5 h-3.5 text-cyan-400" /> Iceberg Trajectory
            </span>
            <input
              type="checkbox"
              checked={showTrajectory}
              onChange={(e) => setShowTrajectory(e.target.checked)}
              className="accent-cyan-400"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-black/20 border border-white/5 cursor-pointer">
            <span className="flex items-center gap-2 text-slate-300 text-[11px]">
              <Wind className="w-3.5 h-3.5 text-slate-400" /> Wind Vectors
            </span>
            <input
              type="checkbox"
              checked={layerVisibility.wind}
              onChange={(e) => setLayerVisibility((prev) => ({ ...prev, wind: e.target.checked }))}
              className="accent-cyan-400"
            />
          </label>
        </div>
      </section>
    </div>
  );
};
