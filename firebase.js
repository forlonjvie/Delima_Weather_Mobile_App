import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA58eYFde53BL8XbXf2T8sx1S3PkksCbUk",
  authDomain: "delimaform.firebaseapp.com",
  projectId: "delimaform",
  storageBucket: "delimaform.appspot.com",
  messagingSenderId: "1081824813336",
  appId: "1:1081824813336:web:beccee9ba2c77de602fe6d",
  measurementId: "G-TCF0ES5ZKC"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
