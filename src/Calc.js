import React, { useState } from "react";
import "./App";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Calc = () => {
    const [value, setValue] = useState("0");
    const [buffer, setBuffer] = useState("");
    const [gresult, setGresult] = useState("0");
    const [isDone, setIsDone] = useState(false);

    const [history, setHistory] = useState([]);

    const handleButton = (buttonValue) => {
        if (isDone === true) {
            setValue(buttonValue);
            setIsDone(false);
        } else {
            value === "0"
                ? setValue(buttonValue)
                : setValue(value + buttonValue);
        }
    };

    const handleCalc = () => {
        if (isDone === true) {
            setValue("0");
        } else {
            const result = eval(value);
            setGresult(result);
            setValue(`${value} = ` + result);
            setHistory([...history, { expression: value, result: result }]);
            setIsDone(true);
        }
    };

    const handleObject = (result) => {
        setValue(result);
        setGresult(result);
    }

    const handleHover = () => {
        if (buffer === "" && isDone === true) {
            setBuffer(value);
            setValue("copy");
        }
    };

    const handleLeave = () => {
        if (isDone === true) {
            setValue(buffer);
            setBuffer("");
        }
    };

    const handleCopy = () => {
        if (isDone === true) {
            alert("copied !");
        }
    };

    return (
        <div className="calc">
            <div className="calculator">
                <p
                    className="display"
                    onClick={() => handleCopy()}
                    onMouseOver={() => handleHover()}
                    onMouseLeave={() => handleLeave()}
                >
                    <CopyToClipboard text={gresult}>
                        <div className="value">
                            <span>{value}</span>
                        </div>
                    </CopyToClipboard>
                </p>

                <div className="inputs">
                    <div className="buttons">
                        <div className="row">
                            <button onClick={() => handleButton("1")}>
                                {" "}
                                1{" "}
                            </button>
                            <button onClick={() => handleButton("2")}>
                                {" "}
                                2{" "}
                            </button>
                            <button onClick={() => handleButton("3")}>
                                {" "}
                                3{" "}
                            </button>
                        </div>
                        <div className="row">
                            <button onClick={() => handleButton("4")}>
                                {" "}
                                4{" "}
                            </button>
                            <button onClick={() => handleButton("5")}>
                                {" "}
                                5{" "}
                            </button>
                            <button onClick={() => handleButton("6")}>
                                {" "}
                                6{" "}
                            </button>
                        </div>
                        <div className="row">
                            <button onClick={() => handleButton("7")}>
                                {" "}
                                7{" "}
                            </button>
                            <button onClick={() => handleButton("8")}>
                                {" "}
                                8{" "}
                            </button>
                            <button onClick={() => handleButton("9")}>
                                {" "}
                                9{" "}
                            </button>
                        </div>
                        <div className="row">
                            <button onClick={() => setValue("0")}> C </button>
                            <button onClick={() => handleButton("0")}>
                                {" "}
                                0{" "}
                            </button>
                            <button onClick={() => handleCalc()}> = </button>
                        </div>
                    </div>

                    <div className="buttons">
                        <div className="row">
                            <button onClick={() => handleButton("+")}>
                                {" "}
                                +{" "}
                            </button>
                        </div>
                        <div className="row">
                            <button onClick={() => handleButton("-")}>
                                {" "}
                                -{" "}
                            </button>
                        </div>
                        <div className="row">
                            <button onClick={() => handleButton("*")}>
                                {" "}
                                *{" "}
                            </button>
                        </div>
                        <div className="row">
                            <button onClick={() => handleButton("/")}>
                                {" "}
                                /{" "}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={history.length !== 0 ? "history" : "unseen"}>
                <div className="historyHeader" onClick={() => setHistory([])}>Clear History</div>
                <div className="historyObjects">
                    {[...history].reverse().map((object) => (
                        <div className="object" onClick={() => handleObject(object.result)}>
                            {object.expression} = {object.result}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calc;
