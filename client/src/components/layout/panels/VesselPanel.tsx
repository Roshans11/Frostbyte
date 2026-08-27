import React from 'react';
import { Ship, Gauge, CheckCircle2, Maximize2 } from 'lucide-react';
import { useRoute } from '../../../state/RouteContext';

export const VesselPanel: React.FC = () => {
  const { vessel, setVessel, setMission, setIsFullScreen } = useRoute();

  const polarClasses = [
    { code: 'PC6', label: 'Research Vessel · PC6', iceThick: '1.2m', desc: 'Summer/autumn operation in medium first-year ice' },
    { code: 'PC5', label: 'Heavy Escort · PC5', iceThick: '1.8m', desc: 'Year-round operation in medium first-year ice' },
    { code: 'PC4', label: 'Icebreaker · PC4', iceThick: '2.5m', desc: 'Year-round operation in thick first-year ice' },
    { code: 'PC3', label: 'Heavy Icebreaker · PC3', iceThick: '3.2m', desc: 'Year-round operation in second-year ice' },
  ];

  const currentClass = polarClasses.find((p) => p.code === vessel) || polarClasses[0];

  const handleVesselChange = (code: string) => {
    setVessel(code);
    setMission((prev) => ({ ...prev, vessel: code }));
  };

  return (
    <div className="p-4 space-y-4 text-slate-100">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Ship className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold tracking-wider text-cyan-300 uppercase">
            Vessel Safety & Specs
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
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-300/20 text-cyan-300 font-mono uppercase">
            {vessel}
          </span>
        </div>
      </div>

      {/* ACTIVE VESSEL SPEC CARD */}
      <div className="rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border border-cyan-400/20 p-3.5 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest">
              ACTIVE VESSEL PROFILE
            </div>
            <h3 className="text-sm font-bold text-slate-100">{currentClass.label}</h3>
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> OPERATIONAL
          </span>
        </div>

        <p className="text-[10px] text-slate-400">{currentClass.desc}</p>

        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono pt-2 border-t border-white/5">
          <div>
            <span className="text-slate-500 block text-[8px]">ICE CAPACITY</span>
            <span className="font-bold text-cyan-300">{currentClass.iceThick}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[8px]">MAX SPEED</span>
            <span className="font-bold text-slate-200">15.0 kts</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[8px]">DISPLACEMENT</span>
            <span className="font-bold text-slate-200">12,500 t</span>
          </div>
        </div>
      </div>

      {/* SELECT POLAR CLASS */}
      <div className="space-y-2">
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>SELECT POLAR CLASS RATING</span>
          <span className="text-[8px] text-slate-500">IACS POLAR CODE</span>
        </div>

        <div className="space-y-2">
          {polarClasses.map((item) => {
            const isSelected = vessel === item.code;

            return (
              <div
                key={item.code}
                onClick={() => handleVesselChange(item.code)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-400/10 border-cyan-300/40 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                    : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Ship className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold text-slate-200">{item.label}</span>
                  </div>
                  <span className="text-[9px] font-mono text-cyan-300 font-bold">ICE: {item.iceThick}</span>
                </div>
                <div className="text-[9px] text-slate-400 pl-6">{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* OPERATING SPEED VS ICE DENSITY MATRIX */}
      <div className="rounded-lg bg-black/30 border border-white/5 p-3 space-y-2">
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Gauge className="w-3.5 h-3.5" /> Speed Limits in Ice
          </span>
          <span className="text-[8px] text-slate-500 font-mono">SAFE OPERATING SPEED</span>
        </div>

        <div className="space-y-1.5 font-mono text-[9px]">
          <div className="flex justify-between p-1.5 rounded bg-white/[0.02] border border-white/[0.04]">
            <span className="text-slate-400">0% – 20% Open Water</span>
            <span className="text-emerald-400 font-bold">14.0 kts (Full Speed)</span>
          </div>
          <div className="flex justify-between p-1.5 rounded bg-white/[0.02] border border-white/[0.04]">
            <span className="text-slate-400">20% – 50% Thin Ice</span>
            <span className="text-cyan-300 font-bold">9.5 kts (Standard)</span>
          </div>
          <div className="flex justify-between p-1.5 rounded bg-white/[0.02] border border-white/[0.04]">
            <span className="text-slate-400">50% – 80% Pack Ice</span>
            <span className="text-amber-400 font-bold">4.5 kts (Icebreaker Mode)</span>
          </div>
          <div className="flex justify-between p-1.5 rounded bg-white/[0.02] border border-white/[0.04]">
            <span className="text-slate-400">&gt; 80% Solid Fast Ice</span>
            <span className="text-rose-400 font-bold">Escort Required</span>
          </div>
        </div>
      </div>
    </div>
  );
};
