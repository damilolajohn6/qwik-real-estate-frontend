import { connectToDatabase } from "@/lib/mongoose";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { firstName, lastName, email, phoneNumber, reason, message } = body;

        if (!firstName || !lastName || !email || !reason || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const newContact = await Contact.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            reason,
            message,
        });

        return NextResponse.json(
            { message: "Form submitted successfully", data: newContact },
            { status: 201 }
        );
    } catch (error) {
        console.error("Form submit error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
