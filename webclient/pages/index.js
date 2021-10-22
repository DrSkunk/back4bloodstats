import Head from "next/head";
import { getUsername } from "../api/client/usernames";
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

  const username = getUsername("5deb2c83-248c-44b9-bf68-49f9ffccec34");
  console.log(username);
  return (
    <>
      <Head>
        <title>Back4Blood stats</title>
      </Head>
      <div className="container mx-auto my-4">
        <table className="table-auto mx-auto">
          <thead>
            <tr>
              <Table.Header>Date</Table.Header>
              <Table.Header>Name</Table.Header>
              <Table.Header>Act</Table.Header>
              <Table.Header>Chapter</Table.Header>
              <Table.Header>Ridden</Table.Header>
              <Table.Header>Mutations</Table.Header>
            </tr>
          </thead>
          <tbody>
            {stats.map(
              ({
                id,
                userId,
                act,
                chapter,
                riddenKills,
                mutationKills,
                createdAt,
              }) => (
                <tr key={id}>
                  <Table.Cell>{createdAt.toDate().toString()}</Table.Cell>
                  <Table.Cell>{getUsername(userId)}</Table.Cell>
                  <Table.Cell>{act}</Table.Cell>
                  <Table.Cell>{chapter}</Table.Cell>
                  <Table.Cell>{riddenKills}</Table.Cell>
                  <Table.Cell>{mutationKills}</Table.Cell>
                  <Table.Cell>{mutationKills}</Table.Cell>
                </tr>
              )
            )}
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
