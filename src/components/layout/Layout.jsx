import { useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { ToastContainer } from '../ui/Toast'
import { useApp } from '../../context/AppContext'

const pageTitles = {
  '/dashboard': { pt: 'Dashboard', en: 'Dashboard' },
  '/frota': { pt: 'Frota', en: 'Fleet' },
  '/alugueres': { pt: 'Alugueres', en: 'Rentals' },
  '/clientes': { pt: 'Clientes', en: 'Clients' },
  '/motoristas': { pt: 'Motoristas', en: 'Drivers' },
  '/faturacao': { pt: 'Faturação', en: 'Invoicing' },
  '/relatorios': { pt: 'Relatórios', en: 'Reports' },
  '/definicoes': { pt: 'Definições', en: 'Settings' },
}

export function Layout({ children }) {
  const location = useLocation()
  const { lingua } = useApp()
  const pageInfo = pageTitles[location.pathname] || { pt: 'Maquidonas', en: 'Maquidonas' }
  const title = lingua === 'EN' ? pageInfo.en : pageInfo.pt

  return (
    <div className="flex h-screen bg-[#F4F6F9] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={title} />
        <main className="flex-1 overflow-y-auto p-5 md:p-6">
          {children}
        </main>
      </div>
      <ToastContainer />
    </div>
  )
}
