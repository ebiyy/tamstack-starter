import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  MetaFunction,
} from "@remix-run/react";
import "./tailwind.css";

export const meta: MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { title: "Your App Title" }, 
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
