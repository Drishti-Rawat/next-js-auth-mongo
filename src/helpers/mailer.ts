import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'

// npm i nodemailer

export const sendemail = async ({email,emailType ,userId}:any)=>{

  // todo configure mail for usage
  

    try {
     const hashedtoken =  await bcrypt.hash(userId.toString(),10)

      if(emailType==="VERIFY"){
        await User.findByIdAndUpdate(userId,{
         $set:{ verifyToken:hashedtoken,
          verifyTokenExpirey:Date.now()+36000000
         }
        })
      }
        else if (emailType==="RESET"){
          await User.findByIdAndUpdate(userId,{
            forgotPasswordToken:hashedtoken,
            forgotPasswordTokenExpiry:Date.now()+36000000
          })
        
      }

      const VerifyUrl = `${process.env.DOMAIN}/verifyemail?token=${hashedtoken}`
      const ForgotPassUrl = `${process.env.DOMAIN}/forgotpassword?token=${hashedtoken}`

      // to send email go to mailtrap.io create an account
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILUSER ,
          pass: process.env.MAILPASSWORD
        }
      });

          const mailOptions = {
            from: 'drishti@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType ==="VERIFY"?"Verify your email":"Reset your password", // Subject line
            text: "Hello world?", // plain text body
            html: `<p>Click <a href="${emailType==="VERIFY"?VerifyUrl:ForgotPassUrl}">here</a> to
             ${emailType==="VERIFY"?"Verify your email":"reset password"} 
             or copy paste the link below in your browser.
             <br>
             ${emailType==="VERIFY"?VerifyUrl:ForgotPassUrl}
             </p>`, // html body
          }

         const mailResponse =  await transport.sendMail(mailOptions)

         return mailResponse
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}