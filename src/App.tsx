import { useState, useEffect, useRef } from 'react'
import { nanoid } from "nanoid"
import Header from './components/Header';
import Language from './components/Language';
import Key from './components/Key';

import { languagesData } from './data/languagesData';

export default function App() {

    type Language = {
        id: string;
        name: string;
        isAlive: boolean;
        backgroundColor: string;
        color: string;
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase()

    const [answer, setAnswer] = useState<any>("abcba".toUpperCase())

    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    const [gameOver, setGameOver] = useState<boolean>(
        guessedLetters.length === 8
    )

    const [gameWon, setGameWon] = useState<boolean>(
        [...answer].every(letter => {
            return guessedLetters.includes(letter)
        })
    )

    const answerElements = [...answer].map((c, i) => {
        const isGuessed = guessedLetters.includes(c)
        return <span
            key={i}
            className="answer-block"
        >
            {isGuessed ? c : null}
        </span>
    })

    const [languages, setLanguages] = useState<Language[]>(
        languagesData.map(language => {
            return ({
                ...language,
                id: nanoid(),
                isAlive: true,
            })
        })
    )

    const languageElements = languages.map(language => {
        return <Language 
            key={language.id}
            id={language.id}
            name={language.name}
            isAlive={language.isAlive}
            backgroundColor={language.backgroundColor}
            color={language.color}
        />
    })

    const keys = [...alphabet].map(letter => {
        return ({
            letter: letter,
            id: nanoid(),
            isCorrect: answer.includes(letter),
            isGuessed: guessedLetters.includes(letter),
        })
    })

    const keyElements = keys.map(key => {
        return <Key 
            key={key.id}
            id={key.id}
            letter={key.letter}
            isCorrect={key.isCorrect}
            isGuessed={key.isGuessed}
            guess={guess}
        />
    })

    useEffect(() => {
        console.log(keys)
    }, [guessedLetters])

    function guess(letter: string) {
        // toggle isGuessed state on the key
        // toggle key style based on isCorrect (change border color)   
        setGuessedLetters(prev => [...prev, letter])
    }

    return (
        <>
            <main>
                <div className="container main-section">

                    <Header />

                    <section className="status">
                        <h2>You win!</h2>
                        <p>Well done!</p>
                    </section>

                    <section className="languages">
                        {languageElements}
                    </section>

                    <div className="answer">
                        {answerElements}
                    </div>

                    <div className="keyboard">
                        {keyElements}
                    </div>

                    {true ? 
                        <button className="new-game">
                            New Game
                        </button>
                        : null}

                </div>
            </main>
        </>
    )
}

