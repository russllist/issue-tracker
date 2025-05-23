// This is the API that allows this app to write to and and read from the MySQL database via Prisma

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";

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