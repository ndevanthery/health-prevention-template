import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "grp1-health-prevention",
  // Other configuration options, such as the Realtime Database / Firestore details...
};

export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
