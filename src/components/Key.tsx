import { clsx } from "clsx"

type Props = {
    id: string;
    letter: string;
    isCorrect: boolean;
    isGuessed: boolean;
    guess: (letter: string) => void;
}

export default function Key({ id, letter, isCorrect, isGuessed, guess }: Props) {
    const styles = {
        backgroundColor: `${isCorrect ? "#30ff49" : "#ff3a3a"}`,
        transform: "scale(0.92)"
    }

    const className = clsx({
        key: true,
        correct: isCorrect,
        wrong: !isCorrect,
        guessed: isGuessed
    })

    return (
        <>
            <button 
                className={className} 
                onClick={() => guess(letter)} style={isGuessed ? styles : {}}
                aria-label={`Letter ${letter}`}
            >
                {letter}
            </button>
        </>
    )
}