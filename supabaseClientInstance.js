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
// A lógica de "retry" ou "espera" para 'window.globalSupabaseClient' deve estar no ficheiro que o consome.
if (typeof window !== 'undefined') {
  // Define as URLs globalmente para que o código que espera por elas possa encontrá-las
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

  try {
    // Tenta criar o cliente Supabase. 'createClient' já foi importado.
    // Não precisamos verificar 'window.supabase' aqui, pois 'createClient' é uma importação de módulo.
    if (!window.globalSupabaseClient) { // Apenas cria se ainda não foi criado
      window.globalSupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log("[Supabase] Cliente de dados inicializado globalmente.");
    } else {
      console.log("[Supabase] Cliente de dados já inicializado em outro contexto global.");
    }
  } catch (error) {
    console.error("[Supabase] Erro ao inicializar o cliente de dados:", error);
    // Poderia definir um estado de erro global aqui se necessário
  }
}
