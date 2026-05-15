import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Truck, Calendar, Users, UserCheck,
  FileText, BarChart2, Settings, X, ChevronRight, Wrench
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', labelEN: 'Dashboard', icon: LayoutDashboard },
  { path: '/frota', label: 'Frota', labelEN: 'Fleet', icon: Truck },
  { path: '/alugueres', label: 'Alugueres', labelEN: 'Rentals', icon: Calendar },
  { path: '/clientes', label: 'Clientes', labelEN: 'Clients', icon: Users },
  { path: '/motoristas', label: 'Motoristas', labelEN: 'Drivers', icon: UserCheck },
  { path: '/faturacao', label: 'Faturação', labelEN: 'Invoicing', icon: FileText },
  { path: '/relatorios', label: 'Relatórios', labelEN: 'Reports', icon: BarChart2 },
  { path: '/definicoes', label: 'Definições', labelEN: 'Settings', icon: Settings },
]

export function Sidebar() {
  const { lingua, sidebarOpen, setSidebarOpen } = useApp()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 bottom-0 z-30 w-60 bg-[#0F2340] flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        sidebar-scroll overflow-y-auto
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#F5A623] rounded-lg flex items-center justify-center flex-shrink-0">
              <Wrench size={18} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-base leading-tight font-display">Maquidonas</div>
              <div className="text-white/40 text-[10px] uppercase tracking-wider">Gestão Interna</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/40 hover:text-white/80 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 pb-2 pt-1">
            {lingua === 'EN' ? 'Navigation' : 'Navegação'}
          </p>
          {navItems.map(({ path, label, labelEN, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
                ${isActive
                  ? 'bg-[#1B3A6B] text-white shadow-sm'
                  : 'text-white/60 hover:bg-white/8 hover:text-white/90'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} className={isActive ? 'text-[#F5A623]' : 'text-white/50 group-hover:text-white/70'} />
                  <span className="flex-1">{lingua === 'EN' ? labelEN : label}</span>
                  {isActive && <ChevronRight size={14} className="text-white/40" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1B3A6B] border-2 border-[#F5A623]/60 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">MC</span>
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">Miguel Calvário</div>
              <div className="text-white/40 text-xs">Admin</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
