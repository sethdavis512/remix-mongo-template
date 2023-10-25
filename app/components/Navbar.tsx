import { Form, Link } from '@remix-run/react';
import { useOptionalUser } from '~/utils';
import Button from './Button';
import { Urls } from '~/utils/constants';

export default function Navbar() {
    const user = useOptionalUser();

    return (
        <nav
            className="navbar is-dark"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="container">
                <div className="navbar-brand">
                    <Link className="navbar-item" to={Urls.HOME}>
                        CRM
                    </Link>

                    <div
                        role="button"
                        className="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </div>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-start"></div>
                    <div className="navbar-end">
                        {!!user ? (
                            <div className="navbar-item">
                                <Form action="/logout" method="post">
                                    <Button
                                        className="button"
                                        type="submit"
                                        variant="is-black"
                                    >
                                        Logout
                                    </Button>
                                </Form>
                            </div>
                        ) : (
                            <div className="navbar-item">
                                <Link
                                    className="button is-black"
                                    to={Urls.LOGIN}
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
