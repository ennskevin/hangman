import { useState } from 'react'

export default function App() {

    /**
     * MAIN CONTAINERS:
     * title and rules -> static
     * 
     * gameplay dialogue
     * 
     * languages
     * 
     * answer blocks
     * 
     * keyboard -> buttons
     * 
     * VALUES:
     *  STATE: the answer, language objects, letter/key objects,
     *          isCorrect (clicking the right key), gameWon(bool)
     *  DERIVED: 
     *      revealed characters (answer)
     *      remaining languages (language objects)
     *      gussed keys (key objects) // correctness of key
     *      num guessed keys
     * 
     * INTERACTIONS:
     *  EVENTS:
     *      clicking key buttons
     *  
     */

    return (
        <>
            <main>
                <div className="container main-section">

                    <div className="info">
                        <span className="title">
                            Hangman: Hacker Edition
                        </span>

                        <span className="rules">
                            Guess the word in under 8 attempts to keep the programming world safe from Assembly
                        </span>
                    </div>

                    <span className="dialogue">
                        i am dialogue
                    </span>

                    <div className="languages">
                        i am the languages
                    </div>

                    <div className="answer-blocks">
                        i am the answer blocks
                    </div>

                    <div className="keyboard">
                        i am the keyboard
                    </div>

                </div>
            </main>
        </>
    )
}

