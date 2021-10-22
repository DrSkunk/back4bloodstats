import { firestore, serverTimestamp } from "./firebase";

const ref = firestore.collection("stats");

export async function addEntry(entry) {
  const res = await ref.add({
    createdAt: serverTimestamp(),
    ...entry,
  });
  console.log(`Added document with ID ${res.id}`);
  console.log(res);
  return res;
}

export async function setName(userId, name) {
  await firestore.collection("names").doc(userId).set({ name });
}
