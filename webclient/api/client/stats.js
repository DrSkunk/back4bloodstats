import { db } from "./firebase";
import { query, orderBy, limit, collection } from "firebase/firestore";

export const statsRef = collection(db, "stats");

export const statsQuery = query(
  statsRef,
  orderBy("createdAt", "desc"),
  // TODO make limit dynamic
  limit(100)
);
