const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { buildEmailHtml } = require("../api/_email");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, "..")));

// Serve the home page on root request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "pages", "home", "index.html"));
});

// ============================================
// EMAIL CONFIGURATION
// ============================================

const transportMode = String(process.env.EMAIL_TRANSPORT || "").toLowerCase();
const transporter =
    transportMode === "console" || transportMode === "stream"
        ? nodemailer.createTransport({ streamTransport: true, newline: "unix", buffer: true })
        : nodemailer.createTransport({
              service: "gmail",
              auth: {
                  user: process.env.EMAIL_USER,
                  pass: process.env.EMAIL_PASS,
              },
          });

// Verify email configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log("Email configuration error:", error);
    } else {
        console.log("Email server is ready to send messages");
    }
});

// ============================================
// API ENDPOINTS
// ============================================

function pick(obj, keys) {
    for (const k of keys) {
        const v = obj[k];
        if (v !== undefined && v !== null && String(v).trim() !== "") return v;
    }
    return "";
}

function normalizePhone(value) {
    const digits = String(value || "").replace(/\D/g, "");
    return digits.length ? digits : "";
}

function getClientIp(req) {
    const xf = req.headers["x-forwarded-for"];
    if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
    return req.socket?.remoteAddress;
}

function wantsHtml(req) {
    const accept = String(req.headers["accept"] || "").toLowerCase();
    return accept.includes("text/html");
}

function mapContactPayload(body) {
    return {
        fullName: pick(body, ["Full Name", "full_name", "name", "contact-name", "contact_name", "contact name"]),
        businessName: pick(body, ["Business Name", "business_name", "business-name", "business name"]),
        email: pick(body, ["Email", "email", "Email Address"]),
        phone: pick(body, ["Mobile", "Mobile Number", "phone"]),
        location: pick(body, ["Location", "city", "location"]),
        turnover: pick(body, ["Monthly Turnover", "monthly_transaction", "Monthly Business Turnover", "monthly-transaction", "monthly_transaction"]),
        loanAmount: pick(body, ["Loan Amount", "loan_amount", "Loan Amount Needed", "loan-amount", "loan_amount"]),
        businessType: pick(body, ["Business Type", "business_type", "Industry", "industry"]),
        source: pick(body, ["Source", "How did you hear about us?", "source"]),
        message: pick(body, ["Message", "Additional Information", "message"]),
    };
}

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "TNBF Email Server Running" });
});

// Main Contact Form Submission
app.post("/api/contact", async (req, res) => {
    try {
        const body = req.body || {};
        const honey = String(body._honey || body._hp || "");
        if (honey.trim() !== "") {
            return res.json({ success: true });
        }

        const payload = mapContactPayload(body);
        const phoneDigits = normalizePhone(payload.phone);
        const ip = getClientIp(req);

        if (!payload.fullName || !phoneDigits) {
            return res.status(400).json({ success: false, message: "Required fields missing" });
        }

        const html = buildEmailHtml({
            title: "New Loan Application / Lead",
            subtitle: "TNBF website submission",
            fields: [
                { label: "Full Name", value: payload.fullName },
                { label: "Business Name", value: payload.businessName },
                { label: "Mobile", value: phoneDigits },
                { label: "Email", value: payload.email },
                { label: "Location", value: payload.location },
                { label: "Monthly Turnover", value: payload.turnover },
                { label: "Loan Amount", value: payload.loanAmount },
                { label: "Business Type", value: payload.businessType },
                { label: "Source", value: payload.source },
                { label: "Message", value: payload.message },
                { label: "IP", value: ip },
            ],
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.TO_EMAIL || "tnbsns.finance@gmail.com",
            replyTo: payload.email || undefined,
            subject: ["TNBF Lead", payload.fullName, phoneDigits].filter(Boolean).join(" | "),
            html,
        });

        if (wantsHtml(req)) {
            return res.redirect("/thanks.html");
        }

        res.json({ success: true, message: "Submitted successfully" });
    } catch {
        res.status(500).json({ success: false, message: "Email delivery failed" });
    }
});

// Quick Lead Form (Popup)
app.post("/api/quick-lead", async (req, res) => {
    try {
        const body = req.body || {};
        const honey = String(body._honey || body._hp || "");
        if (honey.trim() !== "") {
            return res.json({ success: true });
        }

        const name = String(body.name || body["Full Name"] || "").trim();
        const phoneDigits = normalizePhone(body.phone || body.Mobile || body["Mobile Number"]);
        const businessType = String(body.business_type || body["Business Type"] || "").trim();
        const loanAmount = String(body.loan_amount || body["Loan Amount"] || "").trim();
        const ip = getClientIp(req);

        if (!name || !phoneDigits) {
            return res.status(400).json({ success: false, message: "Required fields missing" });
        }

        const html = buildEmailHtml({
            title: "New Quick Loan Inquiry",
            subtitle: "TNBF website popup lead",
            fields: [
                { label: "Name", value: name },
                { label: "Mobile", value: phoneDigits },
                { label: "Business Type", value: businessType },
                { label: "Loan Amount", value: loanAmount },
                { label: "IP", value: ip },
            ],
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.TO_EMAIL || "tnbsns.finance@gmail.com",
            subject: ["TNBF Quick Lead", name, phoneDigits].filter(Boolean).join(" | "),
            html,
        });

        if (wantsHtml(req)) {
            return res.redirect("/thanks.html");
        }

        res.json({ success: true, message: "Submitted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Email delivery failed" });
    }
});

// ============================================
// START SERVER
// ============================================

// Only run the server if this file is executed directly (not when imported)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`✅ TNBF Email Server running on port ${PORT}`);
        console.log(`📧 Email configured for: ${process.env.EMAIL_USER || "(not set)"}`);
    });
}

module.exports = app;
