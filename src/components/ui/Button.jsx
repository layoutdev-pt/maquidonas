import clsx from 'clsx'

export function Button({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', type = 'button', icon }) {
  const base = 'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer border'

  const variants = {
    primary: 'bg-[#1B3A6B] hover:bg-[#152d55] text-white border-[#1B3A6B] shadow-sm',
    secondary: 'bg-white hover:bg-gray-50 text-[#1B3A6B] border-gray-200 shadow-sm',
    orange: 'bg-[#F5A623] hover:bg-[#e09415] text-white border-[#F5A623] shadow-sm',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600 shadow-sm',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent',
    success: 'bg-green-600 hover:bg-green-700 text-white border-green-600 shadow-sm',
    outline: 'bg-transparent hover:bg-[#1B3A6B]/5 text-[#1B3A6B] border-[#1B3A6B]',
  }

  const sizes = {
    xs: 'text-xs px-2.5 py-1.5',
    sm: 'text-sm px-3 py-2',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-5 py-3',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
