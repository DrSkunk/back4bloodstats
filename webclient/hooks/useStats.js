import { useCollectionData } from "react-firebase9-hooks/firestore";
import { statsQuery } from "../api/client/stats";

export function useStats(limit) {
  // const statsQuery = statsRef.orderBy("createdAt", "desc").limit(limit);
  const [stats, statsLoading, statsError] = useCollectionData(statsQuery, {
    idField: "id",
  });
  console.log([stats, statsLoading, statsError]);
  if (stats) {
    stats.reverse();
  }
  return [stats, statsLoading, statsError];
}
