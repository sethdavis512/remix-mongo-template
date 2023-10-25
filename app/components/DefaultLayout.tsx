import { type ReactNode } from 'react';
import Navbar from './Navbar';
import { Link } from '@remix-run/react';
import { Urls } from '~/utils/constants';

interface DefaultLayoutProps {
    children: ReactNode;
    showMenu?: boolean;
}

export default function DefaultLayout({
    children,
    showMenu = true
}: DefaultLayoutProps) {
    return (
        <>
            <header className="mb-5">
                <Navbar />
            </header>
            <main className="flex-1">
                <div className="container">
                    <div className="columns">
                        {showMenu && (
                            <div className="column is-one-quarter">
                                <aside className="menu">
                                    <p className="menu-label">General</p>
                                    <ul className="menu-list">
                                        <li>
                                            <Link to={Urls.DASHBOARD}>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={Urls.CUSTOMERS}>
                                                Customers
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={Urls.COMPANIES}>
                                                Companies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={Urls.INTERACTIONS}>
                                                Interactions
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        )}
                        <div className="column">
                            <div className="content">{children}</div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>CRM</strong> by{' '}
                        <a href="https://sethdavis.io">Seth Davis</a>
                    </p>
                </div>
            </footer>
        </>
    );
}
