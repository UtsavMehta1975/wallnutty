import clsx from 'clsx'

const base = 'inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

const variantClasses = {
	primary: 'bg-primary text-white hover:opacity-90',
	secondary: 'bg-secondary text-white hover:opacity-90',
	outline: 'border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/60',
	ghost: 'text-slate-900 dark:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/60',
}

const sizeClasses = {
	sm: 'h-9 px-3 text-sm',
	md: 'h-10 px-4 text-sm',
	lg: 'h-12 px-5 text-base',
}

export const Button = ({ as:Comp='button', className, variant='primary', size='md', ...props }) => {
	return <Comp className={clsx(base, variantClasses[variant], sizeClasses[size], className)} {...props} />
}