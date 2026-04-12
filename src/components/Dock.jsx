import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  House,
  Compass,
  GitBranch,
  GridFour,
  Lightning,
  MagnifyingGlass,
  Bell,
  Crosshair,
} from '@phosphor-icons/react'

const DOCK_ITEMS = [
  { id: 'home', label: 'Home', Icon: House },
  { id: 'explore', label: 'Explore', Icon: Compass },
  { id: 'network', label: 'Network', Icon: GitBranch },
  { id: 'dashboard', label: 'Dashboard', Icon: GridFour },
  { id: 'actions', label: 'Actions', Icon: Lightning },
  { id: '__divider__', label: '', Icon: null },
  { id: 'search', label: 'Search', Icon: MagnifyingGlass },
  { id: 'notifications', label: 'Notifications', Icon: Bell, badge: 6 },
  { id: 'settings', label: 'Settings', Icon: Crosshair },
]

function NotificationBadge({ count }) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      style={{
        position: 'absolute',
        top: -4,
        right: -6,
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: '#ef4444',
        color: '#fff',
        fontSize: 10,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        boxShadow: '0 0 8px rgba(239,68,68,0.5)',
        zIndex: 10,
      }}
    >
      <motion.span
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {count}
      </motion.span>
    </motion.span>
  )
}

function DockIcon({ item, isActive, onSelect }) {
  if (item.id === '__divider__') {
    return (
      <div
        style={{
          width: 1,
          height: 24,
          background: 'rgba(255,255,255,0.08)',
          margin: '0 4px',
          flexShrink: 0,
        }}
      />
    )
  }

  const { id, Icon, badge } = item

  return (
    <motion.button
      onClick={() => onSelect(id)}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      style={{
        position: 'relative',
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        zIndex: 2,
      }}
    >
      {isActive && (
        <motion.div
          layoutId="active-highlight"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'absolute',
            inset: 2,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #e8913a, #d47020)',
            boxShadow:
              '0 0 30px rgba(232,145,58,0.4), 0 0 60px rgba(232,145,58,0.15)',
            zIndex: -1,
          }}
        />
      )}
      <Icon
        weight="duotone"
        size={22}
        color={isActive ? '#ffffff' : '#5a5a66'}
        style={{ position: 'relative', zIndex: 1 }}
      />
      {badge != null && <NotificationBadge count={badge} />}
    </motion.button>
  )
}

function ActivePreview({ item }) {
  const { Icon, label } = item

  return (
    <motion.div
      key={item.id}
      initial={{ scale: 0.8, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        marginBottom: 32,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          background: 'rgba(232,145,58,0.08)',
          border: '1px solid rgba(232,145,58,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon weight="duotone" size={48} color="#e8913a" />
      </div>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#5a5a66',
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}

export default function Dock({ activeId, onSelect }) {
  const activeItem = DOCK_ITEMS.find((i) => i.id === activeId)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        position: 'relative',
      }}
    >
      {/* Active preview */}
      <AnimatePresence mode="wait">
        {activeItem && <ActivePreview key={activeId} item={activeItem} />}
      </AnimatePresence>

      {/* Dock bar */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '8px 12px',
          background: 'rgba(12,12,18,0.95)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 9999,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow:
            '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset',
        }}
      >
        {DOCK_ITEMS.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onSelect={onSelect}
          />
        ))}
      </motion.div>

      {/* Footer text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: 28,
          fontSize: 12,
          color: '#5a5a66',
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.05em',
        }}
      >
        Click to navigate{' '}
        <span style={{ opacity: 0.4 }}>•</span>{' '}
        Built with React + Framer Motion
      </motion.p>
    </div>
  )
}
