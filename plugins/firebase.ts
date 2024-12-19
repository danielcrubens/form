// plugins/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin((nuxtApp) => {
  // Configuração do Firebase
  const firebaseConfig = {
    apiKey: useRuntimeConfig().public.firebaseApiKey,
    authDomain: useRuntimeConfig().public.firebaseAuthDomain,
    projectId: useRuntimeConfig().public.firebaseProjectId,
    // Adicione outras configurações conforme necessário
  }

  // Inicializa o Firebase apenas se nenhum app existir
  const firebaseApp = getApps().length === 0 
    ? initializeApp(firebaseConfig) 
    : getApp()

  // Inicializa o Firestore
  const firestore = getFirestore(firebaseApp)

  // Fornece o Firestore para uso em todo o aplicativo
  return {
    provide: {
      firestore
    }
  }
})