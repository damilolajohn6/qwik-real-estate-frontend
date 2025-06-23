import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Contact from "@/models/Contact";

export async function GET() {
    try {
        await connectToDatabase();
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return NextResponse.json({ contacts });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
    }
}
