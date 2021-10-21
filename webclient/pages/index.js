import Head from "next/head";
import { useStats } from "../hooks/useStats";

const limit = 100;
export default function Home() {
  const [stats, statsLoading, statsError] = useStats(limit);
  console.log(stats);
  if (statsLoading) {
    return <p>Loading...</p>;
  }
  if (statsError) {
    return <p>Error...</p>;
  }
  return (
    <>
      <Head>
        <title>Back4Blood stats</title>
      </Head>
      <div className="container mx-auto my-4">
        <table className="table-auto mx-auto">
          <thead>
            <tr>
              <Table.Header>Act</Table.Header>
              <Table.Header>Chapter</Table.Header>
              <Table.Header>Ridden</Table.Header>
              <Table.Header>Mutations</Table.Header>
            </tr>
          </thead>
          <tbody>
            {stats.map(({ id, act, chapter, riddenKills, mutationKills }) => (
              <tr key={id}>
                <Table.Cell>{act}</Table.Cell>
                <Table.Cell>{chapter}</Table.Cell>
                <Table.Cell>{riddenKills}</Table.Cell>
                <Table.Cell>{mutationKills}</Table.Cell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

const Table = {
  Header: ({ children }) => (
    <th className="px-4 py-2 text-green-600 text-lg">{children}</th>
  ),
  Cell: ({ children }) => (
    <td className="border px-4 py-2 text-lg">{children}</td>
  ),
};
