type Props = {
    id: string;
    letter: string;
    isCorrect: boolean;
    isGuessed: boolean;
    guess: (letter: string) => void;
}

export default function Key({ id, letter, isCorrect, isGuessed, guess }: Props) {
    return (
        <>
            <button className="key" onClick={() => guess(letter)}>
                {letter}
            </button>
        </>
    )
}