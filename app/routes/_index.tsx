import { Alert } from "@lemonsqueezy/wedges";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Postgres Template" },
        { name: "description", content: "Postgres Template" },
    ];
};

export default function Index() {
    return (
        <>
            <h1>Postgres Template</h1>
            <Alert variant="expanded" color="primary">
                {`You're awesome!`}
            </Alert>
        </>
    );
}
