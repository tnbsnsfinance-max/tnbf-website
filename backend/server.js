const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '../')));

// Serve the home page on root request
app.get('/', (req, res) => {
    res.redirect('/pages/home/index.html');
});

// ============================================
// EMAIL CONFIGURATION
// ============================================

const transporter = nodemailer.createTransport({
    service: "gmail", // or use SMTP settings
    auth: {
        user: process.env.EMAIL_USER || "tnbsns.finance@gmail.com",
        pass: process.env.EMAIL_PASS || "your-app-password-here",
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

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "TNBF Email Server Running" });
});

// Main Contact Form Submission
app.post("/api/contact", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            business_name,
            business_type,
            loan_amount,
            monthly_transaction,
            purpose,
            message,
        } = req.body;

        // Validation
        if (!name || !phone || !monthly_transaction) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }

        // Check ₹15L minimum requirement
        const transactionValue = monthly_transaction.toLowerCase();
        if (
            transactionValue.includes("less than") ||
            transactionValue.includes("below")
        ) {
            return res.status(400).json({
                success: false,
                message: "Minimum ₹15 Lakhs monthly transactions required",
            });
        }

        // Email to Admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: "tnbsns.finance@gmail.com",
            subject: `New Loan Application from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 10px;">
                    <div style="background: linear-gradient(135deg, #003366, #002244); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0;">New Loan Application</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">TNBF Website</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #1e293b; margin-top: 0;">Applicant Details</h2>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Name:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Email:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${
                email || "Not provided"
            }</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Phone:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Business Name:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${
                business_name || "Not provided"
            }</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Business Type:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${
                business_type || "Not specified"
            }</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Loan Amount:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 700; color: #dc2626;">${loan_amount}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Monthly Transaction:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 700; color: #10b981;">${monthly_transaction}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Purpose:</td>
                                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${
                purpose || "Not specified"
            }</td>
                            </tr>
                        </table>
                        
                        ${
                message
                    ? `
                            <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 8px;">
                                <h3 style="color: #1e293b; margin-top: 0;">Additional Message:</h3>
                                <p style="color: #475569; margin: 0;">${message}</p>
                            </div>
                        `
                    : ""
            }
                        
                        <div style="margin-top: 30px; padding: 20px; background: #fee2e2; border-left: 4px solid #d32f2f; border-radius: 6px;">
                            <p style="margin: 0; color: #991b1b; font-weight: 600;">⚡ Action Required: Follow up within 24-48 hours</p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 0.875rem;">
                        <p>This email was sent from TNBF website contact form</p>
                    </div>
                </div>
            `,
        };

        // Confirmation Email to User
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email || phone + "@example.com", // fallback if no email
            subject: "Thank You for Your Loan Application - TNBF",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
                    <div style="background: linear-gradient(135deg, #003366, #002244); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 2rem;">TNBF</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Tamil Nadu Business Finance</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #1e293b;">Dear ${name},</h2>
                        
                        <p style="color: #475569; line-height: 1.8;">Thank you for showing interest in TNBF business loans. We have received your loan application and our team will review it shortly.</p>
                        
                        <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #003366; margin-top: 0;">What Happens Next?</h3>
                            <ol style="color: #475569; line-height: 1.8; margin: 0; padding-left: 20px;">
                                <li>Our team will verify your application details</li>
                                <li>We'll contact you within <strong>24-48 hours</strong></li>
                                <li>Document verification and eligibility check</li>
                                <li>Loan approval and disbursement</li>
                            </ol>
                        </div>
                        
                        <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0; color: #991b1b;">⚡ <strong>Quick Approval:</strong> Most applications are approved within 24-48 hours!</p>
                        </div>
                        
                        <p style="color: #475569; line-height: 1.8;">If you have any questions, feel free to contact us:</p>
                        
                        <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                            <p style="margin: 5px 0; color: #475569;"><strong>Email:</strong> tnbsns.finance@gmail.com</p>
                            <p style="margin: 5px 0; color: #475569;"><strong>Phone:</strong> +91-9876543210</p>
                        </div>
                        
                        <div style="margin-top: 30px; text-align: center;">
                            <p style="color: #64748b; margin: 0;">Thank you for choosing TNBF!</p>
                        </div>
                    </div>
                </div>
            `,
        };

        // Send emails
        await transporter.sendMail(adminMailOptions);
        if (email) {
            await transporter.sendMail(userMailOptions);
        }

        res.json({
            success: true,
            message:
                "Application submitted successfully! We will contact you within 24-48 hours.",
        });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({
            success: false,
            message:
                "Error submitting application. Please try again or contact us directly.",
            error: error.message,
        });
    }
});

// Quick Lead Form (Popup)
app.post("/api/quick-lead", async (req, res) => {
    try {
        const { name, phone, business_type, loan_amount, monthly_transaction } =
            req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "tnbsns.finance@gmail.com",
            subject: `Quick Lead: ${name} - ${business_type}`,
            html: `
                <h2>New Quick Lead from Website</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Business Type:</strong> ${business_type}</p>
                <p><strong>Loan Amount:</strong> ${loan_amount}</p>
                <p><strong>Monthly Transaction:</strong> ${monthly_transaction}</p>
                <p><em>This is a quick inquiry from the popup form</em></p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: "Thank you! We will contact you shortly.",
        });
    } catch (error) {
        console.error("Quick lead error:", error);
        res.status(500).json({
            success: false,
            message: "Error submitting form",
        });
    }
});

// ============================================
// START SERVER
// ============================================

// Only run the server if this file is executed directly (not when imported)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`✅ TNBF Email Server running on port ${PORT}`);
        console.log(
            `📧 Email configured for: ${
                process.env.EMAIL_USER || "tnbsns.finance@gmail.com"
            }`,
        );
    });
}

module.exports = app;
