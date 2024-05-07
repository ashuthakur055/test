import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAChkQ59pnviDxsTgnKScMFF21OyQiRk7E',
  authDomain: 'kit4trader-d887c.firebaseapp.com',
  projectId: 'kit4trader-d887c',
  storageBucket: 'kit4trader-d887c.appspot.com',
  messagingSenderId: '445370580988',
  appId: '1:445370580988:web:9558553dbf2c18d1a1fc79',
  measurementId: 'G-W3CLV3GN4K',
};

//Initialize Firebase and get references to services
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, firestore, storage };
