import { useState } from 'react'
import Dock from './components/Dock'

function NoiseOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }}
    />
  )
}

function RadialGlow() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(232,145,58,0.03) 0%, transparent 60%)',
      }}
    />
  )
}

export default function App() {
  const [activeId, setActiveId] = useState('dashboard')

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        gap: 0,
      }}
    >
      <NoiseOverlay />
      <RadialGlow />
      <Dock activeId={activeId} onSelect={setActiveId} />
    </div>
  )
}
