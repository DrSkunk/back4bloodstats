import admin from "firebase-admin";
import serviceAccount from "../../firebaseServiceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore = admin.firestore();
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;
