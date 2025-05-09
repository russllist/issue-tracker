// This is the API that allows this app to write to and and read from the MySQL database via Prisma

import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required")
});

export async function POST(request: NextRequest) {              // Function called POST that takes the argument 'request' of type 'NextRequest'
    const body = await request.json();                          // Returns promise. A json object when successful?
    const validation = createIssueSchema.safeParse(body);       // zodObject.zodMethod(argument) creates SafeParseReturnType
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const newIssue = await prisma.issue.create({
        data: {title: body.title, description: body.description}
    });

    return NextResponse.json(newIssue, {status: 201});
}