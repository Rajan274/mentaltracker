/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* primary-20 */
        input: "var(--color-input)", /* soft-off-white */
        ring: "var(--color-ring)", /* therapeutic-teal */
        background: "var(--color-background)", /* warm-white */
        foreground: "var(--color-foreground)", /* charcoal-800 */
        primary: {
          DEFAULT: "var(--color-primary)", /* therapeutic-teal */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* sage-green */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* muted-coral-red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* soft-off-white */
          foreground: "var(--color-muted-foreground)", /* medium-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* warm-coral */
          foreground: "var(--color-accent-foreground)", /* charcoal-800 */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* charcoal-800 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* soft-off-white */
          foreground: "var(--color-card-foreground)", /* charcoal-800 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* gentle-green */
          foreground: "var(--color-success-foreground)", /* charcoal-800 */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* soft-yellow */
          foreground: "var(--color-warning-foreground)", /* charcoal-800 */
        },
        error: {
          DEFAULT: "var(--color-error)", /* muted-coral-red */
          foreground: "var(--color-error-foreground)", /* charcoal-800 */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)',
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(45, 55, 72, 0.06)',
        'medium': '0 4px 20px rgba(45, 55, 72, 0.08)',
        'pronounced': '0 8px 32px rgba(45, 55, 72, 0.12)',
        'morphic': 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 20px rgba(45, 55, 72, 0.08)',
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'gentle-fade-in': 'gentle-fade-in 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'gentle-slide-up': 'gentle-slide-up 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'gentle-bounce': 'gentle-bounce 600ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { 
            transform: 'scale(1)', 
            opacity: '0.8' 
          },
          '50%': { 
            transform: 'scale(1.02)', 
            opacity: '1' 
          },
        },
        'gentle-fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'gentle-slide-up': {
          'from': { 
            opacity: '0', 
            transform: 'translateY(10px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        'gentle-bounce': {
          '0%, 100%': { 
            transform: 'translateY(0)', 
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' 
          },
          '50%': { 
            transform: 'translateY(-4px)', 
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' 
          },
        },
      },
      transitionTimingFunction: {
        'gentle': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '400ms',
        'page': '600ms',
      },
      spacing: {
        '18': '4.5rem',
        '76': '19rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}