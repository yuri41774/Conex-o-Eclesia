// supabaseClientInstance.js

// Inicialização global do Supabase Client de forma robusta
if (typeof window !== 'undefined') {
  // Defina as variáveis do seu projeto Supabase
  const SUPABASE_URL = "https://rahhplphegvvdehrumyp.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_9nZIdJCVjWxq73FLJa8zQw_wRQzHNgS";

  // --- ADIÇÃO CRÍTICA AQUI ---
  // Torna as URLs acessíveis globalmente para que outros scripts possam usá-las
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
  // --- FIM DA ADIÇÃO CRÍTICA ---

  // Garante que o SDK do Supabase foi carregado
  if (window.supabase && !window.globalSupabaseClient) {
    window.globalSupabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("[Supabase] Cliente inicializado globalmente por supabaseClientInstance.js.");
  } else if (window.globalSupabaseClient) {
    console.log("[Supabase] Cliente já inicializado em outro contexto global.");
  } else {
    // Se o SDK ainda não carregou, tenta novamente após um pequeno atraso
    let tries = 0;
    const tryInit = () => {
      if (window.supabase && !window.globalSupabaseClient) {
        window.globalSupabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("[Supabase] Cliente inicializado globalmente por supabaseClientInstance.js (retry).");
      } else if (window.globalSupabaseClient) {
        console.log("[Supabase] Cliente já inicializado em outro contexto global.");
      } else if (tries < 10) { // Tenta por 10 * 50ms = 500ms
        tries++;
        setTimeout(tryInit, 50);
      } else {
        console.error("[Supabase] SDK (window.supabase) não disponível após múltiplas tentativas. Não foi possível inicializar o cliente.");
        // Opcional: Aqui você pode adicionar um alert ou displayMessage para o usuário
      }
    };
    tryInit();
  }
}
