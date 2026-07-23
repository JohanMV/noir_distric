import { useState, type ChangeEvent, type FormEvent } from "react";
import { STORE_CONFIG } from "@/lib/storeConfig";
import type {
  ContactFormErrors,
  ContactFormStatus,
  ContactFormValues,
  ContactTopic,
} from "@/features/contact/types";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  topic: "Quiero comprar",
  product: "",
  message: "",
};

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
    setStatus("idle");
  };

  const handleTopicChange = (topic: ContactTopic) => {
    setValues((current) => ({ ...current, topic }));
    setStatus("idle");
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

    const lines = [
      "Hola, quiero hacer una consulta a NOIR DISTRICT.",
      "",
      `Nombre: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Consulta: ${values.topic}`,
      values.product.trim() ? `Producto: ${values.product.trim()}` : undefined,
      "",
      `Mensaje: ${values.message.trim()}`,
    ].filter(Boolean);

    setStatus("submitting");
    window.open(
      `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setStatus("success");
    setValues(initialValues);
  };

  return { values, errors, status, handleChange, handleTopicChange, handleSubmit };
}
