import { addEntry, setUsername } from "../../api/server/database";
import { getSecret } from "../../api/server/getSecret";

export default async function handler(req, res) {
  const { act, chapter, riddenKills, mutationKills, userId, username, secret } =
    req.body;
  console.log(req.body);
  try {
    console.log("receive secret", secret);
    console.log("getSecret", getSecret());
    if (secret !== getSecret()) {
      return res.status(401).send("Wrong secret");
    }
    await setUsername(userId, username);
    await addEntry({
      act,
      chapter,
      riddenKills,
      mutationKills,
      userId,
    });
    console.log(`Added entry for ${username}`);
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to add entry");
  }
}
