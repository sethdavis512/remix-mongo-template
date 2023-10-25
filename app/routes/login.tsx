import {
    json,
    type ActionFunctionArgs,
    redirect,
    type LoaderFunctionArgs
} from '@remix-run/node';
import { Form } from '@remix-run/react';
import { useState } from 'react';
import Box from '~/components/Box';
import Button from '~/components/Button';
import DefaultLayout from '~/components/DefaultLayout';
import TextInput from '~/components/TextInput';
import { getUser, login, register } from '~/utils/auth.server';
import { Urls } from '~/utils/constants';
import {
    validateEmail,
    validateName,
    validatePassword
} from '~/utils/validator.server';

export async function loader({ request }: LoaderFunctionArgs) {
    return (await getUser(request)) ? redirect(Urls.DASHBOARD) : null;
}

export async function action({ request }: ActionFunctionArgs): Promise<any> {
    const form = await request.formData();
    const intent = form.get('intent');

    const email = form.get('email');
    const password = form.get('password');

    let firstName = form.get('firstName');
    let lastName = form.get('lastName');

    if (
        typeof intent !== 'string' ||
        typeof email !== 'string' ||
        typeof password !== 'string'
    ) {
        return json(
            { error: `Invalid Form Data`, form: intent },
            { status: 400 }
        );
    }

    if (
        intent === 'register' &&
        (typeof firstName !== 'string' || typeof lastName !== 'string')
    ) {
        return json(
            { error: `Invalid Form Data`, form: intent },
            { status: 400 }
        );
    }

    const errors = {
        email: validateEmail(email),
        password: validatePassword(password),
        ...(intent === 'register'
            ? {
                  firstName: validateName((firstName as string) || ''),
                  lastName: validateName((lastName as string) || '')
              }
            : {})
    };

    if (Object.values(errors).some(Boolean))
        return json(
            {
                errors,
                fields: { email, password, firstName, lastName },
                form: intent
            },
            { status: 400 }
        );

    if (intent === 'login') {
        return await login({ email, password });
    } else if (intent === 'register') {
        firstName = firstName as string;
        lastName = lastName as string;

        return await register({ email, password, firstName, lastName });
    } else {
        return json({ error: `Invalid Form Data` }, { status: 400 });
    }
}

type LoginActionType = 'login' | 'register';

export default function LoginRoute() {
    const [action, setAction] = useState<LoginActionType>('login');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        setFormData((form) => ({ ...form, [field]: event.target.value }));
    };

    const handleLoginType = (event: React.ChangeEvent<HTMLButtonElement>) => {
        setAction(event?.currentTarget.value as LoginActionType);
    };

    return (
        <DefaultLayout showMenu={false}>
            <Box className="mb-5">
                <Form method="POST">
                    <div className="field has-addons">
                        <p className="control">
                            <Button
                                onClick={handleLoginType}
                                name="action"
                                value="login"
                                variant={
                                    action === 'login'
                                        ? 'is-success'
                                        : undefined
                                }
                            >
                                Login
                            </Button>
                        </p>
                        <p className="control">
                            <Button
                                onClick={handleLoginType}
                                name="action"
                                value="register"
                                variant={
                                    action === 'register'
                                        ? 'is-success'
                                        : undefined
                                }
                            >
                                Register
                            </Button>
                        </p>
                    </div>
                    <TextInput
                        id="email"
                        label="Email"
                        type="email"
                        name="email"
                        onChange={(event) => handleInputChange(event, 'email')}
                        value={formData.email}
                    />
                    <TextInput
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        onChange={(event) =>
                            handleInputChange(event, 'password')
                        }
                        value={formData.password}
                    />
                    {action === 'register' && (
                        <>
                            <TextInput
                                id="firstName"
                                label="First name"
                                name="firstName"
                                onChange={(event) =>
                                    handleInputChange(event, 'firstName')
                                }
                                value={formData.firstName}
                            />
                            <TextInput
                                id="lastName"
                                label="Last name"
                                name="lastName"
                                onChange={(event) =>
                                    handleInputChange(event, 'lastName')
                                }
                                value={formData.lastName}
                            />
                        </>
                    )}
                    <Button
                        variant="is-success"
                        name="intent"
                        value={action}
                        type="submit"
                    >
                        {action === 'login' ? 'Login' : 'Register'}
                    </Button>
                </Form>
            </Box>
        </DefaultLayout>
    );
}
