import { MailAdapter, SendmailData } from "../mail-adapters";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
     host: "smtp.mailtrap.io",
     port: 2525,
     auth: {
          user: "6b6333966c1eb8",
          pass: "0e576ed350e9e8"
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