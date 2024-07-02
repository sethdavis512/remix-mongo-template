import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Button, Input, Label } from "@lemonsqueezy/wedges";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { getUser, login } from "~/utils/auth.server";
import { signInSchema } from "~/utils/schemas";

export async function loader({ request }: LoaderFunctionArgs) {
    return (await getUser(request)) ? redirect("/dashboard") : null;
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema: signInSchema });

    // Report the submission to client if it is not successful
    if (submission.status !== "success") {
        return submission.reply();
    }

    return await login(submission.value);
}

export default function SignInRoute() {
    const [form, fields] = useForm({
        constraint: getZodConstraint(signInSchema),
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <>
            <h1 className="text-2xl">Sign in</h1>
            <Form method="POST" {...getFormProps(form)}>
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
                <Button type="submit">Sign in</Button>
            </Form>
            <p>
                {`Don't have an account?`}
                <Link to="/sign-up">Sign up here</Link>
            </p>
        </>
    );
}
