import { createContext, useContext, useState, useCallback } from 'react'
import {
  frota as frotaData,
  clientes as clientesData,
  alugueresIniciais,
  motoristas as motoristasData,
  faturas as faturasData,
  alertasIniciais,
} from '../data/mockData'

const AppContext = createContext(null)

let toastId = 0

export function AppProvider({ children }) {
  const [lingua, setLingua] = useState('PT')
  const [frota, setFrota] = useState(frotaData)
  const [clientes] = useState(clientesData)
  const [alugueres, setAlugueres] = useState(alugueresIniciais)
  const [motoristas] = useState(motoristasData)
  const [faturas] = useState(faturasData)
  const [alertas, setAlertas] = useState(alertasIniciais)
  const [toasts, setToasts] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const updateAluguerEstado = useCallback((aluguerID, novoEstado) => {
    setAlugueres(prev => prev.map(a =>
      a.id === aluguerID ? { ...a, estado: novoEstado } : a
    ))
    const msgs = {
      'Aprovado': 'Aluguer aprovado com sucesso.',
      'Cancelado': 'Aluguer cancelado.',
      'Activo': 'Máquina marcada como entregue.',
      'Concluído': 'Aluguer concluído — máquina devolvida.',
    }
    addToast(msgs[novoEstado] || 'Estado actualizado.', novoEstado === 'Cancelado' ? 'error' : 'success')
    if (novoEstado === 'Aprovado') {
      setAlertas(prev => prev.filter(a => a.aluguerRef !== aluguerID))
    }
  }, [addToast])

  const updateMaquinaEstado = useCallback((maquinaId, novoEstado) => {
    setFrota(prev => prev.map(m =>
      m.id === maquinaId ? { ...m, estado: novoEstado } : m
    ))
    addToast(`Estado da máquina actualizado: ${novoEstado}`)
  }, [addToast])

  const dispensarAlerta = useCallback((alertaId) => {
    setAlertas(prev => prev.filter(a => a.id !== alertaId))
  }, [])

  const t = (ptText, enText) => lingua === 'EN' ? enText : ptText

  return (
    <AppContext.Provider value={{
      lingua, setLingua, t,
      frota, clientes, alugueres, motoristas, faturas, alertas,
      toasts, addToast, removeToast,
      updateAluguerEstado, updateMaquinaEstado, dispensarAlerta,
      sidebarOpen, setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
