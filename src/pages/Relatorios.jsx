import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend
} from 'recharts'
import { Download, FileSpreadsheet, TrendingUp, Truck, Users, Euro } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Button } from '../components/ui/Button'
import { receitaMensal, utilizacaoFrota } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>€{p.value.toLocaleString('pt-PT')}</strong>
        </p>
      ))}
    </div>
  )
}

const topClientes = [
  { nome: 'Município do Fundão', alugueres: 22, totalGasto: 31500 },
  { nome: 'Construtora Beirã Lda', alugueres: 14, totalGasto: 18640 },
  { nome: 'Estradas de Portugal SA', alugueres: 6, totalGasto: 8900 },
  { nome: 'João Rodrigues Construções', alugueres: 8, totalGasto: 9200 },
  { nome: 'Serra Verde Agricultura Lda', alugueres: 5, totalGasto: 4300 },
]

export default function Relatorios() {
  const { lingua, addToast } = useApp()
  const [activeTab, setActiveTab] = useState('receita')

  const t = (pt, en) => lingua === 'EN' ? en : pt

  const exportar = (tipo) => {
    addToast(t(`A gerar ${tipo}... ficheiro disponível em segundos.`, `Generating ${tipo}... file ready in seconds.`), 'info')
  }

  const tabs = [
    { key: 'receita', label: t('Receita por Período', 'Revenue by Period'), icon: TrendingUp },
    { key: 'frota', label: t('Utilização de Frota', 'Fleet Utilization'), icon: Truck },
    { key: 'clientes', label: t('Top Clientes', 'Top Clients'), icon: Users },
    { key: 'custos', label: t('Custos vs Receita', 'Costs vs Revenue'), icon: Euro },
  ]

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A2A] font-display">{t('Relatórios', 'Reports')}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{t('Dados de Janeiro a Maio 2025', 'Data from January to May 2025')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={<FileSpreadsheet size={15} />} onClick={() => exportar('Excel')}>Excel</Button>
          <Button variant="secondary" icon={<Download size={15} />} onClick={() => exportar('PDF')}>PDF</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-white rounded-xl border border-gray-100 shadow-sm p-1.5">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === key
                ? 'bg-[#1B3A6B] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Conteúdo dos relatórios */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

        {/* Receita por período */}
        {activeTab === 'receita' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[#1A1A2A] font-display">{t('Receita vs Custos por Mês', 'Monthly Revenue vs Costs')}</h3>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#1B3A6B]">€{receitaMensal.reduce((s, m) => s + m.receita, 0).toLocaleString('pt-PT')}</p>
                <p className="text-xs text-gray-400">{t('total no período', 'total in period')}</p>
              </div>
            </div>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={receitaMensal} barGap={6} barCategoryGap="35%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `€${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />
                  <Bar name={t('Receita', 'Revenue')} dataKey="receita" fill="#1B3A6B" radius={[4, 4, 0, 0]} />
                  <Bar name={t('Custos', 'Costs')} dataKey="custos" fill="#F5A623" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ height: 250, marginTop: 32 }}>
              <p className="text-sm font-semibold text-gray-600 mb-3">{t('Evolução da Receita', 'Revenue Trend')}</p>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={receitaMensal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `€${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" name={t('Receita', 'Revenue')} dataKey="receita" stroke="#1B3A6B" strokeWidth={2.5} dot={{ fill: '#1B3A6B', r: 4 }} />
                  <Line type="monotone" name={t('Custos', 'Costs')} dataKey="custos" stroke="#F5A623" strokeWidth={2.5} dot={{ fill: '#F5A623', r: 4 }} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Utilização de frota */}
        {activeTab === 'frota' && (
          <div>
            <h3 className="font-bold text-[#1A1A2A] font-display mb-5">{t('Utilização por Máquina (últimos 60 dias)', 'Utilization by Machine (last 60 days)')}</h3>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {[['Máquina', 'Machine'], ['Dias Alugada', 'Days Rented'], ['Ocupação', 'Utilization'], ['Receita', 'Revenue'], ['', '']].map(([pt, en]) => (
                    <th key={pt} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t(pt, en)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {utilizacaoFrota.sort((a, b) => b.ocupacao - a.ocupacao).map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 text-sm font-medium text-gray-800">{row.maquina}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">{row.diasAlugada}/{row.totalDias} {t('dias', 'days')}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${row.ocupacao}%`, backgroundColor: row.ocupacao >= 60 ? '#16A34A' : row.ocupacao >= 40 ? '#F5A623' : '#DC2626' }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 w-10">{row.ocupacao}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-bold text-[#1B3A6B]">€{row.receita.toLocaleString('pt-PT')}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        row.ocupacao >= 60 ? 'bg-green-100 text-green-700' :
                        row.ocupacao >= 40 ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {row.ocupacao >= 60 ? t('Alto', 'High') : row.ocupacao >= 40 ? t('Médio', 'Medium') : t('Baixo', 'Low')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Top clientes */}
        {activeTab === 'clientes' && (
          <div>
            <h3 className="font-bold text-[#1A1A2A] font-display mb-5">{t('Clientes por Volume de Negócio', 'Clients by Business Volume')}</h3>
            <div className="space-y-3">
              {topClientes.map((cliente, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 ? 'bg-[#F5A623] text-white' : i === 1 ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-500'}`}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{cliente.nome}</p>
                    <p className="text-xs text-gray-400">{cliente.alugueres} {t('alugueres', 'rentals')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#1B3A6B]">€{cliente.totalGasto.toLocaleString('pt-PT')}</p>
                  </div>
                  <div className="w-32">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#1B3A6B] h-2 rounded-full"
                        style={{ width: `${(cliente.totalGasto / topClientes[0].totalGasto) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custos vs Receita */}
        {activeTab === 'custos' && (
          <div>
            <h3 className="font-bold text-[#1A1A2A] font-display mb-5">{t('Custos vs Receita por Máquina', 'Costs vs Revenue by Machine')}</h3>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {[['Máquina', 'Machine'], ['Custo Manutenção', 'Maintenance'], ['Receita', 'Revenue'], ['Lucro', 'Profit'], ['Margem', 'Margin']].map(([pt, en]) => (
                    <th key={pt} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t(pt, en)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { nome: 'MAQ-001 Bobcat E85', custo: 3200, receita: 18400 },
                  { nome: 'MAQ-002 Manitou MT625', custo: 1800, receita: 22400 },
                  { nome: 'MAQ-003 JLG 450AJ', custo: 950, receita: 12350 },
                  { nome: 'MAQ-005 Volvo FH 500', custo: 6200, receita: 31500 },
                  { nome: 'MAQ-006 Hamm HD12', custo: 680, receita: 6840 },
                  { nome: 'MAQ-008 IHI 50Z', custo: 2100, receita: 14300 },
                ].map((row, i) => {
                  const lucro = row.receita - row.custo
                  const margem = ((lucro / row.receita) * 100).toFixed(0)
                  return (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3.5 text-sm font-medium text-gray-800">{row.nome}</td>
                      <td className="px-4 py-3.5 text-sm text-red-600">€{row.custo.toLocaleString('pt-PT')}</td>
                      <td className="px-4 py-3.5 text-sm text-green-600 font-medium">€{row.receita.toLocaleString('pt-PT')}</td>
                      <td className="px-4 py-3.5 text-sm font-bold text-[#1B3A6B]">€{lucro.toLocaleString('pt-PT')}</td>
                      <td className="px-4 py-3.5">
                        <span className={`text-sm font-bold ${Number(margem) >= 70 ? 'text-green-600' : Number(margem) >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                          {margem}%
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
