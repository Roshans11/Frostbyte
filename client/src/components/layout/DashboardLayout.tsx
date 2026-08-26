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
  Play,
  CheckCircle2,
  Loader2,
  Clock3,
  CalendarDays,
  MapPin,
} from 'lucide-react';

import { useRoute } from '../../state/RouteContext';

import {
  locations,
  routeMetadata,
  missionRoutes,
  type RouteType,
} from '../../data/mockData';

import ModelDiagnostics from './ModelDiagnostics';

/* ============================================================
   DASHBOARD
============================================================ */

export default function DashboardLayout() {
  const {
    viewMode,
    setViewMode,

    introFinished,

    selectedRoute,
    setSelectedRoute,

    mission,
    setMission,
  } = useRoute();

  /* ==========================================================
     LOCAL UI STATE
  ========================================================== */

  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [analysisComplete, setAnalysisComplete] = useState(false);

  const [analysisProgress, setAnalysisProgress] = useState(0);

  /* ==========================================================
     AVAILABLE ROUTES
  ========================================================== */

  const availableRoutes: RouteType[] = [
    'safest',
    'fastest',
    'fuel',
  ];

  /* ==========================================================
     ACTIVE ROUTE
  ========================================================== */

  const activeRouteType: RouteType = availableRoutes.includes(
    selectedRoute as RouteType
  )
    ? (selectedRoute as RouteType)
    : 'safest';

  const activeRouteMetadata = routeMetadata[activeRouteType];

  /* ==========================================================
     ACTIVE ORIGIN
  ========================================================== */

  const activeOrigin = locations.find(
    (location) => location.id === mission.origin
  );

  /* ==========================================================
     ACTIVE DESTINATION
  ========================================================== */

  const activeDestination = locations.find(
    (location) => location.id === mission.destination
  );

  /* ==========================================================
     ROUTE AVAILABILITY
  ========================================================== */

  const missionRouteExists = Boolean(
    missionRoutes?.[mission.origin]?.[mission.destination]
  );

  /* ==========================================================
     MISSION UPDATE
  ========================================================== */

  const updateMission = (changes: Partial<typeof mission>) => {
    setAnalysisComplete(false);

    setMission((current) => ({
      ...current,
      ...changes,
    }));
  };

  /* ==========================================================
     ROUTE CHANGE
  ========================================================== */

  const handleRouteChange = (route: RouteType) => {
    if (isAnalyzing) return;

    setSelectedRoute(route);
    setAnalysisComplete(false);
    setAnalysisProgress(0);
  };

  /* ==========================================================
     RUN AI ROUTE ANALYSIS
  ========================================================== */

  const runRouteAnalysis = () => {
    if (isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setAnalysisProgress(0);

    /*
     * FRONTEND SIMULATION ONLY
     *
     * Later your backend / AI model can replace this
     * function and return the actual route result.
     *
     * IMPORTANT:
     * We intentionally DO NOT call:
     *
     * setSelectedRoute('safest')
     *
     * because the user's selected route must remain selected.
     */

    let progress = 0;

    const interval = window.setInterval(() => {
      progress += Math.floor(Math.random() * 13) + 7;

      if (progress >= 100) {
        progress = 100;

        window.clearInterval(interval);

        setAnalysisProgress(100);

        window.setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysisComplete(true);
        }, 500);
      } else {
        setAnalysisProgress(progress);
      }
    }, 260);
  };

  /* ==========================================================
     INTRO
  ========================================================== */

  if (!introFinished) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          absolute
          inset-0
          z-20
          flex
          flex-col
          pointer-events-none
          text-slate-100
        "
      >
        {/* =====================================================
            TOP BAR
        ===================================================== */}

        <header
          className="
            h-16
            shrink-0
            bg-[#06111a]/95
            backdrop-blur-xl
            border-b
            border-cyan-300/10
            flex
            items-center
            justify-between
            px-5
            pointer-events-auto
            shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          "
        >
          {/* BRAND */}

          <div className="flex items-center gap-3">
            <div
              className="
                w-9
                h-9
                rounded-lg
                bg-cyan-400/10
                border
                border-cyan-300/20
                flex
                items-center
                justify-center
              "
            >
              <Shield
                className="
                  w-5
                  h-5
                  text-cyan-300
                "
              />
            </div>

            <div>
              <div className="flex items-center gap-1">
                <span
                  className="
                    text-[15px]
                    font-bold
                    tracking-[0.12em]
                  "
                >
                  ICEROUTE
                </span>

                <span
                  className="
                    text-[15px]
                    font-bold
                    tracking-[0.12em]
                    text-cyan-300
                  "
                >
                  INDIA
                </span>
              </div>

              <div
                className="
                  text-[9px]
                  text-slate-500
                  tracking-[0.2em]
                  uppercase
                "
              >
                Antarctic Navigation Intelligence
              </div>
            </div>

            <div
              className="
                ml-5
                hidden
                md:flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-emerald-400/5
                border
                border-emerald-400/15
              "
            >
              <span
                className="
                  status-dot
                  status-dot-safe
                  animate-pulse-glow
                "
              />

              <span
                className="
                  text-[9px]
                  font-bold
                  tracking-[0.16em]
                  text-emerald-300
                "
              >
                SYSTEM OPERATIONAL
              </span>
            </div>
          </div>

          {/* CENTER STATUS */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-7
              text-[10px]
            "
          >
            <div className="flex items-center gap-2">
              <Database
                className="
                  w-3.5
                  h-3.5
                  text-slate-500
                "
              />

              <span className="text-slate-500">
                DATA
              </span>

              <span className="text-slate-300">
                LIVE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Brain
                className="
                  w-3.5
                  h-3.5
                  text-cyan-400
                "
              />

              <span className="text-slate-500">
                AI MODEL
              </span>

              <span className="text-cyan-300">
                READY
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Gauge
                className="
                  w-3.5
                  h-3.5
                  text-slate-500
                "
              />

              <span className="text-slate-500">
                CONFIDENCE
              </span>

              <span className="text-emerald-300">
                91%
              </span>
            </div>
          </div>

          {/* VIEW SWITCHER */}

          <div
            className="
              flex
              items-center
              bg-black/30
              border
              border-white/5
              rounded-lg
              p-1
            "
          >
            <button
              type="button"
              onClick={() => setViewMode('2D')}
              className={`
                flex
                items-center
                gap-2
                px-3
                py-2
                rounded-md
                text-[10px]
                font-semibold
                transition-all
                ${
                  viewMode === '2D'
                    ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-300/10'
                    : 'text-slate-500 hover:text-slate-300'
                }
              `}
            >
              <MapIcon
                className="
                  w-3.5
                  h-3.5
                "
              />

              2D MAP
            </button>

            <button
              type="button"
              onClick={() => setViewMode('3D')}
              className={`
                flex
                items-center
                gap-2
                px-3
                py-2
                rounded-md
                text-[10px]
                font-semibold
                transition-all
                ${
                  viewMode === '3D'
                    ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-300/10'
                    : 'text-slate-500 hover:text-slate-300'
                }
              `}
            >
              <Globe
                className="
                  w-3.5
                  h-3.5
                "
              />

              3D GLOBE
            </button>
          </div>
        </header>

        {/* =====================================================
            MAIN AREA
        ===================================================== */}

        <div
          className="
            flex-1
            min-h-0
            flex
          "
        >
          {/* SIDE NAVIGATION */}

          <nav
            className="
              w-16
              shrink-0
              bg-[#030a10]/95
              border-r
              border-cyan-300/10
              flex
              flex-col
              items-center
              py-4
              pointer-events-auto
            "
          >
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

          <aside
            className="
              w-[300px]
              shrink-0
              bg-[#07151f]/94
              backdrop-blur-xl
              border-r
              border-cyan-300/10
              pointer-events-auto
              overflow-y-auto
            "
          >
            {/* MISSION PLANNER */}

            <section
              className="
                p-4
                border-b
                border-white/5
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <SectionTitle
                  icon={<Navigation />}
                  title="Mission Planner"
                />

                <span
                  className={`
                    text-[7px]
                    font-bold
                    tracking-wider
                    px-2
                    py-1
                    rounded-full
                    border
                    ${
                      isAnalyzing
                        ? 'text-cyan-300 bg-cyan-400/5 border-cyan-300/15'
                        : analysisComplete
                          ? 'text-emerald-300 bg-emerald-400/5 border-emerald-400/15'
                          : 'text-slate-500 bg-white/[0.02] border-white/5'
                    }
                  `}
                >
                  {isAnalyzing
                    ? 'ANALYZING'
                    : analysisComplete
                      ? 'COMPLETE'
                      : 'READY'}
                </span>
              </div>

              <div
                className="
                  space-y-3
                  mt-4
                "
              >
                {/* ORIGIN */}

                <SelectField
                  label="ORIGIN"
                  value={mission.origin}
                  options={locations.map((location) => ({
                    value: location.id,
                    label: location.name,
                  }))}
                  onChange={(value) => {
                    updateMission({
                      origin: value,
                    });
                  }}
                />

                {/* DESTINATION */}

                <SelectField
                  label="DESTINATION"
                  value={mission.destination}
                  options={locations.map((location) => ({
                    value: location.id,
                    label: location.name,
                  }))}
                  onChange={(value) => {
                    updateMission({
                      destination: value,
                    });
                  }}
                />

                {/* VESSEL */}

                <SelectField
                  label="VESSEL"
                  value={mission.vessel}
                  options={[
                    {
                      value: 'PC6',
                      label: 'Research Vessel · PC6',
                    },
                    {
                      value: 'PC5',
                      label: 'Research Vessel · PC5',
                    },
                    {
                      value: 'PC4',
                      label: 'Research Vessel · PC4',
                    },
                    {
                      value: 'PC3',
                      label: 'Research Vessel · PC3',
                    },
                  ]}
                  onChange={(value) => {
                    updateMission({
                      vessel: value,
                    });
                  }}
                />

                {/* DATE + TIME */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-2
                  "
                >
                  <DateField
                    label="DEPARTURE DATE"
                    value={mission.departureDate}
                    onChange={(value) => {
                      updateMission({
                        departureDate: value,
                      });
                    }}
                  />

                  <TimeField
                    label="TIME"
                    value={mission.departureTime}
                    onChange={(value) => {
                      updateMission({
                        departureTime: value,
                      });
                    }}
                  />
                </div>

                {/* FORECAST */}

                <SelectField
                  label="FORECAST HORIZON"
                  value={String(mission.forecastHours)}
                  options={[
                    {
                      value: '24',
                      label: '24 HOURS',
                    },
                    {
                      value: '48',
                      label: '48 HOURS',
                    },
                    {
                      value: '72',
                      label: '72 HOURS',
                    },
                    {
                      value: '96',
                      label: '96 HOURS',
                    },
                    {
                      value: '120',
                      label: '120 HOURS',
                    },
                    {
                      value: '168',
                      label: '168 HOURS',
                    },
                  ]}
                  onChange={(value) => {
                    updateMission({
                      forecastHours: Number(value),
                    });
                  }}
                />

                {/* MISSION SUMMARY */}

                <div
                  className="
                    rounded-lg
                    bg-black/20
                    border
                    border-white/5
                    p-3
                  "
                >
                  <div
                    className="
                      text-[8px]
                      text-slate-600
                      uppercase
                      tracking-wider
                      mb-2
                    "
                  >
                    Mission Summary
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-y-2
                    "
                  >
                    <MiniSummary
                      icon={<MapPin />}
                      label="FROM"
                      value={
                        activeOrigin?.name ??
                        mission.origin
                      }
                    />

                    <MiniSummary
                      icon={<Target />}
                      label="TO"
                      value={
                        activeDestination?.name ??
                        mission.destination
                      }
                    />

                    <MiniSummary
                      icon={<Ship />}
                      label="VESSEL"
                      value={mission.vessel}
                    />

                    <MiniSummary
                      icon={<Clock3 />}
                      label="HORIZON"
                      value={`${mission.forecastHours}H`}
                    />
                  </div>
                </div>

                {/* ROUTE AVAILABILITY */}

                <div
                  className={`
                    rounded-lg
                    border
                    px-3
                    py-2.5
                    ${
                      missionRouteExists
                        ? 'border-emerald-400/15 bg-emerald-400/5'
                        : 'border-amber-400/15 bg-amber-400/5'
                    }
                  `}
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    {missionRouteExists ? (
                      <CheckCircle2
                        className="
                          w-3.5
                          h-3.5
                          text-emerald-300
                        "
                      />
                    ) : (
                      <Target
                        className="
                          w-3.5
                          h-3.5
                          text-amber-300
                        "
                      />
                    )}

                    <span
                      className={`
                        text-[8px]
                        font-semibold
                        ${
                          missionRouteExists
                            ? 'text-emerald-300'
                            : 'text-amber-300'
                        }
                      `}
                    >
                      {missionRouteExists
                        ? 'ROUTE DATA AVAILABLE'
                        : 'ROUTE DATA NOT AVAILABLE FOR THIS PAIR'}
                    </span>
                  </div>
                </div>

                {/* ANALYSIS PROGRESS */}

                <AnimatePresence>
                  {isAnalyzing && (
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
                      className="
                        overflow-hidden
                      "
                    >
                      <div
                        className="
                          rounded-lg
                          border
                          border-cyan-300/15
                          bg-cyan-400/5
                          p-3
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            mb-2
                          "
                        >
                          <div
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >
                            <Loader2
                              className="
                                w-3.5
                                h-3.5
                                text-cyan-300
                                animate-spin
                              "
                            />

                            <span
                              className="
                                text-[8px]
                                text-cyan-300
                                font-semibold
                                uppercase
                                tracking-wider
                              "
                            >
                              AI Processing
                            </span>
                          </div>

                          <span
                            className="
                              text-[9px]
                              font-mono
                              text-cyan-300
                            "
                          >
                            {analysisProgress}%
                          </span>
                        </div>

                        <div
                          className="
                            h-1.5
                            rounded-full
                            bg-black/40
                            overflow-hidden
                          "
                        >
                          <motion.div
                            className="
                              h-full
                              bg-cyan-300
                              rounded-full
                              shadow-[0_0_12px_rgba(85,214,255,0.6)]
                            "
                            initial={{
                              width: '0%',
                            }}
                            animate={{
                              width: `${analysisProgress}%`,
                            }}
                            transition={{
                              duration: 0.25,
                            }}
                          />
                        </div>

                        <div
                          className="
                            mt-2
                            grid
                            grid-cols-2
                            gap-y-1
                          "
                        >
                          <AnalysisStep
                            label="Ocean conditions"
                            done={analysisProgress >= 20}
                          />

                          <AnalysisStep
                            label="Sea-ice data"
                            done={analysisProgress >= 40}
                          />

                          <AnalysisStep
                            label="Iceberg positions"
                            done={analysisProgress >= 60}
                          />

                          <AnalysisStep
                            label="Route optimization"
                            done={analysisProgress >= 80}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* COMPLETE MESSAGE */}

                <AnimatePresence>
                  {analysisComplete && !isAnalyzing && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-emerald-400/15
                        bg-emerald-400/5
                        px-3
                        py-2
                      "
                    >
                      <CheckCircle2
                        className="
                          w-4
                          h-4
                          text-emerald-300
                        "
                      />

                      <div>
                        <div
                          className="
                            text-[8px]
                            font-bold
                            text-emerald-300
                          "
                        >
                          ROUTE ANALYSIS COMPLETE
                        </div>

                        <div
                          className="
                            text-[7px]
                            text-slate-600
                            mt-0.5
                          "
                        >
                          {activeRouteMetadata.name} remains active
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* RUN ANALYSIS BUTTON */}

                <button
                  type="button"
                  disabled={
                    isAnalyzing ||
                    !missionRouteExists
                  }
                  onClick={runRouteAnalysis}
                  className={`
                    w-full
                    py-3
                    rounded-lg
                    text-[9px]
                    font-bold
                    tracking-[0.13em]
                    transition-all
                    flex
                    items-center
                    justify-center
                    gap-2
                    ${
                      isAnalyzing
                        ? 'bg-cyan-400/10 text-cyan-300 border border-cyan-300/20 cursor-wait'
                        : missionRouteExists
                          ? 'bg-cyan-400 text-[#031019] hover:bg-cyan-300 shadow-[0_0_24px_rgba(85,214,255,0.16)]'
                          : 'bg-slate-700/40 text-slate-600 border border-white/5 cursor-not-allowed'
                    }
                  `}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2
                        className="
                          w-3.5
                          h-3.5
                          animate-spin
                        "
                      />

                      ANALYZING MISSION
                    </>
                  ) : analysisComplete ? (
                    <>
                      <CheckCircle2
                        className="
                          w-3.5
                          h-3.5
                        "
                      />

                      RE-RUN AI ANALYSIS
                    </>
                  ) : (
                    <>
                      <Play
                        className="
                          w-3.5
                          h-3.5
                          fill-current
                        "
                      />

                      GENERATE AI ROUTE
                    </>
                  )}
                </button>

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    text-[7px]
                    text-slate-600
                  "
                >
                  <Brain
                    className="
                      w-3
                      h-3
                    "
                  />

                  AI decision support · frontend simulation
                </div>
              </div>
            </section>

            {/* =================================================
                ROUTE OPTIONS
            ================================================= */}

            <section
              className="
                p-4
                border-b
                border-white/5
              "
            >
              <SectionTitle
                icon={<Route />}
                title="Recommended Routes"
              />

              <div
                className="
                  space-y-2
                  mt-4
                "
              >
                {availableRoutes.map((routeId) => {
                  const route =
                    routeMetadata[routeId];

                  const isSelected =
                    activeRouteType === routeId;

                  const isSafest =
                    routeId === 'safest';

                  return (
                    <button
                      key={routeId}
                      type="button"
                      disabled={isAnalyzing}
                      onClick={() =>
                        handleRouteChange(
                          routeId
                        )
                      }
                      className={`
                        w-full
                        text-left
                        p-3
                        rounded-lg
                        border
                        transition-all
                        ${
                          isSelected
                            ? 'bg-cyan-400/10 border-cyan-300/40 shadow-[0_0_25px_rgba(85,214,255,0.10)] scale-[1.01]'
                            : 'bg-black/15 border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                        }
                        ${
                          isAnalyzing
                            ? 'opacity-60 cursor-wait'
                            : ''
                        }
                      `}
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <span
                            className="
                              w-2.5
                              h-2.5
                              rounded-full
                            "
                            style={{
                              background:
                                route.color,
                              boxShadow:
                                `0 0 10px ${route.color}`,
                            }}
                          />

                          <span
                            className="
                              text-xs
                              font-semibold
                              text-slate-200
                            "
                          >
                            {route.name}
                          </span>
                        </div>

                        <div
                          className="
                            flex
                            items-center
                            gap-1
                          "
                        >
                          {isSelected && (
                            <span
                              className="
                                text-[7px]
                                px-1.5
                                py-0.5
                                rounded
                                bg-cyan-400/10
                                border
                                border-cyan-300/15
                                text-cyan-300
                              "
                            >
                              ACTIVE
                            </span>
                          )}

                          {isSafest && (
                            <span
                              className="
                                text-[8px]
                                px-1.5
                                py-0.5
                                rounded
                                bg-emerald-400/10
                                border
                                border-emerald-400/15
                                text-emerald-300
                              "
                            >
                              AI PICK
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className="
                          grid
                          grid-cols-3
                          mt-3
                          text-[9px]
                        "
                      >
                        <Metric
                          label="RISK"
                          value={
                            route.risk ??
                            (isSafest
                              ? 'LOW'
                              : 'MED')
                          }
                          positive={isSafest}
                        />

                        <Metric
                          label="ETA"
                          value={
                            route.eta ??
                            '--'
                          }
                        />

                        <Metric
                          label="FUEL"
                          value={
                            route.fuel ??
                            '--'
                          }
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* =================================================
                DATA LAYERS
            ================================================= */}

            <section className="p-4">
              <SectionTitle
                icon={<Layers />}
                title="Data Layers"
              />

              <div
                className="
                  space-y-1
                  mt-4
                "
              >
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

              {/* SEA ICE LEGEND */}

              <div
                className="
                  mt-5
                  p-3
                  rounded-lg
                  bg-black/20
                  border
                  border-white/5
                "
              >
                <div
                  className="
                    text-[8px]
                    text-slate-500
                    uppercase
                    tracking-wider
                    mb-2
                  "
                >
                  Sea Ice Concentration
                </div>

                <div
                  className="
                    flex
                    h-2
                    rounded
                    overflow-hidden
                  "
                >
                  <div className="flex-1 bg-blue-300" />
                  <div className="flex-1 bg-cyan-300" />
                  <div className="flex-1 bg-yellow-400" />
                  <div className="flex-1 bg-red-400" />
                </div>

                <div
                  className="
                    flex
                    justify-between
                    mt-1
                    text-[8px]
                    text-slate-600
                  "
                >
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

          <main
            className="
              flex-1
              min-w-0
              relative
              pointer-events-none
            "
          >
            {/* ACTIVE MISSION HUD */}

            <div
              className="
                absolute
                top-4
                left-4
                z-10
              "
            >
              <div
                className="
                  ice-panel
                  rounded-lg
                  px-3
                  py-2
                  flex
                  items-center
                  gap-3
                "
              >
                <div>
                  <div
                    className="
                      text-[8px]
                      text-slate-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Active Mission
                  </div>

                  <div
                    className="
                      text-xs
                      font-semibold
                      text-slate-200
                    "
                  >
                    {activeOrigin?.name ??
                      mission.origin}
                    {' → '}
                    {activeDestination?.name ??
                      mission.destination}
                  </div>
                </div>

                <div
                  className="
                    h-7
                    w-px
                    bg-white/10
                  "
                />

                <div>
                  <div
                    className="
                      text-[8px]
                      text-slate-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Route
                  </div>

                  <div
                    className="
                      text-xs
                      font-bold
                    "
                    style={{
                      color:
                        activeRouteMetadata.color,
                    }}
                  >
                    {activeRouteMetadata.name.replace(
                      ' Route',
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* MISSION DATE HUD */}

            <div
              className="
                absolute
                top-4
                right-4
                z-10
              "
            >
              <div
                className="
                  ice-panel
                  rounded-lg
                  px-3
                  py-2
                  flex
                  items-center
                  gap-3
                "
              >
                <CalendarDays
                  className="
                    w-3.5
                    h-3.5
                    text-cyan-300
                  "
                />

                <div>
                  <div
                    className="
                      text-[7px]
                      text-slate-600
                      uppercase
                      tracking-wider
                    "
                  >
                    Departure
                  </div>

                  <div
                    className="
                      text-[9px]
                      font-mono
                      text-slate-300
                    "
                  >
                    {mission.departureDate}
                    {' · '}
                    {mission.departureTime}
                  </div>
                </div>
              </div>
            </div>

            {/* COORDINATES */}

            <div
              className="
                absolute
                bottom-4
                left-4
                z-10
              "
            >
              <div
                className="
                  ice-panel
                  rounded-lg
                  px-3
                  py-2
                  text-[9px]
                  font-mono
                  text-slate-500
                "
              >
                {activeDestination
                  ? `LAT ${Math.abs(
                      activeDestination.latitude
                    ).toFixed(2)}° ${
                      activeDestination.latitude <
                      0
                        ? 'S'
                        : 'N'
                    }`
                  : 'LAT --'}

                &nbsp;&nbsp;&nbsp;

                {activeDestination
                  ? `LNG ${Math.abs(
                      activeDestination.longitude
                    ).toFixed(2)}° ${
                      activeDestination.longitude <
                      0
                        ? 'W'
                        : 'E'
                    }`
                  : 'LNG --'}
              </div>
            </div>

            {/* MAP CONTROLS */}

            <div
              className="
                absolute
                right-4
                bottom-4
                z-10
                pointer-events-auto
                flex
                flex-col
                gap-1
              "
            >
              <button
                type="button"
                className="
                  w-9
                  h-9
                  ice-panel
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-slate-400
                  hover:text-cyan-300
                  transition
                "
                aria-label="Center map"
              >
                <Target
                  className="
                    w-4
                    h-4
                  "
                />
              </button>

              <button
                type="button"
                className="
                  w-9
                  h-9
                  ice-panel
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-slate-400
                  hover:text-cyan-300
                  transition
                "
                aria-label="Map layers"
              >
                <Layers
                  className="
                    w-4
                    h-4
                  "
                />
              </button>
            </div>
          </main>

          {/* ===================================================
              RIGHT INTELLIGENCE PANEL
          =================================================== */}

          <aside
            className="
              w-[350px]
              shrink-0
              bg-[#07151f]/92
              backdrop-blur-xl
              border-l
              border-cyan-300/10
              pointer-events-auto
              overflow-y-auto
            "
          >
            {/* ROUTE INTELLIGENCE */}

            <section
              className="
                border-b
                border-white/5
              "
            >
              <div
                className="
                  p-4
                  flex
                  items-center
                  justify-between
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Brain
                    className="
                      w-4
                      h-4
                      text-cyan-300
                    "
                  />

                  <div>
                    <div
                      className="
                        text-xs
                        font-bold
                        text-slate-200
                        uppercase
                        tracking-wider
                      "
                    >
                      AI Route Analysis
                    </div>

                    <div
                      className="
                        text-[8px]
                        text-slate-500
                        mt-0.5
                      "
                    >
                      Decision support output
                    </div>
                  </div>
                </div>

                <span
                  className={`
                    text-[8px]
                    px-2
                    py-1
                    rounded
                    ${
                      isAnalyzing
                        ? 'text-cyan-300 bg-cyan-400/5 border border-cyan-400/10'
                        : analysisComplete
                          ? 'text-emerald-300 bg-emerald-400/5 border border-emerald-400/10'
                          : 'text-slate-500 bg-white/[0.02] border border-white/5'
                    }
                  `}
                >
                  {isAnalyzing
                    ? 'PROCESSING'
                    : analysisComplete
                      ? 'COMPLETE'
                      : 'READY'}
                </span>
              </div>

              <div
                className="
                  px-4
                  pb-4
                "
              >
                <div
                  className="
                    p-4
                    rounded-xl
                    bg-gradient-to-br
                    from-emerald-400/8
                    to-transparent
                    border
                    border-emerald-400/15
                  "
                >
                  <div
                    className="
                      flex
                      justify-between
                      items-end
                    "
                  >
                    <div>
                      <div
                        className="
                          text-[9px]
                          text-slate-500
                          uppercase
                          tracking-wider
                        "
                      >
                        Safety Score
                      </div>

                      <motion.div
                        key={activeRouteType}
                        initial={{
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="
                          text-3xl
                          font-bold
                          text-emerald-300
                          mt-1
                        "
                      >
                        {activeRouteType ===
                        'safest'
                          ? '82'
                          : activeRouteType ===
                              'fuel'
                            ? '76'
                            : '69'}

                        <span className="text-base">
                          %
                        </span>
                      </motion.div>
                    </div>

                    <Shield
                      className="
                        w-8
                        h-8
                        text-emerald-400/30
                      "
                    />
                  </div>

                  <div
                    className="
                      mt-3
                      h-1.5
                      rounded-full
                      bg-black/40
                      overflow-hidden
                    "
                  >
                    <motion.div
                      className="
                        h-full
                        bg-emerald-400
                        rounded-full
                        shadow-[0_0_10px_rgba(74,222,128,0.5)]
                      "
                      animate={{
                        width:
                          activeRouteType ===
                          'safest'
                            ? '82%'
                            : activeRouteType ===
                                'fuel'
                              ? '76%'
                              : '69%',
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                    />
                  </div>
                </div>

                <div
                  className="
                    grid
                    grid-cols-3
                    gap-2
                    mt-3
                  "
                >
                  <RiskCard
                    label="ICE"
                    value={
                      activeRouteType ===
                      'safest'
                        ? 'LOW'
                        : 'MED'
                    }
                    type={
                      activeRouteType ===
                      'safest'
                        ? 'safe'
                        : 'warning'
                    }
                  />

                  <RiskCard
                    label="ICEBERG"
                    value={
                      activeRouteType ===
                      'safest'
                        ? 'LOW'
                        : 'MED'
                    }
                    type={
                      activeRouteType ===
                      'safest'
                        ? 'safe'
                        : 'warning'
                    }
                  />

                  <RiskCard
                    label="WEATHER"
                    value="MED"
                    type="warning"
                  />
                </div>
              </div>
            </section>

            {/* ICEBERG */}

            <section
              className="
                p-4
                border-b
                border-white/5
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-4
                "
              >
                <SectionTitle
                  icon={<Crosshair />}
                  title="Iceberg Intelligence"
                />

                <span
                  className="
                    text-[9px]
                    font-mono
                    text-cyan-300
                  "
                >
                  A102
                </span>
              </div>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-2
                "
              >
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

              {/* PREDICTION TIMELINE */}

              <div
                className="
                  mt-4
                  p-3
                  rounded-lg
                  bg-black/20
                  border
                  border-white/5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >
                  <span
                    className="
                      text-[8px]
                      text-slate-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Predicted Trajectory
                  </span>

                  <span
                    className="
                      text-[8px]
                      text-cyan-400
                    "
                  >
                    +{mission.forecastHours}H
                  </span>
                </div>

                <div
                  className="
                    relative
                    h-10
                  "
                >
                  <div
                    className="
                      absolute
                      left-2
                      right-2
                      top-4
                      h-px
                      bg-slate-700
                    "
                  />

                  <div
                    className="
                      relative
                      flex
                      justify-between
                    "
                  >
                    {[
                      'NOW',
                      '+12H',
                      '+24H',
                      '+48H',
                      `+${mission.forecastHours}H`,
                    ].map(
                      (time, index) => (
                        <div
                          key={`${time}-${index}`}
                          className="
                            flex
                            flex-col
                            items-center
                          "
                        >
                          <div
                            className={`
                              w-2.5
                              h-2.5
                              rounded-full
                              border-2
                              ${
                                index === 0
                                  ? 'bg-cyan-400 border-cyan-200'
                                  : 'bg-[#07151f] border-cyan-400/50'
                              }
                            `}
                          />

                          <span
                            className="
                              text-[7px]
                              text-slate-600
                              mt-2
                            "
                          >
                            {time}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* VESSEL */}

            <section
              className="
                p-4
                border-b
                border-white/5
              "
            >
              <SectionTitle
                icon={<Ship />}
                title="Vessel Safety"
              />

              <div
                className="
                  mt-4
                  space-y-2
                "
              >
                <TelemetryRow
                  label="Polar Class"
                  value={mission.vessel}
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

            {/* MODEL DIAGNOSTICS */}

            <section className="p-4">
              <button
                type="button"
                onClick={() =>
                  setShowDiagnostics(
                    !showDiagnostics
                  )
                }
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  p-3
                  rounded-lg
                  bg-black/20
                  border
                  border-white/5
                  hover:border-cyan-300/20
                  transition
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Activity
                    className="
                      w-4
                      h-4
                      text-cyan-300
                    "
                  />

                  <div
                    className="
                      text-left
                    "
                  >
                    <div
                      className="
                        text-[10px]
                        font-bold
                        text-slate-300
                        uppercase
                        tracking-wider
                      "
                    >
                      Model Diagnostics
                    </div>

                    <div
                      className="
                        text-[8px]
                        text-slate-600
                      "
                    >
                      Parameters & telemetry
                    </div>
                  </div>
                </div>

                <ChevronDown
                  className={`
                    w-4
                    h-4
                    text-slate-500
                    transition-transform
                    ${
                      showDiagnostics
                        ? 'rotate-180'
                        : ''
                    }
                  `}
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
                    className="
                      mt-3
                      overflow-hidden
                    "
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

        <footer
          className="
            h-12
            shrink-0
            bg-[#030a10]/96
            border-t
            border-cyan-300/10
            backdrop-blur-xl
            flex
            items-center
            px-5
            pointer-events-auto
          "
        >
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

          <div
            className="
              hidden
              md:flex
              items-center
              gap-2
              text-[8px]
              text-slate-600
              font-mono
            "
          >
            <span>
              DEPARTURE
            </span>

            <span className="text-slate-400">
              {mission.departureDate}
            </span>

            <span className="text-slate-400">
              {mission.departureTime}
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
      type="button"
      className={`
        relative
        w-10
        h-10
        mb-2
        rounded-lg
        flex
        items-center
        justify-center
        group
        transition-all
        ${
          active
            ? 'bg-cyan-400/10 text-cyan-300 border border-cyan-300/15'
            : 'text-slate-600 hover:text-slate-300 hover:bg-white/[0.03]'
        }
      `}
    >
      <span className="[&>svg]:w-4 [&>svg]:h-4">
        {icon}
      </span>

      <span
        className="
          absolute
          left-12
          z-50
          px-2
          py-1
          rounded
          bg-[#0b1b26]
          border
          border-white/10
          text-[9px]
          text-slate-300
          whitespace-nowrap
          opacity-0
          pointer-events-none
          group-hover:opacity-100
          transition-opacity
          shadow-xl
        "
      >
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
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <span
        className="
          text-cyan-300
          [&>svg]:w-3.5
          [&>svg]:h-3.5
        "
      >
        {icon}
      </span>

      <span
        className="
          text-[9px]
          font-bold
          text-slate-400
          uppercase
          tracking-[0.16em]
        "
      >
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
  options,
  onChange,
}: {
  label: string;
  value: string;

  options: {
    value: string;
    label: string;
  }[];

  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        className="
          block
          text-[8px]
          text-slate-600
          uppercase
          tracking-wider
          mb-1.5
        "
      >
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="
            appearance-none
            w-full
            bg-black/25
            border
            border-white/5
            rounded-lg
            px-3
            py-2
            pr-8
            text-[10px]
            text-slate-300
            outline-none
            focus:border-cyan-300/30
            transition
          "
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="
                bg-[#07151f]
                text-slate-200
              "
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="
            absolute
            right-2.5
            top-2.5
            w-3
            h-3
            text-slate-600
            pointer-events-none
          "
        />
      </div>
    </div>
  );
}

/* ============================================================
   DATE FIELD
============================================================ */

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        className="
          block
          text-[8px]
          text-slate-600
          uppercase
          tracking-wider
          mb-1.5
        "
      >
        {label}
      </label>

      <input
        type="date"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          w-full
          bg-black/25
          border
          border-white/5
          rounded-lg
          px-3
          py-2
          text-[10px]
          text-slate-300
          outline-none
          focus:border-cyan-300/30
          transition
          [color-scheme:dark]
        "
      />
    </div>
  );
}

/* ============================================================
   TIME FIELD
============================================================ */

function TimeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        className="
          block
          text-[8px]
          text-slate-600
          uppercase
          tracking-wider
          mb-1.5
        "
      >
        {label}
      </label>

      <input
        type="time"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          w-full
          bg-black/25
          border
          border-white/5
          rounded-lg
          px-3
          py-2
          text-[10px]
          text-slate-300
          outline-none
          focus:border-cyan-300/30
          transition
          [color-scheme:dark]
        "
      />
    </div>
  );
}

/* ============================================================
   MINI SUMMARY
============================================================ */

function MiniSummary({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <span
        className="
          text-slate-600
          [&>svg]:w-3
          [&>svg]:h-3
        "
      >
        {icon}
      </span>

      <div className="min-w-0">
        <div
          className="
            text-[6px]
            text-slate-600
            uppercase
          "
        >
          {label}
        </div>

        <div
          className="
            text-[8px]
            text-slate-300
            font-medium
            truncate
          "
        >
          {value}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ANALYSIS STEP
============================================================ */

function AnalysisStep({
  label,
  done,
}: {
  label: string;
  done: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-1.5
      "
    >
      <span
        className={`
          w-1.5
          h-1.5
          rounded-full
          ${
            done
              ? 'bg-emerald-400'
              : 'bg-slate-700'
          }
        `}
      />

      <span
        className={`
          text-[7px]
          ${
            done
              ? 'text-slate-400'
              : 'text-slate-700'
          }
        `}
      >
        {label}
      </span>
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
      <div
        className="
          text-[7px]
          text-slate-600
          uppercase
        "
      >
        {label}
      </div>

      <div
        className={`
          mt-0.5
          font-semibold
          ${
            positive
              ? 'text-emerald-300'
              : 'text-slate-300'
          }
        `}
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
    <label
      className="
        flex
        items-center
        gap-3
        px-2
        py-2
        rounded-md
        hover:bg-white/[0.025]
        cursor-pointer
        group
      "
    >
      <input
        type="checkbox"
        defaultChecked={active}
        className="
          accent-cyan-400
          w-3
          h-3
        "
      />

      <span
        className="
          text-slate-600
          group-hover:text-cyan-300
          transition
          [&>svg]:w-3.5
          [&>svg]:h-3.5
        "
      >
        {icon}
      </span>

      <span
        className="
          text-[10px]
          text-slate-400
          group-hover:text-slate-200
          transition
        "
      >
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
    <div
      className="
        p-2
        rounded-lg
        bg-black/20
        border
        border-white/5
        text-center
      "
    >
      <div
        className="
          text-[7px]
          text-slate-600
          uppercase
        "
      >
        {label}
      </div>

      <div
        className={`
          text-[9px]
          font-bold
          mt-1
          ${
            type === 'safe'
              ? 'text-emerald-300'
              : 'text-amber-300'
          }
        `}
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
    <div
      className="
        p-2.5
        rounded-lg
        bg-black/20
        border
        border-white/5
      "
    >
      <div
        className="
          text-[7px]
          text-slate-600
          uppercase
          tracking-wider
        "
      >
        {label}
      </div>

      <div
        className="
          text-[11px]
          font-semibold
          text-slate-200
          mt-1
        "
      >
        {value}
      </div>

      <div
        className="
          text-[7px]
          text-slate-600
          mt-0.5
        "
      >
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
    <div
      className="
        flex
        items-center
        justify-between
        py-1.5
        border-b
        border-white/[0.03]
        last:border-0
      "
    >
      <span
        className="
          text-[9px]
          text-slate-600
        "
      >
        {label}
      </span>

      <span
        className={`
          text-[9px]
          font-semibold
          ${valueClass}
        `}
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
    <div
      className="
        flex
        items-center
        gap-2
        px-4
      "
    >
      <span
        className="
          text-slate-600
          [&>svg]:w-3
          [&>svg]:h-3
        "
      >
        {icon}
      </span>

      <span
        className="
          text-[7px]
          text-slate-600
          uppercase
          tracking-wider
        "
      >
        {label}
      </span>

      <span
        className={`
          text-[9px]
          font-bold
          ${
            status === 'safe'
              ? 'text-emerald-300'
              : status === 'warning'
                ? 'text-amber-300'
                : 'text-slate-300'
          }
        `}
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
    <div
      className="
        h-5
        w-px
        bg-white/5
      "
    />
  );
}