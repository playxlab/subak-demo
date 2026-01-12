/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'subak-red': '#FC6C85',
                'subak-dark': '#1A1A1A',
                'subak-light': '#F9FAFB',
            },
            fontFamily: {
                sans: ['Manrope', 'sans-serif'],
                serif: ['Fredoka', 'serif'],
                inter: ['Inter', 'sans-serif'],
            },
            animation: {
                'slide-up-exit': 'slide-up-exit 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-down': 'slide-down 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'pop-up': 'pop-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            },
            keyframes: {
                'slide-up-exit': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-100%)' },
                },
                'slide-down': {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                'pop-up': {
                    '0%': { transform: 'scale(0.5)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
