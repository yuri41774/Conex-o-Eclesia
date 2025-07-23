// supabaseClientInstance.js

// Importa a função createClient do Supabase SDK via CDN.
// Esta importação torna 'createClient' diretamente disponível neste âmbito.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// As suas credenciais do Supabase.
// SUBSTITUA PELOS SEUS DADOS REAIS DO SUPABASE!
// Encontra-os em Project Settings > API
const SUPABASE_URL = "https://rahhplphegvvdehrumyp.supabase.co"; // A SUA URL DO PROJETO SUPABASE
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhaGhwbHBoZWd2dmRlaHJ1bXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDk2NDMsImV4cCI6MjA2NjI4NTY0M30.EDM-RotlChTCWiisI4o5okQ6Llee1ZaQEAcLaphBqTs"; // A SUA CHAVE ANÓNIMA PÚBLICA DO SUPABASE

// Expõe a instância do cliente Supabase globalmente.
// Este ficheiro é um módulo, por isso o código é executado uma vez.
if (typeof window !== 'undefined') {
  // Define as URLs globalmente para que o código que espera por elas possa encontrá-las
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

  // Cria uma promessa global que resolve quando o cliente Supabase está pronto.
  // O componente App pode então esperar por esta promessa.
  window.supabaseClientReadyPromise = new Promise((resolve, reject) => {
    try {
      if (!window.globalSupabaseClient) { // Apenas cria se ainda não foi criado
        window.globalSupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("[Supabase] Cliente de dados inicializado globalmente.");
        resolve(window.globalSupabaseClient); // Resolve a promessa com a instância do cliente
      } else {
        console.log("[Supabase] Cliente de dados já inicializado em outro contexto global.");
        resolve(window.globalSupabaseClient); // Resolve a promessa se já existir
      }
    } catch (error) {
      console.error("[Supabase] Erro ao inicializar o cliente de dados:", error);
      reject(error); // Rejeita a promessa em caso de erro
    }
  });
}
