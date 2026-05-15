import { useState } from 'react'
import {
  Plus, List, CalendarDays, Check, X, Truck,
  ChevronRight, User, MapPin, FileText, Euro
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Drawer, DrawerTabs } from '../components/ui/Drawer'
import { Modal } from '../components/ui/Modal'

const ESTADO_FLOW = {
  'Pedido': { next: 'Aprovado', nextLabel: 'Aprovar', nextLabelEN: 'Approve', color: 'success', reject: true },
  'Aprovado': { next: 'Activo', nextLabel: 'Marcar Entregue', nextLabelEN: 'Mark Delivered', color: 'primary' },
  'Activo': { next: 'Concluído', nextLabel: 'Marcar Devolvida', nextLabelEN: 'Mark Returned', color: 'primary' },
}

const ESTADO_COLORS_CAL = {
  'Pedido': 'bg-gray-200 text-gray-700 border-gray-300',
  'Aprovado': 'bg-blue-100 text-blue-800 border-blue-200',
  'Activo': 'bg-green-100 text-green-800 border-green-200',
  'Concluído': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Cancelado': 'bg-red-100 text-red-800 border-red-200',
}

const MAI_DIAS = Array.from({ length: 31 }, (_, i) => i + 1)
const MAI_INICIO_DIA = 3 // Thursday (0=Sun)

