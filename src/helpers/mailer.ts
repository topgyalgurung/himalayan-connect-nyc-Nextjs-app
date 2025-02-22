import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

interface sendEmailParams{
    email: string,
    emailType: string,
    userId: string | number;
}
// use case: send email for verify token, forgot pw
export const sendEmail =async ({email, emailType, userId }:sendEmailParams) => {
    try {
        // create a hashed token using userId
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // update db with token field we created for forgotPasswordToken etc. check schema 
        //token update for verifyToken
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000 
                })    
        }else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })    
        }
        
   // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "50fc354c7991f9",
            pass: "24de546a517756"
            }
        });
        // TODO: add these credentials to .env file 
            // user: process.env.NODEMAILER_USER,
            // pass: process.env.NODEMAILER_PASSWORD

        const mailOptions = {
            from: 'topgyaltsering3@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            
            html: `<p> Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail":"passwordreset"}?token=${hashedToken}">
            here </a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
             or copy and paste the link below in your browser: <br>
         ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "passwordreset"}?token=${hashedToken} </p>`

        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
  
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
    
}