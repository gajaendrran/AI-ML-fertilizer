import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEv-uTerdFuFX9P5CZF6raA75XZe3G8XQ",
  authDomain: "user-datas-1cd2c.firebaseapp.com",
  projectId: "user-datas-1cd2c",
  storageBucket: "user-datas-1cd2c.firebasestorage.app",
  messagingSenderId: "556170712276",
  appId: "1:556170712276:web:9acd137afd87294d925741",
  measurementId: "G-2NNH1FN61L"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth();

export const db = getFirestore(app); 

const analytics = getAnalytics(app);