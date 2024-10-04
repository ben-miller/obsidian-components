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
					100: '#FFD6CC',     // Light pastel salmon
					200: '#FFBFAF',     // Soft pastel salmon
					300: '#FFA699',     // Mild pastel salmon
					400: '#FF8E82',     // Strong pastel salmon
					500: '#FF9B7E',     // Default pastel salmon (as defined)
					600: '#FF8269',     // Slightly darker than default
					700: '#FF715A',     // Darker salmon (as defined)
					800: '#D85B48',     // Dark salmon shade
					900: '#B34638',     // Even darker salmon
					950: '#8A3429',     // Darkest salmon shade, near brown
					light: '#FFC4B2',   // Light pastel salmon
					DEFAULT: '#FF9B7E', // Default pastel salmon
					dark: '#FF715A',    // Darker salmon
				},
				secondary: {
					light: '#A7D9F3',   // Light pastel blue
					DEFAULT: '#81C2E3', // Default pastel blue
					dark: '#4D9ECF',    // Darker blue
				},
				warning: {
					light: '#FF9999',   // Light pastel red
					DEFAULT: '#FF4D4D', // Stronger, more contrasting pastel red
					dark: '#CC3333',    // Darker, deep red for a strong contrast
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
