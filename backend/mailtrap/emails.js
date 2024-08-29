import { mailtrapClient, sender } from "./mailtrap.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { response } from "express";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"

        })

        console.log("Email sent successfully", response)
        
    } catch (error) {
        console.error(`Error sending verifcation ${error}`);
        throw new Error(`Error sending verifcation email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "e5dfc157-ff50-4be2-af16-0ef5e2730217",
            template_variables: {
               company_info_name: "Tropical",
               name: name,
               company_info_address: "16625 Blackie Rd",
               company_info_city: "Prunedale",
               company_info_zip_code: "94907",
               company_info_country: "United States"
            },
        });

        console.log("Welcome email sent successfully ", response);
    } catch (error) {
        console.error(`Error sending welcome email: ${error}`);
        throw new Error(`Error sending welcome email: ${error}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });

        console.log(`Password reset email sent successfully ${response}`);

    } catch (error) {
        console.error(`Error sending password reset email: ${error}`);
        throw new Error(`Error sending password reset email: ${error}`);
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });
        
        console.log(`Password reset email sent successfully ${response}`);

    } catch (error) {
        console.error(`Error sending password reset success email: ${error}`);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
}