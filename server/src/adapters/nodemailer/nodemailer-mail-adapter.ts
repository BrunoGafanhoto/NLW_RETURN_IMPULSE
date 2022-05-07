import { MailAdapter, SendmailData } from "../mail-adapters";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
     host: "smtp.mailtrap.io",
     port: 2525,
     auth: {
       user: "1f59dab79a36b4",
       pass: "f11db56219b85d"
     }
   });


export class NodemailerMailAdapter implements MailAdapter {
     async sendMail({ subject, body }: SendmailData) {

          await transport.sendMail({
               to: "bsiqueira@geogas.com.br",
               from: "Equipe Feedget <oi@feedget.com>",
               subject,
               html: body
          })
     };
}