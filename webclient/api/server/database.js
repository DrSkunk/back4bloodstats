import { firestore, serverTimestamp } from "./firebase";

const ref = firestore.collection("stats");

export async function addEntry(entry) {
  const res = await ref.add({
    createdAt: serverTimestamp(),
    ...entry,
  });
  console.log(`Added document with ID ${res.id}`);
  return res;
}

export async function setUsername(userId, username) {
  await firestore.collection("usernames").doc(userId).set({ username });
}
