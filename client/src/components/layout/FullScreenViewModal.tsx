import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Minimize2,
  X,
  Shield,
  Route as RouteIcon,
  Crosshair,
  Activity,
  Ship,
  Database,
  Home,
  Check,
  Compass,
  Zap,
  Flame,
  Search,
  Navigation,
  Snowflake,
  Wind,
  Waves,
  Thermometer,
  Radio,
  Satellite,
  Globe,
  Layers,
  Cpu,
  Terminal,
  Brain,
  Gauge,
  CheckCircle2,
  RefreshCw,
  Play,
  Loader2,
  Clock3,
  MapPin,
  Target,
  TrendingUp,
} from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useRoute } from '../../state/RouteContext';
import {
  locations,
  routeMetadata,
  missionRoutes,
  getMissionRoute,
  icebergs,
  icebergMotionData,
  copernicusDatasets,
  dataStatus,
  type RouteType,
} from '../../data/mockData';
import ModelDiagnostics from './ModelDiagnostics';

export const FullScreenViewModal: React.FC = () => {
  const {
    isFullScreen,
    setIsFullScreen,
    activePanel,
    setActivePanel,
    selectedRoute,
    setSelectedRoute,
    mission,
    setMission,
    vessel,
    setVessel,
    showTrajectory,
    setShowTrajectory,
    layerVisibility,
    setLayerVisibility,
  } = useRoute();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedIcebergId, setSelectedIcebergId] = useState<string>('D23');
  const [forecastStep, setForecastStep] = useState<number>(96);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  if (!isFullScreen) return null;

  const availableRoutes: RouteType[] = ['safest', 'fastest', 'fuel'];
  const activeRouteType: RouteType = availableRoutes.includes(selectedRoute as RouteType)
    ? (selectedRoute as RouteType)
    : 'safest';
  const activeWaypoints = getMissionRoute(mission.origin, mission.destination, activeRouteType);

  const filteredIcebergs = icebergs.filter((iceberg) => {
    const matchesSearch =
      iceberg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iceberg.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'ALL' || iceberg.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });
  const activeIceberg = icebergs.find((i) => i.id === selectedIcebergId) || icebergs[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  const runRouteAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    let p = 0;
    const inv = setInterval(() => {
      p += 15;
      if (p >= 100) {
        setAnalysisProgress(100);
        clearInterval(inv);
        setTimeout(() => setIsAnalyzing(false), 400);
      } else {
        setAnalysisProgress(p);
      }
    }, 200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-[#030a10]/95 backdrop-blur-2xl text-slate-100 flex flex-col overflow-hidden pointer-events-auto"
      >
        {/* TOP FULLSCREEN BAR */}
        <header className="h-16 shrink-0 bg-[#061420]/95 border-b border-cyan-300/15 px-6 flex items-center justify-between shadow-2xl">
          {/* BRAND */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-base font-bold tracking-[0.12em]">ICEROUTE</span>
                <span className="text-base font-bold tracking-[0.12em] text-cyan-300">INDIA</span>
              </div>
              <div className="text-[9px] text-slate-500 tracking-[0.2em] uppercase">
                FULL-SCREEN COMMAND CENTER
              </div>
            </div>
          </div>

          {/* SECTION NAVIGATION TABS */}
          <nav className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setActivePanel('dashboard')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                activePanel === 'dashboard' ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Home className="w-3.5 h-3.5" /> Dashboard
            </button>
            <button
              onClick={() => setActivePanel('routes')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                activePanel === 'routes' ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <RouteIcon className="w-3.5 h-3.5" /> Routes
            </button>
            <button
              onClick={() => setActivePanel('icebergs')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                activePanel === 'icebergs' ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5" /> Icebergs
            </button>
            <button
              onClick={() => setActivePanel('forecast')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                activePanel === 'forecast' ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> Forecast
            </button>
            <button
              onClick={() => setActivePanel('vessel')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                activePanel === 'vessel' ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Ship className="w-3.5 h-3.5" /> Vessel
            </button>
            <button
              onClick={() => setActivePanel('datasets')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                activePanel === 'datasets' ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" /> Datasets
            </button>
            <button
              onClick={() => setActivePanel('system')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                activePanel === 'system' ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Graph
            </button>
            <button
              onClick={() => setActivePanel('diagnostics')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                activePanel === 'diagnostics' ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" /> Diagnostics
            </button>
          </nav>

          {/* CLOSE FULLSCREEN BUTTON */}
          <button
            onClick={() => setIsFullScreen(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400/10 border border-cyan-300/30 text-cyan-300 hover:bg-cyan-400 hover:text-black font-bold text-xs transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            <Minimize2 className="w-4 h-4" />
            EXIT FULLSCREEN
          </button>
        </header>

        {/* FULLSCREEN CONTENT BODY */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* ===================================================
              FULL-SCREEN ROUTES PANEL
          =================================================== */}
          {activePanel === 'routes' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <RouteIcon className="w-6 h-6 text-cyan-400" />
                    Route Optimization & Trajectory Matrix
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Multi-objective polar pathfinding comparison considering ice thickness, vessel hull stress, current drift, and iceberg clearance radius.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-mono font-bold">
                    ACTIVE: {routeMetadata[activeRouteType].name.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* 3-COLUMN ROUTE COMPARISON CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* SAFEST */}
                <div
                  onClick={() => setSelectedRoute('safest')}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    activeRouteType === 'safest'
                      ? 'bg-emerald-500/10 border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] scale-[1.01]'
                      : 'bg-black/30 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-emerald-400" />
                      <h3 className="text-base font-bold text-emerald-300">Safest Route</h3>
                    </div>
                    {activeRouteType === 'safest' ? (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-400 text-black text-xs font-bold flex items-center gap-1">
                        <Check className="w-4 h-4 stroke-[3]" /> ACTIVE
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 text-xs font-bold">
                        AI RECOMMEND
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    Maximizes open-water leads and avoids ice pack concentration above 60%. Maintains over 15 NM clearance buffer from tracked USNIC iceberg drift trajectories.
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs font-mono">
                    <div><span className="text-slate-500 text-[10px] block">ETA</span><span className="font-bold text-slate-100">74 Hours</span></div>
                    <div><span className="text-slate-500 text-[10px] block">FUEL BURN</span><span className="font-bold text-slate-100">18.4 Tons</span></div>
                    <div><span className="text-slate-500 text-[10px] block">RISK LEVEL</span><span className="font-bold text-emerald-400">LOW</span></div>
                  </div>
                </div>

                {/* FASTEST */}
                <div
                  onClick={() => setSelectedRoute('fastest')}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    activeRouteType === 'fastest'
                      ? 'bg-amber-500/10 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.15)] scale-[1.01]'
                      : 'bg-black/30 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 text-amber-400" />
                      <h3 className="text-base font-bold text-amber-300">Fastest Route</h3>
                    </div>
                    {activeRouteType === 'fastest' ? (
                      <span className="px-2.5 py-1 rounded-md bg-amber-400 text-black text-xs font-bold flex items-center gap-1">
                        <Check className="w-4 h-4 stroke-[3]" /> ACTIVE
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-bold">
                        TIME OPTIMIZED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    Direct great-circle pathway across moderate ice fields. Reduces total transit duration by 12 hours with increased fuel consumption and higher engine load.
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs font-mono">
                    <div><span className="text-slate-500 text-[10px] block">ETA</span><span className="font-bold text-slate-100">62 Hours</span></div>
                    <div><span className="text-slate-500 text-[10px] block">FUEL BURN</span><span className="font-bold text-slate-100">21.2 Tons</span></div>
                    <div><span className="text-slate-500 text-[10px] block">RISK LEVEL</span><span className="font-bold text-amber-400">MEDIUM</span></div>
                  </div>
                </div>

                {/* FUEL EFFICIENT */}
                <div
                  onClick={() => setSelectedRoute('fuel')}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    activeRouteType === 'fuel'
                      ? 'bg-sky-500/10 border-sky-400/50 shadow-[0_0_30px_rgba(56,189,248,0.15)] scale-[1.01]'
                      : 'bg-black/30 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Flame className="w-6 h-6 text-sky-400" />
                      <h3 className="text-base font-bold text-sky-300">Fuel Efficient Route</h3>
                    </div>
                    {activeRouteType === 'fuel' ? (
                      <span className="px-2.5 py-1 rounded-md bg-sky-400 text-black text-xs font-bold flex items-center gap-1">
                        <Check className="w-4 h-4 stroke-[3]" /> ACTIVE
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md bg-sky-400/10 text-sky-400 border border-sky-400/20 text-xs font-bold">
                        ECO SAVER
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    Aligns transit vector with favorable Antarctic current drift (0.8 kts) and prevailing winds to minimize overall fuel burn to 16.9 tons.
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs font-mono">
                    <div><span className="text-slate-500 text-[10px] block">ETA</span><span className="font-bold text-slate-100">69 Hours</span></div>
                    <div><span className="text-slate-500 text-[10px] block">FUEL BURN</span><span className="font-bold text-slate-100">16.9 Tons</span></div>
                    <div><span className="text-slate-500 text-[10px] block">RISK LEVEL</span><span className="font-bold text-sky-400">LOW</span></div>
                  </div>
                </div>
              </div>

              {/* WAYPOINTS & PROFILE TABLE */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    Waypoint Breakdown & Navigational Coordinates ({activeWaypoints.length} Points)
                  </h3>
                  <span className="text-xs font-mono text-cyan-300">Geospatial CRS: WGS-84 / EPSG:4326</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-white/5 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-3">NODE</th>
                        <th className="p-3">LATITUDE</th>
                        <th className="p-3">LONGITUDE</th>
                        <th className="p-3">ICE CONC.</th>
                        <th className="p-3">ICEBERG PROXIMITY</th>
                        <th className="p-3">RECOMMENDED SPEED</th>
                        <th className="p-3">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {activeWaypoints.map(([lon, lat], idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="p-3 text-slate-500 font-bold">#{idx + 1}</td>
                          <td className="p-3">{lat > 0 ? `${lat.toFixed(4)}°N` : `${Math.abs(lat).toFixed(4)}°S`}</td>
                          <td className="p-3">{lon > 0 ? `${lon.toFixed(4)}°E` : `${Math.abs(lon).toFixed(4)}°W`}</td>
                          <td className="p-3 text-cyan-300">{Math.floor(20 + idx * 4.5)}%</td>
                          <td className="p-3 text-emerald-400">&gt; 18.2 NM Safe</td>
                          <td className="p-3 text-slate-200">12.5 knots</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-cyan-400/10 text-cyan-300">
                              {idx === 0 ? 'ORIGIN' : idx === activeWaypoints.length - 1 ? 'DESTINATION' : 'WAYPOINT'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================
              FULL-SCREEN ICEBERGS PANEL
          =================================================== */}
          {activePanel === 'icebergs' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Crosshair className="w-6 h-6 text-cyan-400" />
                    USNIC Antarctic Iceberg Registry & Trajectory Intelligence
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Tracking real-time positions, dimensions, surface area, and predicted 96-hour drift vectors for major Antarctic tabular icebergs.
                  </p>
                </div>
                <button
                  onClick={() => setShowTrajectory(!showTrajectory)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    showTrajectory ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  <Navigation className="w-4 h-4" />
                  TRAJECTORY VECTORS: {showTrajectory ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              {/* SEARCH & FILTERS BAR */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Filter by Iceberg ID or Name (e.g. D23, B09G, D15A)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="flex gap-2">
                  {['ALL', 'A', 'B', 'C', 'D'].map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setSelectedRegion(reg)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedRegion === reg ? 'bg-cyan-400 text-black' : 'bg-black/30 border border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {reg === 'ALL' ? 'ALL REGIONS' : `REGION ${reg}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* ICEBERGS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIcebergs.map((iceberg) => {
                  const isSelected = selectedIcebergId === iceberg.id;

                  return (
                    <div
                      key={iceberg.id}
                      onClick={() => setSelectedIcebergId(iceberg.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-400/10 border-cyan-300/40 shadow-[0_0_20px_rgba(34,211,238,0.15)] scale-[1.01]'
                          : 'bg-black/30 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                          <h3 className="text-base font-bold text-slate-100 font-mono">{iceberg.name}</h3>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300 text-xs font-mono font-bold">
                          REG {iceberg.region}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-white/10 text-slate-300">
                        <div><span className="text-slate-500 text-[10px] block">SURFACE AREA</span><span className="font-bold text-cyan-300">{iceberg.areaSqNm} sq NM</span></div>
                        <div><span className="text-slate-600 text-[10px] block">DIMENSIONS</span><span>{iceberg.lengthNm}×{iceberg.widthNm} NM</span></div>
                        <div><span className="text-slate-500 text-[10px] block">LATITUDE</span><span>{iceberg.latitude.toFixed(2)}°S</span></div>
                        <div><span className="text-slate-500 text-[10px] block">LONGITUDE</span><span>{iceberg.longitude.toFixed(2)}°E</span></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* MOTION CHART */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Drift Speed Velocity Curve ({activeIceberg.name})
                </h3>
                <div className="h-56 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={icebergMotionData}>
                      <defs>
                        <linearGradient id="speedGradFull" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="speed" stroke="#22d3ee" fillOpacity={1} fill="url(#speedGradFull)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================
              FULL-SCREEN FORECAST PANEL
          =================================================== */}
          {activePanel === 'forecast' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-cyan-400" />
                    Copernicus Marine Environmental & Atmospheric Telemetry
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Real-time satellite feeds from Copernicus Marine (OSI-SAF) providing sea-ice concentration, drift vectors, sea surface temperature, and wave dynamics.
                  </p>
                </div>
              </div>

              {/* TELEMETRY CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                    <Snowflake className="w-4 h-4 text-cyan-400" /> Sea Ice Conc.
                  </div>
                  <div className="text-2xl font-mono font-bold text-cyan-300">42.8%</div>
                  <div className="text-xs text-slate-400">Moderate Pack Ice</div>
                </div>
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                    <Thermometer className="w-4 h-4 text-sky-400" /> Sea Surface Temp
                  </div>
                  <div className="text-2xl font-mono font-bold text-sky-300">-1.2°C</div>
                  <div className="text-xs text-slate-400">Near Freezing Point</div>
                </div>
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                    <Wind className="w-4 h-4 text-teal-400" /> Wind Velocity
                  </div>
                  <div className="text-2xl font-mono font-bold text-teal-300">12 kts</div>
                  <div className="text-xs text-slate-400">Vector: 240° (SW)</div>
                </div>
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                    <Waves className="w-4 h-4 text-blue-400" /> Wave Height
                  </div>
                  <div className="text-2xl font-mono font-bold text-blue-300">4.1 m</div>
                  <div className="text-xs text-slate-400">Period: 8.4 seconds</div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================
              FULL-SCREEN VESSEL PANEL
          =================================================== */}
          {activePanel === 'vessel' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Ship className="w-6 h-6 text-cyan-400" />
                    Polar Class Vessel Specifications & Operating Limits
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    IACS Polar Code classification ratings, hull ice-strengthening capability, engine power parameters, and speed limits.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <h3 className="text-base font-bold text-cyan-300">Active Vessel Specifications ({vessel})</h3>
                  <div className="space-y-3 text-xs font-mono">
                    <div className="flex justify-between p-3 rounded-lg bg-white/5"><span>POLAR CLASS</span><span className="text-cyan-300 font-bold">{vessel}</span></div>
                    <div className="flex justify-between p-3 rounded-lg bg-white/5"><span>ICE BREAKING CAPACITY</span><span className="text-emerald-400 font-bold">1.2m Level Ice</span></div>
                    <div className="flex justify-between p-3 rounded-lg bg-white/5"><span>MAX OPEN WATER SPEED</span><span>15.0 knots</span></div>
                    <div className="flex justify-between p-3 rounded-lg bg-white/5"><span>HULL DISPLACEMENT</span><span>12,500 Tonnes</span></div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <h3 className="text-base font-bold text-cyan-300">Operating Speed Guidance in Ice</h3>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-white/5 flex justify-between"><span>0% - 20% Open Water</span><span className="text-emerald-400 font-bold">14.0 kts (Full Speed)</span></div>
                    <div className="p-3 rounded-lg bg-white/5 flex justify-between"><span>20% - 50% Thin Ice</span><span className="text-cyan-300 font-bold">9.5 kts (Standard)</span></div>
                    <div className="p-3 rounded-lg bg-white/5 flex justify-between"><span>50% - 80% Pack Ice</span><span className="text-amber-400 font-bold">4.5 kts (Icebreaker Mode)</span></div>
                    <div className="p-3 rounded-lg bg-white/5 flex justify-between"><span>&gt;80% Fast Ice</span><span className="text-rose-400 font-bold">Escort Required</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================
              FULL-SCREEN DATASETS PANEL
          =================================================== */}
          {activePanel === 'datasets' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Database className="w-6 h-6 text-cyan-400" />
                    Copernicus Marine & USNIC Satellite Datasets Integration
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Operational data stream pipelines, resolution specs, provider metadata, and API stream health.
                  </p>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="px-4 py-2 rounded-xl bg-cyan-400 text-black text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'REFRESHING...' : 'FORCE SYNC STREAM'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                    <Satellite className="w-5 h-5 text-cyan-400" /> USNIC Iceberg Observations
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{dataStatus.usnic.description}</p>
                  <div className="text-xs font-mono text-slate-400 pt-2">
                    <div>Source: US National Ice Center</div>
                    <div>Update Frequency: Daily</div>
                    <div>Status: <span className="text-emerald-400 font-bold">OPERATIONAL</span></div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-teal-400" /> Copernicus Global Sea Ice
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{copernicusDatasets.globalSeaIce.name}</p>
                  <div className="text-xs font-mono text-slate-400 pt-2">
                    <div>Provider: {copernicusDatasets.globalSeaIce.provider}</div>
                    <div>Resolution: {copernicusDatasets.globalSeaIce.resolution}</div>
                    <div>Status: <span className="text-emerald-400 font-bold">OPERATIONAL</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================
              FULL-SCREEN SYSTEM PANEL (ICEBERG MOVEMENT TRAJECTORY GRAPH)
          =================================================== */}
          {activePanel === 'system' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                    Iceberg Trajectory & Movement Dynamics Intelligence
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Real-time PINN physics trajectory graphs, 96-hour predicted drift vectors, velocity curves, displacement distance, heading angle variations, and hydrodynamic drag coupling.
                  </p>
                </div>
                <div className="flex gap-2 font-mono">
                  {['D23', 'B09G', 'D15A'].map((id) => (
                    <button
                      key={id}
                      onClick={() => setSelectedIcebergId(id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedIcebergId === id ? 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'bg-black/30 border border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {id} DRIFT GRAPH
                    </button>
                  ))}
                </div>
              </div>

              {/* HYDRODYNAMIC FORCE CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="text-slate-500 text-[10px]">WIND DRAG COEFF</div>
                  <div className="text-xl font-bold text-cyan-300">C_da = 0.0018</div>
                  <div className="text-slate-400 text-[10px]">Sail Area Exposure</div>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="text-slate-500 text-[10px]">CURRENT DRAG COEFF</div>
                  <div className="text-xl font-bold text-sky-300">C_dw = 0.0045</div>
                  <div className="text-slate-400 text-[10px]">Submerged Draft Ratio</div>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="text-slate-500 text-[10px]">CORIOLIS PARAMETER</div>
                  <div className="text-xl font-bold text-teal-300">-1.37 × 10⁻⁴</div>
                  <div className="text-slate-400 text-[10px]">f = 2Ω sin(φ)</div>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="text-slate-500 text-[10px]">PINN CONFIDENCE</div>
                  <div className="text-xl font-bold text-emerald-400">96.8%</div>
                  <div className="text-slate-400 text-[10px]">Residual Loss: 0.012 NM</div>
                </div>
              </div>

              {/* DRIFT VELOCITY & DISPLACEMENT GRAPHS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* VELOCITY GRAPH */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      Drift Velocity Curve ({selectedIcebergId})
                    </span>
                    <span className="text-xs font-mono text-cyan-300">0h → 96h KNOTS</span>
                  </h3>
                  <div className="h-64 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { hour: '+0h', speed: 0.4, distance: 0 },
                        { hour: '+16h', speed: 0.7, distance: 8.8 },
                        { hour: '+32h', speed: 1.1, distance: 23.2 },
                        { hour: '+48h', speed: 0.9, distance: 39.2 },
                        { hour: '+64h', speed: 1.4, distance: 57.6 },
                        { hour: '+80h', speed: 1.2, distance: 78.4 },
                        { hour: '+96h', speed: 0.8, distance: 94.4 },
                      ]}>
                        <defs>
                          <linearGradient id="sysIcebergFullGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} unit=" kts" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                        <Area type="monotone" dataKey="speed" stroke="#22d3ee" fillOpacity={1} fill="url(#sysIcebergFullGrad)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* DISPLACEMENT DISTANCE GRAPH */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-teal-400" />
                      Cumulative Displacement Distance ({selectedIcebergId})
                    </span>
                    <span className="text-xs font-mono text-teal-300">NAUTICAL MILES</span>
                  </h3>
                  <div className="h-64 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { hour: '+0h', speed: 0.4, distance: 0 },
                        { hour: '+16h', speed: 0.7, distance: 8.8 },
                        { hour: '+32h', speed: 1.1, distance: 23.2 },
                        { hour: '+48h', speed: 0.9, distance: 39.2 },
                        { hour: '+64h', speed: 1.4, distance: 57.6 },
                        { hour: '+80h', speed: 1.2, distance: 78.4 },
                        { hour: '+96h', speed: 0.8, distance: 94.4 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} unit=" NM" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                        <Line type="monotone" dataKey="distance" stroke="#2dd4bf" strokeWidth={3} dot={{ fill: '#2dd4bf', r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* TRAJECTORY WAYPOINTS COORDINATES TABLE */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    Predicted 96-Hour Trajectory Vector Coordinates ({selectedIcebergId})
                  </h3>
                  <span className="text-xs font-mono text-cyan-300">PINN MODEL EPSG:4326</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-white/5 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-3">TIMESTEP</th>
                        <th className="p-3">LATITUDE</th>
                        <th className="p-3">LONGITUDE</th>
                        <th className="p-3">DRIFT SPEED</th>
                        <th className="p-3">HEADING</th>
                        <th className="p-3">OCEAN CURRENT</th>
                        <th className="p-3">ROUTE CLEARANCE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {[
                        { time: '+0h (NOW)', lat: '-68.3500°S', lon: '74.2100°E', speed: '0.4 kts', heading: '240° (SW)', current: '0.8 kts @ 210°', clearance: '> 24.5 NM Safe' },
                        { time: '+24h', lat: '-68.4200°S', lon: '73.8500°E', speed: '0.9 kts', heading: '245° (SW)', current: '0.8 kts @ 210°', clearance: '> 22.1 NM Safe' },
                        { time: '+48h', lat: '-68.5100°S', lon: '73.3200°E', speed: '1.2 kts', heading: '250° (WSW)', current: '0.9 kts @ 215°', clearance: '> 19.8 NM Safe' },
                        { time: '+72h', lat: '-68.6300°S', lon: '72.7000°E', speed: '1.4 kts', heading: '255° (WSW)', current: '1.0 kts @ 220°', clearance: '> 18.2 NM Safe' },
                        { time: '+96h', lat: '-68.7500°S', lon: '72.0500°E', speed: '0.8 kts', heading: '260° (W)', current: '0.7 kts @ 220°', clearance: '> 17.5 NM Safe' },
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="p-3 font-bold text-cyan-300">{row.time}</td>
                          <td className="p-3">{row.lat}</td>
                          <td className="p-3">{row.lon}</td>
                          <td className="p-3 text-emerald-400">{row.speed}</td>
                          <td className="p-3 text-slate-200">{row.heading}</td>
                          <td className="p-3 text-slate-400">{row.current}</td>
                          <td className="p-3 text-emerald-400 font-bold">{row.clearance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================
              FULL-SCREEN MODEL DIAGNOSTICS PANEL
          =================================================== */}
          {activePanel === 'diagnostics' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                    AI Engine Model Diagnostics & Telemetry
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    ConvLSTM, PINN Hydrodynamics, and Reinforcement Learning policy weights, parameter sliders, accuracy gauges, and live calibration suite.
                  </p>
                </div>
              </div>

              <div className="w-full">
                <ModelDiagnostics />
              </div>
            </div>
          )}

          {/* ===================================================
              FULL-SCREEN DASHBOARD PANEL
          =================================================== */}
          {activePanel === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Home className="w-6 h-6 text-cyan-400" />
                    Antarctic Mission Control & Setup
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Configure vessel origin, destination, departure schedule, forecast window, and generate AI polar pathfinding.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <h3 className="text-base font-bold text-cyan-300">Mission Parameters</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">ORIGIN</label>
                      <select
                        value={mission.origin}
                        onChange={(e) => setMission((m) => ({ ...m, origin: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-slate-200"
                      >
                        {locations.map((l) => (
                          <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">DESTINATION</label>
                      <select
                        value={mission.destination}
                        onChange={(e) => setMission((m) => ({ ...m, destination: e.target.value }))}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-slate-200"
                      >
                        {locations.map((l) => (
                          <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <h3 className="text-base font-bold text-cyan-300">Active Mission Overview</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 rounded-xl bg-white/5">
                      <div className="text-slate-500 text-[10px]">ORIGIN</div>
                      <div className="text-slate-100 font-bold mt-1">{mission.origin.toUpperCase()}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <div className="text-slate-500 text-[10px]">DESTINATION</div>
                      <div className="text-slate-100 font-bold mt-1">{mission.destination.toUpperCase()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </motion.div>
    </AnimatePresence>
  );
};
