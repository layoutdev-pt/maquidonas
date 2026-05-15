import { useNavigate } from 'react-router-dom'
import {
  PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'
import {
  TrendingUp, Truck, Euro, AlertTriangle,
  ArrowRight, Clock, CheckCircle2, MapPin, Calendar
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Badge } from '../components/ui/Badge'
import { receitaMensal } from '../data/mockData'

const ESTADO_COLORS = {
  'Disponível': '#22C55E',
  'Alugada': '#D11C1C',
  'Manutenção': '#A51414',
  'Inactiva': '#94A3B8',
}

function KpiCard({ title, value, sub, icon: Icon, accent, onClick }) {
  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accent + '18' }}>
        <Icon size={22} style={{ color: accent }} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-bold text-[#111111] font-display leading-tight mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

const CustomAreaTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      <p className="text-[#D11C1C]">Receita: <strong>€{payload[0]?.value?.toLocaleString('pt-PT')}</strong></p>
    </div>
  )
}

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.08) return null
  const RADIAN = Math.PI / 180
  const r = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="700">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function Dashboard() {
  const { lingua, frota, alugueres, alertas, faturas, clientes, dispensarAlerta } = useApp()
  const navigate = useNavigate()

  const t = (pt, en) => lingua === 'EN' ? en : pt

  const alugueresActivos = alugueres.filter(a => a.estado === 'Activo')
  const alugueresAprovados = alugueres.filter(a => a.estado === 'Aprovado')
  const alugueresPedido = alugueres.filter(a => a.estado === 'Pedido')
  const frotaDisponivel = frota.filter(m => m.estado === 'Disponível').length
  const receitaMes = faturas
    .filter(f => f.data.startsWith('2025-05') && f.estado !== 'Anulada')
    .reduce((s, f) => s + f.valor, 0)

  const alugueresRecentes = alugueres
    .filter(a => ['Activo', 'Aprovado', 'Pedido'].includes(a.estado))
    .slice(0, 5)

  const estadoFrota = Object.entries(
    frota.reduce((acc, m) => ({ ...acc, [m.estado]: (acc[m.estado] || 0) + 1 }), {})
  ).map(([name, value]) => ({ name, value }))

  return (
    <div className="space-y-5 max-w-7xl">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title={t('Alugueres Activos', 'Active Rentals')}
          value={alugueresActivos.length}
          sub={t(`+${alugueresAprovados.length} aprovados`, `+${alugueresAprovados.length} approved`)}
          icon={Calendar}
          accent="#D11C1C"
          onClick={() => navigate('/alugueres')}
        />
        <KpiCard
          title={t('Frota Disponível', 'Fleet Available')}
          value={`${frotaDisponivel}/${frota.length}`}
          sub={t('máquinas prontas', 'machines ready')}
          icon={Truck}
          accent="#22C55E"
          onClick={() => navigate('/frota')}
        />
        <KpiCard
          title={t('Receita Este Mês', 'Revenue This Month')}
          value={`€${receitaMes.toLocaleString('pt-PT')}`}
          sub={t('Maio 2025', 'May 2025')}
          icon={Euro}
          accent="#A51414"
        />
        <KpiCard
          title={t('Alertas Pendentes', 'Pending Alerts')}
          value={alertas.length}
          sub={t('requerem atenção', 'need attention')}
          icon={AlertTriangle}
          accent={alertas.length > 0 ? '#EF4444' : '#22C55E'}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Area chart — receita */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-[#111111] font-display text-base">{t('Receita Mensal', 'Monthly Revenue')}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{t('Últimos 6 meses', 'Last 6 months')}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-3 py-1.5 rounded-full">
              <TrendingUp size={13} />
              +14%
            </div>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={receitaMensal}>
                <defs>
                  <linearGradient id="receitaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D11C1C" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#D11C1C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={v => `€${(v / 1000).toFixed(0)}k`} width={36} />
                <Tooltip content={<CustomAreaTooltip />} />
                <Area
                  type="monotone" dataKey="receita"
                  stroke="#D11C1C" strokeWidth={2.5}
                  fill="url(#receitaGrad)" dot={false}
                  activeDot={{ r: 5, fill: '#D11C1C', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut — estado da frota */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <h3 className="font-bold text-[#111111] font-display text-base mb-1">{t('Estado da Frota', 'Fleet Status')}</h3>
          <p className="text-xs text-gray-400 mb-4">{frota.length} {t('equipamentos', 'equipment')}</p>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={estadoFrota}
                  cx="50%" cy="50%"
                  innerRadius={44} outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {estadoFrota.map((entry) => (
                    <Cell key={entry.name} fill={ESTADO_COLORS[entry.name] || '#CBD5E1'} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, name) => [v, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {estadoFrota.map(({ name, value }) => (
              <div key={name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: ESTADO_COLORS[name] || '#CBD5E1' }} />
                  <span className="text-gray-600">{name}</span>
                </div>
                <span className="font-bold text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity + alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-[#111111] font-display text-base">{t('Alugueres Recentes', 'Recent Bookings')}</h3>
            <button
              className="text-xs text-[#D11C1C] font-semibold hover:underline flex items-center gap-1"
              onClick={() => navigate('/alugueres')}
            >
              {t('Ver todos', 'View all')} <ArrowRight size={13} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {alugueresRecentes.map(aluguer => {
              const maquina = frota.find(m => m.id === aluguer.maquinaId)
              const cliente = clientes.find(c => c.id === aluguer.clienteId)
              return (
                <div
                  key={aluguer.id}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/60 cursor-pointer transition-colors"
                  onClick={() => navigate('/alugueres')}
                >
                  {/* Machine thumbnail */}
                  <div className="w-14 h-10 rounded-lg bg-[#F5F5F5] flex-shrink-0 overflow-hidden">
                    {maquina?.imagem ? (
                      <img src={maquina.imagem} alt={maquina.nome} className="w-full h-full object-contain p-1" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Truck size={18} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{maquina?.nome || aluguer.maquinaId}</p>
                    <p className="text-xs text-gray-400 truncate">{cliente?.nome}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge label={aluguer.estado} />
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(aluguer.fim).toLocaleDateString('pt-PT')}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Alerts panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#111111] font-display text-base">{t('Alertas', 'Alerts')}</h3>
            {alertas.length > 0 && (
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded-full">{alertas.length}</span>
            )}
          </div>
          <div className="space-y-2 flex-1">
            {alertas.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-gray-400">
                <CheckCircle2 size={28} className="text-green-400 mb-2" />
                <p className="text-xs text-center">{t('Sem alertas pendentes', 'No pending alerts')}</p>
              </div>
            ) : alertas.slice(0, 5).map(alerta => (
              <div
                key={alerta.id}
                className={`flex items-start gap-2.5 p-3 rounded-xl cursor-pointer hover:opacity-90 transition-opacity ${
                  alerta.urgencia === 'alta'
                    ? 'bg-red-50 border border-red-100'
                    : 'bg-amber-50 border border-amber-100'
                }`}
                onClick={() => navigate(alerta.link)}
              >
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${alerta.urgencia === 'alta' ? 'bg-red-500' : 'bg-amber-500'}`} />
                <p className="text-xs text-gray-700 leading-snug">{alerta.mensagem}</p>
              </div>
            ))}
          </div>
          {alertas.length > 0 && (
            <button
              className="mt-3 w-full text-xs text-[#D11C1C] hover:underline text-center font-semibold"
              onClick={() => navigate('/frota')}
            >
              {t('Ver frota completa', 'View full fleet')} →
            </button>
          )}
        </div>
      </div>

      {/* Approval banner */}
      {alugueresPedido.length > 0 && (
        <div className="bg-[#D11C1C] rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock size={18} className="text-[#A51414]" />
          </div>
          <p className="font-semibold text-white text-sm flex-1">
            {alugueresPedido.length} {t('pedido(s) de aluguer aguardam aprovação', 'rental request(s) awaiting approval')}
          </p>
          <button
            className="bg-[#A51414] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#E09610] transition-colors flex items-center gap-1.5 flex-shrink-0"
            onClick={() => navigate('/alugueres')}
          >
            {t('Rever agora', 'Review now')} <ArrowRight size={13} />
          </button>
        </div>
      )}
    </div>
  )
}
