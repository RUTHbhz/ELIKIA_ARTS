import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyClBW1T56WJ_V3jNmbUSKqiKnN4r7mnLUA",
  authDomain: "elikia-34517.firebaseapp.com",
  projectId: "elikia-34517",
  storageBucket: "elikia-34517.firebasestorage.app",
  messagingSenderId: "519930644493",
  appId: "1:519930644493:web:36f9a019f9b615c928ad44",
  measurementId: "G-5B4BPYF3CB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
