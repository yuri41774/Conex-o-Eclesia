Conexão Eclesia
📚 Descrição do Projeto
O "Conexão Eclesia" é uma aplicação web desenvolvida para fortalecer a comunidade eclesiástica. Ela oferece um ponto central para membros de igrejas se conectarem, acompanharem eventos, compartilharem publicações (posts e anúncios) e se registrarem, criando um ambiente digital que fomenta a comunicação e o engajamento.

O projeto é construído como um Progressive Web App (PWA), permitindo que seja instalado na tela inicial de smartphones, proporcionando uma experiência de usuário semelhante a um aplicativo nativo.

✨ Funcionalidades
Autenticação de Usuários:

Login: Permite que usuários existentes acessem a plataforma.

Registro: Permite que novos membros criem suas contas com informações detalhadas (nome completo, data de nascimento, telefone, cargo/função na igreja, nome da igreja/comunidade).

Redirecionamento: Após o login, o usuário é redirecionado para o feed principal.

Logout: Botão para sair da sessão e retornar à tela de login.

Feed de Publicações:

Exibe um feed centralizado com "Posts e Anúncios" da comunidade.

Permite a criação de novas publicações através de um modal.

Carrega publicações dinamicamente do Supabase, incluindo informações do autor (profiles).

Barra Lateral de Navegação (Sidebar):

Design responsivo para mobile e desktop.

Links para "Meu Perfil", "Igrejas", "Eventos", "Estudo Bíblico", "Ação Social", "Noite de Louvor" (botões de navegação/filtro).

Botão "Criar Publicação" que abre um modal.

Botão "Sair" para encerrar a sessão.

Modais de Mensagem: Notificações amigáveis para sucesso, erro e outras informações, substituindo alert() tradicionais.

Responsividade: Layout adaptável a diferentes tamanhos de tela e dispositivos (smartphones, tablets, desktops) utilizando Tailwind CSS.

Progressive Web App (PWA): Configurado para ser instalável na tela inicial de dispositivos móveis.

Integração com Supabase: Utiliza o Supabase como backend-as-a-service para:

Autenticação (login e registro de usuários).

Armazenamento de dados (perfis, posts, etc.).

Row Level Security (RLS) para controle de acesso aos dados.

🚀 Tecnologias Utilizadas
Frontend:

React (via CDN para simplicidade em arquivo único HTML)

Babel Standalone (para transpilação de JSX no navegador)

Tailwind CSS (via CDN para estilização)

Backend & Banco de Dados:

Supabase (Autenticação, PostgreSQL Database, RLS)

📁 Estrutura do Projeto
O projeto é dividido em dois arquivos HTML principais para simular a navegação entre páginas, além de assets para PWA:

conexao-eclesia/
├── index.html                  # Página de Login e Registro (Ponto de entrada do PWA)
├── conexao-eclesia-feed.html   # Página do Feed de Publicações
├── manifest.json               # Manifesto do Progressive Web App (PWA)
└── icons/                      # Diretório para ícones do PWA
    ├── logo-192x192.png        # Ícone PWA (192x192 pixels)
    └── logo-512x512.png        # Ícone PWA (512x512 pixels)
    └── ...                     # Outros tamanhos de ícone (ex: 72x72, 96x96, 128x128, 144x144, 152x152, 384x384)

⚙️ Configuração e Instalação (Local)
Para rodar este projeto localmente, siga os passos abaixo:

1. Clonar o Repositório (Exemplo)
git clone https://github.com/your-username/conexao-eclesia.git # Altere para o seu repositório
cd conexao-eclesia

2. Configurar o Supabase
Se você ainda não tem um projeto Supabase, crie um em https://supabase.com/.

a. Obter Credenciais do Supabase
No seu Dashboard Supabase:

Vá em Settings > API.

