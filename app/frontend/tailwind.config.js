/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
	darkMode: ['class', "class"],
	theme: {
		extend: {
			colors: {
				light: {
					'1': '#F8FAFC',
					'2': '#D9EAFD',
					'3': '#BCCCDC',
					'4': '#9AA6B2',
					primary: '#4F46E5',
					primary2: '#4338CA',
					primary3: '#3730A3',
					text: '#111827',
					text2: '#6B7280'
				},
				dark: {
					'1': '#1E293B',
					'2': '#273445',
					'3': '#334155',
					'4': '#475569',
					'5': '#64748B',
					primary: '#38BDF8',
					primary2: '#0EA5E9',
					primary3: '#0284C7',
					text: '#F1F5F9',
					text3: '#E2E8F0',
					text4: '#94A3B8',
					text5: '#64748B'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
			},
			animation: {
				"caret-blink": "caret-blink 1.25s ease-out infinite",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
}

