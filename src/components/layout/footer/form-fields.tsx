"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input, InputFooter } from "@/components/ui/input";
import { Textarea, TextareaFooter } from "@/components/ui/textarea";
import localFont from "next/font/local";
import { departure_mono } from "./beige-bookmark";

export const magnat_text_regular = localFont({
  src: "../../../../public/fonts/magnat_family/text_test/magnat_text_test_regular.woff",
  variable: "--font-magnat_text_regular",
  display: "swap",
});

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
}

export const FormFields = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = (field: keyof FormErrors): void => {
    const newErrors = { ...errors };

    if (field === "name") {
      if (formData.name.length > 0 && formData.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      } else {
        newErrors.name = "";
      }
    }

    if (field === "email") {
      if (formData.email.length > 0 && !validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email";
      } else {
        newErrors.email = "";
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (field: keyof FormData, value: string): void => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (field !== "message" && errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Validate all fields on submit
    const newErrors: FormErrors = {
      name: "",
      email: "",
    };

    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (newErrors.name || newErrors.email) {
      setErrors(newErrors);
      return;
    }

    // Form is valid, proceed with submission
    console.log("Form submitted:", formData);
  };

  const textareaClassName = `w-full rounded-[10px] ${magnat_text_regular.className} focus:outline-none focus:border-[2.5px] focus:border-[#FAB5C5] transition-all duration-200`;

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
            className={`w-full rounded-[10px] ${magnat_text_regular.className} text-[16px] placeholder:text-[#FAB5C5] focus:outline-none focus:border-[2.5px] focus:border-[#FAB5C5] transition-all duration-200`}
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
            className={`w-full rounded-[10px] ${magnat_text_regular.className} text-[16px] placeholder:text-[#FAB5C5] focus:outline-none focus:border-[2.5px] focus:border-[#FAB5C5] transition-all duration-200`}
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
        className={`${departure_mono.className} bg-[#FAB5C5] text-[#DF4346] text-[14px] mt-4 w-90`}
      >
        Drop it in &lt;3
      </Button>
    </form>
  );
};
