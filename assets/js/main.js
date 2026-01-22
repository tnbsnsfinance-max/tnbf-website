// ============================================
// ENHANCED MAIN.JS WITH AOS ANIMATIONS
// ============================================

// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            offset: 100,
        });
    }
});

// ============================================
// ANIMATED STATISTICS COUNTER
// ============================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(Math.floor(target));
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + "Cr";
    if (num >= 100000) return (num / 100000).toFixed(0) + "L";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
}

// Trigger counters when in viewport
const observerOptions = {
    threshold: 0.5,
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

document.querySelectorAll("[data-counter]").forEach((counter) => {
    counterObserver.observe(counter);
});

// ============================================
// POPUP LEAD FORM FUNCTIONALITY
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("leadPopup")) {
        const popupHTML = `
            <div class="popup-overlay" id="leadPopup">
                <div class="popup-content">
                    <button class="popup-close" onclick="closeLeadPopup()">&times;</button>
                    <h2 style="color: var(--primary-color); margin-bottom: 1rem;">Quick Loan Inquiry</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Fill in your details and we'll get back to you in 24-48 hours</p>
                    
                    <div style="background: var(--background-light); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; font-weight: 600; color: var(--primary-color);">
                        <span>📞 78927 60436</span>
                        <span>📞 95136 77677</span>
                        <span>📞 95134 46257</span>
                    </div>
                    
                    <form id="quickLeadForm" action="https://formsubmit.co/tnbsns.finance@gmail.com" method="POST">
                        <input type="hidden" name="_subject" value="New Quick Lead from TNBF Website">
                        <input type="hidden" name="_next" value="https://tnbf.in/pages/thanks.html">
                        <input type="hidden" name="_captcha" value="false">
                        <input type="hidden" name="_template" value="table">
                        
                        <div class="form-group">
                            <label for="popup-name">Full Name *</label>
                            <input type="text" id="popup-name" name="name" required placeholder="Enter your full name">
                        </div>
                        
                        <div class="form-group">
                            <label for="popup-phone">Mobile Number *</label>
                            <input type="tel" id="popup-phone" name="phone" required placeholder="10-digit mobile number" pattern="[0-9]{10}">
                        </div>
                        
                        <div class="form-group">
                            <label for="popup-business">Business Type *</label>
                            <select id="popup-business" name="business_type" required>
                                <option value="">Select your business type</option>
                                <option value="Textile">Textile</option>
                                <option value="Garments">Garments</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Trading">Trading</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Jewellery">Jewellery</option>
                                <option value="FMCG">FMCG</option>
                                <option value="Construction">Construction</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="popup-amount">Loan Amount Needed *</label>
                            <select id="popup-amount" name="loan_amount" required>
                                <option value="">Select loan amount range</option>
                                <option value="5L-10L">₹5 Lakhs - ₹10 Lakhs</option>
                                <option value="10L-25L">₹10 Lakhs - ₹25 Lakhs</option>
                                <option value="25L-50L">₹25 Lakhs - ₹50 Lakhs</option>
                                <option value="50L-1Cr">₹50 Lakhs - ₹1 Crore</option>
                                <option value="1Cr+">₹1 Crore+</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                            Submit Inquiry
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", popupHTML);
    }

    setTimeout(function () {
        if (!localStorage.getItem("tnbf_popup_shown")) {
            showLeadPopup();
            localStorage.setItem("tnbf_popup_shown", "true");
        }
    }, 30000);

    let popupShown = false;
    window.addEventListener("scroll", function () {
        if (!popupShown) {
            const scrollPercent = (window.scrollY /
                (document.body.scrollHeight - window.innerHeight)) * 100;
            if (
                scrollPercent > 50 && !localStorage.getItem("tnbf_popup_shown")
            ) {
                showLeadPopup();
                localStorage.setItem("tnbf_popup_shown", "true");
                popupShown = true;
            }
        }
    });
});

function showLeadPopup() {
    document.getElementById("leadPopup").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLeadPopup() {
    document.getElementById("leadPopup").classList.remove("active");
    document.body.style.overflow = "auto";
}

document.addEventListener("click", function (e) {
    const popup = document.getElementById("leadPopup");
    if (e.target === popup) {
        closeLeadPopup();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeLeadPopup();
    }
});

// ============================================
// CHATBOT INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    const chatbotHTML = `
        <div class="chatbot-trigger" onclick="openChat()" title="Chat with us">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-.967-.272-.297-.471-.446-.966-.446-.495 0-.817.173-1.24.644-.422.47-1.635 1.593-1.635 3.885 0 2.292 1.66 4.47 1.892 4.792.233.322 3.204 4.975 7.855 6.91 3.033 1.262 3.818 1.066 4.498 1.003.955-.088 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.413z"/></svg>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", chatbotHTML);
});

function openChat() {
    if (typeof Tawk_API !== "undefined") {
        Tawk_API.toggle();
    } else {
        window.open(
            "https://wa.me/917892760436?text=Hi, I need information about business loans",
            "_blank",
        );
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================

let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
    } else {
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
    }

    lastScroll = currentScroll;
});

// ============================================
// FORM VALIDATION
// ============================================

