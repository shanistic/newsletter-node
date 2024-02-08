import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3hgxTWT4cFTzY9qW609u0KLko6Hpy60Q",
  authDomain: "newsletter-signup-node.firebaseapp.com",
  projectId: "newsletter-signup-node",
  storageBucket: "newsletter-signup-node.appspot.com",
  messagingSenderId: "725188383391",
  appId: "1:725188383391:web:08d2ed47d3387c3f0488aa",
  measurementId: "G-6VPYEPLB1E"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);