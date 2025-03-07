import { useState, FormEvent } from "react";
import { feedbackTypes, FeedbackType } from ".."
import { CloseButton } from "../../CloseButton"
import { ArrowLeft } from "phosphor-react"
import { ScreenshotButton } from "../ScreenshotButton";
import { api } from "../../../lib/api";
import { Loading } from "../Loading";


interface FeedbackContentStepProps {
    onFeedbackContentChanged: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export const FeedbackContentStep = ({ onFeedbackContentChanged, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) => {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    const feedbackType = feedbackTypes[onFeedbackContentChanged];

    const handleSubmitFeedback = async (e: FormEvent) => {
        e.preventDefault();

        setIsSendingFeedback(true)


        await api.post('/feedbacks', {
            type: onFeedbackContentChanged,
            comment,
            screenshot
        })

        setIsSendingFeedback(false)
        onFeedbackSent()
    }

    return (
        <div className="w-[336px] flex flex-col items-center gap-4">
            <header className="flex items-center gap-2">
                <button type="button" className="absolute left-5 top-5">
                    <ArrowLeft weight="bold" className=" w-4 h-4" onClick={onFeedbackRestartRequested} />
                </button>
                <img src={feedbackType.image.source} alt={feedbackType.image.alt} className="w-5" />
                <span className="text-xl leading-6">{feedbackType.title}</span>
                <CloseButton />
            </header>
            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    onChange={event => setComment(event.target.value)}
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-500  dark:placeholder-zinc-400 dark:text-zinc-100 border-zinc-600  bg-transparent rounded-md
                    focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo"
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />
                    <button
                        disabled={comment.length === 0 || isSendingFeedback}
                        type="submit"
                        className="p-2 text-zinc-100 bg-brand-500 rounded-[4px] border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors 
                        disabled:opacity-50 disabled:hover:bg-brand-500
                        "
                    >
                        {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
                    </button>


                </footer>
            </form>

        </div>
    )
}