import { useState } from 'react';
import { Activity, Brain, Navigation, Snowflake, Wind, Waves, Thermometer, Sun, Anchor, Map } from 'lucide-react';

export default function ModelDiagnostics() {
  const [activeTab, setActiveTab] = useState<'seaice' | 'iceberg' | 'routing'>('seaice');

  return (
    <div className="w-96 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[32rem]">
      {/* Header */}
      <div className="p-3 border-b border-slate-700/50 bg-slate-950/30">
        <h3 className="text-sm font-bold text-slate-200 flex items-center">
          <Activity className="w-4 h-4 mr-2 text-cyan-400" />
          Model Parameters & Telemetry
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700/50 text-xs font-medium">
        <button
          onClick={() => setActiveTab('seaice')}
          className={`flex-1 py-2 flex items-center justify-center transition-colors ${
            activeTab === 'seaice' ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
          }`}
        >
          <Snowflake className="w-3.5 h-3.5 mr-1.5" />
          Sea Ice
        </button>
        <button
          onClick={() => setActiveTab('iceberg')}
          className={`flex-1 py-2 flex items-center justify-center transition-colors ${
            activeTab === 'iceberg' ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
          }`}
        >
          <Map className="w-3.5 h-3.5 mr-1.5" />
          Iceberg
        </button>
        <button
          onClick={() => setActiveTab('routing')}
          className={`flex-1 py-2 flex items-center justify-center transition-colors ${
            activeTab === 'routing' ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
          }`}
        >
          <Navigation className="w-3.5 h-3.5 mr-1.5" />
          Routing
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        
        {/* Sea Ice Content */}
        {activeTab === 'seaice' && (
          <div className="animate-in fade-in duration-200">
            <div className="mb-4">
              <h4 className="font-semibold text-slate-300 mb-2 flex items-center uppercase tracking-wider text-[10px]">
                <Wind className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                Physical Parameters
              </h4>
              <ul className="space-y-1.5 text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <li className="flex justify-between"><span>Sea Surface Temp</span><span className="text-cyan-400">-1.2°C</span></li>
                <li className="flex justify-between"><span>Air Temp</span><span className="text-cyan-400">-5.4°C</span></li>
                <li className="flex justify-between"><span>Wind Vector</span><span className="text-cyan-400">12kts (240°)</span></li>
                <li className="flex justify-between"><span>Ocean Current</span><span className="text-cyan-400">0.8kts</span></li>
                <li className="flex justify-between"><span>Solar Insolation</span><span className="text-cyan-400">Seasonal</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-300 mb-2 flex items-center uppercase tracking-wider text-[10px]">
                <Brain className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                ML Parameters (LightGBM/CNN)
              </h4>
              <ul className="space-y-1.5 text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <li className="flex flex-col">
                  <span className="text-slate-300">Spatial Filter Weights</span>
                  <span className="text-[10px] text-slate-500">Conv/LSTM layers capturing ice-edge patterns</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-300">Spatiotemporal Correlations</span>
                  <span className="text-[10px] text-slate-500">Learned neighbor grid cell influence over time</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-300">Historical Timestep Attention</span>
                  <span className="text-[10px] text-slate-500">Attention weights for past t-1..t-n</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-300">Bias-Correction Residuals</span>
                  <span className="text-[10px] text-slate-500">Learned diff between physical output & observation</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Iceberg Content */}
        {activeTab === 'iceberg' && (
          <div className="animate-in fade-in duration-200">
            <div className="mb-4">
              <h4 className="font-semibold text-slate-300 mb-2 flex items-center uppercase tracking-wider text-[10px]">
                <Waves className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                Physical Parameters
              </h4>
              <ul className="space-y-1.5 text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <li className="flex justify-between"><span>Wind Drag & Velocity</span><span className="text-cyan-400">Active</span></li>
                <li className="flex justify-between"><span>Current Drag & Velocity</span><span className="text-cyan-400">Active</span></li>
                <li className="flex justify-between"><span>Coriolis Parameter</span><span className="text-cyan-400">f = 2Ωsin(φ)</span></li>
                <li className="flex justify-between"><span>Water Pressure Gradient</span><span className="text-cyan-400">Included</span></li>
                <li className="flex flex-col mt-1 pt-1 border-t border-slate-800">
                  <span className="text-slate-300">Iceberg Dimensions</span>
                  <span className="text-[10px] text-slate-500">Mass, Draft (Submerged), Sail Area</span>
                </li>
                <li className="flex justify-between"><span>Thermodynamic Melt Rate</span><span className="text-cyan-400">0.02m/day</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-300 mb-2 flex items-center uppercase tracking-wider text-[10px]">
                <Brain className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                ML Parameters (Trajectory)
              </h4>
              <ul className="space-y-1.5 text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <li className="flex flex-col">
                  <span className="text-slate-300">Correction/Residual Weights</span>
                  <span className="text-[10px] text-slate-500">Physical error → predicted correction (XGBoost/NN)</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-300">Feature Importances</span>
                  <span className="text-[10px] text-slate-500">Across size class, region, and season</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-slate-300">Uncertainty/Ensemble Spread</span>
                  <span className="text-[10px] text-slate-500">Parameters defining the covariance ellipse</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Routing Content */}
        {activeTab === 'routing' && (
          <div className="animate-in fade-in duration-200">
            <div className="mb-4">
              <h4 className="font-semibold text-slate-300 mb-2 flex items-center uppercase tracking-wider text-[10px]">
                <Anchor className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                Physical Parameters
              </h4>
              <ul className="space-y-1.5 text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <li className="flex justify-between"><span>Depth Constraints</span><span className="text-cyan-400">&gt; 12m min</span></li>
                <li className="flex justify-between"><span>Fuel Consumption</span><span className="text-cyan-400">Curve Applied</span></li>
                <li className="flex justify-between"><span>Vessel Speed</span><span className="text-cyan-400">Max 15kts</span></li>
                <li className="flex justify-between"><span>Maneuverability</span><span className="text-cyan-400">PC-Class</span></li>
                <li className="flex justify-between"><span>Distance / Time / Cost</span><span className="text-cyan-400">Optimized</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-300 mb-2 flex items-center uppercase tracking-wider text-[10px]">
                <Brain className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                ML Parameters (Optimization)
              </h4>
              <ul className="space-y-1.5 text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <li className="flex flex-col">
                  <span className="text-slate-300">Risk Weighting Function</span>
                  <span className="text-[10px] text-slate-500">Penalizing ice concentration/proximity tuned from historical decisions/expert thresholds</span>
                </li>
                <li className="flex flex-col mt-2">
                  <span className="text-slate-300 flex items-center">
                    RL Policy Weights
                    <span className="ml-2 text-emerald-400/80 text-[9px] border border-emerald-500/30 px-1 rounded">IF APPLICABLE</span>
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Policy network weights for routing actions under uncertainty</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
