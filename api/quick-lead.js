const { createTransport, getEmailFrom, getEmailTo, buildEmailHtml } = require("./_email");
const { parseRequestBody, getClientIp, acceptsHtml } = require("./_parse");

function normalizePhone(value) {
    const digits = String(value || "").replace(/\D/g, "");
    return digits.length ? digits : "";
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

        const name = String(body.name || body["Full Name"] || "").trim();
        const phone = normalizePhone(body.phone || body.Mobile || body["Mobile Number"]);
        const businessType = String(body.business_type || body["Business Type"] || "").trim();
        const loanAmount = String(body.loan_amount || body["Loan Amount"] || "").trim();
        const ip = getClientIp(req);

        if (!name || !phone) {
            res.statusCode = 400;
            res.setHeader("content-type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ ok: false, error: "Missing required fields" }));
            return;
        }

        const transporter = createTransport();
        const from = getEmailFrom();
        const to = getEmailTo();

        const html = buildEmailHtml({
            title: "New Quick Loan Inquiry",
            subtitle: "TNBF website popup lead",
            fields: [
                { label: "Name", value: name },
                { label: "Mobile", value: phone },
                { label: "Business Type", value: businessType },
                { label: "Loan Amount", value: loanAmount },
                { label: "IP", value: ip },
            ],
        });

        await transporter.sendMail({
            from,
            to,
            subject: ["TNBF Quick Lead", name, phone].filter(Boolean).join(" | "),
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

