import { useEffect, useRef } from 'react'

interface CalculatorDisplayProps {
	display: string
	previousDisplay?: string
	operator?: string | null
}

const CalculatorDisplay = ({
	display,
	previousDisplay,
	operator,
}: CalculatorDisplayProps) => {
	const displayRef = useRef<HTMLDivElement>(null)

	// Auto-scroll to end when display changes
	useEffect(() => {
		if (displayRef.current) {
			displayRef.current.scrollLeft = displayRef.current.scrollWidth
		}
	}, [display])

	// Calculate font size based on display length
	const getFontSize = () => {
		const length = display.length
		if (length <= 6) return 'text-6xl'
		if (length <= 9) return 'text-5xl'
		if (length <= 12) return 'text-4xl'
		if (length <= 15) return 'text-3xl'
		return 'text-2xl'
	}

	return (
		<div className='glass-dark rounded-[2.5rem] p-6 mb-6 shadow-2xl animate-fade-in'>
			{/* Previous display and operator */}
			<div className='flex justify-end items-center gap-3 h-8 mb-2'>
				{previousDisplay && (
					<>
						<span className='text-white/50 text-lg font-medium'>
							{operator}
						</span>
						<span className='text-white/70 text-xl font-medium'>
							{previousDisplay}
						</span>
					</>
				)}
			</div>

			{/* Main display */}
			<div
				ref={displayRef}
				className={`
					${getFontSize()}
					font-bold text-white text-right
					tracking-tight
					overflow-x-auto
					whitespace-nowrap
					scrollbar-hide
					h-16
					flex items-end justify-end
					transition-all duration-300
				`}
				style={{
					textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
				}}
			>
				{display}
			</div>

			{/* Animated background gradient effect */}
			<div className='absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none'>
				<div className='absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50' />
			</div>
		</div>
	)
}

export default CalculatorDisplay
