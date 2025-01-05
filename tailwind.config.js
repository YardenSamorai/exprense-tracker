module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "#111827", // Dark gray, or replace with your desired color
        background: "#ffffff", // Background white
        "muted-foreground": "#6b7280", // Muted gray for text
        accent: "#3b82f6", // Accent color (blue, as an example)
        ring: "#93c5fd", // Ring focus color
        border: "#e5e7eb", // Light gray for borders
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Include if you're using animations
  ],
};
