import { db } from "@/utils/dbConfig";
import { NextResponse } from "next/server";
import { STUDENTS } from "@/utils/schema";
import { eq } from "drizzle-orm";


export async function POST(req) {
    try {
        const data = await req.json();

        // Ensure the required fields are present
        if (!data?.name || !data?.grade || !data?.branch || !data?.contact || !data?.address) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Insert the new student record into the database
        const result = await db.insert(STUDENTS).values({
            name: data.name,
            grade: data.grade,
            branch: data.branch,
            contact: data.contact,
            address: data.address
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create student" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        // Fetch all student records from the database
        const result = await db.select().from(STUDENTS);
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
    }
}


export async function DELETE(req){
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    const result = await db.delete(STUDENTS).where(eq(STUDENTS.id, id));

    return NextResponse.json(result);
}