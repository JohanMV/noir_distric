import type { ChangeEvent, FormEvent } from "react";
import {
  ArrowRight,
  Clock3,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Ruler,
  Send,
  ShoppingBag,
} from "lucide-react";
import { Button, SectionHeading } from "@/components/ui";
import { categoriesSprite } from "@/assets";
import type {
  ContactFormErrors,
  ContactFormStatus,
  ContactFormValues,
  ContactTopic,
} from "@/features/contact/types";
import { STORE_CONFIG } from "@/lib/storeConfig";

const consultationTopics: Array<{ label: ContactTopic; icon: typeof ShoppingBag }> = [
  { label: "Quiero comprar", icon: ShoppingBag },
  { label: "Tallas y fit", icon: Ruler },
  { label: "Stock disponible", icon: Package },
  { label: "Otra consulta", icon: MessageCircle },
];

export interface ContactSectionProps {
  values: ContactFormValues;
  errors: ContactFormErrors;
  status: ContactFormStatus;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTopicChange: (topic: ContactTopic) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function ContactSection({
  values,
  errors,
  status,
  onChange,
  onTopicChange,
  onSubmit,
}: ContactSectionProps) {
  const whatsappLink = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;

  return (
    <section id="contact" className="content-shell section-space scroll-mt-6" aria-labelledby="contact-title">
      <SectionHeading
        eyebrow="Hablemos"
        title="Estamos cerca"
        description="Dudas de talla, stock o consultas sobre nuestros productos. Te ayudamos por WhatsApp a elegir y concretar tu compra."
      />

      <div className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
        <aside className="rounded-[2rem] bg-category p-5 md:p-6">
          <div
            role="img"
            aria-label="Prendas urbanas de NOIR DISTRICT"
            className="aspect-[1.8/1] rounded-[1.4rem] bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${categoriesSprite})`,
              backgroundPosition: "100% center",
              backgroundSize: "400% auto",
            }}
          />

          <div className="relative pt-8">
            <span className="absolute -top-7 left-3 grid size-15 place-items-center rounded-full bg-ink text-white shadow-soft">
              <MessageCircle className="size-7" aria-hidden />
            </span>
            <h3 className="text-2xl leading-[0.95] font-extrabold tracking-[-0.05em] uppercase md:text-3xl">
              Respuesta rápida por WhatsApp
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              Consulta stock, tallas y coordina tu compra. Lun–Sáb · 10:00 a 20:00
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-extrabold tracking-[0.12em] text-white uppercase transition hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Abrir WhatsApp <ArrowRight className="size-4" aria-hidden />
            </a>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-ink">
              <Clock3 className="size-4" aria-hidden /> Respondemos en menos de 15 min
            </p>
          </div>
        </aside>

        <form onSubmit={onSubmit} noValidate className="rounded-[2rem] border border-ink/10 bg-card p-5 md:p-8">
          <div className="mb-7">
            <h3 className="text-2xl leading-none font-extrabold tracking-[-0.05em] uppercase md:text-3xl">
              Cuéntanos qué necesitas
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
              Te ayudamos a elegir y cerramos tu compra por WhatsApp.
            </p>
          </div>

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

          <fieldset className="mt-6">
            <legend className="text-[0.78rem] font-extrabold text-ink">¿Sobre qué es tu consulta?</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {consultationTopics.map(({ label, icon: Icon }) => {
                const isActive = values.topic === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => onTopicChange(label)}
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${isActive ? "border-ink bg-white text-ink shadow-sm" : "border-ink/15 bg-white/55 text-ink hover:border-ink/45"}`}
                    aria-pressed={isActive}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="form-field mt-6">
            <span>Producto de interés <span className="font-medium text-muted">(opcional)</span></span>
            <input name="product" value={values.product} onChange={onChange} placeholder="Nombre o enlace del producto" />
          </label>

          <label className="form-field mt-6">
            <span>¿En qué podemos ayudarte?</span>
            <textarea name="message" value={values.message} onChange={onChange} rows={4} placeholder="Cuéntanos qué prenda buscas o qué necesitas saber..." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
            {errors.message && <small id="message-error">{errors.message}</small>}
          </label>

          <div className="mt-6">
            <Button type="submit" isLoading={status === "submitting"} className="w-full uppercase tracking-[0.12em]">
              Enviar consulta <ArrowRight className="size-4" aria-hidden />
            </Button>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted">
              <LockKeyhole className="mt-0.5 size-4 shrink-0" aria-hidden />
              Tu información está segura y solo será utilizada para responder tu consulta.
            </p>
            <p className="mt-3 text-sm" role="status" aria-live="polite">
              {status === "success" && <span className="font-bold text-emerald-700">Abrimos WhatsApp con tu consulta lista para enviar.</span>}
              {status === "error" && <span className="font-bold text-red-700">Revisa los campos marcados.</span>}
            </p>
          </div>
        </form>
      </div>

      <div className="mt-5 grid overflow-hidden rounded-[1.75rem] border border-ink/10 bg-card md:grid-cols-3">
        <div className="flex items-center gap-4 p-5 md:justify-center md:border-r md:border-ink/10">
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/12 bg-white"><MapPin className="size-5" aria-hidden /></span>
          <p className="text-sm leading-relaxed"><span className="block text-xs font-extrabold uppercase">Showroom</span>Miraflores, Lima</p>
        </div>
        <div className="flex items-center gap-4 border-t border-ink/10 p-5 md:justify-center md:border-t-0 md:border-r">
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/12 bg-white"><Mail className="size-5" aria-hidden /></span>
          <p className="text-sm leading-relaxed"><span className="block text-xs font-extrabold uppercase">Email</span>hola@noirdistrict.pe</p>
        </div>
        <div className="flex items-center gap-4 border-t border-ink/10 p-5 md:justify-center md:border-t-0">
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/12 bg-white"><Clock3 className="size-5" aria-hidden /></span>
          <p className="text-sm leading-relaxed"><span className="block text-xs font-extrabold uppercase">Horario</span>Lun–Sáb, 10:00–20:00</p>
        </div>
      </div>
    </section>
  );
}
