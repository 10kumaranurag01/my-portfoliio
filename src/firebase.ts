import { initializeApp } from "firebase/app";
// Firestore *Lite*: this app makes exactly one write (Contact.tsx addDoc) and
// never reads, listens, or persists offline. The full SDK ships the realtime
// WebChannel transport and the offline cache for nothing; Lite is a REST client
// with the same addDoc/collection API. Swapping saved ~222 kB of the JS bundle
// on the firebase v12 bump. Restoring the full client means restoring that
// cost, so only do it if a real listener or offline requirement appears.
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyD3vfFfPeZq1r2gZ4Dzsakz7jywT021Hek",
  authDomain: "react-portfolio-anurag.firebaseapp.com",
  projectId: "react-portfolio-anurag",
  storageBucket: "react-portfolio-anurag.appspot.com",
  messagingSenderId: "491244117811",
  appId: "1:491244117811:web:b7ba2f612dbe606db5a846",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
