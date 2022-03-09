import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
    //mit Nico Zollinger
    const [input, setInput] = useState("")
    const [area, setArea] = useState("Wer während der Autofahrt über Handy oder Freisprechanlage telefoniert, fährt wie ein\n" +
        "angetrunkener Wagenlenker. Zu diesem Schluss kommen die Psychologen Frank Drews,\n" +
        "David Strayer und der Toxikologe Dennis Crouch von der Universität Utah in ihrer Studie,\n" +
        "die sie heute in dem Journal Human Factors veröffentlichen. 25 Männer und 15 Frauen im\n" +
        "Alter zwischen 22 und 34 Jahren nahmen an «A Comparison of the Cell Phone Driver and\n" +
        "the Drunk Driver» teil. Das Bundesamt für Luftfahrt finanzierte die Untersuchungen mit\n" +
        "25 000 Dollar, um Rückschlüsse auf die Aufmerksamkeit von Piloten ziehen zu können.\n" +
        "«Wenn Sie hinter dem Lenkrad telefonieren, fahren Sie, als ob Sie 0,8 Promille Alkohol\n" +
        "intus hätten», erklärt Frank Drews, Assistenz-Professor für Psychologie. Diese Blutalkoholkonzentration sei bereits in den meisten amerikanischen Staaten illegal. «Wenn der\n" +
        "Gesetzgeber wirklich das Autofahren sicherer machen möchte, sollte er das Telefonieren\n" +
        "komplett verbieten», meint Drews.\n" +
        "Sowohl Freisprechanlage als auch Handy beeinflussten den Fahrstil und zeigten keinen\n" +
        "Unterschied im Grad der Ablenkung. «Das stellt besonders die Auflagen in Frage, die das\n" +
        "Telefonieren mit Handys verbieten, es aber über Freisprechanlage erlauben.» Verglichen\n" +
        "mit konzentrierten Fahrern steuerten die telefonierenden Insassen ihr Gefährt in der Simulation etwas langsamer, bremsten später und benötigen mehr Zeit führ die Anfahrt danach. Durch das Auswerten aktueller und früherer Studien zeigen die Forscher, dass Telefonierende fünf Mal eher in einen Unfall verwickelt werden. Die gleiche\n" +
        "Wahrscheinlichkeit geben andere Studien für Fahrer mit 0,8 Promille Blutalkohol an. […] ")
    const [number, setNumber] = useState(0)
    const [input2, setInput2] = useState([])


    function buttonHandler() {
        let exit =[]
        let array = area.split(' ')
        let index =0
        for (let i =0; i<array.length; i++){
            let distance = levenshteinDistance(input, array[i])
            if (distance <= number){
                exit.splice(index, 0, array[i])
                index++
            }
        }
        setInput2(exit)
    }

    return (
        <>
            <h1>Levenshtein Algorythmus</h1>
            <div className={"hd"}>
                <div className={"h"}>
                    <h2>search field</h2>
                    <h5>Word</h5>
                    <input type={"text"} onChange={(event) => {
                        setInput(event.target.value)
                    }}></input>
                    <h5>Max- Distance</h5>
                    <input type={"number"} onChange={(event) => {
                        setNumber(event.target.value)
                    }}></input>
                    <button onClick={buttonHandler}>calculate</button>
                </div>
                <div className={"h"}>
                    <h2>Text field</h2>
                    <textarea title={"text field"} onChange={(event) => {
                        setArea(event.target.value)
                    }}>{area}</textarea>
                </div>
            </div>

            <div className={"hd"}>
                <div className={"h"}>
                    <h2>statistics</h2>
                    <div>Levenshtein Distance: {number} <p>found words: <ul>{input2.map((e)=><li>{e}</li>)}</ul></p></div>
                </div>
                <div className={"h"}></div>
            </div>
        </>
    );
}

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
export default App;
