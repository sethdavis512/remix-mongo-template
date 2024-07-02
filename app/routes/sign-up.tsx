import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button, Input, Label } from "@lemonsqueezy/wedges";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { getUser, register } from "~/utils/auth.server";
import { signUpSchema } from "~/utils/schemas";

export async function loader({ request }: LoaderFunctionArgs) {
    return (await getUser(request)) ? redirect("/dashboard") : null;
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema: signUpSchema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    return await register(submission.value);
}

export default function SignUpRoute() {
    const [form, fields] = useForm({
        constraint: getZodConstraint(signUpSchema),
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <>
            <h1 className="text-2xl">Sign up</h1>
            <Form method="post" {...getFormProps(form)}>
                <Label htmlFor="email">Email</Label>
                <Input
                    {...getInputProps(fields.email, { type: "email" })}
                    helperText={fields.email.errors}
                />
                <Label htmlFor="password">Password</Label>
                <Input
                    {...getInputProps(fields.password, { type: "password" })}
                    helperText={
                        fields.password.errors ??
                        "Must be between at least 8 characters"
                    }
                />
                <Label htmlFor="firstName">First name</Label>
                <Input
                    {...getInputProps(fields.firstName, { type: "text" })}
                    helperText={
                        fields.firstName.errors ??
                        "Must be between at least 2 characters"
                    }
                />
                <Label htmlFor="lastName">Last name</Label>
                <Input
                    {...getInputProps(fields.lastName, { type: "text" })}
                    helperText={
                        fields.lastName.errors ??
                        "Must be between at least 2 characters"
                    }
                />
                <Button type="submit">Register</Button>
            </Form>
            <p>
                {`Have an account?`} <Link to="/sign-in">Sign in here</Link>
            </p>
        </>
    );
}
