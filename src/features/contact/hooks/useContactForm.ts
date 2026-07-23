import { useState, type ChangeEvent, type FormEvent } from "react";
import type {
  ContactFormErrors,
  ContactFormStatus,
  ContactFormValues,
} from "@/features/contact/types";

const initialValues: ContactFormValues = { name: "", email: "", message: "" };

export function useContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: ContactFormErrors = {};
    if (values.name.trim().length < 2) nextErrors.name = "Ingresa tu nombre.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Ingresa un email válido.";
    if (values.message.trim().length < 10) nextErrors.message = "Cuéntanos un poco más.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
      setValues(initialValues);
    }, 850);
  };

  return { values, errors, status, handleChange, handleSubmit };
}
