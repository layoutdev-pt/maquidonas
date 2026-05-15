import { Bell, Globe, Menu, ChevronDown, LogOut, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Badge } from '../ui/Badge'

export function Topbar({ title }) {
  const { lingua, setLingua, alertas, dispensarAlerta, setSidebarOpen } = useApp()
  const [alertasOpen, setAlertasOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const alertasRef = useRef(null)
  const userRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handler(e) {
      if (alertasRef.current && !alertasRef.current.contains(e.target)) setAlertasOpen(false)
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const iconAlert = {
    'documento': '📄',
    'devolucao': '🔄',
    'aprovacao': '✅',
    'manutencao': '🔧',
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold text-[#1A1A2A] font-display">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Língua toggle */}
        <button
          onClick={() => setLingua(l => l === 'PT' ? 'EN' : 'PT')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200"
        >
          <Globe size={15} />
          <span>{lingua}</span>
        </button>

        {/* Alertas */}
        <div className="relative" ref={alertasRef}>
          <button
            onClick={() => setAlertasOpen(o => !o)}
            className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <Bell size={20} />
            {alertas.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {alertas.length}
              </span>
            )}
          </button>

          {alertasOpen && (
            <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="font-semibold text-sm text-[#1A1A2A]">
                  {lingua === 'EN' ? 'Alerts' : 'Alertas'} ({alertas.length})
                </span>
                {alertas.length > 0 && (
                  <button
                    className="text-xs text-gray-400 hover:text-gray-600"
                    onClick={() => alertas.forEach(a => dispensarAlerta(a.id))}
                  >
                    {lingua === 'EN' ? 'Dismiss all' : 'Dispensar todos'}
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {alertas.length === 0 ? (
                  <div className="px-4 py-6 text-center text-gray-400 text-sm">
                    {lingua === 'EN' ? 'No alerts' : 'Sem alertas'}
                  </div>
                ) : alertas.map(alerta => (
                  <div
                    key={alerta.id}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 group"
                    onClick={() => { navigate(alerta.link); setAlertasOpen(false) }}
                  >
                    <span className="text-base mt-0.5 flex-shrink-0">{iconAlert[alerta.tipo] || '⚠️'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 leading-snug">{alerta.mensagem}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge label={alerta.urgencia} size="sm" />
                      <button
                        onClick={(e) => { e.stopPropagation(); dispensarAlerta(alerta.id) }}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 text-xs transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User dropdown */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setUserOpen(o => !o)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#1B3A6B] flex items-center justify-center">
              <span className="text-white text-xs font-bold">MC</span>
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">Miguel</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          {userOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">Miguel Calvário</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <button
                onClick={() => navigate('/definicoes')}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User size={14} /> {lingua === 'EN' ? 'Profile' : 'Perfil'}
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} /> {lingua === 'EN' ? 'Sign out' : 'Sair'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
