# Conexão Eclesia

## 📚 Descrição do Projeto
O "Conexão Eclesia" é uma aplicação web para fortalecer a comunidade eclesiástica, conectando membros, eventos e publicações em um ambiente digital seguro e moderno.

O projeto é um Progressive Web App (PWA), podendo ser instalado em smartphones e oferecendo experiência semelhante a um app nativo.

## ✨ Funcionalidades
- **Autenticação de Usuários**: Login, registro, logout, recuperação de senha.
- **Feed de Publicações**: Posts e anúncios dinâmicos, criação de publicações, integração com Supabase.
- **Barra Lateral de Navegação**: Links para perfil, igrejas, eventos, estudos, doações, chat e painel admin (se autorizado).
- **Modais de Mensagem**: Notificações amigáveis para sucesso, erro e informações.
- **Responsividade Mobile-First**: Layout 100% adaptável a qualquer dispositivo, com navegação, botões, formulários e modais otimizados para telas pequenas (mobile-first com Tailwind CSS).
- **PWA**: Instalável e com manifest.json configurado.
- **Integração Supabase**: Backend, autenticação, banco de dados, RLS.

## 🚀 Tecnologias Utilizadas
- **Frontend**: React (via CDN), Babel Standalone, Tailwind CSS (mobile-first)
- **Backend**: Supabase (Auth, PostgreSQL, Storage)

## 📁 Estrutura do Projeto
```
conexao-eclesia/
├── index.html                  # Login e Registro (responsivo)
├── conexao-eclesia-feed.html   # Feed de Publicações (responsivo)
├── admin.html                  # Painel de Administração (responsivo)
├── chat.html                   # Chat Global (responsivo)
├── estudos.html                # Estudos Bíblicos (responsivo)
├── eventos.html                # Eventos (responsivo)
├── doacoes.html                # Doações (responsivo)
├── igreja.html                 # Página de Igreja (responsivo)
├── perfil.html                 # Perfil do Usuário (responsivo)
├── manifest.json               # Manifesto PWA
├── supabaseClientInstance.js   # Inicialização do Supabase
├── icons/                      # Ícones PWA
└── ...
```

## ⚙️ Configuração e Instalação (Local)
1. Clone o repositório:
   ```sh
   git clone https://github.com/your-username/conexao-eclesia.git
   cd conexao-eclesia
   ```
2. Configure o Supabase:
   - Crie um projeto em https://supabase.com/
   - Copie a Project URL e Anon Key em Settings > API
   - Configure as variáveis em `supabaseClientInstance.js` ou via localStorage
3. Configure o banco de dados:
   - Execute o script SQL fornecido no README para criar as tabelas e políticas RLS
4. Adicione os ícones na pasta `icons/` conforme o manifest.json
5. Rode localmente:
   ```sh
   npm install -g http-server
   http-server
   ```
   Acesse http://localhost:8080

## ☁️ Deploy
- Recomenda-se deploy em Vercel, Netlify ou similar para HTTPS e PWA completo.

## 🤝 Contribuição
Contribuições são bem-vindas! Abra issues ou envie pull requests.

## 📄 Licença
MIT
