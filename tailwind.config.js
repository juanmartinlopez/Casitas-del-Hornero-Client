/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Variables CSS personalizadas
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "important-color": "var(--important-color)",
        "text-color": "var(--text-color)",
        "secundary-text-color": "var(--secundary-text-color)",

        // Paleta de colores personalizada para la app de hoteles
        deep: {
          black: "#0E0E0E", // Negro profundo - Fondo principal oscuro
        },
        charcoal: {
          gray: "#1C1C1C", // Gris carbón - Secciones intermedias y contraste sutil
        },
        light: {
          gray: "#B4B4B4", // Gris claro - Texto secundario y descripciones
        },
        elegant: {
          gold: "#D4AF37", // Dorado elegante - Botones, íconos y detalles decorativos
          "gold-light": "#E6C76B", // Variación más clara del dorado
          "gold-dark": "#B8941F", // Variación más oscura del dorado
        },
        // Colores adicionales para mejor funcionalidad
        white: "#FFFFFF",
        black: "#000000",
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["Fira Code", "Consolas", "Monaco", "monospace"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        elegant:
          "0 10px 25px -3px rgba(212, 175, 55, 0.1), 0 4px 6px -2px rgba(212, 175, 55, 0.05)",
        dark: "0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        scale: "scale 0.2s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scale: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
  // Optimización para producción
  corePlugins: {
    preflight: false, // Desactiva el reset de Tailwind para evitar conflictos con Bootstrap
  },
};
