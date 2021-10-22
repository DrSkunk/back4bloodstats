import { addEntry, setName } from "../../api/server/database";

export default async function handler(req, res) {
  const { act, chapter, riddenKills, mutationKills, userId, name } = req.body;
  try {
    await setName(userId, name);
    await addEntry({
      act,
      chapter,
      riddenKills,
      mutationKills,
      userId,
    });
    console.log(`Added entry for ${name}`);
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send("Failed to add entry");
  }
}
