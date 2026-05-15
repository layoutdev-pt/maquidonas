import { useState } from 'react'
import { Building2, Users, Bell, FileText, Globe, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { utilizadores } from '../data/mockData'

const tabs = [
  { key: 'empresa', label: 'Empresa', labelEN: 'Company', icon: Building2 },
  { key: 'utilizadores', label: 'Utilizadores', labelEN: 'Users', icon: Users },
  { key: 'notificacoes', label: 'Notificações', labelEN: 'Notifications', icon: Bell },
  { key: 'faturacao', label: 'Faturação', labelEN: 'Invoicing', icon: FileText },
  { key: 'lingua', label: 'Língua', labelEN: 'Language', icon: Globe },
]

export default function Definicoes() {
  const { lingua, setLingua, addToast } = useApp()
  const [activeTab, setActiveTab] = useState('empresa')
  const [notificacoes, setNotificacoes] = useState({
    documentosExpirar: true,
    alugueresDevolver: true,
    pedidosAprovacao: true,
    manutencoes: true,
    faturas: false,
  })

  const t = (pt, en) => lingua === 'EN' ? en : pt

  const guardar = () => addToast(t('Definições guardadas com sucesso.', 'Settings saved.'))

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-[#1A1A2A] font-display">{t('Definições', 'Settings')}</h2>
        <p className="text-sm text-gray-400 mt-0.5">{t('Configuração da plataforma', 'Platform configuration')}</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar de tabs */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {tabs.map(({ key, label, labelEN, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-left transition-colors border-b border-gray-50 last:border-0 ${
                  activeTab === key
                    ? 'bg-[#1B3A6B] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={15} />
                {t(label, labelEN)}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6">

          {/* Empresa */}
          {activeTab === 'empresa' && (
            <div className="space-y-5">
              <h3 className="font-bold text-[#1A1A2A] font-display text-lg">{t('Dados da Empresa', 'Company Details')}</h3>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-16 h-16 bg-[#1B3A6B] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl font-display">M</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800">Maquidonas Lda</p>
                  <p className="text-sm text-gray-400">Donas, Fundão, Castelo Branco</p>
                </div>
                <button className="ml-auto text-sm text-[#1B3A6B] hover:underline">
                  {t('Alterar logo', 'Change logo')}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label={t('Nome', 'Name')} defaultValue="Maquidonas Lda" />
                <Field label="NIF" defaultValue="509123456" />
                <Field label={t('Telefone', 'Phone')} defaultValue="+351 275 000 000" />
                <Field label="Email" defaultValue="geral@maquidonas.pt" type="email" />
                <Field label={t('Morada', 'Address')} defaultValue="Donas, 6230-000 Fundão" className="col-span-2" />
              </div>
              <Button variant="primary" onClick={guardar}>{t('Guardar alterações', 'Save changes')}</Button>
            </div>
          )}

          {/* Utilizadores */}
          {activeTab === 'utilizadores' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#1A1A2A] font-display text-lg">{t('Utilizadores', 'Users')}</h3>
                <Button variant="primary" size="sm" onClick={() => addToast(t('Convite enviado.', 'Invitation sent.'))}>
                  + {t('Convidar', 'Invite')}
                </Button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {[['Nome', 'Name'], ['Perfil', 'Role'], ['Estado', 'Status'], ['Última sessão', 'Last login']].map(([pt, en]) => (
                      <th key={pt} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t(pt, en)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {utilizadores.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {u.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{u.nome}</p>
                            <p className="text-xs text-gray-400">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5"><Badge label={u.perfil} /></td>
                      <td className="px-4 py-3.5"><Badge label="Activo" /></td>
                      <td className="px-4 py-3.5 text-sm text-gray-500">{u.ultimaSessao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Notificações */}
          {activeTab === 'notificacoes' && (
            <div className="space-y-4">
              <h3 className="font-bold text-[#1A1A2A] font-display text-lg">{t('Notificações', 'Notifications')}</h3>
              <p className="text-sm text-gray-400">{t('Configure quais alertas pretende receber.', 'Configure which alerts you want to receive.')}</p>
              <div className="space-y-3">
                {[
                  { key: 'documentosExpirar', pt: 'Documentos a expirar (seguros, inspecções)', en: 'Expiring documents (insurance, inspections)' },
                  { key: 'alugueresDevolver', pt: 'Alugueres com devolução pendente', en: 'Rentals pending return' },
                  { key: 'pedidosAprovacao', pt: 'Pedidos de aluguer aguardando aprovação', en: 'Rental requests awaiting approval' },
                  { key: 'manutencoes', pt: 'Manutenções programadas', en: 'Scheduled maintenance' },
                  { key: 'faturas', pt: 'Faturas pendentes de pagamento', en: 'Pending invoice payments' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <p className="text-sm text-gray-700">{t(item.pt, item.en)}</p>
                    <button
                      onClick={() => setNotificacoes(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className={`relative w-11 h-6 rounded-full transition-colors ${notificacoes[item.key] ? 'bg-[#1B3A6B]' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notificacoes[item.key] ? 'translate-x-5' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="primary" onClick={guardar}>{t('Guardar', 'Save')}</Button>
            </div>
          )}

          {/* Faturação */}
          {activeTab === 'faturacao' && (
            <div className="space-y-5">
              <h3 className="font-bold text-[#1A1A2A] font-display text-lg">{t('Configuração de Faturação', 'Invoicing Configuration')}</h3>

              {/* Integração Vendus */}
              <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg border border-green-200 flex items-center justify-center">
                    <span className="text-green-700 font-bold text-sm">V</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Vendus</p>
                    <p className="text-xs text-gray-400">billing.vendus.pt</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-semibold text-green-700">{t('Ligado', 'Connected')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label={t('Série de faturas', 'Invoice series')} defaultValue="2025" />
                <Field label={t('Próximo nº', 'Next number')} defaultValue="011" />
                <Field label="IVA (%)" defaultValue="23" />
                <Field label={t('Condições de pagamento', 'Payment terms')} defaultValue={t('30 dias', '30 days')} />
              </div>
              <Button variant="primary" onClick={guardar}>{t('Guardar', 'Save')}</Button>
            </div>
          )}

          {/* Língua */}
          {activeTab === 'lingua' && (
            <div className="space-y-5">
              <h3 className="font-bold text-[#1A1A2A] font-display text-lg">{t('Língua da Interface', 'Interface Language')}</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { code: 'PT', label: 'Português', sub: 'Portugal', flag: '🇵🇹' },
                  { code: 'EN', label: 'English', sub: 'United Kingdom', flag: '🇬🇧' },
                ].map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLingua(lang.code); addToast(lang.code === 'PT' ? 'Língua alterada para Português.' : 'Language changed to English.') }}
                    className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${
                      lingua === lang.code
                        ? 'border-[#1B3A6B] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-3xl">{lang.flag}</span>
                    <div className="text-left">
                      <p className="font-bold text-gray-800">{lang.label}</p>
                      <p className="text-sm text-gray-400">{lang.sub}</p>
                    </div>
                    {lingua === lang.code && (
                      <Check size={18} className="text-[#1B3A6B] ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, defaultValue, type = 'text', className = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/30 focus:border-[#1B3A6B]"
      />
    </div>
  )
}
