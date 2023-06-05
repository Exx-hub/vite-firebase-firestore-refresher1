import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApsvh_45FDqdVvhTTPkO_JKAlzbGhVidk",
  authDomain: "fir-1-fc9ad.firebaseapp.com",
  projectId: "fir-1-fc9ad",
  storageBucket: "fir-1-fc9ad.appspot.com",
  messagingSenderId: "872363203642",
  appId: "1:872363203642:web:796b38e28b7e0719aa2903",
  measurementId: "G-P48T1HM40G",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
