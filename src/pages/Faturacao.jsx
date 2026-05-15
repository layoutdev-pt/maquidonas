import { useState } from 'react'
import { Plus, FileText, Euro, TrendingUp, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'

export default function Faturacao() {
  const { lingua, faturas, clientes, alugueres, addToast } = useApp()
  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [modalEmitir, setModalEmitir] = useState(false)

  const t = (pt, en) => lingua === 'EN' ? en : pt

  const getCliente = id => clientes.find(c => c.id === id)

  const faturasFiltradas = filtroEstado === 'Todos'
    ? faturas
    : faturas.filter(f => f.estado === filtroEstado)

  const totalFaturado = faturas.filter(f => f.estado !== 'Anulada').reduce((s, f) => s + f.valor, 0)
  const totalPago = faturas.filter(f => f.estado === 'Paga').reduce((s, f) => s + f.valor, 0)
  const totalPendente = faturas.filter(f => ['Pendente', 'Emitida'].includes(f.estado)).reduce((s, f) => s + f.valor, 0)

  const alugueresNaoFaturados = alugueres.filter(a =>
    a.estado === 'Concluído' && !a.fatura
  )

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2A] font-display">{t('Faturação', 'Invoicing')}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{faturas.length} {t('faturas', 'invoices')} · {t('Série 2025', 'Series 2025')}</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setModalEmitir(true)}>
          {t('Emitir Fatura', 'Issue Invoice')}
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{t('Total Faturado', 'Total Invoiced')}</p>
              <p className="text-2xl font-bold text-[#1B3A6B] font-display mt-1">€{totalFaturado.toLocaleString('pt-PT')}</p>
            </div>
            <Euro size={24} className="text-[#1B3A6B]/30" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{t('Total Recebido', 'Total Received')}</p>
              <p className="text-2xl font-bold text-green-600 font-display mt-1">€{totalPago.toLocaleString('pt-PT')}</p>
            </div>
            <TrendingUp size={24} className="text-green-500/30" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{t('Pendente', 'Pending')}</p>
              <p className="text-2xl font-bold text-amber-600 font-display mt-1">€{totalPendente.toLocaleString('pt-PT')}</p>
            </div>
            <Clock size={24} className="text-amber-500/30" />
          </div>
        </div>
      </div>

      {/* Alerta alugueres sem fatura */}
      {alugueresNaoFaturados.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <FileText size={18} className="text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>{alugueresNaoFaturados.length}</strong> {t('aluguer(es) concluído(s) sem fatura emitida.', 'completed rental(s) without invoice.')}
          </p>
          <Button variant="orange" size="sm" onClick={() => setModalEmitir(true)} className="ml-auto">
            {t('Emitir agora', 'Issue now')}
          </Button>
        </div>
      )}

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {['Todos', 'Emitida', 'Paga', 'Pendente', 'Anulada'].map(estado => (
          <button
            key={estado}
            onClick={() => setFiltroEstado(estado)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
              filtroEstado === estado
                ? 'bg-[#1B3A6B] text-white border-[#1B3A6B]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {t(estado, estado === 'Todos' ? 'All' : estado === 'Paga' ? 'Paid' : estado === 'Pendente' ? 'Pending' : estado === 'Emitida' ? 'Issued' : 'Cancelled')}
            <span className="ml-1.5 text-xs opacity-60">
              {estado === 'Todos' ? faturas.length : faturas.filter(f => f.estado === estado).length}
            </span>
          </button>
        ))}
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1B3A6B] text-white text-left">
                {[['Nº Fatura', 'Invoice #'], ['Cliente', 'Client'], ['Ref. Aluguer', 'Rental Ref.'], ['Valor', 'Amount'], ['Data', 'Date'], ['Estado', 'Status'], ['Acções', 'Actions']].map(([pt, en]) => (
                  <th key={pt} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white/80">{t(pt, en)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {faturasFiltradas.map(fatura => {
                const cliente = getCliente(fatura.clienteId)
                return (
                  <tr key={fatura.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-sm font-medium text-[#1B3A6B]">{fatura.serie}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-800 font-medium">{cliente?.nome || '—'}</td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs text-gray-500">{fatura.aluguerRef}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-bold text-[#1B3A6B]">€{fatura.valor.toLocaleString('pt-PT')}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{new Date(fatura.data).toLocaleDateString('pt-PT')}</td>
                    <td className="px-5 py-3.5"><Badge label={fatura.estado} /></td>
                    <td className="px-5 py-3.5">
                      <button
                        className="text-xs text-[#1B3A6B] hover:underline font-medium mr-3"
                        onClick={() => addToast(t('A abrir fatura PDF...', 'Opening invoice PDF...'), 'info')}
                      >
                        {t('Ver', 'View')}
                      </button>
                      {fatura.estado === 'Emitida' && (
                        <button
                          className="text-xs text-green-700 hover:underline font-medium"
                          onClick={() => addToast(t('Fatura marcada como paga.', 'Invoice marked as paid.'))}
                        >
                          {t('Marcar paga', 'Mark paid')}
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal emitir fatura */}
      <Modal open={modalEmitir} onClose={() => setModalEmitir(false)} title={t('Emitir Fatura', 'Issue Invoice')} size="lg">
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <p className="text-sm text-green-800 font-medium">
              {t('Vendus — Integração activa', 'Vendus — Integration active')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Aluguer', 'Rental')}</label>
              <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30">
                <option value="">{t('Seleccionar aluguer...', 'Select rental...')}</option>
                {alugueres.filter(a => a.estado === 'Concluído').map(a => {
                  const cli = getCliente(a.clienteId)
                  return <option key={a.id} value={a.id}>{a.id} — {cli?.nome} — €{a.valor}</option>
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Série', 'Series')}</label>
              <div className="px-3 py-2.5 border border-gray-100 rounded-lg text-sm bg-gray-50 text-gray-600">2025/{String(faturas.length + 1).padStart(3, '0')}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Data', 'Date')}</label>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Valor (€)', 'Amount (€)')}</label>
              <input type="number" placeholder="0" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalEmitir(false)}>{t('Cancelar', 'Cancel')}</Button>
            <Button variant="primary" onClick={() => { setModalEmitir(false); addToast(t('Fatura emitida via Vendus com sucesso!', 'Invoice issued via Vendus!')) }}>
              {t('Emitir via Vendus', 'Issue via Vendus')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
