import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIyI0qqtSsGQoBUaNGl5Nj3k1Lea_NhfY",
  authDomain: "smart-home-f7911.firebaseapp.com",
  projectId: "smart-home-f7911",
  storageBucket: "smart-home-f7911.appspot.com",
  messagingSenderId: "456029282701",
  appId: "1:456029282701:web:49ab37e9749298e9355dc4",
  measurementId: "G-4KF68SQNXR",
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db };
