// supabaseClientInstance.js

// Define as variáveis globais do Supabase.
// A inicialização do cliente será feita nos componentes React para garantir que window.supabase esteja disponível.
window.SUPABASE_URL = "https://rahhplphegvvdehrumyp.supabase.co"; 
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaGhwbHBoZWd2dmRlaHJ1bXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDk2NDMsImV4cCI6MjA2NjI4NTY0M30.EDM-RotlChTCWiisI4o5okQ6Llee1ZaQEAcLaphBqTs";

// A instância do cliente será armazenada aqui após a primeira inicialização no React.
// Ela é inicializada como 'null' para que possamos verificar se já foi definida.
window.globalSupabaseClient = null;
