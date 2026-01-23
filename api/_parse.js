function collectBody(req) {
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
            if (data.length > 1024 * 1024) {
                reject(new Error("Body too large"));
                req.destroy();
            }
        });
        req.on("end", () => resolve(data));
        req.on("error", reject);
    });
}

function parseUrlEncoded(raw) {
    const params = new URLSearchParams(raw);
    const out = {};
    for (const [k, v] of params.entries()) out[k] = v;
    return out;
}

async function parseRequestBody(req) {
    const contentType = String(req.headers["content-type"] || "").toLowerCase();
    const raw = await collectBody(req);
    if (!raw) return {};

    if (contentType.includes("application/json")) {
        return JSON.parse(raw);
    }

    if (contentType.includes("application/x-www-form-urlencoded")) {
        return parseUrlEncoded(raw);
    }

    return { _raw: raw };
}

function getClientIp(req) {
    const xf = req.headers["x-forwarded-for"];
    if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
    return req.socket?.remoteAddress;
}

function acceptsHtml(req) {
    const accept = String(req.headers["accept"] || "").toLowerCase();
    return accept.includes("text/html");
}

module.exports = {
    parseRequestBody,
    getClientIp,
    acceptsHtml,
};