export default function Alugueres() {
  const { lingua, alugueres, frota, clientes, motoristas, updateAluguerEstado, addToast } = useApp()
  const [vista, setVista] = useState('lista')
  const [aluguerAberto, setAluguerAberto] = useState(null)
  const [tabActiva, setTabActiva] = useState('info')
  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [modalNovo, setModalNovo] = useState(false)
  const [novoAluguer, setNovoAluguer] = useState({
    clienteId: '', maquinaId: '', inicio: '', fim: '',
    motoristaId: '', localizacao: '', notas: ''
  })

  const t = (pt, en) => lingua === 'EN' ? en : pt

  const alugueresFiltrados = filtroEstado === 'Todos'
    ? alugueres
    : alugueres.filter(a => a.estado === filtroEstado)

  const getMaquina = id => frota.find(m => m.id === id)
  const getCliente = id => clientes.find(c => c.id === id)

  const calcValor = () => {
    if (!novoAluguer.inicio || !novoAluguer.fim || !novoAluguer.maquinaId) return 0
    const dias = Math.ceil((new Date(novoAluguer.fim) - new Date(novoAluguer.inicio)) / (1000 * 60 * 60 * 24))
    const maq = frota.find(m => m.id === novoAluguer.maquinaId)
    return dias > 0 && maq ? dias * maq.precoDia : 0
  }

  const criarAluguer = () => {
    setModalNovo(false)
    addToast(t('Pedido de aluguer criado com sucesso!', 'Rental request created!'))
    setNovoAluguer({ clienteId: '', maquinaId: '', inicio: '', fim: '', motoristaId: '', localizacao: '', notas: '' })
  }

  const aluguerAbertoDados = aluguerAberto ? {
    maquina: getMaquina(aluguerAberto.maquinaId),
    cliente: getCliente(aluguerAberto.clienteId),
  } : {}

  const dias = aluguerAberto
    ? Math.ceil((new Date(aluguerAberto.fim) - new Date(aluguerAberto.inicio)) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2A] font-display">{t('Alugueres', 'Rentals')}</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {alugueres.filter(a => a.estado === 'Activo').length} {t('activos', 'active')} · {alugueres.length} {t('total', 'total')}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => setVista('lista')}
              className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors ${vista === 'lista' ? 'bg-[#1B3A6B] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <List size={15} /> {t('Lista', 'List')}
            </button>
            <button
              onClick={() => setVista('calendario')}
              className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors ${vista === 'calendario' ? 'bg-[#1B3A6B] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <CalendarDays size={15} /> {t('Calendário', 'Calendar')}
            </button>
          </div>
          <Button variant="primary" icon={<Plus size={16} />} onClick={() => setModalNovo(true)}>
            {t('Novo Aluguer', 'New Rental')}
          </Button>
        </div>
      </div>

      {/* Filtros de estado */}
      <div className="flex flex-wrap gap-2">
        {['Todos', 'Pedido', 'Aprovado', 'Activo', 'Concluído', 'Cancelado'].map(estado => (
          <button
            key={estado}
            onClick={() => setFiltroEstado(estado)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
              filtroEstado === estado
                ? 'bg-[#1B3A6B] text-white border-[#1B3A6B]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {t(estado, estado === 'Todos' ? 'All' : estado === 'Activo' ? 'Active' : estado === 'Concluído' ? 'Completed' : estado === 'Aprovado' ? 'Approved' : estado === 'Pedido' ? 'Requested' : 'Cancelled')}
            <span className="ml-1.5 text-xs opacity-60">
              {estado === 'Todos' ? alugueres.length : alugueres.filter(a => a.estado === estado).length}
            </span>
          </button>
        ))}
      </div>

      {/* Vista Lista */}
      {vista === 'lista' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1B3A6B] text-white text-left">
                  {[
                    ['ID', 'ID'], ['Cliente', 'Client'], ['Máquina', 'Machine'],
                    ['Início', 'Start'], ['Fim', 'End'], ['Duração', 'Duration'],
                    ['Valor', 'Value'], ['Estado', 'Status'], ['Acções', 'Actions']
                  ].map(([pt, en]) => (
                    <th key={pt} className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-white/80">
                      {t(pt, en)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {alugueresFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-5 py-10 text-center text-gray-400 text-sm">
                      {t('Sem alugueres neste estado.', 'No rentals in this status.')}
                    </td>
                  </tr>
                ) : alugueresFiltrados.map(aluguer => {
                  const maq = getMaquina(aluguer.maquinaId)
                  const cli = getCliente(aluguer.clienteId)
                  const d = Math.ceil((new Date(aluguer.fim) - new Date(aluguer.inicio)) / (1000 * 60 * 60 * 24))
                  const flow = ESTADO_FLOW[aluguer.estado]
                  return (
                    <tr
                      key={aluguer.id}
                      className="hover:bg-blue-50/30 cursor-pointer transition-colors group"
                      onClick={() => { setAluguerAberto(aluguer); setTabActiva('info') }}
                    >
                      <td className="px-4 py-3.5">
                        <span className="font-mono text-xs font-medium text-[#1B3A6B] bg-blue-50 px-2 py-0.5 rounded">{aluguer.id}</span>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-medium text-gray-800">{cli?.nome || '—'}</td>
                      <td className="px-4 py-3.5 text-sm text-gray-600">{maq?.nome || aluguer.maquinaId}</td>
                      <td className="px-4 py-3.5 text-sm text-gray-500">{new Date(aluguer.inicio).toLocaleDateString('pt-PT')}</td>
                      <td className="px-4 py-3.5 text-sm text-gray-500">{new Date(aluguer.fim).toLocaleDateString('pt-PT')}</td>
                      <td className="px-4 py-3.5 text-sm text-gray-500">{d} {t('dias', 'd')}</td>
                      <td className="px-4 py-3.5 text-sm font-bold text-[#1B3A6B]">€{aluguer.valor.toLocaleString('pt-PT')}</td>
                      <td className="px-4 py-3.5"><Badge label={aluguer.estado} /></td>
                      <td className="px-4 py-3.5">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                          {flow && (
                            <button
                              className="text-xs text-green-700 hover:text-green-900 font-semibold"
                              onClick={() => updateAluguerEstado(aluguer.id, flow.next)}
                            >
                              {t(flow.nextLabel, flow.nextLabelEN)}
                            </button>
                          )}
                          {flow?.reject && (
                            <button
                              className="text-xs text-red-600 hover:text-red-800 font-medium"
                              onClick={() => updateAluguerEstado(aluguer.id, 'Cancelado')}
                            >
                              {t('Rejeitar', 'Reject')}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
            {alugueresFiltrados.length} {t('de', 'of')} {alugueres.length} {t('alugueres', 'rentals')}
          </div>
        </div>
      )}

      {/* Vista Calendário */}
      {vista === 'calendario' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#1A1A2A] font-display">Maio 2025</h3>
            <div className="flex gap-3 text-xs">
              {Object.entries(ESTADO_COLORS_CAL).map(([estado, cls]) => (
                <span key={estado} className={`px-2 py-0.5 rounded border ${cls}`}>{estado}</span>
              ))}
            </div>
          </div>

          {/* Calendário simples */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: MAI_INICIO_DIA }, (_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {MAI_DIAS.map(dia => {
              const data = `2025-05-${String(dia).padStart(2, '0')}`
              const alugueresNoDia = alugueres.filter(a =>
                a.inicio <= data && a.fim >= data && a.estado !== 'Cancelado'
              )
              const isHoje = dia === 15
              return (
                <div
                  key={dia}
                  className={`min-h-16 p-1.5 rounded-lg border ${isHoje ? 'border-[#1B3A6B] bg-blue-50' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}
                >
                  <div className={`text-xs font-semibold mb-1 ${isHoje ? 'text-[#1B3A6B]' : 'text-gray-500'}`}>{dia}</div>
                  <div className="space-y-0.5">
                    {alugueresNoDia.slice(0, 2).map(a => {
                      const maq = getMaquina(a.maquinaId)
                      return (
                        <div
                          key={a.id}
                          className={`text-[9px] px-1.5 py-0.5 rounded border cursor-pointer truncate ${ESTADO_COLORS_CAL[a.estado]}`}
                          onClick={() => { setAluguerAberto(a); setTabActiva('info') }}
                          title={`${maq?.nome} — ${a.estado}`}
                        >
                          {maq?.id}
                        </div>
                      )
                    })}
                    {alugueresNoDia.length > 2 && (
                      <div className="text-[9px] text-gray-400 pl-1">+{alugueresNoDia.length - 2}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Drawer — Detalhe aluguer */}
      <Drawer
        open={!!aluguerAberto}
        onClose={() => setAluguerAberto(null)}
        title={aluguerAberto ? `Aluguer ${aluguerAberto.id}` : ''}
        subtitle={aluguerAberto ? `${aluguerAbertoDados.cliente?.nome} · ${aluguerAbertoDados.maquina?.nome}` : ''}
        width="lg"
      >
        {aluguerAberto && (
          <>
            {/* Linha de estado */}
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2 flex-wrap">
                {['Pedido', 'Aprovado', 'Activo', 'Concluído'].map((est, i, arr) => {
                  const isActive = est === aluguerAberto.estado
                  const isPast = arr.indexOf(aluguerAberto.estado) > i
                  const isCancelado = aluguerAberto.estado === 'Cancelado'
                  return (
                    <div key={est} className="flex items-center gap-2">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border ${
                        isCancelado && est === 'Pedido' ? 'bg-red-100 border-red-200 text-red-700' :
                        isActive ? 'bg-[#1B3A6B] border-[#1B3A6B] text-white' :
                        isPast ? 'bg-green-50 border-green-200 text-green-700' :
                        'bg-gray-50 border-gray-200 text-gray-400'
                      }`}>
                        {isPast && !isActive && <Check size={13} />}
                        {t(est, est === 'Activo' ? 'Active' : est === 'Concluído' ? 'Completed' : est === 'Aprovado' ? 'Approved' : 'Requested')}
                      </div>
                      {i < arr.length - 1 && <ChevronRight size={14} className="text-gray-300" />}
                    </div>
                  )
                })}
                {aluguerAberto.estado === 'Cancelado' && (
                  <Badge label="Cancelado" />
                )}
              </div>
            </div>

            <DrawerTabs
              active={tabActiva}
              onChange={setTabActiva}
              tabs={[
                { key: 'info', label: t('Informação', 'Details') },
                { key: 'faturacao', label: t('Faturação', 'Invoicing') },
              ]}
            />

            <div className="px-6 py-5">
              {tabActiva === 'info' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem icon={<User size={14} />} label={t('Cliente', 'Client')} value={aluguerAbertoDados.cliente?.nome} />
                    <InfoItem icon={<Truck size={14} />} label={t('Máquina', 'Machine')} value={aluguerAbertoDados.maquina?.nome} />
                    <InfoItem icon={<CalendarDays size={14} />} label={t('Período', 'Period')} value={`${new Date(aluguerAberto.inicio).toLocaleDateString('pt-PT')} → ${new Date(aluguerAberto.fim).toLocaleDateString('pt-PT')}`} />
                    <InfoItem icon={<Euro size={14} />} label={t('Valor Total', 'Total Value')} value={`€${aluguerAberto.valor.toLocaleString('pt-PT')} (${dias} dias)`} />
                    <InfoItem icon={<User size={14} />} label={t('Motorista', 'Driver')} value={aluguerAberto.motorista || t('Por atribuir', 'To assign')} />
                    <InfoItem icon={<MapPin size={14} />} label={t('Localização', 'Location')} value={aluguerAberto.localizacao} />
                  </div>
                  {aluguerAberto.notas && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-xs font-semibold text-amber-700 mb-1">{t('Notas', 'Notes')}</p>
                      <p className="text-sm text-amber-800">{aluguerAberto.notas}</p>
                    </div>
                  )}
                </div>
              )}

              {tabActiva === 'faturacao' && (
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{t('Estado da Fatura', 'Invoice Status')}</p>
                        {aluguerAberto.fatura ? (
                          <p className="text-xs text-gray-400 mt-0.5">Ref: {aluguerAberto.fatura}</p>
                        ) : (
                          <p className="text-xs text-gray-400 mt-0.5">{t('Fatura não emitida', 'Invoice not issued')}</p>
                        )}
                      </div>
                      <Badge label={aluguerAberto.faturaPaga ? 'Paga' : aluguerAberto.fatura ? 'Emitida' : 'Pendente'} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => addToast(t('A abrir contrato PDF...', 'Opening PDF contract...'), 'info')}
                  >
                    <FileText size={20} className="text-[#1B3A6B]" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{t('Contrato PDF', 'PDF Contract')}</p>
                      <p className="text-xs text-gray-400">{t('Clique para visualizar', 'Click to view')}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 ml-auto" />
                  </div>
                  {!aluguerAberto.fatura && (
                    <Button
                      variant="primary"
                      icon={<FileText size={14} />}
                      onClick={() => { addToast(t('Fatura emitida via Vendus!', 'Invoice issued via Vendus!')) }}
                    >
                      {t('Emitir Fatura', 'Issue Invoice')}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Acções de aprovação */}
            {ESTADO_FLOW[aluguerAberto.estado] && (
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-3">
                <Button
                  variant={ESTADO_FLOW[aluguerAberto.estado].color}
                  icon={<Check size={15} />}
                  onClick={() => {
                    updateAluguerEstado(aluguerAberto.id, ESTADO_FLOW[aluguerAberto.estado].next)
                    setAluguerAberto(null)
                  }}
                >
                  {t(ESTADO_FLOW[aluguerAberto.estado].nextLabel, ESTADO_FLOW[aluguerAberto.estado].nextLabelEN)}
                </Button>
                {ESTADO_FLOW[aluguerAberto.estado].reject && (
                  <Button
                    variant="danger"
                    icon={<X size={15} />}
                    onClick={() => {
                      updateAluguerEstado(aluguerAberto.id, 'Cancelado')
                      setAluguerAberto(null)
                    }}
                  >
                    {t('Rejeitar', 'Reject')}
                  </Button>
                )}
                <Button variant="ghost" onClick={() => setAluguerAberto(null)}>
                  {t('Fechar', 'Close')}
                </Button>
              </div>
            )}
          </>
        )}
      </Drawer>

      {/* Modal novo aluguer */}
      <Modal open={modalNovo} onClose={() => setModalNovo(false)} title={t('Novo Aluguer', 'New Rental')} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Cliente', 'Client')}</label>
              <select
                value={novoAluguer.clienteId}
                onChange={e => setNovoAluguer(p => ({ ...p, clienteId: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30"
              >
                <option value="">{t('Seleccionar cliente', 'Select client')}</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Máquina', 'Machine')}</label>
              <select
                value={novoAluguer.maquinaId}
                onChange={e => setNovoAluguer(p => ({ ...p, maquinaId: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30"
              >
                <option value="">{t('Seleccionar máquina', 'Select machine')}</option>
                {frota.filter(m => m.estado === 'Disponível').map(m => (
                  <option key={m.id} value={m.id}>{m.nome} — €{m.precoDia}/dia</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Data Início', 'Start Date')}</label>
              <input type="date" value={novoAluguer.inicio} onChange={e => setNovoAluguer(p => ({ ...p, inicio: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Data Fim', 'End Date')}</label>
              <input type="date" value={novoAluguer.fim} onChange={e => setNovoAluguer(p => ({ ...p, fim: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Motorista', 'Driver')}</label>
              <select
                value={novoAluguer.motoristaId}
                onChange={e => setNovoAluguer(p => ({ ...p, motoristaId: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30"
              >
                <option value="">{t('Seleccionar motorista', 'Select driver')}</option>
                {motoristas.filter(m => m.estado === 'Disponível').map(m => (
                  <option key={m.id} value={m.id}>{m.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Valor Total (€)', 'Total Value (€)')}</label>
              <div className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 font-semibold text-[#1B3A6B]">
                €{calcValor().toLocaleString('pt-PT')}
                {calcValor() > 0 && (
                  <span className="text-xs text-gray-400 font-normal ml-2">
                    ({Math.ceil((new Date(novoAluguer.fim) - new Date(novoAluguer.inicio)) / (1000*60*60*24))} dias × €{frota.find(m => m.id === novoAluguer.maquinaId)?.precoDia}/dia)
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Localização de entrega', 'Delivery location')}</label>
            <input type="text" placeholder={t('Ex: Construtora Beirã — Obra Fundão', 'Ex: Client location')} value={novoAluguer.localizacao} onChange={e => setNovoAluguer(p => ({ ...p, localizacao: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Notas', 'Notes')}</label>
            <textarea rows={3} placeholder={t('Observações ou instruções especiais...', 'Notes or special instructions...')} value={novoAluguer.notas} onChange={e => setNovoAluguer(p => ({ ...p, notas: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalNovo(false)}>{t('Cancelar', 'Cancel')}</Button>
            <Button variant="primary" onClick={criarAluguer}>{t('Criar Pedido', 'Create Request')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
      <div className="flex items-center gap-1.5 text-gray-400 mb-1">
        {icon}
        <span className="text-xs uppercase tracking-wide font-medium">{label}</span>
      </div>
      <p className="text-sm font-semibold text-gray-800">{value || '—'}</p>
    </div>
  )
}
