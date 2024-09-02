import type { MetaFunction } from "@remix-run/node";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { paths } from '@repo/openapi'; // OpenAPI-generated types

const fetchClient = createFetchClient<paths>({
  baseUrl: "http://localhost:8787/",
});
const $api = createClient(fetchClient);

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  const { data, error, isLoading } = $api.useQuery(
    "get",
    `/pet/${5}`,
    {
      params: {
        path: { petId: 5 },
      },
    },
  );

  if (isLoading || !data) return "Loading...";

  if (error) return `An error occured: ${error}`;

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix with Capacitor!!!</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/quickstart"
            rel="noreferrer"
          >
            5m Quick Start {data.name}
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/tutorial"
            rel="noreferrer"
          >
            30m Tutorial
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
          >
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
