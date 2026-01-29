import { useEffect, useCallback } from 'react'

interface CalculationHistory {
	expression: string
	result: string
	timestamp: number
}

interface HistoryDrawerProps {
	isOpen: boolean
	onClose: () => void
	history: CalculationHistory[]
	onClear: () => void
	onSelect?: (item: CalculationHistory) => void
}

const HistoryDrawer = ({
	isOpen,
	onClose,
	history,
	onClear,
	onSelect,
}: HistoryDrawerProps) => {
	// Close on escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}
		
		if (isOpen) {
			document.addEventListener('keydown', handleEscape)
			document.body.style.overflow = 'hidden'
		}
		
		return () => {
			document.removeEventListener('keydown', handleEscape)
			document.body.style.overflow = ''
		}
	}, [isOpen, onClose])

	// Format timestamp
	const formatTime = (timestamp: number) => {
		const date = new Date(timestamp)
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	}

	// Handle backdrop click
	const handleBackdropClick = useCallback(
		(e: React.MouseEvent) => {
			if (e.target === e.currentTarget) {
				onClose()
			}
		},
		[onClose]
	)

	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 z-50 flex items-end justify-end'
			onClick={handleBackdropClick}
		>
			{/* Backdrop with blur */}
			<div className='absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in' />
			
			{/* Drawer */}
			<div className='relative w-full max-w-md h-[80vh] glass-dark rounded-t-3xl animate-slide-up overflow-hidden flex flex-col'>
				{/* Header */}
				<div className='flex items-center justify-between p-4 border-b border-white/10'>
					<h2 className='text-lg font-semibold text-white'>History</h2>
					<div className='flex items-center gap-2'>
						{history.length > 0 && (
							<button
								onClick={onClear}
								className='px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors'
							>
								Clear
							</button>
						)}
						<button
							onClick={onClose}
							className='w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center'
						>
							<svg
								className='w-4 h-4 text-white'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* History list */}
				<div className='flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar'>
					{history.length === 0 ? (
						<div className='flex flex-col items-center justify-center h-48 text-white/50'>
							<svg
								className='w-12 h-12 mb-2 opacity-50'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
							<p className='text-sm'>No calculations yet</p>
						</div>
					) : (
						history.map((item, index) => (
							<div
								key={`${item.timestamp}-${index}`}
								onClick={() => onSelect?.(item)}
								className='glass-light rounded-2xl p-4 hover:bg-white/20 transition-colors cursor-pointer animate-fade-in'
								style={{ animationDelay: `${index * 0.05}s` }}
							>
								<div className='flex justify-between items-start mb-1'>
									<span className='text-white/50 text-xs'>
										{formatTime(item.timestamp)}
									</span>
								</div>
								<div className='text-white/70 text-sm mb-1'>
									{item.expression}
								</div>
								<div className='text-white text-xl font-semibold'>
									= {item.result}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	)
}

export default HistoryDrawer
