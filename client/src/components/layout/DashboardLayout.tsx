import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Activity,
  ChevronDown,
  Crosshair,
  Gauge,
  Globe,
  Home,
  Layers,
  Map as MapIcon,
  Navigation,
  Route,
  Shield,
  Ship,
  Snowflake,
  Target,
  Wind,
  Waves,
  Thermometer,
  Database,
  Brain,
} from 'lucide-react';

import { useRoute } from '../../state/RouteContext';
import { routes } from '../../data/mockData';
import ModelDiagnostics from './ModelDiagnostics';

export default function DashboardLayout() {
  const {
    viewMode,
    setViewMode,
    introFinished,
    selectedRoute,
    setSelectedRoute,
  } = useRoute();

  /*
   * Local UI state.
   * This controls only the diagnostics panel.
   */
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  /*
   * The currently selected route comes from RouteContext,
   * so MapView and DashboardLayout use the same route.
   */
  const activeRoute =
    routes.find((route) => route.id === selectedRoute) ?? routes[0];

  if (!introFinished) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-20 flex flex-col pointer-events-none text-slate-100"
      >

        {/* =====================================================
            TOP BAR
        ===================================================== */}

        <header className="h-16 shrink-0 bg-[#06111a]/95 backdrop-blur-xl border-b border-cyan-300/10 flex items-center justify-between px-5 pointer-events-auto shadow-[0_8px_30px_rgba(0,0,0,0.35)]">

          {/* Brand */}

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-300" />
            </div>

            <div>

              <div className="flex items-center gap-1">

                <span className="text-[15px] font-bold tracking-[0.12em]">
                  ICEROUTE
                </span>

                <span className="text-[15px] font-bold tracking-[0.12em] text-cyan-300">
                  INDIA
                </span>

              </div>

              <div className="text-[9px] text-slate-500 tracking-[0.2em] uppercase">
                Antarctic Navigation Intelligence
              </div>

            </div>

            {/* System status */}

            <div className="ml-5 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-400/5 border border-emerald-400/15">

              <span className="status-dot status-dot-safe animate-pulse-glow" />

              <span className="text-[9px] font-bold tracking-[0.16em] text-emerald-300">
                SYSTEM OPERATIONAL
              </span>

            </div>

          </div>

          {/* Center status */}

          <div className="hidden lg:flex items-center gap-7 text-[10px]">

            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-slate-500" />

              <span className="text-slate-500">
                DATA
              </span>

              <span className="text-slate-300">
                LIVE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Brain className="w-3.5 h-3.5 text-cyan-400" />

              <span className="text-slate-500">
                AI MODEL
              </span>

              <span className="text-cyan-300">
                READY
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Gauge className="w-3.5 h-3.5 text-slate-500" />

              <span className="text-slate-500">
                CONFIDENCE
              </span>

              <span className="text-emerald-300">
                91%
              </span>
            </div>

          </div>

          {/* View switcher */}

          <div className="flex items-center bg-black/30 border border-white/5 rounded-lg p-1">

            <button
              onClick={() => setViewMode('2D')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-[10px] font-semibold transition-all ${
                viewMode === '2D'
                  ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-300/10'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              2D MAP
            </button>

            <button
              onClick={() => setViewMode('3D')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-[10px] font-semibold transition-all ${
                viewMode === '3D'
                  ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-300/10'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              3D GLOBE
            </button>

          </div>

        </header>

        {/* =====================================================
            MAIN AREA
        ===================================================== */}

        <div className="flex-1 min-h-0 flex">

          {/* ===================================================
              SIDE NAVIGATION
          =================================================== */}

          <nav className="w-16 shrink-0 bg-[#030a10]/95 border-r border-cyan-300/10 flex flex-col items-center py-4 pointer-events-auto">

            <NavButton
              icon={<Home />}
              label="Dashboard"
              active
            />

            <NavButton
              icon={<Route />}
              label="Routes"
            />

            <NavButton
              icon={<Crosshair />}
              label="Icebergs"
            />

            <NavButton
              icon={<Activity />}
              label="Forecast"
            />

            <NavButton
              icon={<Ship />}
              label="Vessel"
            />

            <div className="flex-1" />

            <NavButton
              icon={<Database />}
              label="Datasets"
            />

            <NavButton
              icon={<Shield />}
              label="System"
            />

          </nav>

          {/* ===================================================
              LEFT CONTROL PANEL
          =================================================== */}

          <aside className="w-[300px] shrink-0 bg-[#07151f]/94 backdrop-blur-xl border-r border-cyan-300/10 pointer-events-auto overflow-y-auto">

            {/* Route planner */}

            <section className="p-4 border-b border-white/5">

              <SectionTitle
                icon={<Navigation />}
                title="Mission Route"
              />

              <div className="space-y-3 mt-4">

                <SelectField
                  label="ORIGIN"
                  value="Cape Town"
                />

                <SelectField
                  label="DESTINATION"
                  value="Maitri Research Station"
                />

                <SelectField
                  label="VESSEL"
                  value="Research Vessel · PC6"
                />

                <div className="grid grid-cols-2 gap-2">

                  <SelectField
                    label="DEPARTURE"
                    value="26 AUG 2026"
                  />

                  <SelectField
                    label="FORECAST"
                    value="96 HOURS"
                  />

                </div>

                <button className="w-full mt-1 py-2.5 rounded-lg bg-cyan-400/90 hover:bg-cyan-300 text-[#031019] text-[10px] font-bold tracking-[0.12em] transition-all shadow-[0_0_20px_rgba(85,214,255,0.15)]">
                  RUN AI ROUTE ANALYSIS
                </button>

              </div>

            </section>

            {/* Route options */}

            <section className="p-4 border-b border-white/5">

              <SectionTitle
                icon={<Route />}
                title="Recommended Routes"
              />

              <div className="space-y-2 mt-4">

                {routes.map((route) => {

                  const isSelected =
                    selectedRoute === route.id;

                  const isSafest =
                    route.id === 'safest';

                  return (
                    <button
                      key={route.id}
                      onClick={() => setSelectedRoute(route.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-cyan-400/8 border-cyan-300/25'
                          : 'bg-black/15 border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">

                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              background: route.color,
                              boxShadow: `0 0 8px ${route.color}`,
                            }}
                          />

                          <span className="text-xs font-semibold text-slate-200">
                            {route.name}
                          </span>

                        </div>

                        {isSafest && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/15 text-emerald-300">
                            AI PICK
                          </span>
                        )}

                      </div>

                      <div className="grid grid-cols-3 mt-3 text-[9px]">

                        <Metric
                          label="RISK"
                          value={isSafest ? 'LOW' : 'MED'}
                          positive={isSafest}
                        />

                        <Metric
                          label="ETA"
                          value={isSafest ? '74h' : '62h'}
                        />

                        <Metric
                          label="FUEL"
                          value={isSafest ? '18.4t' : '21.2t'}
                        />

                      </div>

                    </button>
                  );
                })}

              </div>

            </section>

            {/* Data layers */}

            <section className="p-4">

              <SectionTitle
                icon={<Layers />}
                title="Data Layers"
              />

              <div className="space-y-1 mt-4">

                <LayerToggle
                  label="Sea Ice Concentration"
                  active
                  icon={<Snowflake />}
                />

                <LayerToggle
                  label="Iceberg Positions"
                  active
                  icon={<Target />}
                />

                <LayerToggle
                  label="Iceberg Trajectory"
                  active
                  icon={<Navigation />}
                />

                <LayerToggle
                  label="Wind Field"
                  icon={<Wind />}
                />

                <LayerToggle
                  label="Wave Height"
                  icon={<Waves />}
                />

                <LayerToggle
                  label="Temperature"
                  icon={<Thermometer />}
                />

                <LayerToggle
                  label="Route Risk"
                  active
                  icon={<Shield />}
                />

              </div>

              {/* Sea ice legend */}

              <div className="mt-5 p-3 rounded-lg bg-black/20 border border-white/5">

                <div className="text-[8px] text-slate-500 uppercase tracking-wider mb-2">
                  Sea Ice Concentration
                </div>

                <div className="flex h-2 rounded overflow-hidden">

                  <div className="flex-1 bg-blue-300" />
                  <div className="flex-1 bg-cyan-300" />
                  <div className="flex-1 bg-yellow-400" />
                  <div className="flex-1 bg-red-400" />

                </div>

                <div className="flex justify-between mt-1 text-[8px] text-slate-600">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>

              </div>

            </section>

          </aside>

          {/* ===================================================
              MAP AREA
          =================================================== */}

          <main className="flex-1 min-w-0 relative pointer-events-none">

            {/* Map HUD */}

            <div className="absolute top-4 left-4 z-10">

              <div className="ice-panel rounded-lg px-3 py-2 flex items-center gap-3">

                <div>

                  <div className="text-[8px] text-slate-500 uppercase tracking-wider">
                    Active Mission
                  </div>

                  <div className="text-xs font-semibold text-slate-200">
                    CAPE TOWN → MAITRI
                  </div>

                </div>

                <div className="h-7 w-px bg-white/10" />

                <div>

                  <div className="text-[8px] text-slate-500 uppercase tracking-wider">
                    Route
                  </div>

                  <div
                    className="text-xs font-bold"
                    style={{
                      color: activeRoute.color,
                    }}
                  >
                    {activeRoute.name.replace(' Route', '')}
                  </div>

                </div>

              </div>

            </div>

            {/* Coordinates */}

            <div className="absolute bottom-4 left-4 z-10">

              <div className="ice-panel rounded-lg px-3 py-2 text-[9px] font-mono text-slate-500">
                LAT 68.42° S&nbsp;&nbsp;&nbsp; LNG 74.12° E
              </div>

            </div>

            {/* Map controls */}

            <div className="absolute right-4 bottom-4 z-10 pointer-events-auto flex flex-col gap-1">

              <button
                className="w-9 h-9 ice-panel rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-300 transition"
                aria-label="Center map"
              >
                <Target className="w-4 h-4" />
              </button>

              <button
                className="w-9 h-9 ice-panel rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-300 transition"
                aria-label="Map layers"
              >
                <Layers className="w-4 h-4" />
              </button>

            </div>

          </main>

          {/* ===================================================
              RIGHT INTELLIGENCE PANEL
          =================================================== */}

          <aside className="w-[350px] shrink-0 bg-[#07151f]/92 backdrop-blur-xl border-l border-cyan-300/10 pointer-events-auto overflow-y-auto">

            {/* Route intelligence */}

            <section className="border-b border-white/5">

              <div className="p-4 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <Brain className="w-4 h-4 text-cyan-300" />

                  <div>

                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      AI Route Analysis
                    </div>

                    <div className="text-[8px] text-slate-500 mt-0.5">
                      Decision support output
                    </div>

                  </div>

                </div>

                <span className="text-[8px] text-emerald-300 bg-emerald-400/5 border border-emerald-400/10 px-2 py-1 rounded">
                  ACTIVE
                </span>

              </div>

              <div className="px-4 pb-4">

                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-400/8 to-transparent border border-emerald-400/15">

                  <div className="flex justify-between items-end">

                    <div>

                      <div className="text-[9px] text-slate-500 uppercase tracking-wider">
                        Safety Score
                      </div>

                      <div className="text-3xl font-bold text-emerald-300 mt-1">
                        82<span className="text-base">%</span>
                      </div>

                    </div>

                    <Shield className="w-8 h-8 text-emerald-400/30" />

                  </div>

                  <div className="mt-3 h-1.5 rounded-full bg-black/40 overflow-hidden">

                    <div className="h-full w-[82%] bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]" />

                  </div>

                </div>

                <div className="grid grid-cols-3 gap-2 mt-3">

                  <RiskCard
                    label="ICE"
                    value="LOW"
                    type="safe"
                  />

                  <RiskCard
                    label="ICEBERG"
                    value="LOW"
                    type="safe"
                  />

                  <RiskCard
                    label="WEATHER"
                    value="MED"
                    type="warning"
                  />

                </div>

              </div>

            </section>

            {/* Iceberg */}

            <section className="p-4 border-b border-white/5">

              <div className="flex items-center justify-between mb-4">

                <SectionTitle
                  icon={<Crosshair />}
                  title="Iceberg Intelligence"
                />

                <span className="text-[9px] font-mono text-cyan-300">
                  A102
                </span>

              </div>

              <div className="grid grid-cols-2 gap-2">

                <InfoCard
                  label="POSITION"
                  value="68.42° S"
                  sub="74.12° E"
                />

                <InfoCard
                  label="DRIFT"
                  value="NE"
                  sub="Predicted"
                />

                <InfoCard
                  label="CONFIDENCE"
                  value="72%"
                  sub="Trajectory"
                />

                <InfoCard
                  label="DETECTED"
                  value="26 AUG"
                  sub="Satellite"
                />

              </div>

              {/* Prediction timeline */}

              <div className="mt-4 p-3 rounded-lg bg-black/20 border border-white/5">

                <div className="flex items-center justify-between mb-3">

                  <span className="text-[8px] text-slate-500 uppercase tracking-wider">
                    Predicted Trajectory
                  </span>

                  <span className="text-[8px] text-cyan-400">
                    +96H
                  </span>

                </div>

                <div className="relative h-10">

                  <div className="absolute left-2 right-2 top-4 h-px bg-slate-700" />

                  <div className="relative flex justify-between">

                    {[
                      'NOW',
                      '+12H',
                      '+24H',
                      '+48H',
                      '+96H',
                    ].map((time, index) => (

                      <div
                        key={time}
                        className="flex flex-col items-center"
                      >

                        <div
                          className={`w-2.5 h-2.5 rounded-full border-2 ${
                            index === 0
                              ? 'bg-cyan-400 border-cyan-200'
                              : 'bg-[#07151f] border-cyan-400/50'
                          }`}
                        />

                        <span className="text-[7px] text-slate-600 mt-2">
                          {time}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </section>

            {/* Vessel */}

            <section className="p-4 border-b border-white/5">

              <SectionTitle
                icon={<Ship />}
                title="Vessel Safety"
              />

              <div className="mt-4 space-y-2">

                <TelemetryRow
                  label="Polar Class"
                  value="PC6"
                />

                <TelemetryRow
                  label="Recommended Speed"
                  value="5 knots"
                  valueClass="text-amber-300"
                />

                <TelemetryRow
                  label="Current Risk"
                  value="MEDIUM"
                  valueClass="text-amber-300"
                />

                <TelemetryRow
                  label="Vessel Status"
                  value="OPERATIONAL"
                  valueClass="text-emerald-300"
                />

              </div>

            </section>

            {/* Model diagnostics */}

            <section className="p-4">

              <button
                onClick={() =>
                  setShowDiagnostics(!showDiagnostics)
                }
                className="w-full flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5 hover:border-cyan-300/20 transition"
              >

                <div className="flex items-center gap-2">

                  <Activity className="w-4 h-4 text-cyan-300" />

                  <div className="text-left">

                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                      Model Diagnostics
                    </div>

                    <div className="text-[8px] text-slate-600">
                      Parameters & telemetry
                    </div>

                  </div>

                </div>

                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform ${
                    showDiagnostics
                      ? 'rotate-180'
                      : ''
                  }`}
                />

              </button>

              <AnimatePresence>

                {showDiagnostics && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: 'auto',
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    className="mt-3 overflow-hidden"
                  >
                    <ModelDiagnostics />
                  </motion.div>

                )}

              </AnimatePresence>

            </section>

          </aside>

        </div>

        {/* =====================================================
            BOTTOM TELEMETRY
        ===================================================== */}

        <footer className="h-12 shrink-0 bg-[#030a10]/96 border-t border-cyan-300/10 backdrop-blur-xl flex items-center px-5 pointer-events-auto">

          <Telemetry
            icon={<Snowflake />}
            label="SEA ICE"
            value="42%"
            status="safe"
          />

          <Divider />

          <Telemetry
            icon={<Wind />}
            label="WIND"
            value="12 kts"
          />

          <Divider />

          <Telemetry
            icon={<Waves />}
            label="WAVES"
            value="4.1 m"
            status="warning"
          />

          <Divider />

          <Telemetry
            icon={<Thermometer />}
            label="TEMP"
            value="-1.2°C"
          />

          <Divider />

          <Telemetry
            icon={<Crosshair />}
            label="ICEBERG RISK"
            value="LOW"
            status="safe"
          />

          <Divider />

          <Telemetry
            icon={<Brain />}
            label="AI CONFIDENCE"
            value="91%"
            status="safe"
          />

          <div className="flex-1" />

          <div className="hidden md:flex items-center gap-2 text-[8px] text-slate-600 font-mono">

            <span>
              LAST UPDATE
            </span>

            <span className="text-slate-400">
              12:18:42 UTC
            </span>

          </div>

        </footer>

      </motion.div>
    </AnimatePresence>
  );
}

/* ============================================================
   NAV BUTTON
============================================================ */

function NavButton({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`relative w-10 h-10 mb-2 rounded-lg flex items-center justify-center group transition-all ${
        active
          ? 'bg-cyan-400/10 text-cyan-300 border border-cyan-300/15'
          : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.03]'
      }`}
    >

      <span className="[&>svg]:w-4 [&>svg]:h-4">
        {icon}
      </span>

      <span className="absolute left-12 z-50 px-2 py-1 rounded bg-[#0b1b26] border border-white/10 text-[9px] text-slate-300 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-xl">
        {label}
      </span>

    </button>
  );
}

/* ============================================================
   SECTION TITLE
============================================================ */

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">

      <span className="text-cyan-300 [&>svg]:w-3.5 [&>svg]:h-3.5">
        {icon}
      </span>

      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.16em]">
        {title}
      </span>

    </div>
  );
}

/* ============================================================
   SELECT FIELD
============================================================ */

function SelectField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <label className="block text-[8px] text-slate-600 uppercase tracking-wider mb-1.5">
        {label}
      </label>

      <div className="relative">

        <select
          defaultValue={value}
          className="appearance-none w-full bg-black/25 border border-white/5 rounded-lg px-3 py-2 pr-8 text-[10px] text-slate-300 outline-none focus:border-cyan-300/30 transition"
        >
          <option>
            {value}
          </option>
        </select>

        <ChevronDown className="absolute right-2.5 top-2.5 w-3 h-3 text-slate-600 pointer-events-none" />

      </div>

    </div>
  );
}

/* ============================================================
   METRIC
============================================================ */

function Metric({
  label,
  value,
  positive = false,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div>

      <div className="text-[7px] text-slate-600 uppercase">
        {label}
      </div>

      <div
        className={`mt-0.5 font-semibold ${
          positive
            ? 'text-emerald-300'
            : 'text-slate-300'
        }`}
      >
        {value}
      </div>

    </div>
  );
}

/* ============================================================
   LAYER TOGGLE
============================================================ */

function LayerToggle({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/[0.025] cursor-pointer group">

      <input
        type="checkbox"
        defaultChecked={active}
        className="accent-cyan-400 w-3 h-3"
      />

      <span className="text-slate-600 group-hover:text-cyan-300 transition [&>svg]:w-3.5 [&>svg]:h-3.5">
        {icon}
      </span>

      <span className="text-[10px] text-slate-400 group-hover:text-slate-200 transition">
        {label}
      </span>

    </label>
  );
}

/* ============================================================
   RISK CARD
============================================================ */

function RiskCard({
  label,
  value,
  type,
}: {
  label: string;
  value: string;
  type: 'safe' | 'warning';
}) {
  return (
    <div className="p-2 rounded-lg bg-black/20 border border-white/5 text-center">

      <div className="text-[7px] text-slate-600 uppercase">
        {label}
      </div>

      <div
        className={`text-[9px] font-bold mt-1 ${
          type === 'safe'
            ? 'text-emerald-300'
            : 'text-amber-300'
        }`}
      >
        {value}
      </div>

    </div>
  );
}

/* ============================================================
   INFO CARD
============================================================ */

function InfoCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="p-2.5 rounded-lg bg-black/20 border border-white/5">

      <div className="text-[7px] text-slate-600 uppercase tracking-wider">
        {label}
      </div>

      <div className="text-[11px] font-semibold text-slate-200 mt-1">
        {value}
      </div>

      <div className="text-[7px] text-slate-600 mt-0.5">
        {sub}
      </div>

    </div>
  );
}

/* ============================================================
   TELEMETRY ROW
============================================================ */

function TelemetryRow({
  label,
  value,
  valueClass = 'text-slate-200',
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-0">

      <span className="text-[9px] text-slate-600">
        {label}
      </span>

      <span
        className={`text-[9px] font-semibold ${valueClass}`}
      >
        {value}
      </span>

    </div>
  );
}

/* ============================================================
   TELEMETRY
============================================================ */

function Telemetry({
  icon,
  label,
  value,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  status?: 'safe' | 'warning';
}) {
  return (
    <div className="flex items-center gap-2 px-4">

      <span className="text-slate-600 [&>svg]:w-3 [&>svg]:h-3">
        {icon}
      </span>

      <span className="text-[7px] text-slate-600 uppercase tracking-wider">
        {label}
      </span>

      <span
        className={`text-[9px] font-bold ${
          status === 'safe'
            ? 'text-emerald-300'
            : status === 'warning'
              ? 'text-amber-300'
              : 'text-slate-300'
        }`}
      >
        {value}
      </span>

    </div>
  );
}

/* ============================================================
   DIVIDER
============================================================ */

function Divider() {
  return (
    <div className="h-5 w-px bg-white/5" />
  );
}