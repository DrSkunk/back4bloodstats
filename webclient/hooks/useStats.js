import { useCollectionData } from "react-firebase9-hooks/firestore";
import { statsQuery } from "../api/client/stats";

export function useStats(limit) {
  const [stats, statsLoading, statsError] = useCollectionData(statsQuery, {
    idField: "id",
  });

  if (stats) {
    stats.reverse();
  }
  return [stats, statsLoading, statsError];
}
