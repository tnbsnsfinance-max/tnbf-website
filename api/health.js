module.exports = async (req, res) => {
    if (req.method !== "GET") {
        res.statusCode = 405;
        res.setHeader("allow", "GET");
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ ok: false, error: "Method Not Allowed" }));
        return;
    }

    res.statusCode = 200;
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ ok: true, service: "tnbf-email" }));
};

