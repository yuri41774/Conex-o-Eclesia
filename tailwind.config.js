// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // O array 'content' diz ao Tailwind onde procurar as classes CSS que você usa.
  // Ele irá escanear estes ficheiros para construir o CSS final otimizado.
  content: [
    "./*.html",     // Procura classes Tailwind em ficheiros .html na pasta raiz (ex: index.html)
    "./*.js",       // Procura classes Tailwind em ficheiros .js na pasta raiz (se tiver classes em strings JS)
    "./**/*.html",  // Procura classes Tailwind em TODOS os ficheiros .html em qualquer subpasta (ex: perfil.html, estudos.html)
    // Se tiver ficheiros React (.jsx) ou TypeScript (.ts/.tsx) em pastas específicas, descomente e ajuste:
    // "./src/**/*.{js,jsx,ts,tsx}", // Exemplo para ficheiros em 'src'
  ],
  theme: {
    extend: {
      // Aqui pode estender o tema padrão do Tailwind (cores, fontes, etc.)
    },
  },
  plugins: [
    // Aqui pode adicionar plugins do Tailwind CSS, se precisar
  ],
}
