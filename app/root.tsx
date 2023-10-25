import { cssBundleHref } from '@remix-run/css-bundle';
import {
    json,
    type LinksFunction,
    type LoaderFunctionArgs
} from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from '@remix-run/react';

import appStyles from './styles.css';
import { getUser } from './utils/auth.server';

export const links: LinksFunction = () => [
    {
        rel: 'stylesheet',
        href: appStyles
    },
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    return json({ user: await getUser(request) });
};

export default function App() {
    return (
        <html lang="en" className="full-height">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className="full-height flex flex-col">
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
