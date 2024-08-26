import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
    AngryIcon,
    FrownIcon,
    LaughIcon,
    MehIcon,
    SmileIcon,
} from "lucide-react";
import { prisma } from "~/db.server";
import { requireUserId } from "~/utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);

    const surveys = await prisma.survey.findMany({
        include: {
            responses: true,
            questions: {
                include: {
                    responses: true,
                },
            },
        },
    });

    return json({
        surveys,
    });
}

export default function DashboardRoute() {
    const { surveys } = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="text-2xl">Dashboard</h1>
            <ul className="list-inside list-disc">
                {surveys.map((survey) => (
                    <li key={survey.id}>
                        <span className="bg-green-500">
                            {survey.title} (Responses: {survey.responses.length}
                            )
                        </span>
                        <ul className="list-inside list-disc pl-6">
                            {survey.questions.map((question) => (
                                <li key={question.id}>
                                    {question.text}
                                    <ul className="list-inside list-disc pl-6">
                                        {question.responses.map((response) => (
                                            <li
                                                key={response.id}
                                                className="flex gap-2"
                                            >
                                                {response.sentiment ===
                                                    "VERY_NEGATIVE" && (
                                                    <AngryIcon />
                                                )}
                                                {response.sentiment ===
                                                    "NEGATIVE" && <FrownIcon />}
                                                {response.sentiment ===
                                                    "NEUTRAL" && <MehIcon />}
                                                {response.sentiment ===
                                                    "POSITIVE" && <SmileIcon />}
                                                {response.sentiment ===
                                                    "VERY_POSITIVE" && (
                                                    <LaughIcon />
                                                )}
                                                {response.sentiment}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    );
}
