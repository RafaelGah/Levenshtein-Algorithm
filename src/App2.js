import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {

    const [input, setInput] = useState("")
    const [ausgabe, setAusgabe] = useState(0)
    const [input2, setInput2] = useState("")

    const levenshteinDistance = (str1 = '', str2 = '') => {
        const track = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
        for (let i = 0; i <= str1.length; i += 1) {
            track[0][i] = i;
        }
        for (let j = 0; j <= str2.length; j += 1) {
            track[j][0] = j;
        }
        for (let j = 1; j <= str2.length; j += 1) {
            for (let i = 1; i <= str1.length; i += 1) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(track[j][i - 1] + 1, // deletion
                    track[j - 1][i] + 1, //insertion
                    track[j - 1][i - 1] + indicator, // substitution
                );
            }
        }
        return track[str2.length][str1.length];
    }

    function buttonHandler() {
        let result = levenshteinDistance(input, input2)
        setAusgabe(result)
    }

    return (
        <>
            <h1>Levenshtein Algorythmus</h1>
            <div className={"hd"}>
                <div className={"h"}>
                    <h2>search field</h2>
                    <h5>Word1</h5>
                    <input type={"text"} onChange={(event) => {
                        setInput(event.target.value)
                    }}></input>
                    <h5>Word2</h5>
                    <input type={"text"} onChange={(event) => {
                        setInput2(event.target.value)
                    }}></input>
                    <button onClick={buttonHandler}>calculate</button>
                </div>
            </div>

            <div className={"hd"}>
                <div className={"h"}>
                    <h2>statistics</h2>
                    <div>Distance: {ausgabe}</div>
                </div>
                <div className={"h"}></div>
            </div>
        </>
    );

}
