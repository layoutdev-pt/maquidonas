import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const icons = {
  success: <CheckCircle size={18} className="text-green-600" />,
  error: <XCircle size={18} className="text-red-600" />,
  warning: <AlertTriangle size={18} className="text-amber-600" />,
  info: <Info size={18} className="text-blue-600" />,
}

const borders = {
  success: 'border-l-4 border-green-500',
  error: 'border-l-4 border-red-500',
  warning: 'border-l-4 border-amber-500',
  info: 'border-l-4 border-blue-500',
}

export function ToastContainer() {
  const { toasts, removeToast } = useApp()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 bg-white rounded-lg shadow-xl px-4 py-3.5 min-w-72 max-w-sm ${borders[toast.type] || borders.info}`}
          style={{ animation: 'fadeUp 0.3s ease-out' }}
        >
          <span className="flex-shrink-0 mt-0.5">{icons[toast.type] || icons.info}</span>
          <span className="text-sm text-gray-700 flex-1 leading-snug">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes fadeUp {
          from { transform: translateY(12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
