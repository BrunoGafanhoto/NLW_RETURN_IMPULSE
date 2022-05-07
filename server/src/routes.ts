import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedbacks-use-case';
import express from 'express'


export const routes = express.Router();



routes.post('/feedbacks', async (req, res) => {
     const { screenshot, type, comment } = req.body

     const prismaFeedbackRepository = new PrismaFeedbackRepository();
     const nodemailerMailAdapter = new NodemailerMailAdapter();

     const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository, nodemailerMailAdapter);

     await submitFeedbackUseCase.execute({
          type, comment, screenshot
     })

     console.log('Enviado com sucesso!')

     return res.status(201).send()
})