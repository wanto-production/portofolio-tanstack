import { jsxs, jsx } from 'react/jsx-runtime';
import { Html, Head, Preview, Body, Container, Section, Text, Heading, Link, Hr } from '@react-email/components';

function ContactEmail({ name, email, subject, message }) {
  const previewText = `Pesan baru dari ${name}: ${subject}`;
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsx(Preview, { children: previewText }),
    /* @__PURE__ */ jsx(Body, { style: main, children: /* @__PURE__ */ jsxs(Container, { style: container, children: [
      /* @__PURE__ */ jsx(Section, { style: header, children: /* @__PURE__ */ jsx(Text, { style: headerText, children: "\u{1F4E7} Pesan Baru dari Portofolio" }) }),
      /* @__PURE__ */ jsxs(Section, { style: content, children: [
        /* @__PURE__ */ jsx(Heading, { style: heading, children: "Detail Pesan" }),
        /* @__PURE__ */ jsxs(Text, { style: paragraph, children: [
          /* @__PURE__ */ jsx("strong", { children: "Nama:" }),
          " ",
          name
        ] }),
        /* @__PURE__ */ jsxs(Text, { style: paragraph, children: [
          /* @__PURE__ */ jsx("strong", { children: "Email:" }),
          " ",
          /* @__PURE__ */ jsx(Link, { href: `mailto:${email}`, style: link, children: email })
        ] }),
        /* @__PURE__ */ jsxs(Text, { style: paragraph, children: [
          /* @__PURE__ */ jsx("strong", { children: "Subjek:" }),
          " ",
          subject
        ] }),
        /* @__PURE__ */ jsx(Text, { style: paragraph, children: /* @__PURE__ */ jsx("strong", { children: "Pesan:" }) }),
        /* @__PURE__ */ jsx(Text, { style: messageText, children: message })
      ] }),
      /* @__PURE__ */ jsx(Hr, { style: hr }),
      /* @__PURE__ */ jsx(Section, { style: footer, children: /* @__PURE__ */ jsx(Text, { style: footerText, children: "Dikirim otomatis dari form portofolio di website Anda." }) })
    ] }) })
  ] });
}
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'
};
const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px"
};
const header = {
  padding: "20px 30px",
  backgroundColor: "#2563eb",
  borderRadius: "4px 4px 0 0"
};
const headerText = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0"
};
const content = {
  padding: "40px 30px"
};
const heading = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  marginTop: "0",
  marginBottom: "30px",
  textAlign: "center"
};
const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px"
};
const messageText = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
  whiteSpace: "pre-wrap",
  backgroundColor: "#f8f9fa",
  padding: "16px",
  borderRadius: "4px",
  border: "1px solid #e9ecef"
};
const link = {
  color: "#2563eb",
  textDecoration: "underline"
};
const hr = {
  borderColor: "#e6ebf1",
  margin: "40px 0"
};
const footer = {
  padding: "0 30px"
};
const footerText = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "0",
  textAlign: "center"
};

export { ContactEmail as C };
//# sourceMappingURL=template-contact-DyNr1AQE.mjs.map
