import { feedbackTypes, FeedbackType } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypesStepProps {
    onFeedbackTypeChanged: (types: FeedbackType) => void;
}

export const FeedbackTypesStep = ({ onFeedbackTypeChanged }: FeedbackTypesStepProps) => {
    return (
        <>
            <header>
                <span className="text-xl leading-6 ">Deixe seu feedback</span>
                <CloseButton />
            </header>
            <div className="flex py-8 gap-2 w-full">

                {
                    Object.entries(feedbackTypes).map(([key, value], index) => {
                        return (
                            <button
                                key={key}
                                onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
                                className="gap-2 p-2 flex flex-col items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 w-24 h-28 flex-1 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none">
                                <img src={value.image.source} alt={value.image.alt}></img>
                                <span>{value.title}</span>
                            </button>
                        )
                    })
                }

            </div>
        </>
    )
}