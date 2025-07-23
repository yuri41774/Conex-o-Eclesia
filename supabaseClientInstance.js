// supabaseClientInstance.js

// Importa a função createClient do Supabase SDK via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// As suas credenciais do Supabase.
// SUBSTITUA PELOS SEUS DADOS REAIS DO SUPABASE!
// Encontra-os em Project Settings > API
const SUPABASE_URL = "SUA_URL_DO_SUPABASE";
const SUPABASE_ANON_KEY = "SUA_CHAVE_ANON_DO_SUPABASE";

// Expõe as variáveis globalmente para que outros scripts possam aceder a elas
if (typeof window !== 'undefined') {
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

  // Inicializa a instância do cliente Supabase globalmente, se ainda não existir.
  // Importante: Não passamos um 'auth' client aqui, pois o Firebase gerirá a autenticação.
  if (window.supabase && !window.globalSupabaseClient) {
    window.globalSupabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("[Supabase] Cliente de dados inicializado globalmente.");
  } else if (window.globalSupabaseClient) {
    console.log("[Supabase] Cliente de dados já inicializado em outro contexto global.");
  } else {
    // Fallback para esperar o SDK carregar, se necessário
    let tries = 0;
    const tryInit = () => {
      if (window.supabase && !window.globalSupabaseClient) {
        window.globalSupabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("[Supabase] Cliente de dados inicializado globalmente (retry).");
      } else if (window.globalSupabaseClient) {
        console.log("[Supabase] Cliente de dados já inicializado em outro contexto global.");
      } else if (tries < 10) { // Tenta por 10 * 50ms = 500ms
        tries++;
        setTimeout(tryInit, 50);
      } else {
        console.error("[Supabase] SDK (window.supabase) não disponível após múltiplas tentativas. Não foi possível inicializar o cliente de dados.");
      }
    };
    tryInit();
  }
}
