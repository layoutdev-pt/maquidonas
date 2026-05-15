import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Frota from './pages/Frota'
import Alugueres from './pages/Alugueres'
import Clientes from './pages/Clientes'
import Motoristas from './pages/Motoristas'
import Faturacao from './pages/Faturacao'
import Relatorios from './pages/Relatorios'
import Definicoes from './pages/Definicoes'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/frota" element={<Frota />} />
            <Route path="/alugueres" element={<Alugueres />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/motoristas" element={<Motoristas />} />
            <Route path="/faturacao" element={<Faturacao />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/definicoes" element={<Definicoes />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  )
}
