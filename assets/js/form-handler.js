// TNBF Website - Form Handler
document.addEventListener("DOMContentLoaded", function () {
    const applyForm = document.getElementById("apply-form");

    if (applyForm) {
        applyForm.addEventListener("submit", function (e) {
            // Check if running locally via file:// protocol
            if (window.location.protocol === "file:") {
                e.preventDefault();
                alert(
                    "❌ Form Submission Error:\n\nForms cannot submit when opening HTML files directly from your computer (file://).\n\nTo test the form, you must open this project through a Web Server (e.g., VS Code 'Live Server') or deploy it.",
                );
                return false;
            }

            // Get form data for validation
            const formData = new FormData(applyForm);
            const data = Object.fromEntries(formData.entries());

            // Validate monthly transaction amount
            const monthlyTransaction = parseInt(data["monthly-transaction"]);
            if (monthlyTransaction < 1500000) {
                e.preventDefault();
                alert("Monthly transaction amount must be at least ₹15 Lakhs");
                return;
            }

            const actionUrl = new URL(applyForm.getAttribute("action") || "", window.location.href);
            if (actionUrl.origin === window.location.origin && actionUrl.pathname.startsWith("/api/")) {
                e.preventDefault();

                const submitButton = applyForm.querySelector('button[type="submit"], input[type="submit"]');
                const originalLabel = submitButton
                    ? (submitButton.tagName === "INPUT" ? submitButton.value : submitButton.textContent)
                    : "";
                if (submitButton) {
                    submitButton.disabled = true;
                    if (submitButton.tagName === "INPUT") submitButton.value = "Submitting...";
                    if (submitButton.tagName === "BUTTON") submitButton.textContent = "Submitting...";
                }

                const body = new URLSearchParams();
                for (const [key, value] of formData.entries()) {
                    body.append(key, String(value));
                }

                fetch(actionUrl.toString(), {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: body.toString(),
                })
                    .then(async (resp) => {
                        if (!resp.ok) {
                            let msg = "Submission failed. Please try again.";
                            try {
                                const data = await resp.json();
                                if (data && data.error) msg = data.error;
                            } catch {}
                            throw new Error(msg);
                        }
                        window.location.href = "/thanks.html";
                    })
                    .catch((err) => {
                        alert(err && err.message ? err.message : "Submission failed. Please try again.");
                    })
                    .finally(() => {
                        if (submitButton) {
                            submitButton.disabled = false;
                            if (submitButton.tagName === "INPUT") submitButton.value = originalLabel;
                            if (submitButton.tagName === "BUTTON") submitButton.textContent = originalLabel;
                        }
                    });
            }
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
        phoneInput.addEventListener("input", function (e) {
            // Remove non-numeric characters
            let value = e.target.value.replace(/\D/g, "");

            // Limit to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10);
            }

            e.target.value = value;
        });
    }
});
