/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// iOS 26 inspired colors
				glass: {
					light: 'rgba(255, 255, 255, 0.25)',
					medium: 'rgba(255, 255, 255, 0.4)',
					dark: 'rgba(255, 255, 255, 0.55)',
				},
				calculator: {
					display: 'rgba(0, 0, 0, 0.2)',
					button: {
						primary: 'rgba(255, 255, 255, 0.35)',
						secondary: 'rgba(255, 255, 255, 0.25)',
						accent: 'rgba(255, 180, 50, 0.6)',
						delete: 'rgba(255, 100, 100, 0.5)',
					},
				},
			},
			backdropBlur: {
				xs: '2px',
			},
			animation: {
				'press': 'press 0.15s ease-out',
				'ripple': 'ripple 0.5s ease-out forwards',
				'slide-up': 'slideUp 0.4s ease-out',
				'slide-down': 'slideDown 0.4s ease-out',
				'fade-in': 'fadeIn 0.3s ease-out',
				'bounce-in': 'bounceIn 0.5s ease-out',
				'glass-shimmer': 'glassShimmer 2s infinite',
				'pulse-glow': 'pulseGlow 2s infinite',
			},
			keyframes: {
				press: {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(0.95)' },
					'100%': { transform: 'scale(1)' },
				},
				ripple: {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'100%': { transform: 'scale(2.5)', opacity: '0' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				slideDown: {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				bounceIn: {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'50%': { transform: 'scale(1.05)' },
					'70%': { transform: 'scale(0.95)' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				glassShimmer: {
					'0%, 100%': { backgroundPosition: '-200% 0' },
					'50%': { backgroundPosition: '200% 0' },
				},
				pulseGlow: {
					'0%, 100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(255, 255, 255, 0.6)' },
				},
			},
			transitionTimingFunction: {
				'ios-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				'ios-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
		},
	},
	plugins: [require('tailwindcss-safe-area')],
}
