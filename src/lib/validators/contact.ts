import {z} from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "Name must atleast be 2 characters long"),
    email: z.email("Please enter a valid email"),
    message: z.string().refine(
        (val)=> val.trim().split(/\s+/).length >= 3,
        "Message must be atleast 3 words (^_^)"
    ),
});

export type ContactFormData = z.infer<typeof contactSchema>;