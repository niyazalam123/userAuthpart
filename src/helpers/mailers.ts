import nodemailer from "nodemailer";
import cryptoRandomString from "crypto-random-string";
import User from "@/models/signupModel";
import Cryptr from "cryptr";

interface Parameters {
    email: string;
    emailType: string;
    userId: string;
}


export async function sendMail({ email, emailType, userId }: Parameters) {
    // email - user ka email ,  emailtype - koun sa email hai forgot ka ya verify ka , userId - user Ka id lenge taaki hum database m token update kr sake 
    // gurranty nhi hai ki mail jayega hi thats why try catch::

    try {
        // generate random string to make Verifytoken
        const randomStr = cryptoRandomString({ length: 64, type: 'alphanumeric' });

        const tokenExpiry = new Date().getTime() + (60 * 60 * 1000); // Token expires in 1 hour

        // check the type of of email so that we can update that field of users and we set token expiry to i hour , after 1 hour token will expire
        // this is for verify

        let updateFields: any = {};
        // we will store token and token expiry to this object

        // for verify
        if (emailType === "VERIFY") {
            updateFields = { verifyToken: randomStr, verifyTokenExpiry: tokenExpiry };
            // for forgot password
        } else if (emailType === "FORGOT") {
            updateFields = { forgotPasswordToken: randomStr, forgotPasswordTokenExpiry: tokenExpiry };
        }

        // we update the user information from db 
        await User.findByIdAndUpdate(userId, updateFields);

        // encrypt user email, becuase we will match user form thier email when user click on verify email button

        //  const cryptr = new Cryptr(process.env.EMAIL_SECREAT!);
        //  const encryptedString = cryptr.encrypt('bacon');

        //  we create a url when user click in this url we will redirect user to verify email page where user will get verify email button
        const verify = `${process.env.DOMAIN!}/userauth/verify?signature=${randomStr}`;

        // forgot password url 
        const restPassword = `${process.env.DOMAIN!}/userauth/resetpassword?signature=${randomStr}`;

        // yaha uska data hoga jiska aap mail service loge
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        // html for forgotpassword
        const forgotPasswordHtml = 
        `
            <div style="line-height: 20px;text-align: center;font-size: 15px;box-sizing: border-box;max-width: 675px; width: 100%; border: 1px solid rgba(0,0,0,.05); margin: 0 auto; padding: 12px 25px; border-radius: 5px;">
                <p>We have received a request to initiate the password reset process for your Cmtbro account. If you did not initiate this request, please disregard this email.</p>
                <p>To reset your password, click the button below:</p>
                <p><a href="${restPassword}" style="background: #142b64;color: #fff;padding: 10px 15px; display: inline-block; border-radius: 3px; text-decoration: none;">Reset Password</a></p>
                <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
                <a href="${restPassword}">${restPassword}</a>
                <p><b>From Cmtbro <br>Thank you!</b></p>
            </div>
        `
        // html for verify 
        const verifyHtml = 
        `
        <div style="background-color: #fff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 20px;">
            <h1 style="color: #333;">Verify Your Email</h1>
            <p style="color: #666;">We have received a request to verify your email address. Click the button below to complete the verification process:</p>
            <a href=${verify} style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 3px; display: inline-block;">Verify Email</a>
            <p style="color: #666; margin-top: 20px;">If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
            <p style="background-color: #f4f4f4; padding: 10px; border-radius: 3px; word-wrap: break-word;">${verify}</p>
            <p style="color: #666;">If you did not request this verification, you can safely ignore this email.</p>
        </div>
        `

        // yaha wo sara data kisko mail bhejna , subject kya hoga , koun sa mail se bhejna hai etc
        const mailOptions = {
            from: "mdniyaz192@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: emailType ==="VERIFY" ? verifyHtml : forgotPasswordHtml , // yaha jo likhoge wo user ke email m jayega
        };
        // here we call sendMail function for sending mail
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}