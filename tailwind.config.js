/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backdropBlur: {
				sm: '4px',
			  },
			  animation: {
				float: 'float 6s ease-in-out infinite',
			  },
			  keyframes: {
				float: {
				  '0%, 100%': { transform: 'translateY(0) translateX(0)' },
				  '50%': { transform: 'translateY(-20px) translateX(10px)' },
				},
			  },
			
			
		  },
		},
	plugins: [],
}
