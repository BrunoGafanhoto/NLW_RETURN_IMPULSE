import path from 'path';
import { MailAdapter } from './../adapters/mail-adapters';
import { FeedbacksRepository } from './../repositories/feedbacks-repository';
interface SubmitFeedbackUseCaseRequest {
     type: string;
     comment: string;
     screenshot?: string;
}

export class SubmitFeedbackUseCase {

     constructor(
          private feedbacksRepository: FeedbacksRepository,
          private mailAdapter: MailAdapter,
     ) { }

     async execute(request: SubmitFeedbackUseCaseRequest) {
          const { type, comment, screenshot } = request;

          if (!type) {
               throw new Error('Type is required')
          }

          if (!comment) {
               throw new Error('Comment is required')
          }

          if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
               throw new Error('Invalid screenshot format.')
          }

          await this.feedbacksRepository.create({
               comment,
               type,
               screenshot
          })
          
              
          
          await this.mailAdapter.sendMail({
               subject: 'NLW-RETURN lOCAL - Novo feedback',
               attachments: [
                    {
                         filename: "rocketseat.png",
                         path: path.resolve(__dirname, '..', 'assets/rocketseat.png'),
                         cid: "unique@rocketseat",
                    },
                    {
                         filename: "image.png",
                         path: `${screenshot}`,
                         cid: "unique@nodemailer.com",
                    }
               ],
               body: [
                    `<div style="font-family: sans-serif; font-size: 16px; color: #fff; background-color: rgb(45, 9, 99); padding: 25px; border-radius: 25px; border: 8px #8257E6 inset;">`,
                    `<img  src="cid:unique@rocketseat" alt="logo Rocketseat" />`,
                    `<div style="width: 100%; text-align:center; color: #fff">`,
                    `<h1 style="text-align:center; font-size: 2.3rem; letter-spacing: 3px; color: #f0f0f0; font-style: italic">NLW RETURN</h1>`,
                    `<h2 style="color:#fff; font-size: 1.3rem; letter-spacing: 1px">Tipo do feedback: ${type}</h2>`,
                    `<h3 style="color:#fff; font-size: 1rem;>Comentário: ${comment}</h3>`,
                    screenshot && `<img style="border-radius:10px; border:2px inset #8257E9" src="cid:unique@nodemailer.com" alt="screenshot" width="700" />`,
                    `</div>`,
                    `</div>`
               ].join('\n')
          })
     }
}
