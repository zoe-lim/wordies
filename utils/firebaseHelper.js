import { getApp, getApps, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

let firebaseApp;

export const getFirebaseApp = () => {
    if (firebaseApp) {
        return firebaseApp
    }

    const firebaseConfig = {
        apiKey: "AIzaSyDQOv7KOSSBYWCCzWdq5WANJHwNQqNGhuI",
        authDomain: "wordies-dc05a.firebaseapp.com",
        databaseURL: "https://wordies-dc05a-default-rtdb.firebaseio.com",
        projectId: "wordies-dc05a",
        storageBucket: "wordies-dc05a.appspot.com",
        messagingSenderId: "275085939350",
        appId: "1:275085939350:web:1e6b15c03cae086135e8b7",
        measurementId: "G-G13ZWBPBQK"
    };

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    })

    firebaseApp = app;

    return app;
}

