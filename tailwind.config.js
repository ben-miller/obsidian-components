/** @type {import('tailwindcss').Config} */
module.exports = {
	corePlugins: {
		preflight: false,
	},
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					25: '#FFF5F2',
					50: '#FFEAE5',
					light: '#FFC4B2',   // Light pastel salmon
					DEFAULT: '#FF9B7E', // Default pastel salmon
					dark: '#FF715A',    // Darker salmon
				},
				secondary: {
					light: '#A7D9F3',   // Light pastel blue
					DEFAULT: '#81C2E3', // Default pastel blue
					dark: '#4D9ECF',    // Darker blue
				},
				background: '#FFFFFF', // White background
				text: {
					primary: '#333333',  // Dark gray for primary text
					secondary: '#666666', // Lighter gray for secondary text
				},
				accent: '#80CC80',  // Optional: Accent color (like pastel green)
			},
		},
	},
	plugins: [],
};
