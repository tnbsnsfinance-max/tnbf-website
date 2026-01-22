// ============================================
// TNBF PROFESSIONAL CHATBOT
// Based on CHATBOT_PROMPT.md
// ============================================

class TNBFChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationState = "initial";
        this.userData = {};
        this.init();
    }

    init() {
        this.createChatWidget();
        this.attachEventListeners();
    }

    createChatWidget() {
        const chatHTML = `
            <!-- Chatbot Float Button -->
            <div id="chatbot-trigger" class="chatbot-trigger">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span class="chat-badge">1</span>
            </div>

            <!-- Chatbot Window -->
            <div id="chatbot-window" class="chatbot-window">
                <div class="chatbot-header">
                    <div>
                        <h4>TNBF(Tamil Nadu Business Finance) Virtual Assistant</h4>
                        <p>Business Loan Help • Tamil & English</p>
                    </div>
                    <button id="chatbot-close" class="chatbot-close">×</button>
                </div>
                <div id="chatbot-messages" class="chatbot-messages">
                    <!-- Messages will be added here -->
                </div>
                <div class="chatbot-input-area">
                    <div id="chatbot-quick-replies" class="chatbot-quick-replies">
                        <!-- Quick reply buttons will be added here -->
                    </div>
                    <div class="chatbot-input-container">
                        <input type="text" id="chatbot-input" placeholder="Type your message..." />
                        <button id="chatbot-send">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML("beforeend", chatHTML);

        // Add chatbot styles
        const style = document.createElement("style");
        style.textContent = `
            .chatbot-trigger {
                position: fixed;
                bottom: 30px;
                left: 30px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0, 51, 102, 0.4);
                z-index: 9998;
                transition: all 0.3s ease;
                color: white;
            }

            .chatbot-trigger:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 30px rgba(0, 51, 102, 0.6);
            }

            .chat-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: var(--cta-color);
                color: white;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.75rem;
                font-weight: 700;
            }

            .chatbot-window {
                position: fixed;
                bottom: 100px;
                left: 30px;
                width: 380px;
                height: 550px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                display: none;
                flex-direction: column;
                z-index: 9999;
                overflow: hidden;
            }

            .chatbot-window.open {
                display: flex;
                animation: slideUp 0.3s ease-out;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .chatbot-header {
                background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
                color: white;
                padding: 1.25rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .chatbot-header h4 {
                margin: 0;
                font-size: 1.125rem;
                font-weight: 700;
            }

            .chatbot-header p {
                margin: 0.25rem 0 0 0;
                font-size: 0.875rem;
                opacity: 0.95;
            }

            .chatbot-close {
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                line-height: 1;
                padding: 0;
                width: 32px;
                height: 32px;
            }

            .chatbot-messages {
                flex: 1;
                overflow-y: auto;
                padding: 1rem;
                background: #f8fafc;
            }

            .chatbot-message {
                margin-bottom: 1rem;
                display: flex;
                flex-direction: column;
            }

            .chatbot-message.bot {
                align-items: flex-start;
            }

            .chatbot-message.user {
                align-items: flex-end;
            }

            .message-bubble {
                max-width: 75%;
                padding: 0.75rem 1rem;
                border-radius: 12px;
                font-size: 0.95rem;
                line-height: 1.5;
                animation: fadeIn 0.3s ease-out;
            }

            .chatbot-message.bot .message-bubble {
                background: white;
                color: var(--text-primary);
                border: 1px solid #e2e8f0;
            }

            .chatbot-message.user .message-bubble {
                background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
                color: white;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .chatbot-quick-replies {
                display: flex;
                gap: 0.5rem;
                padding: 0.75rem;
                flex-wrap: wrap;
                background: white;
                border-top: 1px solid #e2e8f0;
            }

            .quick-reply-btn {
                padding: 0.5rem 1rem;
                background: white;
                border: 2px solid var(--primary-color);
                color: var(--primary-color);
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.875rem;
                font-weight: 600;
                transition: all 0.2s;
            }

            .quick-reply-btn:hover {
                background: var(--primary-color);
                color: white;
            }

            .chatbot-input-container {
                display: flex;
                padding: 1rem;
                background: white;
                border-top: 1px solid #e2e8f0;
            }

            #chatbot-input {
                flex: 1;
                padding: 0.75rem;
                border: 2px solid #e2e8f0;
                border-radius: 24px;
                font-size: 0.95rem;
                outline: none;
            }

            #chatbot-input:focus {
                border-color: var(--primary-color);
            }

            #chatbot-send {
                background: var(--primary-color);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-left: 0.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            #chatbot-send:hover {
                background: var(--primary-dark);
                transform: scale(1.05);
            }

            @media (max-width: 768px) {
                .chatbot-window {
                    left: 10px;
                    right: 10px;
                    bottom: 80px;
                    width: auto;
                    height: 500px;
                }

                .chatbot-trigger {
                    left: 20px;
                    bottom: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    attachEventListeners() {
        document.getElementById("chatbot-trigger").addEventListener(
            "click",
            () => this.toggleChat(),
        );
        document.getElementById("chatbot-close").addEventListener(
            "click",
            () => this.closeChat(),
        );
        document.getElementById("chatbot-send").addEventListener(
            "click",
            () => this.sendMessage(),
        );
        document.getElementById("chatbot-input").addEventListener(
            "keypress",
            (e) => {
                if (e.key === "Enter") this.sendMessage();
            },
        );
    }

    toggleChat() {
        const window = document.getElementById("chatbot-window");
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            window.classList.add("open");
            document.getElementById("chatbot-trigger").style.display = "none";

            // Hide badge
            document.querySelector(".chat-badge").style.display = "none";

            // Initial greeting if first time
            if (this.conversationState === "initial") {
                this.showGreeting();
            }
        } else {
            window.classList.remove("open");
            document.getElementById("chatbot-trigger").style.display = "flex";
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById("chatbot-window").classList.remove("open");
        document.getElementById("chatbot-trigger").style.display = "flex";
    }

    showGreeting() {
        this.addBotMessage(`
            👋 வணக்கம்! TNBF(Tamil Nadu Business Finance)-க்கு வரவேற்கிறோம்.<br><br>
            Hello! Welcome to TNBF(Tamil Nadu Business Finance). I'm here to help you with business loan queries.
        `);

        setTimeout(() => {
            this.showQuickReplies([
                { text: "✓ Loan Details", action: "loan_details" },
                { text: "✓ Check Eligibility", action: "check_eligibility" },
                { text: "✓ Contact Team", action: "contact" },
            ]);
        }, 1000);

        this.conversationState = "greeting_shown";
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById("chatbot-messages");
        const messageDiv = document.createElement("div");
        messageDiv.className = "chatbot-message bot";
        messageDiv.innerHTML = `<div class="message-bubble">${message}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById("chatbot-messages");
        const messageDiv = document.createElement("div");
        messageDiv.className = "chatbot-message user";
        messageDiv.innerHTML = `<div class="message-bubble">${message}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showQuickReplies(replies) {
        const container = document.getElementById("chatbot-quick-replies");
        container.innerHTML = "";

        replies.forEach((reply) => {
            const btn = document.createElement("button");
            btn.className = "quick-reply-btn";
            btn.textContent = reply.text;
            btn.onclick = () => this.handleQuickReply(reply.action, reply.text);
            container.appendChild(btn);
        });
    }

    handleQuickReply(action, text) {
        this.addUserMessage(text);
        document.getElementById("chatbot-quick-replies").innerHTML = "";

        switch (action) {
            case "loan_details":
                this.showLoanDetails();
                break;
            case "check_eligibility":
                this.startEligibilityCheck();
                break;
            case "contact":
                this.showContactInfo();
                break;
            case "eligible_yes":
                this.collectLeadInfo();
                break;
            case "eligible_no":
                this.handleNotEligible();
                break;
        }
    }

    showLoanDetails() {
        this.addBotMessage(`
            <strong>TNBF Business Loans:</strong><br><br>
            💰 <strong>Amount:</strong> ₹5 Lakhs to ₹10 Crores<br>
            ⏱️ <strong>Approval:</strong> 24-48 hours<br>
            📅 <strong>Tenure:</strong> 4 to 15 months<br>
            💳 <strong>Interest:</strong> Starting from 1.5% per month<br>
            ✓ <strong>Collateral:</strong> Not required<br><br>
            <strong>Minimum Requirement:</strong> ₹15 Lakhs monthly bank transactions
        `);

        setTimeout(() => {
            this.showQuickReplies([
                { text: "Check Eligibility", action: "check_eligibility" },
                { text: "Contact Team", action: "contact" },
            ]);
        }, 1500);
    }

    startEligibilityCheck() {
        this.addBotMessage(`
            உங்கள் வணிகத்தின் மாதாந்திர bank transactions ₹15 லட்சம் அல்லது அதற்கு மேல் இருக்கிறதா?<br><br>
            <em>Does your business have ₹15 Lakhs+ monthly bank transactions?</em>
        `);

        setTimeout(() => {
            this.showQuickReplies([
                { text: "Yes ✓", action: "eligible_yes" },
                { text: "No", action: "eligible_no" },
                { text: "Not sure", action: "eligible_no" },
            ]);
        }, 1000);
    }

    collectLeadInfo() {
        this.conversationState = "collecting_info";
        this.addBotMessage(`
            அருமை! 🎉 நீங்கள் TNBF(Tamil Nadu Business Finance) business loan-க்கு eligible ஆக இருக்கலாம்.<br><br>
            <strong>Great! Please share your details:</strong>
        `);

        setTimeout(() => {
            // Show apply popup instead of collecting in chat
            this.addBotMessage(`
                உங்கள் விவரங்களை எங்கள் quick application form-ல் share செய்யுங்கள்.<br><br>
                Click the button below to apply:
            `);

            setTimeout(() => {
                if (typeof showApplyPopup === "function") {
                    showApplyPopup();
                    this.addBotMessage(`
                        ✓ Application form opened! Fill in your details and our team will contact you within 24 hours.
                    `);
                }
            }, 1000);
        }, 1000);
    }

    handleNotEligible() {
        this.addBotMessage(`
            இப்போது minimum eligibility ₹15 லட்சம் monthly transactions தேவைப்படுகிறது.<br><br>
            எதிர்காலத்தில் qualify ஆனதும் தயங்காமல் தொடர்பு கொள்ளுங்கள் 🙂<br><br>
            <strong>Current requirement:</strong> Minimum ₹15 Lakhs monthly bank transactions<br><br>
            Feel free to contact us when you qualify!
        `);

        setTimeout(() => {
            this.showQuickReplies([
                { text: "Contact Team", action: "contact" },
                { text: "Loan Details", action: "loan_details" },
            ]);
        }, 1500);
    }

    showContactInfo() {
        this.addBotMessage(`
            📧 <strong>Email:</strong> tnbsns.finance@gmail.com<br>
            📍 <strong>Our Branches:</strong> Chennai, Bangalore, Coimbatore, Tirunelveli<br>
            📞 <strong>Call Us:</strong> 78927 60436 / 95136 77677 / 95134 46257<br><br>
            Our team will respond within 24 hours!
        `);

        setTimeout(() => {
            const whatsappBtn = `
                <a href="https://wa.me/917892760436?text=Hi%20TNBF%2C%20I%20need%20information%20about%20business%20loans" 
                   target="_blank" 
                   style="display: inline-block; background: #25D366; color: white; padding: 0.75rem 1.5rem; border-radius: 24px; text-decoration: none; font-weight: 600; margin-top: 0.5rem;">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" style="vertical-align: middle; margin-right: 0.5rem;"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-.967-.272-.297-.471-.446-.966-.446-.495 0-.817.173-1.24.644-.422.47-1.635 1.593-1.635 3.885 0 2.292 1.66 4.47 1.892 4.792.233.322 3.204 4.975 7.855 6.91 3.033 1.262 3.818 1.066 4.498 1.003.955-.088 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.413z"/></svg> Chat on WhatsApp
                </a>
            `;
            this.addBotMessage(whatsappBtn);
        }, 1000);
    }

    sendMessage() {
        const input = document.getElementById("chatbot-input");
        const message = input.value.trim();

        if (!message) return;

        this.addUserMessage(message);
        input.value = "";

        // Simple keyword matching
        setTimeout(() => {
            this.handleUserInput(message.toLowerCase());
        }, 500);
    }

    handleUserInput(message) {
        if (
            message.includes("loan") || message.includes("amount") ||
            message.includes("கடன்")
        ) {
            this.showLoanDetails();
        } else if (
            message.includes("eligibility") || message.includes("eligible") ||
            message.includes("qualify")
        ) {
            this.startEligibilityCheck();
        } else if (
            message.includes("contact") || message.includes("call") ||
            message.includes("email")
        ) {
            this.showContactInfo();
        } else if (message.includes("apply") || message.includes("விண்ணப்பம்")) {
            this.collectLeadInfo();
        } else {
            this.addBotMessage(`
                I can help you with:<br><br>
                • Business loan details<br>
                • Eligibility check<br>
                • Contact information<br>
                • Apply for loan<br><br>
                What would you like to know?
            `);

            setTimeout(() => {
                this.showQuickReplies([
                    { text: "Loan Details", action: "loan_details" },
                    { text: "Check Eligibility", action: "check_eligibility" },
                ]);
            }, 1000);
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    const chatbot = new TNBFChatbot();
    console.log("✅ TNBF Chatbot initialized");
});
