import type { ChangeEvent, FormEvent } from "react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button, SectionHeading } from "@/components/ui";
import type {
  ContactFormErrors,
  ContactFormStatus,
  ContactFormValues,
} from "@/features/contact/types";

export interface ContactSectionProps {
  values: ContactFormValues;
  errors: ContactFormErrors;
  status: ContactFormStatus;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function ContactSection({
  values,
  errors,
  status,
  onChange,
  onSubmit,
}: ContactSectionProps) {
  return (
    <section id="contact" className="content-shell section-space scroll-mt-6" aria-labelledby="contact-title">
      <SectionHeading
        eyebrow="Hablemos"
        title="Estamos cerca"
        description="Dudas de talla, stock o entregas. Escríbenos y una persona de nuestro equipo te responderá."
      />
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-between rounded-[2rem] bg-category p-6 md:p-8">
          <div>
            <span className="grid size-13 place-items-center rounded-full bg-white">
              <MessageCircle className="size-5" aria-hidden />
            </span>
            <h3 className="mt-7 text-3xl font-extrabold tracking-[-0.045em] uppercase">
              Respuesta rápida por WhatsApp
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Atención de lunes a sábado, de 10:00 a 20:00. Te ayudamos a elegir el fit correcto.
            </p>
            <a href="https://wa.me/51999999999" target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-white transition hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
              Abrir WhatsApp <Send className="size-4" aria-hidden />
            </a>
          </div>
          <div className="mt-10 space-y-3 border-t border-ink/10 pt-6 text-sm">
            <p className="flex items-center gap-3"><MapPin className="size-4" aria-hidden /> Showroom · Miraflores, Lima</p>
            <p className="flex items-center gap-3"><Mail className="size-4" aria-hidden /> hola@noirdistrict.pe</p>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-[2rem] border border-ink/8 bg-card p-6 md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="form-field">
              <span>Nombre</span>
              <input name="name" value={values.name} onChange={onChange} placeholder="Tu nombre" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
              {errors.name && <small id="name-error">{errors.name}</small>}
            </label>
            <label className="form-field">
              <span>Email</span>
              <input type="email" name="email" value={values.email} onChange={onChange} placeholder="tu@email.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
              {errors.email && <small id="email-error">{errors.email}</small>}
            </label>
          </div>
          <label className="form-field mt-5">
            <span>Mensaje</span>
            <textarea name="message" value={values.message} onChange={onChange} rows={6} placeholder="¿En qué podemos ayudarte?" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
            {errors.message && <small id="message-error">{errors.message}</small>}
          </label>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button type="submit" isLoading={status === "submitting"}>Enviar mensaje</Button>
            <p className="text-sm" role="status" aria-live="polite">
              {status === "success" && <span className="font-bold text-emerald-700">Mensaje enviado. Te responderemos pronto.</span>}
              {status === "error" && <span className="font-bold text-red-700">Revisa los campos marcados.</span>}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
