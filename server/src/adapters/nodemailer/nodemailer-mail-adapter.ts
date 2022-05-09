import { MailAdapter, SendmailData } from "../mail-adapters";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
     host: "smtp-relay.sendinblue.com",
     port: 587,
     auth: {
       user: "projetointegrador792@gmail.com",
       pass: "p6K3JYhfTXGCs7cx"
     }
   });


export class NodemailerMailAdapter implements MailAdapter {
     async sendMail({ subject, body, attachments}: SendmailData) {
          await transport.sendMail({
               to: "projetointegrador792@gmail.com",
               from: "Equipe Feedget <oi@feedget.com>",
               subject,
               attachments,
               html: body
          })
     };
}