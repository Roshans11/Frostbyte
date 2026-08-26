import React from 'react';
import {
  Compass,
  ArrowUpRight,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Anchor,
  Mail,
  Globe,
  Radio
} from 'lucide-react';

interface LandingPageProps {
  onLaunchDashboard: (initialView?: '2D' | '3D' | 'ROUTE' | 'RISK') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDashboard }) => {
  const navLinks = [
    { label: 'Home', href: '#home', active: true },
    { label: 'About', href: '#about' },
    { label: 'Data Platform', href: '#capabilities' },
    { label: 'Route Planner Forecast', onClick: () => onLaunchDashboard('ROUTE') },
    { label: 'Iceberg Vessels', onClick: () => onLaunchDashboard('2D') },
    { label: 'Risk Analysis', onClick: () => onLaunchDashboard('RISK') },
  ];

  return (
    <div style={{
      backgroundColor: '#070d19',
      color: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
      overflowX: 'hidden',
      scrollBehavior: 'smooth'
    }}>
      {/* 1. HERO SECTION WITH NEW USER UPLOADED ICEBERG BACKGROUND */}
      <section id="home" style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `linear-gradient(to bottom, rgba(7, 13, 25, 0.28) 0%, rgba(7, 13, 25, 0.68) 75%, #070d19 100%), url('/anat.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0 4rem',
        boxSizing: 'border-box'
      }}>
        {/* Navigation Header */}
<nav style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '28px',
  padding: '24px 20px',
  marginTop: '12px',
  border: '1px solid rgba(255, 255, 255, 0.14)',
  borderRadius: '10px',
  background: 'rgba(7, 13, 25, 0.48)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.18)'
}}>
  {/* Logo */}
  <div
    style={{ display: 'flex', alignItems: 'center', gap: '13px', cursor: 'pointer', flexShrink: 0 }}
    onClick={() => onLaunchDashboard()}
  >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '38px',
      height: '38px',
      borderRadius: '6px',
      background: '#0f172a',
      border: '1px solid #334155',
      fontSize: '14px',
      fontWeight: 700,
      fontFamily: 'monospace',
      color: '#38bdf8'
    }}>
      IR
    </div>
    <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '0.6px', color: '#ffffff' }}>
      ICEROUTE <span style={{ color: '#38bdf8', fontWeight: 700 }}>INDIA</span>
    </span>
  </div>

  {/* Nav Links */}
  <div style={{ display: 'flex', gap: '24px', fontSize: '15px', fontWeight: 600, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
    {navLinks.map((item) => (
      <a
        key={item.label}
        href={item.href}
        onClick={item.onClick}
        style={{
          color: item.active ? '#ffffff' : '#94a3b8',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'color 0.15s ease',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = item.active ? '#ffffff' : '#94a3b8')}
      >
        {item.label}
      </a>
    ))}
    <a
      href="#contact"
      style={{
        color: '#94a3b8',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '15px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        transition: 'color 0.15s ease'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
    >
      Contact Us <ArrowUpRight style={{ width: '13px', height: '13px' }} />
    </a>
  </div>

  {/* CTA Buttons */}
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
    <button
      onClick={() => onLaunchDashboard()}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#475569';
        e.currentTarget.style.color = '#cbd5e1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#334155';
        e.currentTarget.style.color = '#94a3b8';
      }}
      style={{
        background: 'transparent',
        border: '1px solid #334155',
        color: '#94a3b8',
        padding: '11px 17px',
        borderRadius: '6px',
        fontSize: '12px',
        fontFamily: 'monospace',
        fontWeight: 600,
        letterSpacing: '0.8px',
        cursor: 'pointer',
        transition: 'all 0.15s ease'
      }}
    >
      MOCK ENVIRONMENT
    </button>
    <button
      onClick={() => onLaunchDashboard()}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#0369a1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#0284c7';
      }}
      style={{
        background: '#0284c7',
        border: 'none',
        color: '#ffffff',
        padding: '11px 21px',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background 0.15s ease'
      }}
    >
      Launch Dashboard
    </button>
  </div>
</nav>
        {/* Hero Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '60px',
          alignItems: 'center',
          padding: '80px 0 120px 0'
        }}>
          <div>
            <div style={{
              color: '#00e5a3',
              fontFamily: 'monospace',
              fontSize: '12px',
              letterSpacing: '2px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: '#00e5a3', borderRadius: '50%', display: 'inline-block' }}></span>
              INTELLIGENCE FOR THE WHITE CONTINENT
            </div>

            <h1 style={{
  fontFamily: "'Century Gothic', 'Quicksand', sans-serif",
  fontSize: '84px',
  fontWeight: 700,
  lineHeight: '0.98',
  letterSpacing: '-2px',
  margin: '0 0 32px 0',
  color: '#ffffff'
}}>
  Navigate<br />
  the<br />
  <span style={{ color: '#38bdf8' }}>unknown.</span>
</h1>

            <p style={{
              fontSize: '16px',
              color: '#cbd5e1',
              maxWidth: '480px',
              lineHeight: '1.6',
              margin: '0 0 40px 0'
            }}>
              IceRoute India brings AI-powered foresight to Antarctic navigation — helping vessels read the ice, plan with confidence, and move safer.
            </p>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <button
                onClick={() => onLaunchDashboard()}
                style={{
                  backgroundColor: '#00e5a3',
                  color: '#070d19',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '2px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Explore the platform <ArrowUpRight style={{ width: '16px', height: '16px' }} />
              </button>

              <button
                onClick={() => onLaunchDashboard()}
                style={{
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Discover IceRoute <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          </div>

          {/* 3D Explorer Preview Card */}
         {/* 3D Explorer Preview Card */}
<div
  onClick={() => onLaunchDashboard('3D')}
  style={{
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)', // Safari support
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    padding: '18px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '220px',
    height: '220px',
    overflow: 'hidden',
    boxShadow: '0 12px 28px -8px rgba(0, 0, 0, 0.4)'
  }}
>
  {/* Globe sphere, bled off the top-right corner */}
  <div
    style={{
      position: 'absolute',
      top: '-55px',
      right: '-55px',
      width: '230px',
      height: '240px',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 35%, #2b6f8f 0%, #123a52 40%, #071620 75%, #04101a 100%)',
      boxShadow: 'inset -20px -20px 60px rgba(0,0,0,0.5)',
      overflow: 'hidden'
    }}
  >
    <svg
      viewBox="0 0 340 340"
      width="230"
      height="240"
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      <defs>
        <clipPath id="globeClip">
          <circle cx="170" cy="170" r="170" />
        </clipPath>
      </defs>
      <g clipPath="url(#globeClip)" stroke="rgba(180, 225, 245, 0.35)" strokeWidth="1" fill="none">
        {/* Latitude lines (horizontal ellipses) */}
        <ellipse cx="170" cy="170" rx="170" ry="170" />
        <ellipse cx="170" cy="170" rx="170" ry="120" />
        <ellipse cx="170" cy="170" rx="170" ry="65" />
        <ellipse cx="170" cy="90" rx="150" ry="40" />
        <ellipse cx="170" cy="250" rx="150" ry="40" />

        {/* Longitude lines (tilted ellipses simulating meridians) */}
        <ellipse cx="170" cy="170" rx="170" ry="170" transform="rotate(0 170 170) scale(0.35,1)" transform-origin="170 170" />
        <ellipse cx="170" cy="170" rx="170" ry="170" transform="rotate(30 170 170)" />
        <ellipse cx="170" cy="170" rx="170" ry="170" transform="rotate(60 170 170)" />
        <ellipse cx="170" cy="170" rx="170" ry="170" transform="rotate(90 170 170)" />
        <ellipse cx="170" cy="170" rx="170" ry="170" transform="rotate(120 170 170)" />
        <ellipse cx="170" cy="170" rx="170" ry="170" transform="rotate(150 170 170)" />
      </g>
    </svg>
  </div>

  {/* Subtle dark gradient so text stays legible over the globe */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(87, 123, 194, 0) 30%, rgba(72, 107, 177, 0.9) 75%, #4363a4 100%)',
      
    }}
  />

  <div style={{ position: 'relative', zIndex: 2 }}>
    <div style={{ color: '#2fe2ef', fontFamily: 'Helvetica Neue', fontSize: '8px', letterSpacing: '1.5px', marginBottom: '6px' }}>
      EXPLORE THE LAYER
    </div>
    <h3 style={{ fontSize: '28px', fontWeight: 500, margin: '0 0 4px 0', color: '#ffffff' }}>
      Antarctica / 3D
    </h3>
    <div style={{ fontSize: '6px', color: '#ced8e5', display: 'flex', alignItems: 'center', gap: '4px' }}>
      Open route explorer <ArrowUpRight style={{ width: '13px', height: '13px' }} />
    </div>
  </div>
</div>

  </div>

  </section>

      {/* 2. CAPABILITIES GRID SECTION */}
   {/* 2. CAPABILITIES GRID SECTION */}
<section id="capabilities" style={{
  position: 'relative',
  background: `
  linear-gradient(
    to bottom,
    #070d19 0%,
    rgba(7, 13, 25, 0.92) 10%,
    rgba(6, 30, 42, 0.72) 28%,
    rgba(5, 45, 60, 0.55) 55%,
    rgba(6, 25, 35, 0.78) 78%,
    #070d19 100%
  ),
  url('/second.png')
`,
backgroundSize: 'cover',
backgroundPosition: 'center',
backgroundRepeat: 'no-repeat',
  padding: '80px 4rem',
  borderTop: 'none',
  overflow: 'hidden'
}}>
  {/* 02 — CAPABILITIES label, top right */}
  <div style={{
    position: 'absolute',
    top: '40px',
    right: '4rem',
    color: '#38bdf8',
    fontFamily: 'monospace',
    fontSize: '13px',
    letterSpacing: '1px'
  }}>
    
  </div>

  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '64px',
    alignItems: 'start'
  }}>

    {/* LEFT COLUMN — headline / copy / iceberg image */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '760px',
      position: 'relative'
    }}>
      <div style={{ color: '#00e5a3', fontFamily: 'monospace', fontSize: '15px', letterSpacing: '2px', marginBottom: '16px', marginTop: '60px' }}>
        ONE SYSTEM / MANY SIGNALS
      </div>

      <h2 style={{ fontSize: '52px', fontWeight: 700, lineHeight: '1.1', margin: 0, color: '#ffffff' }}>
        See the route<br />
        <span style={{ color: '#38bdf8' }}>before you take it.</span>
      </h2>

      {/* Divider line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '28px 0' }}>
        <div style={{ width: '140px', height: '1px', background: 'linear-gradient(to right, #00e5a3, transparent)' }} />
        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#00e5a3' }} />
      </div>

      <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: '1.7', margin: 0, maxWidth: '420px' }}>
        One operational picture for Antarctic navigation — combining ice, vessel,
        weather, satellite and route intelligence into a single decision layer.
      </p>

      {/* Iceberg background image, anchored to the bottom of the column */}
      <div style={{
        marginTop: 'auto',
        position: 'relative',
        width: '100%',
        height: '340px',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <img
          src="/assets/iceberg-hero.jpg"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        {/* fade into section background so the image blends in */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(7,13,25,0) 40%, #0c1c26 100%)'
        }} />
      </div>
    </div>

    {/* RIGHT COLUMN — 2x2 capability cards */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      marginTop: '60px'
    }}>

      {/* Card 01 */}
      <div
        onClick={() => onLaunchDashboard('2D')}
        style={{
    position: 'relative',
    overflow: 'hidden',

    backgroundImage: `
      linear-gradient(
        to bottom,
        rgba(4, 18, 32, 0.45),
        rgba(4, 18, 32, 0.78)
      ),
      url('/card1.png')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    border: '1px solid rgba(56, 189, 248, 0.25)',
    borderRadius: '10px',

    padding: '36px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    height: '340px',
    minHeight: '340px',

    cursor: 'pointer',

    boxSizing: 'border-box',

    transition: 'all 0.3s ease',

    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)'
  }}

  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-8px) scale(1.015)';
    e.currentTarget.style.borderColor = '#38bdf8';
    e.currentTarget.style.boxShadow =
      '0 18px 45px rgba(56, 189, 248, 0.25)';
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.borderColor =
      'rgba(56, 189, 248, 0.25)';
    e.currentTarget.style.boxShadow =
      '0 10px 30px rgba(0, 0, 0, 0.25)';
  }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontSize: '13px' }}>01</span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #1e3a5f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Radio style={{ width: '18px', height: '18px', color: '#38bdf8' }} />
            </div>
          </div>
          <h3 style={{ fontSize: '19px', fontWeight: 700, margin: '0 0 12px 0', color: '#ffffff' }}>
            Data platform
          </h3>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
            A unified operational view of satellite, vessel, weather and ice data.
          </p>
        </div>
        <div style={{ alignSelf: 'flex-end', color: '#00e5a3' }}>
          <ArrowUpRight style={{ width: '16px', height: '16px' }} />
        </div>
      </div>

      {/* Card 02 */}
      <div
        onClick={() => onLaunchDashboard('ROUTE')}
        style={{
    position: 'relative',
    overflow: 'hidden',

    backgroundImage: `
      linear-gradient(
        to bottom,
        rgba(4, 18, 32, 0.45),
        rgba(4, 18, 32, 0.78)
      ),
      url('/card2.png')
    `,

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    border: '1px solid rgba(56, 189, 248, 0.25)',
    borderRadius: '10px',

    padding: '36px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    height: '340px',
    minHeight: '340px',

    cursor: 'pointer',
    boxSizing: 'border-box',

    transition: 'all 0.3s ease',

    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)'
  }}

  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-8px) scale(1.015)';
    e.currentTarget.style.borderColor = '#38bdf8';
    e.currentTarget.style.boxShadow =
      '0 18px 45px rgba(56, 189, 248, 0.25)';
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.borderColor =
      'rgba(56, 189, 248, 0.25)';
    e.currentTarget.style.boxShadow =
      '0 10px 30px rgba(0, 0, 0, 0.25)';
  }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontSize: '13px' }}>02</span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #1e3a5f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BarChart3 style={{ width: '18px', height: '18px', color: '#38bdf8' }} />
            </div>
          </div>
          <h3 style={{ fontSize: '19px', fontWeight: 700, margin: '0 0 12px 0', color: '#ffffff' }}>
            Forecast intelligence
          </h3>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
            Translate changing conditions into a route you can defend.
          </p>
        </div>
        <div style={{ alignSelf: 'flex-end', color: '#00e5a3' }}>
          <ArrowUpRight style={{ width: '16px', height: '16px' }} />
        </div>
      </div>

      {/* Card 03 — Highlighted / High priority */}
      <div
        onClick={() => onLaunchDashboard('RISK')}
        style={{
    position: 'relative',
    overflow: 'hidden',

    backgroundImage: `
      linear-gradient(
        to bottom,
        rgba(3, 35, 45, 0.38),
        rgba(3, 35, 45, 0.78)
      ),
      url('/card 3.png')
    `,

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    border: '1px solid #00e5a3',
    borderRadius: '10px',

    padding: '36px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    height: '340px',
    minHeight: '340px',

    cursor: 'pointer',
    boxSizing: 'border-box',

    transition: 'all 0.3s ease',

    boxShadow:
      '0 0 0 1px rgba(0,229,163,0.15), 0 10px 30px -5px rgba(0,229,163,0.25)'
  }}

  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      'translateY(-8px) scale(1.015)';

    e.currentTarget.style.borderColor =
      '#00ffc3';

    e.currentTarget.style.boxShadow =
      '0 18px 50px rgba(0,229,163,0.35)';
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      'translateY(0) scale(1)';

    e.currentTarget.style.borderColor =
      '#00e5a3';

    e.currentTarget.style.boxShadow =
      '0 0 0 1px rgba(0,229,163,0.15), 0 10px 30px -5px rgba(0,229,163,0.25)';
  }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'monospace', color: '#00e5a3', fontSize: '13px' }}>03</span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #00e5a3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck style={{ width: '18px', height: '18px', color: '#00e5a3' }} />
            </div>
          </div>

          <div style={{ color: '#00e5a3', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '1.5px', marginBottom: '8px' }}>
            HIGH PRIORITY
          </div>
          <h3 style={{ fontSize: '19px', fontWeight: 700, margin: '0 0 16px 0', color: '#ffffff' }}>
            Risk analysis
          </h3>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'rgba(148,163,184,0.2)', margin: '0 0 16px 0' }} />

          <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
            Know where uncertainty concentrates before it becomes exposure.
          </p>
        </div>
        <div style={{ alignSelf: 'flex-end', color: '#00e5a3' }}>
          <ArrowUpRight style={{ width: '16px', height: '16px' }} />
        </div>
      </div>

      {/* Card 04 */}
      <div
        onClick={() => onLaunchDashboard('2D')}
        style={{
    position: 'relative',
    overflow: 'hidden',

    backgroundImage: `
      linear-gradient(
        to bottom,
        rgba(4, 18, 32, 0.42),
        rgba(4, 18, 32, 0.80)
      ),
      url('/card4.png')
    `,

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    border: '1px solid rgba(56, 189, 248, 0.25)',
    borderRadius: '10px',

    padding: '36px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    height: '340px',
    minHeight: '340px',

    cursor: 'pointer',
    boxSizing: 'border-box',

    transition: 'all 0.3s ease',

    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)'
  }}

  onMouseEnter={(e) => {
    e.currentTarget.style.transform =
      'translateY(-8px) scale(1.015)';

    e.currentTarget.style.borderColor =
      '#38bdf8';

    e.currentTarget.style.boxShadow =
      '0 18px 45px rgba(56, 189, 248, 0.25)';
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      'translateY(0) scale(1)';

    e.currentTarget.style.borderColor =
      'rgba(56, 189, 248, 0.25)';

    e.currentTarget.style.boxShadow =
      '0 10px 30px rgba(0, 0, 0, 0.25)';
  }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontSize: '13px' }}>04</span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #1e3a5f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Anchor style={{ width: '18px', height: '18px', color: '#38bdf8' }} />
            </div>
          </div>
          <h3 style={{ fontSize: '19px', fontWeight: 700, margin: '0 0 12px 0', color: '#ffffff' }}>
            Vessel context
          </h3>
          <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
            Keep every decision grounded in the vessel and its mission.
          </p>
        </div>
        <div style={{ alignSelf: 'flex-end', color: '#00e5a3' }}>
          <ArrowUpRight style={{ width: '16px', height: '16px' }} />
        </div>
      </div>

    </div>
  </div>
