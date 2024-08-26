import { faker } from "@faker-js/faker";
import { PrismaClient, SentimentType, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv))
    .options({
        dropOnly: { type: "boolean", default: false },
    })
    .parseSync();

const prisma = new PrismaClient();

const getRandomSentiment = () =>
    faker.helpers.arrayElement([
        SentimentType.VERY_NEGATIVE,
        SentimentType.NEGATIVE,
        SentimentType.NEUTRAL,
        SentimentType.POSITIVE,
        SentimentType.VERY_POSITIVE,
    ]);

const getRandomSurveyTitle = () =>
    faker.helpers.arrayElement([
        "Your Opinion Matters: Share Your Experience",
        "Help Us Improve: Your Feedback Counts",
        "Tell Us What You Think: Customer Satisfaction Survey",
        "Rate Your Experience: We Value Your Input",
        "We’re Listening: How Was Your Visit?",
        "Help Us Serve You Better: Share Your Feedback",
        "Your Thoughts, Our Future: Customer Feedback Survey",
        "Shape Our Service: Tell Us What You Think",
        "We Value Your Opinion: Survey & Feedback Form",
        "How Did We Do? Share Your Experience",
    ]);

const getRandomSurveyQuestions = () =>
    faker.helpers.arrayElement([
        "How was your overall experience with the service?",
        "How would you rate the ease of use of the software?",
        "How do you feel about the software meeting your expectations?",
        "What is your sentiment towards the quality of customer support?",
        "How do you feel about recommending our service to others?",
        "How satisfied are you with the most valuable features of the software?",
        "How would you rate the software’s user interface and design?",
        "What is your sentiment regarding the software’s performance and speed?",
        "How do you feel about the reliability of the software?",
        "How satisfied are you with the updates and new features released?",
    ]);

const defaultCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getRandomChar = (chars: string) =>
    chars.charAt(Math.floor(Math.random() * chars.length));

function getUniqueId(length = 8, characters = defaultCharacters) {
    return [...Array(length)].map(() => getRandomChar(characters)).join("");
}

async function seed() {
    const email = "seth@mail.com";
    const hashedPassword = await bcrypt.hash("asdfasdf", 10);

    await prisma.response.deleteMany({}).catch(() => {});
    await prisma.question.deleteMany({}).catch(() => {});
    await prisma.survey.deleteMany({}).catch(() => {});

    if (argv.dropOnly) {
        console.log(`Dropped ⬇️`);
        return;
    }

    const userCount = await prisma.user.count();

    let user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    const getPasscode = () => getUniqueId(4, defaultCharacters);

    if (!user) {
        user = await prisma.user.create({
            data: {
                firstName: "Seth",
                lastName: "Davis",
                email,
                password: {
                    create: {
                        hash: hashedPassword,
                    },
                },
            },
        });
    }

    if (userCount < 5) {
        for (
            let index = 0;
            index < faker.number.int({ min: 1, max: 10 });
            index++
        ) {
            await prisma.user.create({
                data: {
                    firstName: faker.person.firstName(),
                    lastName: faker.person.firstName(),
                    email: faker.internet.email(),
                    password: {
                        create: {
                            hash: await bcrypt.hash(getUniqueId(), 10),
                        },
                    },
                },
            });
        }
    }

    for (
        let index = 0;
        index < faker.number.int({ min: 1, max: 10 });
        index++
    ) {
        const title = getRandomSurveyTitle();

        const survey = await prisma.survey.create({
            data: {
                title,
                passcode: getPasscode(),
                createdById: user.id,
            },
        });

        for (
            let index = 0;
            index < faker.number.int({ min: 1, max: 10 });
            index++
        ) {
            const text = getRandomSurveyQuestions();
            const question = await prisma.question.create({
                data: {
                    text,
                    createdById: user.id,
                    surveyId: survey.id,
                },
            });

            for (
                let index = 0;
                index < faker.number.int({ min: 1, max: 10 });
                index++
            ) {
                const sentiment = getRandomSentiment();

                await prisma.response.create({
                    data: {
                        sentiment,
                        userId: (user as User).id,
                        questionId: question.id,
                        surveyId: survey.id,
                    },
                });
            }
        }
    }

    console.log(`Database has been seeded. 🌱`);
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
