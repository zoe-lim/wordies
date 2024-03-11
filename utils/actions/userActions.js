import { child, getDatabase, get, ref } from "firebase/database";
import { getFirebaseApp } from "../firebaseHelper";


//retrieve user info based on userid & password
export const getUserData = async (userId) => {
    try{
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase(app));

        const userRef = child(dbRef, `users/${userId}`);

        const snapshot = await get(userRef);

        return snapshot.val()
    }catch(err){
        console.error(err)
    }
}