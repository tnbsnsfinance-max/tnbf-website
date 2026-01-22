// ============================================
// ADVANCED FEATURES - ELIGIBILITY & SOCIAL PROOF
// ============================================

// ============================================
// INSTANT ELIGIBILITY CHECKER LOGIC
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    const eligibilityForm = document.getElementById("eligibilityChecker");
    if (eligibilityForm) {
        eligibilityForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const turnover = formData.get("monthly_turnover");
            const businessType = formData.get("business_type");
            const gstStatus = formData.get("gst_status");

            const resultDiv = document.getElementById("eligibilityResult");
            const resultContent = document.getElementById("resultContent");

            // Eligibility Logic
            if (turnover === "below-15L") {
                // Not Eligible
                resultContent.innerHTML = `
                    <div style="background: #fef2f2; border: 2px solid var(--cta-color); padding: 2rem; border-radius: var(--radius-lg);">
                        <h3 style="color: var(--cta-color); margin-bottom: 1rem;">⚠️ Current Eligibility Status</h3>
                        <p style="color: var(--text-primary); font-size: 1.125rem; margin-bottom: 1rem;">
                            Minimum ₹15 Lakhs monthly turnover is required for TNBF(Tamil Nadu Business Finance) business loans.
                        </p>
                        <p style="color: var(--text-secondary);">
                            We recommend growing your business transactions and applying once you meet the criteria. We're here to help when you're ready!
                        </p>
                        <div style="margin-top: 1.5rem; padding: 1rem; background: white; border-radius: var(--radius-md);">
                            <p style="font-weight: 600; margin-bottom: 0.5rem;">💡 Tip:</p>
                            <p style="margin: 0; font-size: 0.95rem;">Consider consolidating multiple business accounts to meet the requirement.</p>
                        </div>
                    </div>
                `;
            } else {
                // Eligible - Calculate loan amount range
                let minLoan, maxLoan, interestFrom;
                if (turnover === "15-25L") {
                    minLoan = 15;
                    maxLoan = 37.5;
                    interestFrom = "1.5%";
                } else if (turnover === "25L-50L") {
                    minLoan = 25;
                    maxLoan = 75;
                    interestFrom = "1.5%";
                } else if (turnover === "50L-1Cr") {
                    minLoan = 50;
                    maxLoan = 150;
                    interestFrom = "1.5%";
                } else if (turnover === "1Cr-5Cr") {
                    minLoan = 100;
                    maxLoan = 750;
                    interestFrom = "1.4%";
                } else {
                    minLoan = 500;
                    maxLoan = 1000;
                    interestFrom = "1.3%";
                }

                resultContent.innerHTML = `
                    <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); border: 2px solid var(--accent-color); padding: 2rem; border-radius: var(--radius-lg);">
                        <h3 style="color: var(--accent-color); margin-bottom: 1rem; font-size: 1.75rem;">🎉 Congratulations! You're Pre-Qualified</h3>
                        <div style="background: white; padding: 1.5rem; border-radius: var(--radius-md); margin: 1.5rem 0; box-shadow: var(--shadow-md);">
                            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 0.5rem;">Your Eligible Loan Amount</p>
                            <p style="color: var(--primary-color); font-size: 2.5rem; font-weight: 900; margin: 0; line-height: 1;">₹${minLoan}L - ₹${maxLoan}L</p>
                            <p style="color: var(--text-light); font-size: 0.875rem; margin-top: 0.5rem;">Based on 150% of monthly turnover</p>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0;">
                            <div style="background: white; padding: 1rem; border-radius: var(--radius-md);">
                                <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">Interest Rate</p>
                                <p style="color: var(--primary-color); font-size: 1.5rem; font-weight: 700; margin: 0;">From ${interestFrom} pm</p>
                            </div>
                            <div style="background: white; padding: 1rem; border-radius: var(--radius-md);">
                                <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">Approval Time</p>
                                <p style="color: var(--accent-color); font-size: 1.5rem; font-weight: 700; margin: 0;">24-48 Hours</p>
                            </div>
                        </div>
                        <div style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
                            <p style="font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">✓ What's Next:</p>
                            <ul style="margin: 0; padding-left: 1.5rem; color: var(--text-secondary);">
                                <li>Complete full application</li>
                                <li>Upload required documents</li>
                                <li>Get final approval in 24-48 hours</li>
                            </ul>
                        </div>
                        <button onclick="showApplyPopup()" style="background: var(--cta-gradient); color: white; padding: 1.25rem 3rem; border: none; border-radius: 50px; font-size: 1.25rem; font-weight: 700; cursor: pointer; box-shadow: var(--shadow-lg);">
                            Continue Application →
                        </button>
                    </div>
                `;

                // Track conversion event
                if (typeof gtag !== "undefined") {
                    gtag("event", "eligibility_check_passed", {
                        "turnover_range": turnover,
                        "business_type": businessType,
                        "loan_range": `${minLoan}L-${maxLoan}L`,
                    });
                }
            }

            resultDiv.style.display = "block";
            resultDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
    }
});

