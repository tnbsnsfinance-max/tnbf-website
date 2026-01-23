const { createTransport, getEmailFrom, getEmailTo, buildEmailHtml } = require("./_email");
const { parseRequestBody, getClientIp, acceptsHtml } = require("./_parse");

function normalizePhone(value) {
    const digits = String(value || "").replace(/\D/g, "");
    return digits.length ? digits : "";
}

function pick(obj, keys) {
    for (const k of keys) {
        const v = obj[k];
        if (v !== undefined && v !== null && String(v).trim() !== "") return v;
    }
    return "";
}

function mapContactPayload(body) {
    const fullName = pick(body, ["Full Name", "full_name", "name", "contact-name", "contact_name", "contact name"]);
    const businessName = pick(body, ["Business Name", "business_name", "business-name", "business_name", "business name"]);
    const email = pick(body, ["Email", "email", "Email Address"]);
    const phone = pick(body, ["Mobile", "Mobile Number", "phone"]);
    const location = pick(body, ["Location", "city", "location"]);
    const turnover = pick(body, ["Monthly Turnover", "monthly_transaction", "Monthly Business Turnover", "monthly-transaction", "monthly_transaction"]);
    const loanAmount = pick(body, ["Loan Amount", "loan_amount", "Loan Amount Needed", "loan-amount", "loan_amount"]);
    const businessType = pick(body, ["Business Type", "business_type", "Industry", "industry"]);
    const source = pick(body, ["Source", "How did you hear about us?", "source"]);
    const message = pick(body, ["Message", "Additional Information", "message"]);

    return {
        fullName,
        businessName,
        email,
        phone,
        location,
        turnover,
        loanAmount,
        businessType,
        source,
        message,
    };
}

module.exports = async (req, res) => {
    if (req.method === "GET") {
        res.statusCode = 405;
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ ok: false, error: "Method Not Allowed" }));
        return;
    }

    if (req.method !== "POST") {
        res.statusCode = 405;
        res.setHeader("allow", "POST");
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ ok: false, error: "Method Not Allowed" }));
        return;
    }

    try {
        const body = await parseRequestBody(req);
        const honey = String(body._honey || body._hp || "");
        if (honey.trim() !== "") {
            res.statusCode = 200;
            res.setHeader("content-type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ ok: true }));
            return;
        }

        const payload = mapContactPayload(body);
        const phoneDigits = normalizePhone(payload.phone);
        const ip = getClientIp(req);

        if (!payload.fullName || !phoneDigits) {
            res.statusCode = 400;
            res.setHeader("content-type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ ok: false, error: "Missing required fields" }));
            return;
        }

        const transporter = createTransport();
        const from = getEmailFrom();
        const to = getEmailTo();

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

        const subjectParts = ["TNBF Lead", payload.fullName, phoneDigits].filter(Boolean);
        await transporter.sendMail({
            from,
            to,
            replyTo: payload.email || undefined,
            subject: subjectParts.join(" | "),
            html,
        });

        if (acceptsHtml(req)) {
            res.statusCode = 302;
            res.setHeader("location", "/thanks.html");
            res.end();
            return;
        }

        res.statusCode = 200;
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ ok: true }));
    } catch (err) {
        res.statusCode = 500;
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.end(
            JSON.stringify({
                ok: false,
                error: "Email delivery failed",
                code: err && err.code ? String(err.code) : undefined,
            }),
        );
    }
};
