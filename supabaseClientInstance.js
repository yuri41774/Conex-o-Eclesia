// supabaseClientInstance.js

// Importa a função createClient do Supabase SDK via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// As suas credenciais do Supabase.
// SUBSTITUA PELOS SEUS DADOS REAIS DO SUPABASE!
// Encontra-os em Project Settings > API
const SUPABASE_URL = "https://rahhplphegvvdehrumyp.supabase.co"; // A SUA URL DO PROJETO SUPABASE
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaGhwbHBoZWd2dmRlaHJ1bXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDk2NDMsImV4cCI6MjA2NjI4NTY0M30.EDM-RotlChTCWiisI4o5okQ6Llee1ZaQEAcLaphBqTs"; // A SUA CHAVE ANÓNIMA PÚBLICA DO SUPABASE

// Expõe a instância do cliente Supabase globalmente.
// Este ficheiro é um módulo, por isso o código é executado uma vez.
if (typeof window !== 'undefined') {
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

  // Cria uma promessa global que resolve quando o cliente Supabase está pronto.
  // O componente App pode então esperar por esta promessa.
  window.supabaseClientReadyPromise = new Promise((resolve, reject) => {
    try {
      if (!window.globalSupabaseClient) {
        // Inicializa o cliente Supabase com a URL e a chave.
        // Por padrão, o cliente já vem com os módulos de base de dados e autenticação.
        const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.globalSupabaseClient = supabaseClient;
        
        // Expõe a instância auth do Supabase para fácil acesso (opcional, mas útil para depuração)
        window.globalSupabaseAuth = supabaseClient.auth; 

        console.log("[Supabase] Cliente inicializado globalmente com autenticação e base de dados.");
        resolve(window.globalSupabaseClient); // Resolve a promessa com a instância do cliente
      } else {
        console.log("[Supabase] Cliente já inicializado em outro contexto global.");
        resolve(window.globalSupabaseClient); // Resolve a promessa se já existir
      }
    } catch (error) {
      console.error("[Supabase] Erro ao inicializar o cliente Supabase:", error);
      reject(error); // Rejeita a promessa em caso de erro
    }
  });
}
