export interface SendmailData {
     subject: string;
     body: string;
     attachments: Array<{}>;

}

export interface MailAdapter {
     sendMail: (data: SendmailData) => Promise<void>;
}