Copie sua Project URL (ex: https://your-project-ref.supabase.co).

Copie sua Anon Key (chave pública, ex: eyJhbGci...).

b. Configurar o Banco de Dados (PostgreSQL)
Execute o seguinte script SQL no SQL Editor do seu Dashboard Supabase para criar as tabelas e configurar as políticas de Row Level Security (RLS).

ATENÇÃO: Este script DROP TABLE primeiro, o que significa que ele APAGARÁ TODOS OS DADOS das tabelas existentes (profiles, churches, memberships, events, posts) e do tipo member_role. Use com cautela!

-- ATENÇÃO: ESTE SCRIPT IRÁ APAGAR TODOS OS DATOS DAS TABELAS ABAIXO!
-- USE COM EXTREMA CAUTELA EM AMBIENTES DE PRODUÇÃO.

-- Exclui tabelas em ordem de dependência reversa para evitar erros de chave estrangeira
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.memberships CASCADE;
DROP TABLE IF EXISTS public.churches CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Exclui o tipo ENUM 'member_role' se existir
DROP TYPE IF EXISTS public.member_role;

-- Habilita a extensão uuid-ossp para gerar UUIDs para IDs (se ainda não estiver habilitado)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabela 'profiles'
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone_number TEXT,
  date_of_birth DATE,
  role_in_church TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile." ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can create their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Tabela 'churches'
CREATE TABLE public.churches (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
ALTER TABLE public.churches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view churches." ON public.churches FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create churches." ON public.churches FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Owners can update their church." ON public.churches FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can delete their church." ON public.churches FOR DELETE USING (auth.uid() = owner_id);

-- 3. Tabela 'memberships'
CREATE TYPE member_role AS ENUM ('member', 'pastor', 'leader', 'admin');
CREATE TABLE public.memberships (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  church_id uuid REFERENCES public.churches(id) ON DELETE CASCADE NOT NULL,
  role member_role DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (profile_id, church_id)
);
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view memberships of churches they belong to." ON public.memberships FOR SELECT USING (
    profile_id = auth.uid() OR church_id IN (SELECT church_id FROM public.memberships WHERE profile_id = auth.uid())
);
CREATE POLICY "Users can create their own membership." ON public.memberships FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Church owner or member can update membership role." ON public.memberships FOR UPDATE USING (
    auth.uid() = profile_id OR church_id IN (SELECT id FROM public.churches WHERE owner_id = auth.uid())
);
CREATE POLICY "Church owner can delete memberships." ON public.memberships FOR DELETE USING (church_id IN (SELECT id FROM public.churches WHERE owner_id = auth.uid()));

-- 4. Tabela 'events'
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  church_id uuid REFERENCES public.churches(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_time TIME,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view events." ON public.events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events." ON public.events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Creator or church owner can manage events." ON public.events FOR UPDATE USING (auth.uid() = created_by OR church_id IN (SELECT id FROM public.churches WHERE owner_id = auth.uid()));
CREATE POLICY "Creator or church owner can delete events." ON public.events FOR DELETE USING (auth.uid() = created_by OR church_id IN (SELECT id FROM public.churches WHERE owner_id = auth.uid()));

-- 5. Tabela 'posts'
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  church_id uuid REFERENCES public.churches(id) ON DELETE CASCADE,
  is_published BOOLEAN DEFAULT TRUE NOT NULL,
  image_url TEXT
);
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view published posts." ON public.posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Authenticated users can create posts." ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Author or church owner can update their posts." ON public.posts FOR UPDATE USING (
    auth.uid() = author_id OR (church_id IS NOT NULL AND church_id IN (SELECT id FROM public.churches WHERE owner_id = auth.uid()))
);
CREATE POLICY "Author or church owner can delete their posts." ON public.posts FOR DELETE USING (
    auth.uid() = author_id OR (church_id IS NOT NULL AND church_id IN (SELECT id FROM public.churches WHERE owner_id = auth.uid()))
);

-- Adiciona índices para melhorar o desempenho das consultas comuns
CREATE INDEX IF NOT EXISTS profiles_phone_number_idx ON public.profiles (phone_number);
CREATE INDEX IF NOT EXISTS churches_name_idx ON public.churches (name);
CREATE INDEX IF NOT EXISTS memberships_profile_id_idx ON public.memberships (profile_id);
CREATE INDEX IF NOT EXISTS memberships_church_id_idx ON public.memberships (church_id);
CREATE INDEX IF NOT EXISTS events_church_id_idx ON public.events (church_id);
CREATE INDEX IF NOT EXISTS events_event_date_idx ON public.events (event_date);
CREATE INDEX IF NOT EXISTS posts_author_id_idx ON public.posts (author_id);
CREATE INDEX IF NOT EXISTS posts_church_id_idx ON public.posts (church_id);
CREATE INDEX IF NOT EXISTS posts_is_published_idx ON public.posts (is_published);

