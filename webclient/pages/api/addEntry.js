import { addEntry, setName } from "../../api/server/database";
import { getSecret } from "../../api/server/getSecret";

export default async function handler(req, res) {
  const { act, chapter, riddenKills, mutationKills, userId, name, secret } =
    req.body;
  try {
    if (secret !== getSecret()) {
      return res.status(401).send("Wrong secret");
    }
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