// Unified Form Handling with Event Delegation
document.addEventListener("submit", function (e) {
    const form = e.target;
    if (form.tagName !== "FORM") return;

    console.log("Form submission detected:", form.id || "unnamed form");

    // 1. Check if running locally via file:// protocol
    if (window.location.protocol === "file:") {
        e.preventDefault();
        alert(
            "❌ Form Submission Error:\n\nFormSubmit.co (the email service) does not work when opening HTML files directly from your computer (file://).\n\nTo test the form, you MUST use a local server:\n1. Open this project in VS Code.\n2. Right-click index.html and select 'Open with Live Server'.\n\nOnce hosted or served via Live Server, the form will work perfectly!",
        );
        return false;
    }

    // 2. Turnover Validation (Minimum 15L requirement)
    const turnoverSelect = form.querySelector('[name="Monthly Turnover"]') ||
        form.querySelector('[name="monthly_transaction"]') ||
        form.querySelector('[name="loan_amount"]');

    if (turnoverSelect && turnoverSelect.value) {
        const val = turnoverSelect.value.toLowerCase();
        if (
            val.includes("less than") || val.includes("5l-10l") ||
            val.includes("10l-15l")
        ) {
            e.preventDefault();
            alert(
                "⚠️ Minimum ₹15 Lakhs monthly transactions required for loan eligibility.",
            );
            return false;
        }
    }
});

// ============================================
// ANALYTICS TRACKING
// ============================================

function trackEvent(category, action, label) {
    if (typeof gtag !== "undefined") {
        gtag("event", action, {
            "event_category": category,
            "event_label": label,
        });
    }
}

document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function () {
        const btnText = this.textContent.trim();
        trackEvent("Button", "Click", btnText);
    });
});

// ============================================
// APPLY NOW BUTTON - QUICK APPLICATION POPUP
// ============================================

// Create Quick Application Popup
document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("applyPopup")) {
        const applyHTML = `
            <div class="popup-overlay" id="applyPopup">
                <div class="popup-content" style="max-width: 600px;">
                    <button class="popup-close" onclick="closeApplyPopup()">&times;</button>
                    <h2 style="color: var(--primary-color); margin-bottom: 0.5rem; text-align: center;">Quick Loan Application</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem; text-align: center;">Get approved in 24-48 hours • No collateral needed</p>
                    
                    <form id="applyForm" action="https://formsubmit.co/tnbsns.finance@gmail.com" method="POST">
                        <input type="hidden" name="_subject" value="🔥 New Business Loan Application - TNBF">
                        <input type="hidden" name="_captcha" value="false">
                        <input type="hidden" name="_template" value="table">
                        
                        <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">Full Name *</label>
                                <input type="text" name="Full Name" required placeholder="Your full name" style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 8px;">
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 0;">
                                <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">Business Name *</label>
                                <input type="text" name="Business Name" required placeholder="Your business name" style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 8px;">
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 0;">
                                <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">Email *</label>
                                <input type="email" name="Email" required placeholder="your.email@example.com" style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 8px;">
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 0;">
                                <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">Mobile Number *</label>
                                <input type="tel" name="Mobile" required placeholder="10-digit number" pattern="[0-9]{10}" style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 8px;">
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 0;">
                                <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">City / Location *</label>
                                <input type="text" name="Location" required placeholder="Chennai, Bangalore, etc." style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 8px;">
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 0;">
                                <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">Monthly Business Turnover *</label>
                                <select name="Monthly Turnover" required style="width: 100%; padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 8px; background: white;">
                                    <option value="">Select range</option>
                                    <option value="₹15L - ₹25L">₹15 Lakhs - ₹25 Lakhs</option>
                                    <option value="₹25L - ₹50L">₹25 Lakhs - ₹50 Lakhs</option>
                                    <option value="₹50L - ₹1Cr">₹50 Lakhs - ₹1 Crore</option>
                                    <option value="₹1Cr - ₹5Cr">₹1 Crore - ₹5 Crores</option>
                                    <option value="₹5Cr+">₹5 Crores+</option>
                                </select>
                                <small style="color: var(--cta-color); font-weight: 600; display: block; margin-top: 0.5rem;">⚡ Minimum ₹15 Lakhs required</small>
                            </div>
                        </div>
                        
                        <button type="submit" style="width: 100%; margin-top: 1.5rem; padding: 1rem; background: var(--cta-gradient); color: white; border: none; border-radius: 50px; font-size: 1.125rem; font-weight: 700; cursor: pointer;">
                            Submit Application →
                        </button>
                        
                        <p style="text-align: center; color: var(--text-secondary); font-size: 0.875rem; margin: 1rem 0 0; ">
                            Team will contact you within 24 hours
                        </p>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", applyHTML);
    }

    // Bind all "Apply Now" buttons
    document.querySelectorAll("a").forEach((link) => {
        const linkText = link.textContent.trim();
        if (linkText.includes("Apply Now") || linkText.includes("Apply for")) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                showApplyPopup();
            });
        }
    });
});

function showApplyPopup() {
    document.getElementById("applyPopup").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeApplyPopup() {
    document.getElementById("applyPopup").classList.remove("active");
    document.body.style.overflow = "auto";
}

// Close popup on outside click
document.addEventListener("click", function (e) {
    const applyPopup = document.getElementById("applyPopup");
    if (e.target === applyPopup) {
        closeApplyPopup();
    }
});
