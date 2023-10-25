import type { MetaFunction } from '@remix-run/node';
import DefaultLayout from '~/components/DefaultLayout';

export const meta: MetaFunction = () => {
    return [
        { title: 'New Remix App' },
        { name: 'description', content: 'Welcome to Remix!' }
    ];
};

export default function Index() {
    return (
        <DefaultLayout showMenu={false}>
            <h1 className="title">Hello World!</h1>
        </DefaultLayout>
    );
}
