"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { InputFooter } from "@/components/ui/input";
import { TextareaFooter } from "@/components/ui/textarea";
import localFont from "next/font/local";
import { departure_mono } from "./beige-bookmark";
import { contactSchema } from "@/lib/validators/contact";
import { submitContactForm } from "../../../../actions/contact";
import { toast } from "sonner";

export const magnat_text_regular = localFont({
  src: "../../../../public/fonts/magnat_family/text_test/magnat_text_test_regular.woff",
  variable: "--font-magnat_text_regular",
  display: "swap",
});

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export const FormFields = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleBlur =(field: keyof FormErrors): void => {
    // validate just that one field on blur
    const result = contactSchema.shape[field].safeParse(formData[field]);
    if(!result.success) {
      setErrors((prev) => ({
        ...prev,
        [field] : result.error.issues[0]?.message,
      }));
    } else {
      setErrors((prev) => ({...prev, [field]: undefined}));
    }
  };

  const handleChange =(field: keyof ContactFormState, value: string): void => {
    setFormData((prev) => ({...prev, [field]: value}));
    if(field !== "message" && errors[field as keyof FormErrors]) {
      setErrors((prev) => ({...prev, [field]: undefined}));
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // client side full validation before hitting server
    const result = contactSchema.safeParse(formData);
    if(!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitStatus("loading");

    const response = await submitContactForm(formData);

    if(response.success) {
      toast.success("yay! thanks for reaching out!! 🩷");
      setFormData({name: "", email: "", message: ""});
      setErrors({});
      setSubmitStatus("idle");
    } else { 
      toast.error(response.error ?? "something went wrong (>_<)");
    }
  };

  const textareaClassName = `w-full rounded-[10px] ${magnat_text_regular.className} focus:outline-none focus:border-[2.5px] focus:border-[#DF4346] transition-all duration-200`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`${magnat_text_regular.variable} w-full pl-20 pt-7`}
    >
      <FieldGroup className="gap-0">
        <Field className="gap-0 w-90">
          <InputFooter
            id="fieldgroup-name"
            placeholder="Name"
            value={formData.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("name", e.target.value)
            }
            aria-invalid={!!errors.name}
            onBlur={() => handleBlur("name")}
            className={`w-full rounded-[10px] ${magnat_text_regular.className} text-[16px] focus:outline-none focus:border-[2.5px] focus:border-[#DF4346] transition-all duration-200`}
          />
          <div className="h-5.5">
            {errors.name && (
              <p className="text-[#930A0C] text-sm">{errors.name}</p>
            )}
          </div>
        </Field>
        <Field className="gap-0 w-90">
          <InputFooter
            id="fieldgroup-email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("email", e.target.value)
            }
            aria-invalid={!!errors.email}
            onBlur={() => handleBlur("email")}
            className={`w-full rounded-[10px] ${magnat_text_regular.className} text-[16px] placeholder:text-[#DF4346] focus:outline-none focus:border-[2.5px] focus:border-[#DF4346] transition-all duration-200`}
          />
          <div className="h-5.5">
            {errors.email && (
              <p className="text-[#930A0C] text-sm">{errors.email}</p>
            )}
          </div>
        </Field>
        <Field className="gap-0 w-90">
          <TextareaFooter
            id="fieldgroup-message"
            placeholder="anything u wanna say!"
            rows={4}
            value={formData.message}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleChange("message", e.target.value)
            }
            className={textareaClassName}
          />
        </Field>
      </FieldGroup>
      <Button
        size="footer"
        type="submit"
        variant="footer"
        disabled={submitStatus === "loading"}
        className={`${departure_mono.className} bg-[#DF4346] text-[#FAB5C5] text-[14px] mt-4 w-90`}
      >
        {submitStatus === "loading" ? "sending" : "Drop it in <3"}
      </Button>
    </form>
  );
};
