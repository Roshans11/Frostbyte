import { useRoute } from '../../state/RouteContext';
import { Layers, Activity, Shield, Map as MapIcon, Globe, AlertTriangle, Ship, Info, Home, Navigation, MapPin, Calendar, Clock, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { icebergMotionData } from '../../data/mockData';
import ModelDiagnostics from './ModelDiagnostics';

export default function DashboardLayout() {
  const { viewMode, setViewMode, introFinished } = useRoute();

  return (
    <AnimatePresence>
      {introFinished && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-20 pointer-events-none flex flex-col"
        >
          {/* Header */}
          <header className="h-14 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 flex items-center justify-between px-6 pointer-events-auto shadow-lg shadow-slate-900/50">
            <div className="flex items-center space-x-4">
              <Shield className="w-6 h-6 text-cyan-400" />
              <h1 className="text-xl font-bold text-slate-100 tracking-wide">IceRoute<span className="text-cyan-400">India</span></h1>
              <div className="flex items-center ml-6 px-3 py-1 rounded bg-slate-800/80 border border-slate-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></div>
                <span className="text-xs font-bold text-emerald-400 tracking-wider">SYSTEM ONLINE</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 bg-slate-950/50 rounded-lg p-1 border border-slate-700/50">
              <button
                onClick={() => setViewMode('2D')}
                className={`flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === '2D' ? 'bg-cyan-600/90 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MapIcon className="w-4 h-4 mr-2" />
                2D Map
              </button>
              <button
                onClick={() => setViewMode('3D')}
                className={`flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === '3D' ? 'bg-cyan-600/90 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-4 h-4 mr-2" />
                3D Globe
              </button>
            </div>
          </header>

          {/* Main Area */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* Skinny Nav */}
            <nav className="w-16 bg-slate-950/90 border-r border-slate-800 flex flex-col items-center py-4 space-y-6 pointer-events-auto z-10">
              <button className="p-3 text-cyan-400 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition relative group">
                <Home className="w-5 h-5" />
                <span className="absolute left-14 top-2 bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Dashboard</span>
              </button>
              <button className="p-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition relative group">
                <Activity className="w-5 h-5" />
                <span className="absolute left-14 top-2 bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Forecast</span>
              </button>
              <button className="p-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition relative group">
                <Crosshair className="w-5 h-5" />
                <span className="absolute left-14 top-2 bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Icebergs</span>
              </button>
              <button className="p-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition relative group">
                <Navigation className="w-5 h-5" />
                <span className="absolute left-14 top-2 bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Routes</span>
              </button>
              <button className="p-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition relative group">
                <Ship className="w-5 h-5" />
                <span className="absolute left-14 top-2 bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">Vessel</span>
              </button>
            </nav>

            {/* Left Side Drawer (Route Planner) */}
            <aside className="w-80 bg-slate-900/90 backdrop-blur-md border-r border-slate-700 flex flex-col pointer-events-auto overflow-y-auto">
              
              {/* Route Planner Form */}
              <div className="p-4 border-b border-slate-700/50 bg-slate-950/20">
                <h2 className="text-xs font-bold text-slate-400 flex items-center uppercase tracking-wider mb-4">
                  <Navigation className="w-4 h-4 mr-2" />
                  Route Planner
                </h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">FROM</label>
                      <select className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-slate-300">
                        <option>Cape Town</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">TO</label>
                      <select className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-slate-300">
                        <option>Maitri Station</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">VESSEL</label>
                    <select className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-slate-300">
                      <option>Research Vessel (PC6)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">DEPARTURE</label>
                      <input type="date" defaultValue="2026-08-26" className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-slate-300" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">FORECAST</label>
                      <select className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-slate-300">
                        <option>96 hours</option>
                      </select>
                    </div>
                  </div>
                  <button className="w-full mt-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold py-2.5 rounded transition">
                    CALCULATE ROUTES
                  </button>
                </div>
              </div>

              {/* Route Options */}
              <div className="p-4 border-b border-slate-700/50">
                <h2 className="text-xs font-bold text-slate-400 flex items-center uppercase tracking-wider mb-3">
                  <Activity className="w-4 h-4 mr-2" />
                  Route Options
                </h2>
                <div className="space-y-2">
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-emerald-500/30 cursor-pointer hover:bg-slate-700 transition">
                    <div className="font-bold text-emerald-400 flex items-center text-sm">
                      <span className="mr-2">🥇</span> Safest
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
                      <div className="text-slate-400">Risk: <span className="text-emerald-400 font-medium">LOW</span></div>
                      <div className="text-slate-400">ETA: <span className="text-slate-200">74h</span></div>
                      <div className="text-slate-400">Fuel: <span className="text-slate-200">18.4 t</span></div>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-800 transition">
                    <div className="font-bold text-slate-300 flex items-center text-sm">
                      <span className="mr-2">🥈</span> Fuel Efficient
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
                      <div className="text-slate-400">Risk: <span className="text-amber-400 font-medium">MEDIUM</span></div>
                      <div className="text-slate-400">ETA: <span className="text-slate-200">70h</span></div>
                      <div className="text-slate-400">Fuel: <span className="text-slate-200">16.9 t</span></div>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-800 transition">
                    <div className="font-bold text-slate-300 flex items-center text-sm">
                      <span className="mr-2">🥉</span> Fastest
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
                      <div className="text-slate-400">Risk: <span className="text-orange-400 font-medium">MED-HIGH</span></div>
                      <div className="text-slate-400">ETA: <span className="text-slate-200">62h</span></div>
                      <div className="text-slate-400">Fuel: <span className="text-slate-200">21.2 t</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Layers */}
              <div className="p-4 border-b border-slate-700/50 flex-1">
                <h2 className="text-xs font-bold text-slate-400 flex items-center uppercase tracking-wider mb-3">
                  <Layers className="w-4 h-4 mr-2" />
                  Data Layers
                </h2>
                <div className="space-y-2.5">
                  <label className="flex items-start space-x-3 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" defaultChecked className="form-checkbox rounded bg-slate-950 border-slate-600 text-cyan-500 mt-1" />
                    <div className="flex-1">
                      <span className="block font-medium">Sea Ice Concentration</span>
                      <div className="mt-1.5 grid grid-cols-4 gap-1 text-[9px] text-center font-bold text-slate-900">
                        <div className="bg-blue-300 rounded px-1 py-0.5">0-15%</div>
                        <div className="bg-cyan-300 rounded px-1 py-0.5">15-40%</div>
                        <div className="bg-yellow-400 rounded px-1 py-0.5">40-70%</div>
                        <div className="bg-red-400 rounded px-1 py-0.5">70-100%</div>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" defaultChecked className="form-checkbox rounded bg-slate-950 border-slate-600 text-cyan-500" />
                    <span>Icebergs</span>
                  </label>
                  <label className="flex items-center space-x-3 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" defaultChecked className="form-checkbox rounded bg-slate-950 border-slate-600 text-cyan-500" />
                    <span>Iceberg Trajectory</span>
                  </label>
                  <label className="flex items-center space-x-3 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" className="form-checkbox rounded bg-slate-950 border-slate-600 text-cyan-500" />
                    <span>Wind</span>
                  </label>
                  <label className="flex items-center space-x-3 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" className="form-checkbox rounded bg-slate-950 border-slate-600 text-cyan-500" />
                    <span>Waves</span>
                  </label>
                  <label className="flex items-center space-x-3 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" defaultChecked className="form-checkbox rounded bg-slate-950 border-slate-600 text-cyan-500" />
                    <span>Risk (POLARIS RIO)</span>
                  </label>
                  <label className="flex items-center space-x-3 text-sm text-slate-300 cursor-pointer">
                    <input type="checkbox" defaultChecked className="form-checkbox rounded bg-slate-950 border-slate-600 text-cyan-500" />
                    <span>Recommended Routes</span>
                  </label>
                </div>
              </div>
            </aside>
            
            {/* Right Overlays */}
            <div className="flex-1 relative p-6 pointer-events-none flex flex-col items-end justify-start space-y-4 overflow-y-auto">
              
              {/* Route Analysis (Decision Dashboard) */}
              <div className="w-[22rem] bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden shadow-2xl pointer-events-auto flex-shrink-0">
                <div className="p-3 bg-slate-950/40 border-b border-slate-700/50 flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Route Analysis</h3>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400 border border-slate-700">SAFEST SELECTED</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Safety</span>
                    <div className="w-32 bg-slate-800 h-2 rounded overflow-hidden flex">
                      <div className="bg-emerald-500 h-full w-[82%]"></div>
                    </div>
                    <span className="text-slate-200 font-bold">82%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
                    <div className="bg-slate-800/50 p-1.5 rounded border border-slate-700">
                      <div className="text-slate-500 mb-0.5">Ice Risk</div>
                      <div className="text-emerald-400 font-bold">LOW</div>
                    </div>
                    <div className="bg-slate-800/50 p-1.5 rounded border border-slate-700">
                      <div className="text-slate-500 mb-0.5">Iceberg Risk</div>
                      <div className="text-emerald-400 font-bold">LOW</div>
                    </div>
                    <div className="bg-slate-800/50 p-1.5 rounded border border-slate-700">
                      <div className="text-slate-500 mb-0.5">Weather Risk</div>
                      <div className="text-amber-400 font-bold">MEDIUM</div>
                    </div>
                  </div>
                  <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-lg mt-3">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-800 pb-1">Segment Risk (Clicked)</h4>
                    <div className="grid grid-cols-2 gap-y-1.5 text-xs">
                      <div className="text-slate-500">Ice Concentration</div><div className="text-slate-200 text-right">42%</div>
                      <div className="text-slate-500">POLARIS RIO</div><div className="text-emerald-400 text-right font-medium">+1</div>
                      <div className="text-slate-500">Iceberg proximity</div><div className="text-slate-200 text-right">18 km</div>
                      <div className="text-slate-500">Wind</div><div className="text-slate-200 text-right">32 knots</div>
                      <div className="text-slate-500">Wave height</div><div className="text-slate-200 text-right">4.1 m</div>
                      <div className="text-slate-500 font-bold pt-1 border-t border-slate-800 mt-1">Overall Risk</div>
                      <div className="text-amber-400 font-bold text-right pt-1 border-t border-slate-800 mt-1">MEDIUM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Iceberg Intelligence Panel */}
              <div className="w-[22rem] bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden shadow-2xl pointer-events-auto flex-shrink-0">
                <div className="p-3 bg-slate-950/40 border-b border-slate-700/50 flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">ICEBERG #A102</h3>
                  <Crosshair className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="p-4 text-xs space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-slate-500 mb-0.5">Last detected:</div>
                      <div className="text-slate-200">26 Aug 2026</div>
                      <div className="text-[9px] text-cyan-500 mt-0.5 italic">Latest satellite-derived detection</div>
                    </div>
                    <div>
                      <div className="text-slate-500 mb-0.5">Position:</div>
                      <div className="text-slate-200">68.42° S, 74.12° E</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Predicted movement:</div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-cyan-400 text-sm">NE</span>
                      <div className="flex-1 h-px bg-slate-800"></div>
                      <span className="text-[10px] text-cyan-500 italic">Predicted drift</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/50 p-2 rounded border border-slate-800">
                    <div className="text-slate-500 mb-1 text-[10px]">Forecast Horizon:</div>
                    <div className="flex justify-between text-slate-300">
                      <span className="bg-slate-800 px-2 py-0.5 rounded">+12h</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded">+24h</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded">+48h</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded">+96h</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="text-slate-500">Confidence:</span>
                    <span className="text-cyan-400 font-bold text-lg">72%</span>
                  </div>
                </div>
              </div>

              {/* Vessel Safety Config (Condensed) */}
              <div className="w-[22rem] bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden shadow-2xl pointer-events-auto flex-shrink-0">
                <div className="p-3 bg-slate-950/40 border-b border-slate-700/50">
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Vessel Safety</h3>
                </div>
                <div className="p-4 text-xs space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Polar Class:</span>
                    <span className="font-bold">PC6</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Max recommended speed:</span>
                    <span className="font-bold text-orange-400">5 knots</span>
                  </div>
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                    <span className="text-slate-500">Current risk:</span>
                    <span className="font-bold text-amber-400">MEDIUM</span>
                  </div>
                </div>
              </div>

              {/* Keep ModelDiagnostics collapsible or lower priority */}
              <ModelDiagnostics />

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
