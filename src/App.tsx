import { useState, useEffect, useRef } from 'react'
import { nanoid } from "nanoid"
import { clsx } from "clsx"
import Confetti from "react-confetti"

import Header from './components/Header';
import Language from './components/Language';
import Key from './components/Key';

import { languagesData } from './data/languagesData';
import { wordsData } from './data/wordsData'
import { getFarewellText } from './utils';

export default function App() {

    const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase()
    const [answer, setAnswer] = useState<any>(wordsData[Math.floor(Math.random() * wordsData.length)].toUpperCase())
    const [guessedLetters, setGuessedLetters] = useState<string[]>([])
    const wrongGuesses = [...guessedLetters].filter(letter => {
        return !answer.includes(letter)
    }).length
    const isMostRecentWrong = !answer.includes(guessedLetters.at(-1))

    const gameLost = wrongGuesses >= 8
    const gameWon = [...answer].every(letter => {
            return guessedLetters.includes(letter)
    })
    const gameOver = gameLost || gameWon

    const answerElements = [...answer].map((c, i) => {
        const isGuessed = guessedLetters.includes(c)
        return <span
            key={i}
            className="answer-block"
        >
            {isGuessed || gameLost ? c : null}
        </span>
    })

    const languages = languagesData.map((language, i) => {
        const lost = i < wrongGuesses
        return ({
            ...language,
            id: nanoid(),
            lost,
        })
    })

    const languageElements = languages.map(language => {
        return <Language 
            key={language.id}
            id={language.id}
            name={language.name}
            lost={language.lost}
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
        // console.log(keys)
    }, [guessedLetters])

    useEffect(() => {
        // console.log(gameWon)
    }, [gameWon])

    function guess(letter: string) {  
        if (gameOver) return
        if (guessedLetters.includes(letter)) return
        setGuessedLetters(prev => [...prev, letter])
    }

    function newGame() {
        // reset answer and guesses states
        const newWord = wordsData[Math.floor(Math.random() * wordsData.length)]
        setAnswer(newWord.toUpperCase())
        setGuessedLetters([])
    }

    function renderGameStatus() {
        if (gameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done!</p>
                </>
            )
        }
        else if (gameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Time to learn Assembly</p>
                </>
            )
        }
        if (isMostRecentWrong && wrongGuesses > 0) {
            console.log(wrongGuesses)
            const languageName = languages[wrongGuesses - 1].name
            const styles = {
                backgroundColor: languages[wrongGuesses - 1].backgroundColor,
                color: languages[wrongGuesses - 1].color
            }
            return (
                <>
                    <p className="farewell" style={styles}>{getFarewellText(languageName)}</p>
                </>
            )
        }
    }

    const statusClass = clsx({
        status: true,
        won: gameWon,
        lost: gameLost,
    })

    return (
        <>
            <main>
                {gameWon? <Confetti recycle={false} /> : null}
                <div className="container main-section">

                    <Header />

                    <section 
                        className={statusClass}
                        aria-live="polite"
                        role="status"
                    >
                        {renderGameStatus()}
                    </section>

                    <section className="languages">
                        {languageElements}
                    </section>

                    <div className="answer">
                        {answerElements}
                    </div>

                    <div className={`keyboard ${gameOver ? "blurred" : ""}`}>
                        {keyElements}
                    </div>

                    <div className="new-game-wrapper">
                        <button className={`new-game ${gameOver ? "show" : ""}`} onClick={newGame}>
                            New Game
                        </button>
                    </div>

                </div>
            </main>
        </>
    )
}

