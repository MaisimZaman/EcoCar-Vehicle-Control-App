import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'


// Initialize Firebase
const firebaseConfig = {
   
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase()