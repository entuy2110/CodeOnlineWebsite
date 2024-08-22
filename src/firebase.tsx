import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore"; 

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB7HAnr-7v1D9giLD8JYTYGYQs-fFasGiI",
  authDomain: "chat-firebase-d8938.firebaseapp.com",
  projectId: "chat-firebase-d8938",
  storageBucket: "chat-firebase-d8938.appspot.com",
  messagingSenderId: "407071322588",
  appId: "1:407071322588:web:5bde820dc63f5b4e32df19",
  measurementId: "G-DQMX3Y2C4V"
})
// export const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyDAZz4P0aP9NwitzL61Tmxotmx3nAkNRtw",
//   authDomain: "chat-6e69a.firebaseapp.com",
//   projectId: "chat-6e69a",
//   storageBucket: "chat-6e69a.appspot.com",
//   messagingSenderId: "561164232740",
//   appId: "1:561164232740:web:a4749bfe83d67d249e90b1",
//   measurementId: "G-KLX108KD5G"
// })

// export const firestore = firebaseApp.firestore();
export const firestore = getFirestore(firebaseApp);
