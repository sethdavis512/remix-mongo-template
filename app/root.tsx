import {
    Links,
    Meta,
    NavLink,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";

import { getUser } from "./utils/auth.server";

import "./tailwind.css";

export async function loader({ request }: LoaderFunctionArgs) {
    return json({
        user: await getUser(request),
    });
}

export function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useLoaderData<typeof loader>();

    const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
        isActive ? "font-bold italic" : "";

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <ul>
                    <li>
                        <NavLink to="/" className={navLinkClassName}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard" className={navLinkClassName}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        {user ? (
                            <NavLink
                                to="/sign-out"
                                className={navLinkClassName}
                            >
                                Sign out
                            </NavLink>
                        ) : (
                            <NavLink to="/sign-in" className={navLinkClassName}>
                                Sign in
                            </NavLink>
                        )}
                    </li>
                </ul>
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
