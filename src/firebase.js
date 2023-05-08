
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD3vfFfPeZq1r2gZ4Dzsakz7jywT021Hek",
    authDomain: "react-portfolio-anurag.firebaseapp.com",
    projectId: "react-portfolio-anurag",
    storageBucket: "react-portfolio-anurag.appspot.com",
    messagingSenderId: "491244117811",
    appId: "1:491244117811:web:b7ba2f612dbe606db5a846"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore()