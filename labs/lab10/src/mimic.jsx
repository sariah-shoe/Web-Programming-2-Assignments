import { useState } from 'react'

export default function Mimic(){
    function handleInput(event) {
        setUserInput(event.target.value);
    }

    const [userInput, setUserInput] = useState("");

    return(
        <>
            <input onInput={handleInput}></input>
            <h3>{ userInput }</h3>
        </>
    )
}