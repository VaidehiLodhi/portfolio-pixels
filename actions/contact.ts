"use server"

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validators/contact";

interface ActionResult {
    success: boolean;
    error?: string;
}

export async function submitContactForm(
    data: unknown
): Promise<ActionResult> {
    const parsed = contactSchema.safeParse(data);
    if(!parsed.success) {
        const firstError = parsed.error.issues[0]?.message;
        return {success: false, error: firstError};
    }

    try {
        await prisma.contractMessage.create({
            data: parsed.data,
        });
        return {success: true};
    } catch(err) {
        console.error("contact form err:", err);
        return {success: false, error: "Something went wrong"};
    }
}