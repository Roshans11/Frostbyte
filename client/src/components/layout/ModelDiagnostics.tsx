import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Brain,
  Navigation,
  Snowflake,
  Wind,
  Waves,
  Thermometer,
  Anchor,
  Map,
  Cpu,
  CheckCircle2,
  Zap,
  Gauge,
  Sliders,
  RefreshCw,
  Sparkles,
  Layers,
  Flame,
  Maximize2,
  Download,
  Check,
  Shield,
  BarChart3,
  SlidersHorizontal,
} from 'lucide-react';
import { useRoute } from '../../state/RouteContext';

export default function ModelDiagnostics() {
  const { setIsFullScreen, setActivePanel } = useRoute();

  const [activeTab, setActiveTab] = useState<'seaice' | 'iceberg' | 'routing'>('seaice');
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [lastCalibration, setLastCalibration] = useState('LIVE (AUTO-CALIBRATED)');

  /* INTERACTIVE PARAMETER SLIDERS STATE */
  const [riskPenaltyAlpha, setRiskPenaltyAlpha] = useState<number>(0.75);
  const [iceConcThreshold, setIceConcThreshold] = useState<number>(60);
  const [icebergSafetyRadius, setIcebergSafetyRadius] = useState<number>(15);

  const handleCalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      setLastCalibration(`CALIBRATED AT ${new Date().toLocaleTimeString()}`);
    }, 1000);
  };

  const handleOpenFullScreen = () => {
    setActivePanel('diagnostics');
    setIsFullScreen(true);
  };

  const handleExportTelemetry = () => {
    const data = {
      timestamp: new Date().toISOString(),
      model: 'IceRoute-India Core v2.4 (ConvLSTM + PINN + RL Policy)',
      status: 'OPERATIONAL',
      confidence: 91.4,
      inferenceMs: 42,
      parameters: {
        seaIceModel: {
          sst: -1.2,
          airTemp: -5.4,
          windSpeedKts: 12,
          windDirDeg: 240,
          driftKts: 0.8,
          convLstmWeight: 0.842,
          attention: 0.942,
          residualErr: 0.04,
        },
        icebergModel: {
          windDragCoeff: 0.0018,
          waterDragCoeff: 0.0045,
          coriolisF: -0.000137,
          submergedRatio: 0.875,
          meltRateMPerDay: 0.02,
          trajectoryErrNm: 0.012,
        },
        routingModel: {
          minDepthM: 12.0,
          maxSpeedKts: 15.0,
          riskPenaltyAlpha,
          iceConcThreshold,
          icebergSafetyRadius,
          rlPolicyLoss: 0.0034,
        },
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iceroute_telemetry_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-[#061420]/95 backdrop-blur-xl border border-cyan-300/20 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col transition-all">
      {/* HEADER BAR WITH PROMINENT FULLSCREEN BUTTON */}
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-slate-950/90 via-cyan-950/40 to-slate-950/90 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-300/30 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Cpu className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-2 uppercase tracking-wider">
              AI Engine Diagnostics & Telemetry
            </h3>
            <div className="text-[9px] text-slate-400 font-mono flex items-center gap-2">
              <span>ConvLSTM + PINN + RL Policy Core v2.4</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-bold">LATENCY: 42ms</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* PROMINENT FULLSCREEN DIAGNOSTICS BUTTON */}
          <button
            type="button"
            onClick={handleOpenFullScreen}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-300 text-black font-mono text-[9px] font-bold hover:brightness-110 transition-all flex items-center gap-1.5 shadow-[0_0_16px_rgba(34,211,238,0.4)]"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            FULLSCREEN DIAGNOSTICS
          </button>

          <button
            type="button"
            onClick={handleExportTelemetry}
            title="Export Telemetry JSON"
            className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-300/30 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleCalibrate}
            disabled={isCalibrating}
            className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-slate-300 hover:text-cyan-300 font-mono text-[9px] font-bold transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isCalibrating ? 'animate-spin' : ''}`} />
            {isCalibrating ? 'CALIBRATING...' : 'RE-CALIBRATE'}
          </button>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-white/10 bg-black/40 text-xs font-bold font-mono">
        <button
          onClick={() => setActiveTab('seaice')}
          className={`flex-1 py-3 flex items-center justify-center transition-all border-b-2 ${
            activeTab === 'seaice'
              ? 'bg-cyan-400/10 text-cyan-300 border-cyan-400 shadow-[inset_0_-2px_8px_rgba(34,211,238,0.3)]'
              : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/[0.02]'
          }`}
        >
          <Snowflake className="w-3.5 h-3.5 mr-2 text-cyan-400" />
          Sea Ice Model (ConvLSTM)
        </button>
        <button
          onClick={() => setActiveTab('iceberg')}
          className={`flex-1 py-3 flex items-center justify-center transition-all border-b-2 ${
            activeTab === 'iceberg'
              ? 'bg-cyan-400/10 text-cyan-300 border-cyan-400 shadow-[inset_0_-2px_8px_rgba(34,211,238,0.3)]'
              : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/[0.02]'
          }`}
        >
          <Map className="w-3.5 h-3.5 mr-2 text-cyan-400" />
          Iceberg Dynamics (PINN)
        </button>
        <button
          onClick={() => setActiveTab('routing')}
          className={`flex-1 py-3 flex items-center justify-center transition-all border-b-2 ${
            activeTab === 'routing'
              ? 'bg-cyan-400/10 text-cyan-300 border-cyan-400 shadow-[inset_0_-2px_8px_rgba(34,211,238,0.3)]'
              : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/[0.02]'
          }`}
        >
          <Navigation className="w-3.5 h-3.5 mr-2 text-cyan-400" />
          Path RL Policy (A*)
        </button>
      </div>

      {/* CONTENT BODY */}
      <div className="p-4 md:p-5 space-y-4 text-xs">
        {/* ====================================================
            SEA ICE MODEL TAB
        ==================================================== */}
        {activeTab === 'seaice' && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* PHYSICAL PARAMETERS GRID */}
            <div>
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" /> Oceanic & Atmospheric Inputs
                </span>
                <span className="text-[8px] text-slate-500 font-mono">5 Telemetry Streams</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 font-mono text-[10px]">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">SEA SURFACE TEMP</span>
                  <span className="text-cyan-300 font-bold text-xs">-1.2°C</span>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-cyan-400 w-[65%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">AIR TEMPERATURE</span>
                  <span className="text-sky-300 font-bold text-xs">-5.4°C</span>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-sky-400 w-[78%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">WIND VECTOR</span>
                  <span className="text-teal-300 font-bold text-xs">12 kts (240°)</span>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-teal-400 w-[45%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">OCEAN DRIFT CURRENT</span>
                  <span className="text-blue-300 font-bold text-xs">0.8 kts</span>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-blue-400 w-[35%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">SOLAR INSOLATION</span>
                  <span className="text-amber-300 font-bold text-xs">Seasonal Index 0.78</span>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-amber-400 w-[78%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">GRID RESOLUTION</span>
                  <span className="text-emerald-300 font-bold text-xs">10 km OSI-SAF</span>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-emerald-400 w-[95%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* ML ConvLSTM PARAMETERS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Brain className="w-3.5 h-3.5 text-cyan-400" /> ConvLSTM & LightGBM Model Weights
                </span>
                <span className="text-[8px] text-emerald-400 font-mono">ACCURACY 98.2%</span>
              </div>

              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-200 font-bold block">Spatial Filter Weights</span>
                    <span className="text-[9px] text-slate-500">Conv2D/LSTM layers capturing ice-edge dynamics</span>
                  </div>
                  <span className="text-cyan-300 font-bold px-2 py-1 rounded bg-cyan-400/10 border border-cyan-300/20 text-[9px] shrink-0">
                    WEIGHT: 0.842
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-200 font-bold block">Spatiotemporal Attention</span>
                    <span className="text-[9px] text-slate-500">Neighbor grid cell influence over 96-hour window</span>
                  </div>
                  <span className="text-cyan-300 font-bold px-2 py-1 rounded bg-cyan-400/10 border border-cyan-300/20 text-[9px] shrink-0">
                    ATTENTION: 94.2%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-200 font-bold block">Bias-Correction Residuals</span>
                    <span className="text-[9px] text-slate-500">Learned diff between physical output & satellite observation</span>
                  </div>
                  <span className="text-emerald-400 font-bold px-2 py-1 rounded bg-emerald-400/10 border border-emerald-400/20 text-[9px] shrink-0">
                    RESIDUAL: ±0.04
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ====================================================
            ICEBERG DYNAMICS TAB
        ==================================================== */}
        {activeTab === 'iceberg' && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* PHYSICAL DYNAMICS PARAMETERS */}
            <div>
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" /> Physical Hydrodynamic Vectors
                </span>
                <span className="text-[8px] text-slate-500 font-mono">USNIC FORCES</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 font-mono text-[10px]">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">WIND DRAG COEFF</span>
                  <span className="text-cyan-300 font-bold text-xs">C_da = 0.0018</span>
                  <div className="text-[8px] text-slate-400">Sail Area Exposure</div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">CURRENT DRAG COEFF</span>
                  <span className="text-sky-300 font-bold text-xs">C_dw = 0.0045</span>
                  <div className="text-[8px] text-slate-400">Submerged Draft Ratio</div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">CORIOLIS PARAMETER</span>
                  <span className="text-teal-300 font-bold text-xs">f = 2Ω sin(φ)</span>
                  <div className="text-[8px] text-teal-400 font-bold">-1.37 × 10⁻⁴ s⁻¹</div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">WATER PRESSURE GRADIENT</span>
                  <span className="text-emerald-300 font-bold text-xs">INCLUDED</span>
                  <div className="text-[8px] text-slate-400">Surface Slope Drift</div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">SUBMERGED DRAFT RATIO</span>
                  <span className="text-blue-300 font-bold text-xs">87.5% Submerged</span>
                  <div className="text-[8px] text-slate-400">Mass/Keel Profile</div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">THERMODYNAMIC MELT</span>
                  <span className="text-amber-300 font-bold text-xs">0.02 m / day</span>
                  <div className="text-[8px] text-slate-400">Wave Erosion Rate</div>
                </div>
              </div>
            </div>

            {/* PINN ML PARAMETERS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Brain className="w-3.5 h-3.5 text-cyan-400" /> PINN Trajectory Residual Model
                </span>
                <span className="text-[8px] text-emerald-400 font-mono">CONFIDENCE 96.8%</span>
              </div>

              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-200 font-bold block">Physics Residual Correction</span>
                    <span className="text-[9px] text-slate-500">Neural Network XGBoost residual error prediction</span>
                  </div>
                  <span className="text-cyan-300 font-bold px-2 py-1 rounded bg-cyan-400/10 border border-cyan-300/20 text-[9px] shrink-0">
                    ERR RES: 0.012 NM
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-200 font-bold block">Feature Importances</span>
                    <span className="text-[9px] text-slate-500">Wind Velocity (42%), Current Drift (38%), Iceberg Mass (20%)</span>
                  </div>
                  <span className="text-cyan-300 font-bold px-2 py-1 rounded bg-cyan-400/10 border border-cyan-300/20 text-[9px] shrink-0">
                    TOP: WIND (42%)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-200 font-bold block">Covariance Ellipse Spread</span>
                    <span className="text-[9px] text-slate-500">Ensemble spread defining 95% position confidence boundary</span>
                  </div>
                  <span className="text-emerald-400 font-bold px-2 py-1 rounded bg-emerald-400/10 border border-emerald-400/20 text-[9px] shrink-0">
                    RADIUS: 1.4 NM
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ====================================================
            PATH RL POLICY TAB (WITH INTERACTIVE SLIDERS)
        ==================================================== */}
        {activeTab === 'routing' && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* INTERACTIVE PARAMETER TUNING SLIDERS */}
            <div className="p-4 rounded-xl bg-black/40 border border-cyan-300/20 space-y-3">
              <div className="flex items-center justify-between text-[9px] font-bold text-cyan-300 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Interactive Model Parameter Tuning
                </span>
                <span className="text-[8px] text-emerald-400 font-mono font-bold">REAL-TIME SIMULATOR</span>
              </div>

              <div className="space-y-2.5 font-mono text-[10px]">
                {/* RISK PENALTY SLIDER */}
                <div>
                  <div className="flex justify-between text-[9px] text-slate-300 mb-1">
                    <span>Risk Weight Penalty (α)</span>
                    <span className="text-cyan-300 font-bold">{riskPenaltyAlpha.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={riskPenaltyAlpha}
                    onChange={(e) => setRiskPenaltyAlpha(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 cursor-pointer"
                  />
                </div>

                {/* ICE CONC THRESHOLD SLIDER */}
                <div>
                  <div className="flex justify-between text-[9px] text-slate-300 mb-1">
                    <span>Max Pack Ice Conc. Limit</span>
                    <span className="text-cyan-300 font-bold">{iceConcThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    step="5"
                    value={iceConcThreshold}
                    onChange={(e) => setIceConcThreshold(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 cursor-pointer"
                  />
                </div>

                {/* ICEBERG SAFETY RADIUS SLIDER */}
                <div>
                  <div className="flex justify-between text-[9px] text-slate-300 mb-1">
                    <span>Iceberg Clearance Buffer Radius</span>
                    <span className="text-cyan-300 font-bold">{icebergSafetyRadius} NM</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    step="1"
                    value={icebergSafetyRadius}
                    onChange={(e) => setIcebergSafetyRadius(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* PHYSICAL CONSTRAINTS */}
            <div>
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Anchor className="w-3.5 h-3.5 text-cyan-400" /> Vessel Physical Constraints
                </span>
                <span className="text-[8px] text-slate-500 font-mono">POLAR CLASS PC6</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 font-mono text-[10px]">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">BATHYMETRY DEPTH</span>
                  <span className="text-cyan-300 font-bold text-xs">&gt; 12.0m MIN</span>
                  <div className="text-[8px] text-slate-400 font-mono">Keel Clearance Safe</div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">FUEL BURN CURVE</span>
                  <span className="text-sky-300 font-bold text-xs">f(v) ∝ v³ Applied</span>
                  <div className="text-[8px] text-slate-400">18.4t Total Burn</div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">MAX SPEED IN ICE</span>
                  <span className="text-teal-300 font-bold text-xs">15.0 kts Max</span>
                  <div className="text-[8px] text-slate-400">9.5 kts Pack Ice Limit</div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">MANEUVERABILITY</span>
                  <span className="text-emerald-300 font-bold text-xs">PC-Class Bow</span>
                  <div className="text-[8px] text-slate-400">Turning Radius 280m</div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">MULTI-OBJECTIVE COST</span>
                  <span className="text-amber-300 font-bold text-xs">Risk + Time + Fuel</span>
                  <div className="text-[8px] text-slate-400">Optimal Pareto Path</div>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[8px] block">ICE PRESSURE PENALTY</span>
                  <span className="text-blue-300 font-bold text-xs">Active Filter</span>
                  <div className="text-[8px] text-slate-400">Avoid Ridge Compression</div>
                </div>
              </div>
            </div>

            {/* RL POLICY PARAMETERS */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Brain className="w-3.5 h-3.5 text-cyan-400" /> Reinforcement Learning Policy Weights
                </span>
                <span className="text-[8px] text-emerald-400 font-mono font-bold">A* PARETO OPTIMAL</span>
              </div>

              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-200 font-bold block">Risk Weighting Penalty (α)</span>
                    <span className="text-[9px] text-slate-500">Penalizing ice concentration & iceberg proximity derived from expert polar decisions</span>
                  </div>
                  <span className="text-cyan-300 font-bold px-2 py-1 rounded bg-cyan-400/10 border border-cyan-300/20 text-[9px] shrink-0">
                    α = {riskPenaltyAlpha.toFixed(2)}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-200 font-bold block">RL Policy Network Loss</span>
                    <span className="text-[9px] text-slate-500">Policy gradient loss evaluating path action efficiency under ice uncertainty</span>
                  </div>
                  <span className="text-emerald-400 font-bold px-2 py-1 rounded bg-emerald-400/10 border border-emerald-400/20 text-[9px] shrink-0">
                    LOSS: 0.0034
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-200 font-bold block">Action-Space Entropy</span>
                    <span className="text-[9px] text-slate-500">Exploration/exploitation balance for dynamic obstacle avoidance</span>
                  </div>
                  <span className="text-cyan-300 font-bold px-2 py-1 rounded bg-cyan-400/10 border border-cyan-300/20 text-[9px] shrink-0">
                    ENTROPY: 0.12
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
