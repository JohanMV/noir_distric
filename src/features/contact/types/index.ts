export type ContactTopic = "Quiero comprar" | "Tallas y fit" | "Stock disponible" | "Otra consulta";

export interface ContactFormValues {
  name: string;
  email: string;
  topic: ContactTopic;
  product: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
export type ContactFormStatus = "idle" | "submitting" | "success" | "error";
