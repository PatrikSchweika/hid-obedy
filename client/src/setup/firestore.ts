import { initializeApp } from 'firebase/app'
import { APP_CONFIG } from './app-config.ts'
import { getFirestore } from 'firebase/firestore'

const firebaseApp = initializeApp(APP_CONFIG.firebase)

export const FIREBASE_DB = getFirestore(firebaseApp)
