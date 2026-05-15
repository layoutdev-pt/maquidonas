import clsx from 'clsx'

const variants = {
  // Estados de máquinas
  'Disponível': 'bg-green-100 text-green-800 border border-green-200',
  'Alugada': 'bg-orange-100 text-orange-800 border border-orange-200',
  'Manutenção': 'bg-red-100 text-red-800 border border-red-200',
  'Inactiva': 'bg-gray-100 text-gray-600 border border-gray-200',
  // Estados de alugueres
  'Pedido': 'bg-gray-100 text-gray-700 border border-gray-200',
  'Aprovado': 'bg-blue-100 text-blue-800 border border-blue-200',
  'Activo': 'bg-green-100 text-green-800 border border-green-200',
  'Concluído': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  'Cancelado': 'bg-red-100 text-red-800 border border-red-200',
  // Estados de documentos
  'valido': 'bg-green-100 text-green-800 border border-green-200',
  'a-expirar': 'bg-amber-100 text-amber-800 border border-amber-200',
  'expirado': 'bg-red-100 text-red-800 border border-red-200',
  // Estados de faturas
  'Emitida': 'bg-blue-100 text-blue-800 border border-blue-200',
  'Paga': 'bg-green-100 text-green-800 border border-green-200',
  'Pendente': 'bg-amber-100 text-amber-800 border border-amber-200',
  'Anulada': 'bg-gray-100 text-gray-600 border border-gray-200',
  // Urgência de alertas
  'alta': 'bg-red-100 text-red-800 border border-red-200',
  'media': 'bg-amber-100 text-amber-800 border border-amber-200',
  // Perfis
  'Admin': 'bg-purple-100 text-purple-800 border border-purple-200',
  'Operacional': 'bg-blue-100 text-blue-800 border border-blue-200',
  'Motorista': 'bg-gray-100 text-gray-700 border border-gray-200',
  // Motoristas estado
  'Em serviço': 'bg-orange-100 text-orange-800 border border-orange-200',
  // custom
  'navy': 'bg-[#D11C1C] text-white',
  'orange': 'bg-[#A51414] text-white',
  'success': 'bg-green-100 text-green-800 border border-green-200',
  'error': 'bg-red-100 text-red-800 border border-red-200',
}

export function Badge({ label, size = 'sm', className = '' }) {
  const cls = variants[label] || 'bg-gray-100 text-gray-700 border border-gray-200'
  return (
    <span className={clsx(
      'inline-flex items-center rounded-full font-medium whitespace-nowrap',
      size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1',
      cls, className
    )}>
      {label}
    </span>
  )
}

export function DocumentoBadge({ estado }) {
  const labels = { 'valido': 'Válido', 'a-expirar': 'A Expirar', 'expirado': 'Expirado' }
  return <Badge label={estado} />
}
