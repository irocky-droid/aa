import { useState, useRef, useCallback } from 'react'

interface Ripple {
	id: number
	x: number
	y: number
}

interface GlassButtonProps {
	children: React.ReactNode
	onClick?: () => void
	variant?: 'primary' | 'secondary' | 'accent' | 'delete' | 'function'
	size?: 'sm' | 'md' | 'lg' | 'xl'
	className?: string
	disabled?: boolean
	haptic?: boolean
}

const GlassButton = ({
	children,
	onClick,
	variant = 'secondary',
	size = 'md',
	className = '',
	disabled = false,
	haptic = true,
}: GlassButtonProps) => {
	const [ripples, setRipples] = useState<Ripple[]>([])
	const buttonRef = useRef<HTMLButtonElement>(null)
	const rippleIdRef = useRef(0)

	const variantStyles = {
		primary: 'bg-white/40 hover:bg-white/50 active:bg-white/60 text-white font-semibold',
		secondary: 'bg-white/25 hover:bg-white/35 active:bg-white/45 text-white font-medium',
		accent: 'bg-orange-500/60 hover:bg-orange-500/70 active:bg-orange-500/80 text-white font-semibold shadow-lg',
		delete: 'bg-red-500/50 hover:bg-red-500/60 active:bg-red-500/70 text-white font-medium',
		function: 'bg-white/15 hover:bg-white/25 active:bg-white/35 text-white font-medium',
	}

	const sizeStyles = {
		sm: 'text-sm px-3 py-2',
		md: 'text-xl px-4 py-4',
		lg: 'text-2xl px-6 py-6',
		xl: 'text-3xl px-8 py-8',
	}

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			if (disabled) return

			// Trigger haptic feedback on mobile
			if (haptic && navigator.vibrate) {
				navigator.vibrate(15)
			}

			// Create ripple
			const rect = buttonRef.current?.getBoundingClientRect()
			if (rect) {
				const x = e.clientX - rect.left
				const y = e.clientY - rect.top
				const id = rippleIdRef.current++
				setRipples(prev => [...prev, { id, x, y }])

				// Remove ripple after animation
				setTimeout(() => {
					setRipples(prev => prev.filter(r => r.id !== id))
				}, 500)
			}

			onClick?.()
		},
		[disabled, haptic, onClick]
	)

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (disabled) return
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault()
				handleClick(e as unknown as React.MouseEvent<HTMLButtonElement>)
			}
		},
		[disabled, handleClick]
	)

	// Ripple effect component
	const RippleEffect = ({ x, y, id }: Ripple) => (
		<span
			className='pointer-events-none absolute rounded-full bg-white/40'
			style={{
				left: x,
				top: y,
				width: '100px',
				height: '100px',
				transform: 'translate(-50%, -50%)',
				animation: 'ripple 0.5s ease-out forwards',
			}}
			key={id}
		/>
	)

	return (
		<button
			ref={buttonRef}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			disabled={disabled}
			className={`
				relative overflow-hidden
				rounded-full
				backdrop-blur-md
				border border-white/20
				transition-all duration-150 ease-out
				hover:scale-[1.02] active:scale-[0.95]
				disabled:opacity-50 disabled:cursor-not-allowed
				${variantStyles[variant]}
				${sizeStyles[size]}
				${className}
			`}
			style={{
				minWidth: size === 'md' ? '70px' : undefined,
				minHeight: size === 'md' ? '70px' : undefined,
			}}
		>
			{children}
			{ripples.map(ripple => (
				<RippleEffect key={ripple.id} {...ripple} />
			))}
		</button>
	)
}

export default GlassButton
