import { LoaderFunctionArgs } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);

    return null;
}

export default function DashboardRoute() {
    return (
        <>
            <h1 className="text-2xl">Dashboard</h1>
        </>
    );
}
