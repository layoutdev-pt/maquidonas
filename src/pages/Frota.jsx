import { useState } from 'react'
import {
  Truck, Plus, Search, FileText, History,
  AlertTriangle, Euro, Wrench, MapPin, Calendar, X,
  CheckCircle, LayoutGrid, List, ChevronRight
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Badge, DocumentoBadge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Drawer, DrawerTabs } from '../components/ui/Drawer'
import { Modal } from '../components/ui/Modal'

const tipos = ['Todos', 'Giratória', 'Telescópica', 'Plataforma Articulada', 'Empilhador', 'Camião Grua', 'Cilindro Compactador', 'Gerador', 'Pá Carregadora', 'Retroescavadora', 'Dumper']
const estados = ['Todos', 'Disponível', 'Alugada', 'Manutenção', 'Inactiva']

const ESTADO_ACCENT = {
  'Disponível': '#22C55E',
  'Alugada': '#1B3A6B',
  'Manutenção': '#F5A623',
  'Inactiva': '#94A3B8',
}

function MaquinaCard({ maquina, onClick }) {
  const accent = ESTADO_ACCENT[maquina.estado] || '#94A3B8'
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all group"
      onClick={onClick}
    >
      {/* Image area */}
      <div className="relative h-44 bg-[#EEF2F7] flex items-center justify-center overflow-hidden">
        {maquina.imagem ? (
          <img
            src={maquina.imagem}
            alt={maquina.nome}
            className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Truck size={56} className="text-gray-200" />
        )}
        {/* Estado badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge label={maquina.estado} />
        </div>
        {/* Price overlay */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1 shadow-sm">
          <span className="text-sm font-bold text-[#1A1A2A]">€{maquina.precoDia}<span className="text-xs font-normal text-gray-400">/dia</span></span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-bold text-[#1A1A2A] text-sm leading-snug truncate">{maquina.nome}</p>
            <p className="text-xs text-gray-400 mt-0.5">{maquina.tipo} · {maquina.marca} {maquina.ano}</p>
          </div>
          <span className="font-mono text-[10px] text-gray-400 flex-shrink-0 bg-gray-100 px-1.5 py-0.5 rounded">{maquina.id}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
          <MapPin size={11} className="flex-shrink-0" />
          <span className="truncate">{maquina.localizacao.split('—')[0].trim()}</span>
        </div>
        <div
          className="mt-3 flex items-center justify-between text-xs font-semibold rounded-xl px-3 py-2.5 group-hover:opacity-90 transition-opacity"
          style={{ backgroundColor: accent + '14', color: accent }}
        >
          <span>Ver ficha completa</span>
          <ChevronRight size={13} />
        </div>
      </div>
    </div>
  )
}

export default function Frota() {
  const { frota, alugueres, clientes, lingua, updateMaquinaEstado, addToast } = useApp()
  const [pesquisa, setPesquisa] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('Todos')
  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [viewMode, setViewMode] = useState('grid')
  const [maquinaAberta, setMaquinaAberta] = useState(null)
  const [tabActiva, setTabActiva] = useState('documentos')
  const [modalNovaMaquina, setModalNovaMaquina] = useState(false)
  const [modalOcorrencia, setModalOcorrencia] = useState(false)

  const t = (pt, en) => lingua === 'EN' ? en : pt

  const frotaFiltrada = frota.filter(m => {
    const matchPesquisa = pesquisa === '' ||
      m.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      m.id.toLowerCase().includes(pesquisa.toLowerCase()) ||
      m.marca.toLowerCase().includes(pesquisa.toLowerCase())
    const matchTipo = filtroTipo === 'Todos' || m.tipo === filtroTipo
    const matchEstado = filtroEstado === 'Todos' || m.estado === filtroEstado
    return matchPesquisa && matchTipo && matchEstado
  })

  const historicoMaquina = maquinaAberta
    ? alugueres.filter(a => a.maquinaId === maquinaAberta.id)
    : []

  const lucro = maquinaAberta
    ? maquinaAberta.receitaAlugueres - maquinaAberta.custoManutencao
    : 0

  const openMaquina = (maquina) => { setMaquinaAberta(maquina); setTabActiva('documentos') }

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2A] font-display">{t('Gestão de Frota', 'Fleet Management')}</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {frota.filter(m => m.estado === 'Disponível').length} {t('disponíveis', 'available')} · {frota.length} {t('total', 'total')}
          </p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setModalNovaMaquina(true)}>
          {t('Adicionar Máquina', 'Add Machine')}
        </Button>
      </div>

      {/* Filtros + view toggle */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('Pesquisar máquina, marca, ID...', 'Search machine, brand, ID...')}
              value={pesquisa}
              onChange={e => setPesquisa(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B]"
            />
          </div>
          <select
            value={filtroTipo}
            onChange={e => setFiltroTipo(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] bg-white"
          >
            {tipos.map(tp => <option key={tp}>{tp}</option>)}
          </select>
          <select
            value={filtroEstado}
            onChange={e => setFiltroEstado(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B] bg-white"
          >
            {estados.map(e => <option key={e}>{e}</option>)}
          </select>
          {(pesquisa || filtroTipo !== 'Todos' || filtroEstado !== 'Todos') && (
            <button
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors px-3"
              onClick={() => { setPesquisa(''); setFiltroTipo('Todos'); setFiltroEstado('Todos') }}
            >
              <X size={14} /> {t('Limpar', 'Clear')}
            </button>
          )}
          {/* View toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 flex-shrink-0">
            <button
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#1B3A6B]' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-[#1B3A6B]' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Status pills summary */}
      <div className="flex flex-wrap gap-2">
        {estados.slice(1).map(estado => {
          const count = frota.filter(m => m.estado === estado).length
          const accent = ESTADO_ACCENT[estado]
          return (
            <button
              key={estado}
              onClick={() => setFiltroEstado(filtroEstado === estado ? 'Todos' : estado)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border"
              style={
                filtroEstado === estado
                  ? { backgroundColor: accent, color: '#fff', borderColor: accent }
                  : { backgroundColor: '#fff', color: '#6B7280', borderColor: '#E5E7EB' }
              }
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: filtroEstado === estado ? '#fff' : accent }} />
              {estado} <span className="opacity-70">({count})</span>
            </button>
          )
        })}
      </div>

      {/* Grid view */}
      {viewMode === 'grid' && (
        frotaFiltrada.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-sm">{t('Nenhuma máquina encontrada.', 'No machines found.')}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {frotaFiltrada.map(maquina => (
              <MaquinaCard key={maquina.id} maquina={maquina} onClick={() => openMaquina(maquina)} />
            ))}
          </div>
        )
      )}

      {/* List view */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1B3A6B] text-white text-left">
                  {[
                    ['', ''], ['Nome / Modelo', 'Name / Model'], ['Tipo', 'Type'],
                    ['Ano', 'Year'], ['€/Dia', '€/Day'], ['Estado', 'Status'], ['', '']
                  ].map(([pt, en], i) => (
                    <th key={i} className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-white/80">
                      {t(pt, en)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {frotaFiltrada.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-gray-400 text-sm">
                      {t('Nenhuma máquina encontrada.', 'No machines found.')}
                    </td>
                  </tr>
                ) : frotaFiltrada.map(maquina => (
                  <tr
                    key={maquina.id}
                    className="hover:bg-blue-50/30 cursor-pointer transition-colors group"
                    onClick={() => openMaquina(maquina)}
                  >
                    <td className="px-4 py-3">
                      <div className="w-12 h-10 bg-[#EEF2F7] rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {maquina.imagem ? (
                          <img src={maquina.imagem} alt={maquina.nome} className="w-full h-full object-contain p-1" />
                        ) : (
                          <Truck size={16} className="text-gray-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-semibold text-gray-800">{maquina.nome}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{maquina.matricula}</p>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">{maquina.tipo}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{maquina.ano}</td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-gray-800">€{maquina.precoDia}</td>
                    <td className="px-4 py-3.5"><Badge label={maquina.estado} /></td>
                    <td className="px-4 py-3.5">
                      <button className="opacity-0 group-hover:opacity-100 text-xs text-[#1B3A6B] font-semibold hover:underline transition-opacity">
                        {t('Ver ficha', 'View')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 text-xs text-gray-400">
            {frotaFiltrada.length} {t('de', 'of')} {frota.length} {t('máquinas', 'machines')}
          </div>
        </div>
      )}

      {/* Drawer — Ficha da Máquina */}
      <Drawer
        open={!!maquinaAberta}
        onClose={() => setMaquinaAberta(null)}
        title={maquinaAberta?.nome}
        subtitle={`${maquinaAberta?.id} · ${maquinaAberta?.tipo} · ${maquinaAberta?.marca} ${maquinaAberta?.ano}`}
        width="xl"
      >
        {maquinaAberta && (
          <>
            {/* Machine image in drawer */}
            {maquinaAberta.imagem && (
              <div className="h-40 bg-[#EEF2F7] flex items-center justify-center overflow-hidden border-b border-gray-100">
                <img
                  src={maquinaAberta.imagem}
                  alt={maquinaAberta.nome}
                  className="h-full object-contain py-3 px-8"
                />
              </div>
            )}

            {/* Info rápida */}
            <div className="px-6 pt-4 pb-4 border-b border-gray-100 bg-gray-50/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{t('Estado', 'Status')}</p>
                  <div className="mt-1"><Badge label={maquinaAberta.estado} size="md" /></div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{t('Preço/dia', 'Price/day')}</p>
                  <p className="text-lg font-bold text-[#1B3A6B] mt-0.5">€{maquinaAberta.precoDia}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{t('Matrícula', 'Plate')}</p>
                  <p className="text-sm font-mono font-semibold text-gray-700 mt-1">{maquinaAberta.matricula}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{t('Localização', 'Location')}</p>
                  <p className="text-sm text-gray-700 mt-1 flex items-center gap-1">
                    <MapPin size={12} className="text-gray-400" />
                    {maquinaAberta.localizacao.split('—')[0].trim()}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <DrawerTabs
              active={tabActiva}
              onChange={setTabActiva}
              tabs={[
                { key: 'documentos', label: t('Documentos', 'Documents'), icon: <FileText size={14} /> },
                { key: 'historico', label: t('Histórico', 'History'), icon: <History size={14} /> },
                { key: 'ocorrencias', label: t('Ocorrências', 'Incidents'), icon: <AlertTriangle size={14} /> },
                { key: 'custos', label: t('Custos', 'Costs'), icon: <Euro size={14} /> },
              ]}
            />

            <div className="px-6 py-5">
              {tabActiva === 'documentos' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DocumentoCard label={t('Seguro', 'Insurance')} validade={maquinaAberta.seguro.validade} estado={maquinaAberta.seguro.estado} />
                    <DocumentoCard label={t('Inspecção', 'Inspection')} validade={maquinaAberta.inspecao.validade} estado={maquinaAberta.inspecao.estado} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">{t('Certificados & Ficheiros', 'Certificates & Files')}</h4>
                    {maquinaAberta.documentos.length === 0 ? (
                      <p className="text-sm text-gray-400">{t('Sem documentos.', 'No documents.')}</p>
                    ) : (
                      <div className="space-y-2">
                        {maquinaAberta.documentos.map((doc, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText size={16} className="text-red-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">{doc.nome}</p>
                              <p className="text-xs text-gray-400">{new Date(doc.data).toLocaleDateString('pt-PT')}</p>
                            </div>
                            <button className="text-xs text-[#1B3A6B] hover:underline font-medium" onClick={() => addToast(t('A abrir documento...', 'Opening document...'), 'info')}>
                              {t('Ver', 'View')}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button variant="secondary" size="sm" icon={<Plus size={14} />} className="mt-3" onClick={() => addToast(t('Upload em desenvolvimento.', 'Upload coming soon.'), 'info')}>
                      {t('Upload Documento', 'Upload Document')}
                    </Button>
                  </div>
                </div>
              )}

              {tabActiva === 'historico' && (
                <div>
                  {historicoMaquina.length === 0 ? (
                    <p className="text-sm text-gray-400 py-4">{t('Sem alugueres registados.', 'No rentals recorded.')}</p>
                  ) : (
                    <div className="space-y-2">
                      {historicoMaquina.map(aluguer => {
                        const cliente = clientes.find(c => c.id === aluguer.clienteId)
                        const dias = Math.ceil((new Date(aluguer.fim) - new Date(aluguer.inicio)) / (1000 * 60 * 60 * 24))
                        return (
                          <div key={aluguer.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50">
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{cliente?.nome}</p>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {new Date(aluguer.inicio).toLocaleDateString('pt-PT')} → {new Date(aluguer.fim).toLocaleDateString('pt-PT')} · {dias} {t('dias', 'days')}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-[#1B3A6B]">€{aluguer.valor.toLocaleString('pt-PT')}</p>
                              <Badge label={aluguer.estado} size="sm" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {tabActiva === 'ocorrencias' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">{maquinaAberta.ocorrencias.length} {t('ocorrências', 'incidents')}</p>
                    <Button variant="secondary" size="sm" icon={<Plus size={14} />} onClick={() => setModalOcorrencia(true)}>
                      {t('Registar', 'Record')}
                    </Button>
                  </div>
                  {maquinaAberta.ocorrencias.length === 0 ? (
                    <div className="flex flex-col items-center py-8 text-gray-400">
                      <CheckCircle size={28} className="text-green-400 mb-2" />
                      <p className="text-sm">{t('Sem ocorrências.', 'No incidents.')}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {maquinaAberta.ocorrencias.map((oc, i) => (
                        <div key={i} className={`p-4 rounded-xl border ${oc.resolvida ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-800">{oc.descricao}</p>
                              <p className="text-xs text-gray-400 mt-1">{new Date(oc.data).toLocaleDateString('pt-PT')}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-gray-700">€{oc.custo.toLocaleString('pt-PT')}</p>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${oc.resolvida ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {oc.resolvida ? t('Resolvida', 'Resolved') : t('Por resolver', 'Open')}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tabActiva === 'custos' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MetricCard label={t('Total Manutenção', 'Total Maintenance')} value={`€${maquinaAberta.custoManutencao.toLocaleString('pt-PT')}`} color="#DC2626" />
                    <MetricCard label={t('Receita Alugueres', 'Rental Revenue')} value={`€${maquinaAberta.receitaAlugueres.toLocaleString('pt-PT')}`} color="#16A34A" />
                    <MetricCard label={t('Lucro Líquido', 'Net Profit')} value={`€${lucro.toLocaleString('pt-PT')}`} sub={`${((lucro / maquinaAberta.receitaAlugueres) * 100).toFixed(0)}% margem`} color={lucro > 0 ? '#1B3A6B' : '#DC2626'} />
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-400 mb-2">{t('Rentabilidade', 'Profitability')}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-[#1B3A6B] h-3 rounded-full" style={{ width: `${Math.min(100, Math.max(0, (lucro / maquinaAberta.receitaAlugueres) * 100))}%` }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">{((lucro / maquinaAberta.receitaAlugueres) * 100).toFixed(1)}% {t('de margem líquida', 'net margin')}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer acções */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-wrap gap-2">
              {maquinaAberta.estado === 'Manutenção' && (
                <Button variant="success" size="sm" icon={<CheckCircle size={14} />} onClick={() => { updateMaquinaEstado(maquinaAberta.id, 'Disponível'); setMaquinaAberta(null) }}>
                  {t('Marcar Disponível', 'Mark Available')}
                </Button>
              )}
              {maquinaAberta.estado === 'Disponível' && (
                <Button variant="secondary" size="sm" icon={<Wrench size={14} />} onClick={() => { updateMaquinaEstado(maquinaAberta.id, 'Manutenção'); setMaquinaAberta(null) }}>
                  {t('Enviar p/ Manutenção', 'Send to Maintenance')}
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setMaquinaAberta(null)}>{t('Fechar', 'Close')}</Button>
            </div>
          </>
        )}
      </Drawer>

      {/* Modal nova máquina */}
      <Modal open={modalNovaMaquina} onClose={() => setModalNovaMaquina(false)} title={t('Adicionar Máquina', 'Add Machine')} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label={t('Nome / Modelo', 'Name / Model')} placeholder="Ex: Giratória Bobcat E85" />
            <FormField label={t('Marca', 'Brand')} placeholder="Ex: Bobcat" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Tipo', 'Type')}</label>
              <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30">
                {tipos.slice(1).map(tp => <option key={tp}>{tp}</option>)}
              </select>
            </div>
            <FormField label={t('Ano', 'Year')} placeholder="2024" type="number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label={t('Matrícula / Série', 'Plate / Serial')} placeholder="XX-XXXX-PT" />
            <FormField label={t('Preço por dia (€)', 'Price per day (€)')} placeholder="200" type="number" />
          </div>
          <FormField label={t('Localização actual', 'Current Location')} placeholder="Ex: Parque Maquidonas — Donas" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalNovaMaquina(false)}>{t('Cancelar', 'Cancel')}</Button>
            <Button variant="primary" onClick={() => { setModalNovaMaquina(false); addToast(t('Máquina adicionada!', 'Machine added!')) }}>{t('Guardar', 'Save')}</Button>
          </div>
        </div>
      </Modal>

      {/* Modal ocorrência */}
      <Modal open={modalOcorrencia} onClose={() => setModalOcorrencia(false)} title={t('Registar Ocorrência', 'Record Incident')}>
        <div className="space-y-4">
          <FormField label={t('Descrição', 'Description')} placeholder={t('Descreva a ocorrência...', 'Describe the incident...')} />
          <FormField label={t('Custo estimado (€)', 'Estimated cost (€)')} placeholder="0" type="number" />
          <FormField label={t('Data', 'Date')} type="date" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOcorrencia(false)}>{t('Cancelar', 'Cancel')}</Button>
            <Button variant="primary" onClick={() => { setModalOcorrencia(false); addToast(t('Ocorrência registada.', 'Incident recorded.')) }}>{t('Guardar', 'Save')}</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function DocumentoCard({ label, validade, estado }) {
  const colors = {
    valido: { bg: 'bg-green-50', border: 'border-green-200' },
    'a-expirar': { bg: 'bg-amber-50', border: 'border-amber-200' },
    expirado: { bg: 'bg-red-50', border: 'border-red-200' },
  }
  const c = colors[estado] || colors.valido
  return (
    <div className={`p-4 rounded-xl border ${c.bg} ${c.border}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <Badge label={estado} />
      </div>
      <p className="text-sm text-gray-500 flex items-center gap-1.5">
        <Calendar size={13} />
        {new Date(validade).toLocaleDateString('pt-PT')}
      </p>
    </div>
  )
}

function MetricCard({ label, value, sub, color }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-bold font-display" style={{ color }}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}

function FormField({ label, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B]"
      />
    </div>
  )
}
