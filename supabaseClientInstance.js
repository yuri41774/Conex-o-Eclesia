// supabaseClientInstance.js

// Define as variáveis globais do Supabase.
// A inicialização do cliente será feita nos componentes React para garantir que window.supabase esteja disponível.
window.SUPABASE_URL = "https://rahhplphegvvdehrumyp.supabase.co"; 
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaGhwbHBoZWd2dmRlaHJ1bXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDk2NDMsImV4cCI6MjA2NjI4NTY0M30.EDM-RotlChTCWiisI4o5okQ6Llee1ZaQEAcLaphBqTs";

// A instância do cliente será armazenada aqui após a primeira inicialização no React.
// Ela é inicializada como 'null' para que possamos verificar se já foi definida.
window.globalSupabaseClient = null;

// Espera que o DOM esteja completamente carregado e que o SDK do Supabase (window.supabase) esteja disponível
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona um pequeno atraso para garantir que o SDK do Supabase (carregado via CDN) esteja totalmente pronto
    setTimeout(() => {
        if (!window.globalSupabaseClient && window.supabase) {
            window.globalSupabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
            console.log("Supabase client initialized globally.");
        } else if (window.globalSupabaseClient) {
            console.log("Supabase client already initialized.");
        } else {
            console.error("Supabase SDK (window.supabase) not available when trying to initialize client.");
        }
    }, 100); // Pequeno atraso de 100ms
});
