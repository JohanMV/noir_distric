import { ContactSection } from "@/components/sections/ContactSection";
import { useContactForm } from "@/features/contact/hooks";

export function ContactSectionContainer() {
  const form = useContactForm();
  return (
    <ContactSection
      values={form.values}
      errors={form.errors}
      status={form.status}
      onChange={form.handleChange}
      onTopicChange={form.handleTopicChange}
      onSubmit={form.handleSubmit}
    />
  );
}
