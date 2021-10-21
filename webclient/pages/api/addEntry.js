import { addEntry } from "../../api/server/database";

export default async function handler(req, res) {
  try {
    await addEntry({
      title: "hoi",
      riddenKills: 0,
      mutationKills: 0,
    });
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send("Failed to add entry");
  }
}
