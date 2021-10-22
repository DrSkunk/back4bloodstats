import admin from "firebase-admin";
import serviceAccount from "../../firebaseServiceAccountKey.json";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firestore = admin.firestore();
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;
