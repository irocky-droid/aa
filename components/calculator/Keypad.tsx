import GlassButton from './GlassButton'
import { Operator } from '@/hooks/useCalculator'

interface KeypadProps {
	onDigit: (digit: string) => void
	onDecimal: () => void
	onOperator: (op: Operator) => void
	onEquals: () => void
	onClear: () => void
	onClearEntry: () => void
	onDelete: () => void
	onToggleSign: () => void
	onPercentage: () => void
}

const Keypad = ({
	onDigit,
	onDecimal,
	onOperator,
	onEquals,
	onClear,
	onClearEntry,
	onDelete,
	onToggleSign,
	onPercentage,
}: KeypadProps) => {
	const buttonSize = 'md'

	return (
		<div className='space-y-3 animate-slide-up'>
			{/* First row: AC, +/-, %, ÷ */}
			<div className='grid grid-cols-4 gap-3'>
				<GlassButton
					variant='function'
					size={buttonSize}
					onClick={onClear}
					haptic
				>
					AC
				</GlassButton>
				<GlassButton
					variant='function'
					size={buttonSize}
					onClick={onToggleSign}
					haptic
				>
					+/-
				</GlassButton>
				<GlassButton
					variant='function'
					size={buttonSize}
					onClick={onPercentage}
					haptic
				>
					%
				</GlassButton>
				<GlassButton
					variant='accent'
					size={buttonSize}
					onClick={() => onOperator('÷')}
					haptic
				>
					÷
				</GlassButton>
			</div>

			{/* Second row: 7, 8, 9, × */}
			<div className='grid grid-cols-4 gap-3'>
				<GlassButton
					variant='secondary'
					size={buttonSize}
					onClick={() => onDigit('7')}
					haptic
				>
					7
				</GlassButton>
				<GlassButton
					variant='secondary'
					size={buttonSize}
					onClick={() => onDigit('8')}
					haptic
				>
					8
				</GlassButton>
				<GlassButton
					variant='secondary'
					size={buttonSize}
					onClick={() => onDigit('9')}
					haptic
				>
					9
				</GlassButton>
				<GlassButton
					variant='accent'
					size={buttonSize}
					onClick={() => onOperator('×')}
					haptic
				>
					×
				</GlassButton>
			</div>

			{/* Third row: 4, 5, 6, - */}
			<div className='grid grid-cols-4 gap-3'>
				<GlassButton
					variant='secondary'
					size={buttonSize}
					onClick={() => onDigit('4')}
					haptic
				>
					4
				</GlassButton>
				<GlassButton
					variant='secondary'
					size={buttonSize}
					onClick={() => onDigit('5')}
					haptic
				>
					5
				</GlassButton>
				<GlassButton
					variant='secondary'
					size={buttonSize}
					onClick={() => onDigit('6')}
					haptic
				>
					6
				</GlassButton>
				<GlassButton
					variant='accent'
					size={buttonSize}
					onClick={() => onOperator('-')}
					haptic
				>
					-
				</GlassButton>
			</div>

			{/* Fourth row: 1, 2, 3, + */}
			<div className='grid grid-cols-4 gap-3'>
				<GlassButton
					variant='secondary'
					size={buttonSize}
					onClick={() => onDigit('1')}
					haptic
				>
					1
				</GlassButton>
				<GlassButton
					variant='secondary'
					size={buttonSize}
					onClick={() => onDigit('2')}
					haptic
				>
					2
				</GlassButton>
				<GlassButton
					variant='secondary'
					size={buttonSize}
					onClick={() => onDigit('3')}
					haptic
				>
					3
				</GlassButton>
				<GlassButton
					variant='accent'
					size={buttonSize}
					onClick={() => onOperator('+')}
					haptic
				>
					+
				</GlassButton>
			</div>

			{/* Fifth row: 0, ., = */}
			<div className='grid grid-cols-4 gap-3'>
				<GlassButton
					variant='secondary'
					size={buttonSize}
					className='col-span-2 rounded-[2rem] !w-full'
					onClick={() => onDigit('0')}
					haptic
				>
					0
				</GlassButton>
				<GlassButton
					variant='secondary'
					size={buttonSize}
					onClick={onDecimal}
					haptic
				>
					.
				</GlassButton>
				<GlassButton
					variant='accent'
					size={buttonSize}
					onClick={onEquals}
					haptic
				>
					=
				</GlassButton>
			</div>
		</div>
	)
}

export default Keypad
