import { useState } from 'react'
import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'

import { FeedbackContentStep } from './Steps/feedbackContentStep'
import { FeedbackSuccess } from './Steps/feedbackSuccess'
import { FeedbackTypesStep } from './Steps/feedbackTypesStep'

export const feedbackTypes = {
    "BUG": {
        title: "Problema",
        image: {
            source: bugImageUrl,
            alt: "Imagem de um inseto"
        }
    },
    "IDEA": {
        title: "Ideia",
        image: {
            source: ideaImageUrl,
            alt: "Uma nuvem de pensamento"
        }
    },
    "THOUGHT": {
        title: "Outros",
        image: {
            source: thoughtImageUrl,
            alt: "Outros"
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

export const WidgetForm = () => {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false);

    const handleRestartFeedback = () => {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col shadow-lg items-center w-[calc(100vw-2rem)] sm:w-auto gap-2">

            {
                feedbackSent ? (
                    <FeedbackSuccess onFeedbackRestartRequested={handleRestartFeedback} />
                ) : (
                    <>
                        {!feedbackType ? (
                            <FeedbackTypesStep onFeedbackTypeChanged={setFeedbackType} />
                        ) :
                            <FeedbackContentStep
                                onFeedbackContentChanged={feedbackType}
                                onFeedbackRestartRequested={handleRestartFeedback}
                                onFeedbackSent={() => setFeedbackSent(true)}
                            />
                        }
                    </>
                )
            }

            <footer className='text-xs text-neutral-400'>
                Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    )
}