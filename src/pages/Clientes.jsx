import { useState } from 'react'
import { Plus, Search, Phone, Mail, MapPin, FileText } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Drawer } from '../components/ui/Drawer'
import { Modal } from '../components/ui/Modal'

export default function Clientes() {
  const { lingua, clientes, alugueres, addToast } = useApp()
  const [pesquisa, setPesquisa] = useState('')
  const [clienteAberto, setClienteAberto] = useState(null)
  const [modalNovo, setModalNovo] = useState(false)

  const t = (pt, en) => lingua === 'EN' ? en : pt

  const clientesFiltrados = clientes.filter(c =>
    pesquisa === '' ||
    c.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
    c.nif.includes(pesquisa) ||
    c.email.toLowerCase().includes(pesquisa.toLowerCase())
  )

  const historico = clienteAberto
    ? alugueres.filter(a => a.clienteId === clienteAberto.id)
    : []

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2A] font-display">{t('Clientes', 'Clients')}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{clientes.length} {t('clientes registados', 'registered clients')}</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setModalNovo(true)}>
          {t('Novo Cliente', 'New Client')}
        </Button>
      </div>

      {/* Pesquisa */}
      <div className="relative max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={t('Pesquisar por nome, NIF, email...', 'Search by name, NIF, email...')}
          value={pesquisa}
          onChange={e => setPesquisa(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 bg-white shadow-sm"
        />
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1B3A6B] text-white text-left">
                {[['Nome / Empresa', 'Name / Company'], ['NIF', 'TIN'], ['Contacto', 'Contact'], ['Activos', 'Active'], ['Total', 'Total Spent'], ['', '']].map(([pt, en]) => (
                  <th key={pt} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white/80">{t(pt, en)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clientesFiltrados.map(cliente => (
                <tr
                  key={cliente.id}
                  className="hover:bg-blue-50/30 cursor-pointer transition-colors group"
                  onClick={() => setClienteAberto(cliente)}
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-800">{cliente.nome}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{cliente.id}</p>
                  </td>
                  <td className="px-5 py-4 text-sm font-mono text-gray-600">{cliente.nif}</td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-700 flex items-center gap-1.5">
                      <Phone size={12} className="text-gray-400" /> {cliente.telefone}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                      <Mail size={12} /> {cliente.email}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    {cliente.alugueresActivos > 0
                      ? <Badge label="Activo" />
                      : <span className="text-xs text-gray-400">{t('Nenhum', 'None')}</span>
                    }
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-[#1B3A6B]">€{cliente.totalGasto.toLocaleString('pt-PT')}</p>
                    <p className="text-xs text-gray-400">{cliente.totalHistorico} {t('alugueres', 'rentals')}</p>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      className="text-xs text-[#1B3A6B] hover:underline opacity-0 group-hover:opacity-100 transition-opacity font-medium"
                      onClick={e => { e.stopPropagation(); setClienteAberto(cliente) }}
                    >
                      {t('Ver ficha', 'View')} →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        open={!!clienteAberto}
        onClose={() => setClienteAberto(null)}
        title={clienteAberto?.nome}
        subtitle={`NIF: ${clienteAberto?.nif}`}
        width="lg"
      >
        {clienteAberto && (
          <div className="px-6 py-5 space-y-6">
            {/* Contactos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">{t('Contacto', 'Contact')}</p>
                <div className="space-y-2">
                  <p className="text-sm flex items-center gap-2"><Phone size={14} className="text-gray-400" /> {clienteAberto.telefone}</p>
                  <p className="text-sm flex items-center gap-2"><Mail size={14} className="text-gray-400" /> {clienteAberto.email}</p>
                  <p className="text-sm flex items-center gap-2"><MapPin size={14} className="text-gray-400" /> {clienteAberto.morada}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">{t('Resumo', 'Summary')}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('Total gasto', 'Total spent')}</span>
                    <span className="font-bold text-[#1B3A6B]">€{clienteAberto.totalGasto.toLocaleString('pt-PT')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('Alugueres', 'Rentals')}</span>
                    <span className="font-semibold">{clienteAberto.totalHistorico}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('Activos agora', 'Active now')}</span>
                    <span className="font-semibold">{clienteAberto.alugueresActivos}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notas */}
            {clienteAberto.notas && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-amber-700 mb-1">{t('Notas internas', 'Internal notes')}</p>
                <p className="text-sm text-amber-800">{clienteAberto.notas}</p>
              </div>
            )}

            {/* Histórico */}
            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-3">{t('Histórico de Alugueres', 'Rental History')}</h4>
              {historico.length === 0 ? (
                <p className="text-sm text-gray-400">{t('Sem alugueres.', 'No rentals.')}</p>
              ) : (
                <div className="space-y-2">
                  {historico.map(a => (
                    <div key={a.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50 hover:bg-white transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-gray-800 font-mono">{a.id}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(a.inicio).toLocaleDateString('pt-PT')} → {new Date(a.fim).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#1B3A6B]">€{a.valor.toLocaleString('pt-PT')}</p>
                        <Badge label={a.estado} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* Modal novo cliente */}
      <Modal open={modalNovo} onClose={() => setModalNovo(false)} title={t('Novo Cliente', 'New Client')} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label={t('Nome / Empresa', 'Name / Company')} placeholder="Ex: Construtora Beirã Lda" />
            <FormField label="NIF" placeholder="500000000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label={t('Telefone', 'Phone')} placeholder="+351 275 000 000" />
            <FormField label="Email" placeholder="geral@empresa.pt" type="email" />
          </div>
          <FormField label={t('Morada', 'Address')} placeholder="Rua Example, 123 — 6230-000 Fundão" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('Notas internas', 'Internal notes')}</label>
            <textarea rows={3} placeholder={t('Observações sobre o cliente...', 'Client notes...')}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalNovo(false)}>{t('Cancelar', 'Cancel')}</Button>
            <Button variant="primary" onClick={() => { setModalNovo(false); addToast(t('Cliente criado com sucesso!', 'Client created!')) }}>
              {t('Guardar', 'Save')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function FormField({ label, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30" />
    </div>
  )
}
