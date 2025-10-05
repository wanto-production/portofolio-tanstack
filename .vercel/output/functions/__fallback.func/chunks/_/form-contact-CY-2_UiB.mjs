import { c as createServerRpc, a as createServerFn } from '../virtual/entry.mjs';
import { z } from 'zod';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { C as ContactEmail } from './template-contact-DyNr1AQE.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@tanstack/history';
import '@tanstack/router-core/ssr/client';
import '@tanstack/router-core';
import 'node:async_hooks';
import '@tanstack/router-core/ssr/server';
import 'rou3';
import 'srvx';
import 'tiny-invariant';
import 'seroval';
import 'react/jsx-runtime';
import '@tanstack/react-router/ssr/server';
import '@tanstack/react-router';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});
const sendEmail_createServerFn_handler = createServerRpc("src_components_contact_form-contact_tsx--sendEmail_createServerFn_handler", (opts, signal) => {
  return sendEmail.__executeServer(opts, signal);
});
const sendEmail = createServerFn({
  method: "POST"
}).inputValidator(contactSchema).handler(sendEmail_createServerFn_handler, async ({
  data
}) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const {
      name,
      email,
      subject,
      message
    } = data;
    const emailHtml = await render(ContactEmail({
      name,
      email,
      subject,
      message
    }));
    await resend.emails.send({
      from: `${name} <onboarding@resend.dev>`,
      to: "ikwansatria3974@gmail.com",
      subject: `Pesan Baru: ${subject}`,
      html: emailHtml
    });
    return {
      success: true
    };
  } catch (err) {
    console.error("Send email error:", err);
    return {
      success: false,
      error: "Failed to send email. Please try again."
    };
  }
});

export { sendEmail_createServerFn_handler };
//# sourceMappingURL=form-contact-CY-2_UiB.mjs.map
