// supabaseClientInstance.js

// Define as variáveis globais do Supabase.
// Utilize a 'Publishable Key' diretamente do seu painel Supabase para maior clareza.
// Estes são os valores que você me forneceu:
window.SUPABASE_URL = "https://rahhplphegvvdehrumyp.supabase.co"; 
window.SUPABASE_ANON_KEY = "sb_publishable_9nZIdJCVjWxq73FLJa8zQw_wRQzHNgS"; 

// A instância do cliente será armazenada aqui após a primeira inicialização.
window.globalSupabaseClient = null;

// Espera que o DOM esteja completamente carregado para garantir que 'window.supabase' exista.
// Este evento é disparado ANTES dos scripts React/Babel começarem a ser processados,
// garantindo que a instância esteja disponível para eles.
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona um pequeno atraso (para ter certeza que o CDN do Supabase JS carregou)
    // embora o ideal seja que o <script> da CDN esteja antes deste arquivo no HTML.
    setTimeout(() => { 
        if (!window.globalSupabaseClient && window.supabase) {
            window.globalSupabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
            console.log("Supabase client initialized globally by supabaseClientInstance.js.");
        } else if (window.globalSupabaseClient) {
            // Este caso significa que a inicialização pode ter ocorrido em outro lugar (ex: dentro de um App component mais cedo, antes deste script ser completamente avaliado).
            // Manter o console.log para depuração.
            console.log("Supabase client already initialized from a global context.");
        } else {
            // Este erro crítico indica que o SDK do Supabase (supabase-js@2) não carregou a tempo.
            console.error("Supabase SDK (window.supabase) not available. Cannot initialize client.");
        }
    }, 50); // Reduzido o atraso para 50ms, pois o script do SDK deve carregar antes.
});
