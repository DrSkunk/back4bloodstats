import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import config from "../../firebaseAppConfig.json";

// if (!firebase.apps || !firebase.apps.length) {
const firebase = initializeApp(config);
// }

export default firebase;
export const db = getFirestore(firebase);
