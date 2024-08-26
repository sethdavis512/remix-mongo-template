import { PrismaClient } from "@prisma/client";

import { singleton } from "./utils/singleton.server";

// Hard-code a unique key, so we can look up the client when this module gets re-imported
const prisma = singleton(
    "prisma",
    () =>
        new PrismaClient({
            datasources: {
                db: {
                    url:
                        process.env.NODE_ENV === "production"
                            ? process.env.DATABASE_URL_NEON
                            : process.env.DATABASE_URL_LOCAL,
                },
            },
        })
);
prisma.$connect();

export { prisma };
