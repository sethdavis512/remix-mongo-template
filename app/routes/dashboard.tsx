import type { LoaderFunctionArgs } from '@remix-run/node';
import Box from '~/components/Box';
import DefaultLayout from '~/components/DefaultLayout';
import { requireUserId } from '~/utils/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);

    return null;
}

export default function DashboardRoute() {
    return (
        <DefaultLayout>
            <Box>Protected!</Box>
        </DefaultLayout>
    );
}
