 import { useEffect, useCallback } from 'react'
import CalculatorDisplay from './CalculatorDisplay'
import Keypad from './Keypad'
import HistoryDrawer from './HistoryDrawer'
import { useCalculator, Operator } from '@/hooks/useCalculator'

const Calculator = () => {
	const {
		display,
		previousDisplay,
		operator,
		history,
		inputDigit,
		inputDecimal,
		clear,
		clearEntry,
		deleteLast,
		toggleSign,
		inputOperator,
		equals,
		percentage,
		squareRoot,
		isHistoryOpen,
		setIsHistoryOpen,
		clearHistory,
	} = useCalculator()

	// Keyboard support
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Prevent default for calculator keys
			if (/[\d\+\-\*\/\=\.\c]/.test(e.key) || e.key === 'Enter' || e.key === 'Backspace') {
				e.preventDefault()
			}

			// Trigger haptic on key press
			if (navigator.vibrate && /[\d\=\+\-\*\/]/.test(e.key)) {
				navigator.vibrate(5)
			}

			switch (e.key) {
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					inputDigit(e.key)
					break
				case '.':
					inputDecimal()
					break
				case '+':
					inputOperator('+')
					break
				case '-':
					inputOperator('-')
					break
				case '*':
					inputOperator('×')
					break
				case '/':
					inputOperator('÷')
					break
				case '%':
					percentage()
					break
				case '=':
				case 'Enter':
					equals()
					break
				case 'Backspace':
					deleteLast()
					break
				case 'Escape':
				case 'c':
				case 'C':
					clear()
					break
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [inputDigit, inputDecimal, inputOperator, equals, deleteLast, clear, percentage])

	// History button click
	const handleHistoryClick = useCallback(() => {
		if (navigator.vibrate) {
			navigator.vibrate(10)
		}
		setIsHistoryOpen(true)
	}, [])

	return (
		<div className='min-h-screen flex flex-col'>
			{/* Header with history button */}
			<header className='flex items-center justify-between p-4 animate-fade-in'>
				<h1 className='text-2xl font-bold text-white/90'>iOS 26 Calculator</h1>
				<button
					onClick={handleHistoryClick}
					className='glass-light p-3 rounded-full hover:bg-white/20 transition-all active:scale-95'
				>
					<svg
						className='w-5 h-5 text-white'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				</button>
			</header>

			{/* Main content */}
			<main className='flex-1 flex flex-col justify-end p-4 pb-8'>
				{/* Display */}
				<CalculatorDisplay
					display={display}
					previousDisplay={previousDisplay}
					operator={operator}
				/>

				{/* Keypad */}
				<Keypad
					onDigit={inputDigit}
					onDecimal={inputDecimal}
					onOperator={inputOperator}
					onEquals={equals}
					onClear={clear}
					onClearEntry={clearEntry}
					onDelete={deleteLast}
					onToggleSign={toggleSign}
					onPercentage={percentage}
				/>
			</main>

			{/* History Drawer */}
			<HistoryDrawer
				isOpen={isHistoryOpen}
				onClose={() => setIsHistoryOpen(false)}
				history={history}
				onClear={clearHistory}
			/>
		</div>
	)
}

export default Calculator
