// supabaseClientInstance.js

// Verifica se a instância do Supabase já existe no objeto global window.
// Se não existir, ela é criada e armazenada para ser reutilizada.
if (!window.supabaseClientInstance) {
    // VARIÁVEIS SUPABASE - SUBSTITUA PELOS SEUS VALORES REAIS!
    // Obtenha a URL do seu projeto Supabase no Dashboard > Settings > API
    const SUPABASE_URL = "https://rahhplphegvvdehrumyp.supabase.co"; 
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaGhwbHBoZWd2dmRlaHJ1bXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDk2NDMsImV4cCI6MjA2NjI4NTY0M30.EDM-RotlChTCWiisI4o5okQ6Llee1ZaQEAcLaphBqTs";

    // Inicializa o cliente Supabase e armazena-o globalmente
    // Certifique-se de que o SDK do Supabase já foi carregado via CDN antes deste script.
    window.supabaseClientInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Para facilitar o acesso em outros scripts, você pode atribuí-lo a uma constante local
// const supabase = window.supabaseClientInstance;
// No entanto, é mais limpo passar 'supabase' como prop para os componentes React
// ou acessá-lo diretamente via window.supabaseClientInstance
