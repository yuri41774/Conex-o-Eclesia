// firebaseClientInstance.js

// Importa as funções necessárias do Firebase SDK via CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
// Se for usar Firestore (base de dados em tempo real do Firebase), descomente:
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

// As suas credenciais de configuração do projeto Firebase.
// SUBSTITUA PELOS SEUS DADOS REAIS DO FIREBASE!
// Encontra-os em Project settings -> General -> Your apps -> Firebase SDK snippet -> Config
const firebaseConfig = {
  apiKey: "SUA_API_KEY_FIREBASE",
  authDomain: "SEU_AUTH_DOMAIN_FIREBASE",
  projectId: "SEU_PROJECT_ID_FIREBASE",
  storageBucket: "SEU_STORAGE_BUCKET_FIREBASE",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID_FIREBASE",
  appId: "SEU_APP_ID_FIREBASE"
};

// Inicializa a aplicação Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
// Se for usar Firestore, descomente:
// const firebaseDb = getFirestore(firebaseApp);

// Expõe as instâncias globalmente para que os outros scripts e componentes possam aceder a elas
if (typeof window !== 'undefined') {
  window.globalFirebaseApp = firebaseApp;
  window.globalFirebaseAuth = firebaseAuth;
  // Se for usar Firestore, descomente:
  // window.globalFirebaseDb = firebaseDb;
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
