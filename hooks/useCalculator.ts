import { useState, useCallback, useEffect } from 'react'

export type Operator = '+' | '-' | '×' | '÷' | '%' | '^' | '√'

interface CalculationHistory {
	expression: string
	result: string
	timestamp: number
}

interface CalculatorState {
	display: string
	previousDisplay: string
	operator: Operator | null
	waitingForOperand: boolean
	history: CalculationHistory[]
}

const initialState: CalculatorState = {
	display: '0',
	previousDisplay: '',
	operator: null,
	waitingForOperand: false,
	history: [],
}

export const useCalculator = () => {
	const [state, setState] = useState<CalculatorState>(initialState)
	const [isHistoryOpen, setIsHistoryOpen] = useState(false)

	// Load history from localStorage on mount
	useEffect(() => {
		const savedHistory = localStorage.getItem('calculator-history')
		if (savedHistory) {
			try {
				const parsed = JSON.parse(savedHistory)
				setState(prev => ({ ...prev, history: parsed }))
			} catch (e) {
				console.error('Failed to load history')
			}
		}
	}, [])

	// Save history to localStorage
	useEffect(() => {
		localStorage.setItem('calculator-history', JSON.stringify(state.history))
	}, [state.history])

	const calculate = useCallback((a: number, b: number, op: Operator): number | null => {
		switch (op) {
			case '+':
				return a + b
			case '-':
				return a - b
			case '×':
				return a * b
			case '÷':
				return b !== 0 ? a / b : null
			case '%':
				return (a * b) / 100
			case '^':
				return Math.pow(a, b)
			case '√':
				return Math.sqrt(a)
			default:
				return null
		}
	}, [])

	const formatNumber = useCallback((num: number): string => {
		if (isNaN(num)) return 'Error'
		if (!isFinite(num)) return 'Infinity'
		
		const str = num.toString()
		if (str.length > 12) {
			return num.toExponential(6)
		}
		
		const [integer, decimal] = str.split('.')
		const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		
		if (decimal) {
			return `${formattedInteger}.${decimal}`
		}
		return formattedInteger
	}, [])

	const addToHistory = useCallback((expression: string, result: string) => {
		setState(prev => ({
			...prev,
			history: [
				{ expression, result, timestamp: Date.now() },
				...prev.history.slice(0, 49), // Keep last 50 entries
			],
		}))
	}, [])

	const inputDigit = useCallback((digit: string) => {
		setState(prev => {
			if (prev.waitingForOperand) {
				return {
					...prev,
					display: digit,
					waitingForOperand: false,
				}
			}
			
			const newDisplay = prev.display === '0' ? digit : prev.display + digit
			return {
				...prev,
				display: newDisplay.length > 12 ? prev.display : newDisplay,
			}
		})
	}, [])

	const inputDecimal = useCallback(() => {
		setState(prev => {
			if (prev.waitingForOperand) {
				return {
					...prev,
					display: '0.',
					waitingForOperand: false,
				}
			}
			
			if (!prev.display.includes('.')) {
				return {
					...prev,
					display: prev.display + '.',
				}
			}
			return prev
		})
	}, [])

	const clear = useCallback(() => {
		setState({
			...initialState,
			history: state.history,
		})
	}, [state.history])

	const clearEntry = useCallback(() => {
		setState(prev => ({
			...prev,
			display: '0',
		}))
	}, [])

	const deleteLast = useCallback(() => {
		setState(prev => {
			if (prev.display.length <= 1 || prev.display === 'Error') {
				return { ...prev, display: '0' }
			}
			return {
				...prev,
				display: prev.display.slice(0, -1),
			}
		})
	}, [])

	const toggleSign = useCallback(() => {
		setState(prev => {
			if (prev.display === '0') return prev
			if (prev.display.startsWith('-')) {
				return { ...prev, display: prev.display.slice(1) }
			}
			return { ...prev, display: '-' + prev.display }
		})
	}, [])

	const inputOperator = useCallback((op: Operator) => {
		setState(prev => {
			const currentValue = parseFloat(prev.display)
			
			if (prev.operator && prev.waitingForOperand) {
				return {
					...prev,
					operator: op,
				}
			}
			
			if (!prev.operator) {
				return {
					...prev,
					previousDisplay: prev.display,
					operator: op,
					waitingForOperand: true,
				}
			}
			
			const prevValue = parseFloat(prev.previousDisplay)
			const result = calculate(prevValue, currentValue, prev.operator)
			
			if (result === null) {
				return {
					...prev,
					display: 'Error',
					waitingForOperand: true,
				}
			}
			
			const formattedResult = formatNumber(result)
			addToHistory(
				`${prev.previousDisplay} ${prev.operator} ${currentValue}`,
				formattedResult
			)
			
			return {
				...prev,
				display: formattedResult,
				previousDisplay: formattedResult,
				operator: op,
				waitingForOperand: true,
			}
		})
	}, [calculate, formatNumber, addToHistory])

	const equals = useCallback(() => {
		setState(prev => {
			if (!prev.operator || prev.waitingForOperand) return prev
			
			const currentValue = parseFloat(prev.display)
			const prevValue = parseFloat(prev.previousDisplay)
			const result = calculate(prevValue, currentValue, prev.operator)
			
			if (result === null) {
				return {
					...prev,
					display: 'Error',
					waitingForOperand: true,
				}
			}
			
			const formattedResult = formatNumber(result)
			addToHistory(
				`${prev.previousDisplay} ${prev.operator} ${currentValue}`,
				formattedResult
			)
			
			return {
				...prev,
				display: formattedResult,
				previousDisplay: prev.display,
				operator: null,
				waitingForOperand: true,
			}
		})
	}, [calculate, formatNumber, addToHistory])

	const percentage = useCallback(() => {
		setState(prev => {
			const value = parseFloat(prev.display)
			const result = value / 100
			return {
				...prev,
				display: formatNumber(result),
			}
		})
	}, [formatNumber])

	const squareRoot = useCallback(() => {
		setState(prev => {
			const value = parseFloat(prev.display)
			if (value < 0) {
				return { ...prev, display: 'Error' }
			}
			const result = Math.sqrt(value)
			return {
				...prev,
				display: formatNumber(result),
			}
		})
	}, [formatNumber])

	const clearHistory = useCallback(() => {
		setState(prev => ({
			...prev,
			history: [],
		}))
	}, [])

	return {
		display: state.display,
		previousDisplay: state.previousDisplay,
		operator: state.operator,
		isHistoryOpen,
		history: state.history,
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
		setIsHistoryOpen,
		clearHistory,
	}
}