</section>

      {/* 3. WORKFLOW SECTION */}
      <section id="workflow" style={{
         background: `linear-gradient(
    to bottom,
    #102129 0%,
    #0d1c27 18%,
    #091722 55%,
    #070d19 100%
  )`,
  padding: '120px 4rem',
  borderTop: 'none'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Radar Graphics */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px',
            position: 'relative'
          }}>
            <div style={{
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              border: '1px stroke rgba(56, 189, 248, 0.2)',
              position: 'absolute',
              boxShadow: '0 0 40px rgba(2, 132, 199, 0.1)'
            }}></div>
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '1px stroke rgba(56, 189, 248, 0.3)',
              position: 'absolute'
            }}></div>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '1px solid #00e5a3',
              backgroundColor: 'rgba(0, 229, 163, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute'
            }}>
              <Compass style={{ width: '28px', height: '28px', color: '#00e5a3' }} />
            </div>
            <span style={{ position: 'absolute', top: '70px', left: '60px', fontFamily: 'monospace', fontSize: '10px', color: '#38bdf8' }}>
              ICE / 04
            </span>
            <span style={{ position: 'absolute', bottom: '80px', right: '60px', fontFamily: 'monospace', fontSize: '10px', color: '#38bdf8' }}>
              ROUTE / 12
            </span>
          </div>

          {/* Text & Steps */}
          <div>
            <div style={{ color: '#00e5a3', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '2px', marginBottom: '16px' }}>
              THE WORKFLOW
            </div>

            <h2 style={{ fontSize: '56px', fontWeight: 800, lineHeight: '1.05', margin: '0 0 24px 0', color: '#ffffff' }}>
              From signal<br />
              to safe<br />
              passage.
            </h2>

            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', margin: '0 0 40px 0', maxWidth: '440px' }}>
              Every route starts with a question. Our platform brings the evidence together, tests the forecast, and leaves your team with a decision they can act on.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid #1e293b', paddingTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontSize: '12px' }}>01</span>
                <span style={{ fontWeight: 700, fontSize: '14px', width: '100px', color: '#ffffff' }}>Collect</span>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>Connect the signals that matter.</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid #111c2e', paddingTop: '16px' }}>
                <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontSize: '12px' }}>02</span>
                <span style={{ fontWeight: 700, fontSize: '14px', width: '100px', color: '#ffffff' }}>Understand</span>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>Model how the system is shifting.</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid #111c2e', paddingTop: '16px' }}>
                <span style={{ fontFamily: 'monospace', color: '#00e5a3', fontSize: '12px' }}>03</span>
                <span style={{ fontWeight: 700, fontSize: '14px', width: '100px', color: '#00e5a3' }}>Act</span>
                <span style={{ fontSize: '13px', color: '#cbd5e1' }}>Move with a route built for reality.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY ICEROUTE SECTION */}
      <section id="about" style={{
        background: `linear-gradient(
    to bottom,
    #070d19 0%,
    #08121d 50%,
    #091722 100%
  )`,
  padding: '120px 4rem',
  borderTop: 'none'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#00e5a3', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '2px', marginBottom: '16px' }}>
              WHY ICEROUTE INDIA
            </div>
            <h2 style={{ fontSize: '56px', fontWeight: 800, lineHeight: '1.05', margin: 0, color: '#ffffff' }}>
              A clearer view<br />
              of a changing<br />
              ice.
            </h2>
          </div>

          <div>
            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.7', margin: '0 0 24px 0' }}>
              The Antarctic is not a blank space. It is a moving system of currents, ice, weather, and decisions. We turn that data into a living operational picture for the people responsible for getting there and back.
            </p>
            <a onClick={() => onLaunchDashboard()} style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              More about our approach <ArrowUpRight style={{ width: '14px', height: '14px', color: '#38bdf8' }} />
            </a>
          </div>
        </div>
      </section>

      {/* 5. CONTACT / CTA SECTION */}
      <section id="contact" style={{
         background: `linear-gradient(
    to bottom,
    #091722 0%,
    #08121d 45%,
    #070d19 100%
  )`,
  padding: '120px 4rem 80px 4rem',
  borderTop: 'none'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', marginBottom: '80px' }}>
          <div>
            <div style={{ color: '#00e5a3', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '2px', marginBottom: '16px' }}>
              START A CONVERSATION
            </div>

            <h2 style={{ fontSize: '56px', fontWeight: 800, lineHeight: '1.05', margin: 0, color: '#ffffff' }}>
              Make the next<br />
              <span style={{ color: '#38bdf8' }}>move</span><br />
              informed.
            </h2>
          </div>

          <div>
            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.6', margin: '0 0 32px 0' }}>
              Whether you operate in the ice, govern the waters, or study what comes next — we would like to hear what you are solving for.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              <Mail style={{ width: '18px', height: '18px' }} />
              <a href="mailto:hello@iceroute.in" style={{ color: '#38bdf8', textDecoration: 'none' }}>hello@iceroute.in</a>
            </div>

            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#64748b' }}>
              Placeholder contact • team response within 2 business days
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '32px',
          borderTop: '1px solid #1e293b',
          fontSize: '11px',
          color: '#64748b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ border: '1px solid #38bdf8', padding: '2px 6px', borderRadius: '2px', fontWeight: 700, color: '#38bdf8', fontFamily: 'monospace' }}>
              IR
            </div>
            <strong style={{ color: '#f8fafc', fontSize: '13px' }}>ICEROUTE INDIA</strong>
          </div>

          <div style={{ fontFamily: 'monospace' }}>
            Antarctic intelligence, from India.
          </div>

          <div style={{ fontFamily: 'monospace' }}>
            © 2026 IceRoute India
          </div>
        </footer>
      </section>
    </div>
  );
};
