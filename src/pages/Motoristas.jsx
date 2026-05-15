import { useState } from 'react'
import { Phone, Mail, Truck, CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Badge } from '../components/ui/Badge'
import { Drawer } from '../components/ui/Drawer'

export default function Motoristas() {
  const { lingua, motoristas, frota } = useApp()
  const [motoristaAberto, setMotoristaAberto] = useState(null)

  const t = (pt, en) => lingua === 'EN' ? en : pt

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-[#111111] font-display">{t('Motoristas', 'Drivers')}</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          {motoristas.filter(m => m.estado === 'Disponível').length} {t('disponíveis', 'available')} · {motoristas.length} {t('total', 'total')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {motoristas.map(motorista => (
          <div
            key={motorista.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 cursor-pointer hover:shadow-md hover:border-[#D11C1C]/20 transition-all"
            onClick={() => setMotoristaAberto(motorista)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#D11C1C] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {motorista.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{motorista.nome}</p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{motorista.id}</p>
                </div>
              </div>
              <Badge label={motorista.estado} />
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Phone size={13} className="text-gray-400" /> {motorista.telefone}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <CheckCircle size={13} className="text-gray-400" /> {t('Carta:', 'License:')} {motorista.carta}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">{t('Entregas este mês', 'Deliveries this month')}</p>
                <p className="text-xl font-bold text-[#D11C1C]">{motorista.entregasMes}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">{t('Atribuições activas', 'Active assignments')}</p>
                <p className="text-xl font-bold text-gray-700">{motorista.atribuicoes.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Drawer
        open={!!motoristaAberto}
        onClose={() => setMotoristaAberto(null)}
        title={motoristaAberto?.nome}
        subtitle={`${motoristaAberto?.id} · ${motoristaAberto?.carta}`}
      >
        {motoristaAberto && (
          <div className="px-6 py-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#D11C1C] flex items-center justify-center text-white font-bold text-xl">
                {motoristaAberto.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="font-bold text-lg text-gray-800">{motoristaAberto.nome}</p>
                <Badge label={motoristaAberto.estado} size="md" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{t('Contacto', 'Contact')}</p>
                <p className="text-sm flex items-center gap-2"><Phone size={14} className="text-gray-400" /> {motoristaAberto.telefone}</p>
                <p className="text-sm flex items-center gap-2"><Mail size={14} className="text-gray-400" /> {motoristaAberto.email}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">{t('Estatísticas', 'Stats')}</p>
                <p className="text-2xl font-bold text-[#D11C1C]">{motoristaAberto.entregasMes}</p>
                <p className="text-xs text-gray-400">{t('entregas este mês', 'deliveries this month')}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-700 mb-3">{t('Atribuições Actuais', 'Current Assignments')}</h4>
              {motoristaAberto.atribuicoes.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  <CheckCircle size={24} className="text-green-400 mx-auto mb-2" />
                  <p className="text-sm">{t('Sem atribuições activas.', 'No active assignments.')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {motoristaAberto.atribuicoes.map((atr, i) => {
                    const maq = frota.find(m => m.id === atr.maquina)
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                        <Truck size={16} className="text-[#D11C1C] flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">{maq?.nome || atr.maquina}</p>
                          <p className="text-xs text-gray-400">{atr.cliente} · {new Date(atr.data).toLocaleDateString('pt-PT')}</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{atr.acao}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