// ============================================
// SOCIAL PROOF LIVE NOTIFICATIONS
// ============================================

const approvalNotifications = [
    {
        name: "Rajesh Kumar",
        city: "Chennai",
        amount: "45 Lakhs",
        industry: "Textiles",
        time: "2 minutes ago",
    },
    {
        name: "Priya Enterprises",
        city: "Coimbatore",
        amount: "30 Lakhs",
        industry: "Manufacturing",
        time: "5 minutes ago",
    },
    {
        name: "Amit Trading Co",
        city: "Bangalore",
        amount: "75 Lakhs",
        industry: "Wholesale",
        time: "8 minutes ago",
    },
    {
        name: "Suresh M",
        city: "Madurai",
        amount: "20 Lakhs",
        industry: "Retail",
        time: "12 minutes ago",
    },
    {
        name: "Deepa Textiles",
        city: "Tirupur",
        amount: "60 Lakhs",
        industry: "Textiles",
        time: "15 minutes ago",
    },
    {
        name: "Kumar Electronics",
        city: "Salem",
        amount: "35 Lakhs",
        industry: "Electronics",
        time: "18 minutes ago",
    },
    {
        name: "Lakshmi Jewellers",
        city: "Chennai",
        amount: "90 Lakhs",
        industry: "Jewellery",
        time: "22 minutes ago",
    },
];

let notificationIndex = 0;

function showSocialProofNotification() {
    const notification = approvalNotifications[notificationIndex];

    const notifHTML = `
        <div class="social-proof-notification" style="position: fixed; bottom: 30px; left: 30px; background: white; padding: 1rem 1.5rem; border-radius: var(--radius-lg); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15); z-index: 9999; max-width: 350px; animation: slideInLeft 0.5s ease-out; border-left: 4px solid var(--accent-color);">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 45px; height: 45px; background: linear-gradient(135deg, var(--accent-color), var(--accent-dark)); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; flex-shrink: 0; font-size: 1.25rem;">
                    ✓
                </div>
                <div style="flex: 1;">
                    <p style="font-weight: 700; color: var(--text-primary); margin: 0; font-size: 0.95rem;">
                        ${notification.name}
                    </p>
                    <p style="color: var(--primary-color); margin: 0.25rem 0 0 0; font-size: 0.875rem; font-weight: 600;">
                        ₹${notification.amount} approved
                    </p>
                    <p style="color: var(--text-light); margin: 0.25rem 0 0 0; font-size: 0.8rem;">
                        ${notification.city} • ${notification.industry}
                    </p>
                </div>
            </div>
        </div>
    `;

    // Remove existing notification
    const existing = document.querySelector(".social-proof-notification");
    if (existing) existing.remove();

    document.body.insertAdjacentHTML("beforeend", notifHTML);

    // Auto remove after 6 seconds
    setTimeout(() => {
        const notif = document.querySelector(".social-proof-notification");
        if (notif) {
            notif.style.animation = "slideOutLeft 0.5s ease-in";
            setTimeout(() => notif.remove(), 500);
        }
    }, 6000);

    notificationIndex = (notificationIndex + 1) % approvalNotifications.length;
}

// Show first notification after 8 seconds, then every 18 seconds
setTimeout(() => {
    showSocialProofNotification();
    setInterval(showSocialProofNotification, 18000);
}, 8000);

// ============================================
// LIVE VIEWER COUNTER
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    const viewerCount = document.getElementById("viewerCount");
    if (viewerCount) {
        let count = 127;

        // Update count every 8 seconds with realistic variance
        setInterval(() => {
            const time = new Date().getHours();
            let baseCount = 100;

            // More viewers during business hours (9 AM - 7 PM)
            if (time >= 9 && time <= 19) {
                baseCount = 120;
            }

            count = baseCount + Math.floor(Math.random() * 35);
            viewerCount.textContent = count;
        }, 8000);
    }
});

// ============================================
// ANIMATIONS
// ============================================

const style = document.createElement("style");
style.textContent = `
    @keyframes slideInLeft {
        from {
            transform: translateX(-120%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutLeft {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-120%);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
        }
        50% {
            box-shadow: 0 4px 30px rgba(37, 211, 102, 0.7);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// ENHANCED FORM TRACKING
// ============================================

// Track form field interactions
document.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("focus", function () {
        if (typeof gtag !== "undefined") {
            gtag("event", "form_field_focus", {
                "field_name": this.name || this.id,
                "field_type": this.type,
            });
        }
    });
});

// Track Apply Now button clicks
document.querySelectorAll('[onclick*="showApplyPopup"]').forEach((btn) => {
    btn.addEventListener("click", function () {
        if (typeof gtag !== "undefined") {
            gtag("event", "apply_now_clicked", {
                "source": this.closest("section")?.className || "unknown",
            });
        }
    });
});

console.log("✅ TNBF Advanced Features Loaded Successfully");
