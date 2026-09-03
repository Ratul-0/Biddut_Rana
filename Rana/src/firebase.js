import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCysmSh3NOy36GNWqqTDsymzuUP24PmizM",
  authDomain: "rana-server.firebaseapp.com",
  databaseURL: "https://rana-server-default-rtdb.firebaseio.com",
  projectId: "rana-server",
  storageBucket: "rana-server.firebasestorage.app",
  messagingSenderId: "7584963497",
  appId: "1:7584963497:web:7e3743fdca9f4b3cd742b8",
  measurementId: "G-RW2Z4M1QR9"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, onValue, set };