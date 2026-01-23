const nodemailer = require("nodemailer");

function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        const err = new Error(`Missing env var: ${name}`);
        err.code = "MISSING_ENV";
        throw err;
    }
    return value;
}

function getTransportConfig() {
    const transportMode = String(process.env.EMAIL_TRANSPORT || "").toLowerCase();
    if (transportMode === "console" || transportMode === "stream") {
        return {
            streamTransport: true,
            newline: "unix",
            buffer: true,
        };
    }

    const smtpHost = process.env.SMTP_HOST;
    if (smtpHost) {
        const smtpPort = Number(process.env.SMTP_PORT || 587);
        const smtpUser = requireEnv("SMTP_USER");
        const smtpPass = requireEnv("SMTP_PASS");

        return {
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: { user: smtpUser, pass: smtpPass },
        };
    }

    const user = requireEnv("EMAIL_USER");
    const pass = requireEnv("EMAIL_PASS");
    return {
        service: "gmail",
        auth: { user, pass },
    };
}

function getEmailFrom() {
    return process.env.EMAIL_FROM || process.env.EMAIL_USER || process.env.SMTP_USER;
}

function getEmailTo() {
    return process.env.TO_EMAIL || process.env.EMAIL_TO || process.env.EMAIL_USER || process.env.SMTP_USER;
}

function createTransport() {
    return nodemailer.createTransport(getTransportConfig());
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function toLabelValueRows(fields) {
    return fields
        .filter((f) => f && f.label && f.value !== undefined && f.value !== null && String(f.value).trim() !== "")
        .map(
            ({ label, value }) =>
                `<tr><td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f9fafb;width:220px;"><strong>${escapeHtml(label)}</strong></td><td style="padding:10px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`,
        )
        .join("");
}

function buildEmailHtml({ title, subtitle, fields }) {
    const rows = toLabelValueRows(fields);
    const safeTitle = escapeHtml(title || "New Submission");
    const safeSubtitle = subtitle ? escapeHtml(subtitle) : "";

    return `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
  </head>
  <body style="margin:0;background:#f3f4f6;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:680px;margin:0 auto;padding:24px;">
      <div style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="padding:18px 20px;background:#0b3b77;color:#fff;">
          <div style="font-size:18px;font-weight:700;line-height:1.3;">${safeTitle}</div>
          ${safeSubtitle ? `<div style="margin-top:6px;font-size:13px;opacity:0.95;line-height:1.4;">${safeSubtitle}</div>` : ""}
        </div>
        <div style="padding:18px 20px;">
          <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
            <tbody>
              ${rows || `<tr><td style="padding:12px;border:1px solid #e5e7eb;">No fields received.</td></tr>`}
            </tbody>
          </table>
          <div style="margin-top:14px;font-size:12px;color:#6b7280;line-height:1.4;">
            Sent from TNBF website form.
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;
}

module.exports = {
    createTransport,
    getEmailFrom,
    getEmailTo,
    buildEmailHtml,
};
