export default function Button({ children, variant = 'primary', onClick, type = 'button', className = '' }) {
  const baseClasses = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
  
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    outline: 'bg-transparent hover:bg-gray-100 text-primary-500 border border-primary-500'
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
