<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conexão Eclesia - Dashboard</title>
    <!-- Incluindo Tailwind CSS para estilização (via CDN) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Incluindo a fonte Inter do Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #a7b7eb 0%, #b3c2f0 100%); /* Fundo suave */
            margin: 0; /* Remover margem padrão do body */
            padding-top: 80px; /* Espaço para o cabeçalho fixo (altura do cabeçalho + padding) */
            min-height: 100vh;
        }
        #main-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            z-index: 1000; /* Garante que o cabeçalho esteja sempre no topo */
            padding: 1rem 2rem; /* Padding interno */
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap; /* Permite que os itens quebrem a linha em telas pequenas */
            gap: 1rem; /* Espaçamento entre os itens */
        }
        .user-info-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .user-avatar-header {
            width: 40px;
            height: 40px;
            border-radius: 9999px; /* full rounded */
            object-fit: cover;
            border: 2px solid #60a5fa; /* blue-300 */
        }
        .card {
            background-color: white;
            border-radius: 1.25rem; /* rounded-2xl */
            box-shadow: 0 4px 24px 0 rgba(0,0,0,0.1), 0 1.5px 4px 0 rgba(0,0,0,0.04); /* modern-shadow */
            padding: 2rem;
            text-align: center;
            max-width: 500px;
            width: 90%;
            margin: 2rem auto; /* Centraliza o card principal abaixo do cabeçalho */
        }
        .btn-primary {
            background-color: #2563eb; /* blue-600 */
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem; /* rounded-lg */
            font-weight: 700;
            transition: background-color 0.2s ease-in-out;
        }
        .btn-primary:hover {
            background-color: #1d4ed8; /* blue-700 */
        }
        .btn-danger {
            background-color: #dc2626; /* red-600 */
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 700;
            transition: background-color 0.2s ease-in-out;
        }
        .btn-danger:hover {
            background-color: #b91c1c; /* red-700 */
        }
    </style>
</head>
<body>
    <!-- Cabeçalho Fixo (Inicialmente oculto ou com conteúdo de carregamento) -->
    <header id="main-header" style="display: none;">
        <div class="user-info-header">
            <img id="header-avatar" src="https://ui-avatars.com/api/?name=User" alt="Avatar do utilizador" class="user-avatar-header">
            <div>
                <span id="header-username" class="font-bold text-gray-800 text-lg">Carregando...</span>
                <p id="header-email" class="text-gray-600 text-sm"></p>
            </div>
        </div>
        <button id="logout-btn" class="btn-danger">Terminar Sessão</button>
    </header>

    <!-- Container principal da aplicação (para a tela de carregamento ou conteúdo do dashboard) -->
    <div id="app-container" class="card">
        <h1 class="text-3xl font-bold text-gray-800 mb-4 animate-pulse">Carregando...</h1>
        <p class="text-gray-600">Verificando sua sessão com o Supabase.</p>
    </div>

    <!-- Conteúdo principal do Dashboard (será preenchido após o carregamento) -->
    <div id="main-dashboard-content" class="card" style="display: none;">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Seu Dashboard</h2>
        <p class="text-gray-700 mb-4">Bem-vindo de volta! Explore as funcionalidades da Conexão Eclesia.</p>
        <a href="conexao-eclesia-feed.html" class="block w-full btn-primary">Ir para o Feed de Publicações</a>
    </div>

    <!-- Importa o SDK do Supabase Client (para base de dados e autenticação) -->
    <script type="module" src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"></script>
    <!-- Carrega o script de inicialização do Supabase. ESSENCIAL! -->
    <script type="module" src="supabaseClientInstance.js"></script>

    <script type="module">
        // Referências aos elementos do DOM
        const appContainer = document.getElementById('app-container');
        const mainHeader = document.getElementById('main-header');
        const headerAvatar = document.getElementById('header-avatar');
        const headerUsername = document.getElementById('header-username');
        const headerEmail = document.getElementById('header-email');
        const logoutBtn = document.getElementById('logout-btn');
        const mainDashboardContent = document.getElementById('main-dashboard-content');

        function showToast(message, duration = 4000) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), duration);
        }

        async function initApp() {
            let supabase;

            try {
                supabase = await window.supabaseClientReadyPromise;
                console.log("[App] Cliente Supabase obtido.");
            } catch (err) {
                console.error("Erro ao inicializar Supabase:", err);
                appContainer.innerHTML = `<h1 class="text-red-600 text-2xl font-bold mb-2">Erro crítico!</h1><p>${err.message}</p>`;
                return;
            }

            // Listener de estado de autenticação do Supabase
            // CORRIGIDO: Chamar supabase.auth.onAuthStateChanged diretamente
            supabase.auth.onAuthStateChanged(async (event, session) => {
                const user = session?.user || null;

                if (user) {
                    try {
                        const { data: profile, error } = await supabase
                            .from('profiles')
                            .select('*')
                            .eq('id', user.id)
                            .single();

                        if (error && error.code !== 'PGRST116') {
                            showToast("Erro ao carregar o perfil.");
                            renderDashboard(user, null, supabase);
                        } else if (!profile) {
                            showToast("Perfil incompleto. Redirecionando...");
                            setTimeout(() => {
                                window.location.href = 'complete_profile.html';
                            }, 2000);
                        } else {
                            renderDashboard(user, profile, supabase);
                        }
                    } catch (err) {
                        showToast("Erro inesperado ao acessar o perfil.");
                        renderDashboard(user, null, supabase);
                    }
                } else {
                    window.location.href = 'auth.html';
                }
            });
        }

        function renderDashboard(user, profile, supabaseClient) {
            const name = profile?.full_name || user.email.split('@')[0];
            const email = user.email;
            const avatarUrl = profile?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

            appContainer.style.display = 'none';
            mainHeader.style.display = 'flex';
            mainDashboardContent.style.display = 'block';

            headerAvatar.src = avatarUrl;
            headerAvatar.alt = `Avatar de ${name}`;
            headerUsername.textContent = name;
            headerEmail.textContent = email;

            logoutBtn.onclick = async () => {
                try {
                    await supabaseClient.auth.signOut();
                    showToast("Sessão encerrada.");
                } catch (err) {
                    showToast("Erro ao encerrar sessão.");
                }
            };
        }

        document.addEventListener('DOMContentLoaded', initApp);
    </script>
</body>
</html>
