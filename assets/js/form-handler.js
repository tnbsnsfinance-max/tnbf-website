// TNBF Website - Form Handler
document.addEventListener("DOMContentLoaded", function () {
    const applyForm = document.getElementById("apply-form");

    if (applyForm) {
        applyForm.addEventListener("submit", function (e) {
            // Check if running locally via file:// protocol
            if (window.location.protocol === "file:") {
                e.preventDefault();
                alert(
                    "❌ Form Submission Error:\n\nFormSubmit.co (the email service) does not work when opening HTML files directly from your computer (file://).\n\nTo test the form, you must either:\n1. Open this project through a Web Server (e.g., VS Code 'Live Server').\n2. Upload the website to your hosting or GitHub Pages.\n\nOnce hosted, the form will work perfectly!",
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
