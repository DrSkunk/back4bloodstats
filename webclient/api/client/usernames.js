import { db } from "./firebase";
// import { query, orderBy, limit, collection } from "firebase/firestore";
import {
  query,
  orderBy,
  limit,
  collection,
  onSnapshot,
} from "firebase/firestore";

// export const usernamesRef = db.collection("usernames");

const usernamesRef = collection(db, "usernames");

const usernamesQuery = query(
  usernamesRef
  // orderBy("createdAt", "desc"),
  // TODO make limit dynamic
  // limit(100)
);

const allNames = new Map();
let loading = true;
let error = null;

onSnapshot(
  usernamesQuery,
  (collection) => {
    allNames.clear();
    collection.forEach((doc) => {
      const { username } = doc.data();
      allNames.set(doc.id, username);
    });
    loading = false;
  },
  (e) => (error = e)
);

export function getUsername(uid) {
  const username = allNames.get(uid);
  console.log(allNames);
  return [username, loading, error];
}