c. Configurar Variáveis de Ambiente no Código
Abra os arquivos index.html e conexao-eclesia-feed.html e substitua os placeholders pelas suas credenciais do Supabase:

index.html (e conexao-eclesia-feed.html):

const SUPABASE_URL = "https://rahhplphegvvdehrumyp.supabase.co"; // SUBSTITUA PELA SUA URL REAL DO PROJETO SUPABASE
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaGhwbHBoZWd2dmRlaHJ1bXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDk2NDMsImV4cCI6MjA2NjI4NTY0M30.EDM-RotlChTCWiisI4o5okQ6Llee1ZaQEAcLaphBqTs"; // Sua chave anon

d. Criar Usuário de Teste e Perfil (Opcional)
Para testar o login, você pode registrar um usuário através do seu formulário de registro, ou criar um manualmente no dashboard do Supabase (Authentication > Users). Depois, use o UID desse usuário para criar um perfil de teste, executando este script no SQL Editor:

INSERT INTO public.profiles (id, full_name, phone_number, date_of_birth, role_in_church, avatar_url)
VALUES (
  'SEU_UUID_DO_USUARIO_AUTENTICADO', -- SUBSTITUA PELO UUID REAL DO USUÁRIO
  'Usuário Teste App',
  '5511999998888',
  '1990-01-15',
  'Membro',
  'https://placehold.co/150x150/cccccc/ffffff?text=UT'
);

3. Progressive Web App (PWA) Setup
Para que seu app seja instalável, crie um arquivo manifest.json na raiz do seu projeto (conexao-eclesia/manifest.json) e uma pasta icons com as imagens.

manifest.json
{
  "name": "Conexão Eclesia",
  "short_name": "Eclesia",
  "description": "Conectando a comunidade eclesiástica. Acompanhe eventos, posts e se conecte com outros membros.",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icons/logo-192x192.png",  <!-- NOME DO SEU ARQUIVO DE LOGO -->
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/logo-512x512.png",  <!-- NOME DO SEU ARQUIVO DE LOGO -->
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/logo-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/logo-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/logo-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/logo-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/logo-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/logo-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    }
  ]
}

Ícones
Crie uma pasta icons na raiz do seu projeto e adicione versões da sua imagem logo nos diferentes tamanhos especificados acima (ex: logo-192x192.png, logo-512x512.png, etc.). Certifique-se de que os nomes dos arquivos correspondem aos listados no manifest.json. 



uxwing.com
▶️ Como Rodar o Projeto Localmente
Como o projeto é composto por arquivos HTML estáticos com React via CDN e Babel, você pode simplesmente abri-los em um navegador. No entanto, para que o PWA e as chamadas de API funcionem corretamente (especialmente CORS), é recomendável usar um servidor web local simples.

Instale um servidor HTTP simples (se não tiver):

npm install -g http-server

Navegue até a pasta raiz do seu projeto no terminal:

cd conexao-eclesia

Inicie o servidor:

http-server

Isso iniciará um servidor em http://localhost:8080 (ou outra porta). Abra essa URL no seu navegador.

Para PWA e HTTPS (Recomendado): Para testar a funcionalidade de PWA completamente (o prompt de instalação), você precisará servir o app via HTTPS. Uma forma simples é usar o Vercel CLI localmente com um túnel, ou fazer o deploy em um serviço como o próprio Vercel.

☁️ Como Fazer o Deploy (Ex: Vercel)
Instale a Vercel CLI (se ainda não tiver):

npm install -g vercel

Faça login na Vercel:

vercel login

Siga as instruções para autenticar sua conta.

Navegue até a pasta raiz do seu projeto no terminal:

cd conexao-eclesia

Implante seu projeto:

vercel

A Vercel detectará que é um projeto estático e fará o deploy. Siga as instruções no terminal. Após o deploy, a Vercel fornecerá uma URL HTTPS onde seu aplicativo estará disponível.

🤝 Contribuição
Sinta-se à vontade para contribuir com este projeto! Abra issues para bugs ou sugestões, e envie pull requests com melhorias.

📄 Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes. 
