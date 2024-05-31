import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGZ5Ip-CZfhvdSeuIB-TcZLsl4-Oy-ZQc",
  authDomain: "disneyclone-7010c.firebaseapp.com",
  projectId: "disneyclone-7010c",
  storageBucket: "disneyclone-7010c.appspot.com",
  messagingSenderId: "256515609845",
  appId: "1:256515609845:web:cfff00aeaec94b7471e1bc"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, provider, db, storage };
export default db;
