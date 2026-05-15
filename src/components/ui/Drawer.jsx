import { X } from 'lucide-react'
import { useEffect } from 'react'

export function Drawer({ open, onClose, title, subtitle, children, width = 'lg' }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const widths = { md: 'max-w-md', lg: 'max-w-2xl', xl: 'max-w-3xl' }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <div className={`absolute right-0 top-0 bottom-0 bg-white shadow-2xl w-full ${widths[width]} flex flex-col z-50 animate-slide-in`}
            style={{ animation: 'slideIn 0.25s ease-out' }}>
            <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 bg-white flex-shrink-0">
              <div>
                <h2 className="text-lg font-bold text-[#1A1A2A] font-display">{title}</h2>
                {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors mt-0.5"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0.5; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  )
}

export function DrawerTabs({ tabs, active, onChange }) {
  return (
    <div className="flex border-b border-gray-200 bg-gray-50 px-6">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors ${
            active === tab.key
              ? 'border-[#1B3A6B] text-[#1B3A6B]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
