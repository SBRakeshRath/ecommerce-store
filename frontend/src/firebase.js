// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgbIkmdmH8rlnoZbLoY_N5fiuH5yEtgdk",
  authDomain: "e-commerse-store.firebaseapp.com",
  projectId: "e-commerse-store",
  storageBucket: "e-commerse-store.appspot.com",
  messagingSenderId: "896874326667",
  appId: "1:896874326667:web:c9a329659cc3b07e7c828e",
  measurementId: "G-NS3TW5DRH5",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
setPersistence(auth, browserLocalPersistence);

const analytics = getAnalytics(app);

export default app;
export { auth, analytics };
