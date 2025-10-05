import { createServerFn } from '@tanstack/react-start';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useState } from 'react';
import { Icon } from '@/components/icons';
import { Resend } from "resend"
import { render } from '@react-email/components';
import ContactEmail from './template-contact';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type SubmitResult = { success: boolean; error?: string } | null

const sendEmail = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const { name, email, subject, message } = data

      // Render React Email template untuk email penerima
      const emailHtml = await render(ContactEmail({ name, email, subject, message }));

      // Kirim email ke penerima (Anda)
      await resend.emails.send({
        from: `${name} <onboarding@resend.dev>`,
        to: 'ikwansatria3974@gmail.com',
        subject: `Pesan Baru: ${subject}`,
        html: emailHtml,
      });

      return { success: true };
    } catch (err) {
      console.error('Send email error:', err);
      return { success: false, error: 'Failed to send email. Please try again.' };
    }
  });

export function ContactForm() {
  // ✅ Tambahkan state untuk menyimpan hasil submit
  const [submitResult, setSubmitResult] = useState<SubmitResult>(null);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validators: {
      onChange: contactSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitResult(null);
      const result = await sendEmail({ data: value });
      setSubmitResult(result);
      if (result.success) {
        form.reset();
      }
      return result;
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 sm:space-y-6"
    >
      {/* ... field-field tetap sama ... */}

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <form.Field name="name">
          {(field) => (
            <div>
              <label htmlFor={field.name} className="block text-sm font-medium text-foreground mb-2">
                Name *
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 sm:px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base"
                placeholder="Your name"
              />
              {field.state.meta.errors.length > 0 && (

                <p className="text-destructive text-xs mt-1">{field.state.meta.errors[0]?.message}</p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div>
              <label htmlFor={field.name} className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-3 sm:px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base"
                placeholder="your@email.com"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-destructive text-xs mt-1">{field.state.meta.errors[0]?.message}</p>
              )}
            </div>
          )}
        </form.Field>
      </div >

      {/* Subject */}
      < form.Field name="subject" >
        {(field) => (
          <div>
            <label htmlFor={field.name} className="block text-sm font-medium text-foreground mb-2">
              Subject *
            </label>
            <input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-3 sm:px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base"
              placeholder="Project discussion, collaboration, etc."
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-destructive text-xs mt-1">{field.state.meta.errors[0]?.message}</p>
            )}
          </div>
        )
        }
      </form.Field >

      {/* Message */}
      < form.Field name="message" >
        {(field) => (
          <div>
            <label htmlFor={field.name} className="block text-sm font-medium text-foreground mb-2">
              Message *
            </label>
            <textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={5}
              className="w-full px-3 sm:px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base"
              placeholder="Tell me about your project, ideas, or just say hello..."
            />
            {field.state.meta.errors.length > 0 && (
              <p className="text-destructive text-xs mt-1">{field.state.meta.errors[0]?.message}</p>
            )}
          </div>
        )}
      </form.Field >

      {/* Submit Button */}
      < div >
        <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
          {([isSubmitting, canSubmit]) => (
            <button
              type="submit"
              disabled={isSubmitting || !canSubmit}
              className={`w-full px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-primary-foreground transition-all duration-300 text-sm sm:text-base
                ${isSubmitting || !canSubmit
                  ? 'bg-muted cursor-not-allowed'
                  : submitResult?.success
                    ? 'bg-chart-5 hover:bg-chart-5/90'
                    : 'bg-primary hover:shadow-lg hover:scale-105'
                }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Icon name="lu:loader-2" size={20} className="animate-spin" />
                  Sending...
                </div>
              ) : submitResult?.success ? (
                <div className="flex items-center justify-center gap-2">
                  <Icon name="lu:check" size={20} />
                  Message Sent!
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          )}
        </form.Subscribe>
      </div >

      {/* Success/Error Messages */}
      {
        submitResult?.success ? (
          <div className="p-3 sm:p-4 bg-chart-5/20 border border-chart-5/50 rounded-lg text-chart-5 text-xs sm:text-sm">
            Thanks for reaching out! I'll get back to you soon.
          </div>
        ) : submitResult && !submitResult.success ? (
          <div className="p-3 sm:p-4 bg-destructive/20 border border-destructive/50 rounded-lg text-destructive text-xs sm:text-sm">
            {submitResult.error}
          </div>
        ) : null
      }
    </form >
  );
}
