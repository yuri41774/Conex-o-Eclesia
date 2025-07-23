// firebaseClientInstance.js

// Importa as funções necessárias do Firebase SDK
// Adicionado getAuth
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
// Se for usar Analytics, descomente e use a versão correta do SDK
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";

// As suas credenciais de configuração do projeto Firebase.
// SUBSTITUA PELOS SEUS DADOS REAIS DO FIREBASE!
// Encontra-os em Project settings -> General -> Your apps -> Firebase SDK snippet -> Config
const firebaseConfig = {
  apiKey: "AIzaSyBfFQ0wZIe1WY0Lw3L0Rlr97UrnnSydurM", // A SUA API KEY
  authDomain: "conexao-eclesiastica.firebaseapp.com", // O SEU AUTH DOMAIN
  projectId: "conexao-eclesiastica", // O SEU PROJECT ID
  storageBucket: "conexao-eclesiastica.firebasestorage.app", // O SEU STORAGE BUCKET
  messagingSenderId: "1009771043961", // O SEU MESSAGING SENDER ID
  appId: "1:1009771043961:web:6a8d829618f0b0f8a508a8", // O SEU APP ID
  measurementId: "G-W0701VYFK9" // O SEU MEASUREMENT ID (se usar Analytics)
};

// Inicializa a aplicação Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp); // <--- CORREÇÃO: Obter a instância de Auth
// Se for usar Analytics, descomente:
// const firebaseAnalytics = getAnalytics(firebaseApp);

// Expõe as instâncias globalmente para que os outros scripts e componentes possam aceder a elas
if (typeof window !== 'undefined') {
  window.globalFirebaseApp = firebaseApp;
  window.globalFirebaseAuth = firebaseAuth; // <--- CORREÇÃO: Expor a instância de Auth
  // Se for usar Analytics, descomente:
  // window.globalFirebaseAnalytics = firebaseAnalytics;
  console.log("[Firebase] Cliente inicializado globalmente.");
}

// Opcional: Listener para depuração do estado de autenticação do Firebase no console
// onAuthStateChanged(firebaseAuth, (user) => {
//   if (user) {
//     console.log("[Firebase Auth] Utilizador autenticado:", user.uid);
//   } else {
//     console.log("[Firebase Auth] Utilizador não autenticado.");
//   }
// });
