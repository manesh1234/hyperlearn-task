import { useState, useEffect } from "react";
import { findOnes, compareArrays } from "./utils/constants";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [screen1, setScreen1] = useState(true);
    const [screen2, setScreen2] = useState(false);
    const [screen3, setScreen3] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [arr, setArr] = useState(Array(11).fill(false));
    const [localArr, setLocalArr] = useState([]);

    useEffect(() => {
        const loc1 = localStorage.getItem('loc1');
        const loc2 = localStorage.getItem('loc2');
        if (!loc1) {
            localStorage.setItem('loc1', JSON.stringify([]));
            localStorage.setItem('loc2', JSON.stringify([]));
            return;
        }
        if (JSON.parse(loc1).length === 0) {
            setScreen1(true);
            setScreen2(false);
            setScreen3(false);
        }
        else if (JSON.parse(loc2).length === 0) {
            setScreen1(false);
            setScreen2(true);
            setScreen3(false);
        }
        else {
            setScreen1(false);
            setScreen2(false);
            setScreen3(true);
        }
    }, [])

    const clickHandler = (index) => {
        if (arr[index]) {
            toast.warn(`pattern at ${index} already selected`, {
                className: "custom-toast",
                draggable: true,
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        toast.success(`selection pattern at ${index} succesfull`, {
            className: "custom-toast",
            draggable: true,
            position: toast.POSITION.TOP_RIGHT,
        });
        let newArr = [...arr];
        newArr[index] = true;
        setArr(newArr);
        setLocalArr([...localArr, index]);
    }

    const storageSetter = (newArr) => {
        if (screen1) {
            localStorage.setItem('loc1', JSON.stringify(newArr));
        }
        else if (screen2) {
            localStorage.setItem('loc2', JSON.stringify(newArr));
        }
    }

    const setPatternHandler = () => {
        if (findOnes(arr) < 4) {
            toast.warn("please select a pattern of minimum-length 4", {
                className: "custom-toast",
                draggable: true,
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        toast.success("re-enter the pattern for sign-up confirmation", {
            className: "custom-toast",
            draggable: true,
            position: toast.POSITION.TOP_RIGHT,
        });
        setScreen1(false);
        setScreen2(true);
        setArr(Array(11).fill(false));
        storageSetter(localArr);
        setLocalArr([]);
    }

    const verifyHandler = () => {
        if (findOnes(arr) < 4) {
            toast.warn("please select a pattern of minimum-length 4", {
                className: "custom-toast",
                draggable: true,
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        const arr1 = JSON.parse(localStorage.getItem('loc1'));
        if (compareArrays(arr1, localArr)) {
            toast.success("Pattern successfully set", {
                className: "custom-toast",
                draggable: true,
                position: toast.POSITION.TOP_RIGHT,
            });
            setScreen1(false);
            setScreen2(false);
            setScreen3(true);
            setArr(Array(11).fill(false));
            storageSetter(localArr);
        }
        else {
            toast.error("Pattern is incorrect", {
                className: "custom-toast",
                draggable: true,
                position: toast.POSITION.TOP_RIGHT,
            });
            setArr(Array(11).fill(false));
        }
        setLocalArr([]);
    }

    const logInHandler = () => {
        if (findOnes(arr) < 4) {
            toast.warn("please select a pattern of minimum-length 4", {
                className: "custom-toast",
                draggable: true,
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        const arr1 = JSON.parse(localStorage.getItem('loc1'));
        if (compareArrays(arr1, localArr)) {
            toast.success("logging you in", {
                className: "custom-toast",
                draggable: true,
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsLoggedIn(true);
        }
        else {
            toast.error("Pattern is incorrect", {
                className: "custom-toast",
                draggable: true,
                position: toast.POSITION.TOP_RIGHT,
            });
            setArr(Array(11).fill(false));
        }
        setLocalArr([]);
    }


    if (isLoggedIn) {
        return <h1>Welcome ! succesfully Logged In</h1>
    }
    return (
        <div className="App">
            <ToastContainer theme="dark" draggable={false} transition={Zoom} autoClose={8000} />
            <div className="title">
                {
                    screen1 && <h1>Set Pattern</h1>
                }
                {
                    screen2 && <h1>Confirm Pattern</h1>
                }
                {
                    screen3 && <h1>Enter Pattern</h1>
                }
            </div>
            <div className="box">
                <div className="row">
                    <div style={{ backgroundColor: arr[1] ? "#219ebc" : 'white', cursor: arr[1] && "not-allowed" }} onClick={() => clickHandler(1)}></div>
                    <div style={{ backgroundColor: arr[2] ? "#219ebc" : 'white', cursor: arr[2] && "not-allowed" }} onClick={() => clickHandler(2)}></div>
                    <div style={{ backgroundColor: arr[3] ? "#219ebc" : 'white', cursor: arr[3] && "not-allowed" }} onClick={() => clickHandler(3)}></div>
                </div>
                <div className="row">
                    <div style={{ backgroundColor: arr[4] ? "#219ebc" : 'white', cursor: arr[4] && "not-allowed" }} onClick={() => clickHandler(4)}></div>
                    <div style={{ backgroundColor: arr[5] ? "#219ebc" : 'white', cursor: arr[5] && "not-allowed" }} onClick={() => clickHandler(5)}></div>
                    <div style={{ backgroundColor: arr[6] ? "#219ebc" : 'white', cursor: arr[6] && "not-allowed" }} onClick={() => clickHandler(6)}></div>
                </div>
                <div className="row">
                    <div style={{ backgroundColor: arr[7] ? "#219ebc" : 'white', cursor: arr[7] && "not-allowed" }} onClick={() => clickHandler(7)}></div>
                    <div style={{ backgroundColor: arr[8] ? "#219ebc" : 'white', cursor: arr[8] && "not-allowed" }} onClick={() => clickHandler(8)}></div>
                    <div style={{ backgroundColor: arr[9] ? "#219ebc" : 'white', cursor: arr[9] && "not-allowed" }} onClick={() => clickHandler(9)}></div>
                </div>
                <div className="row end">
                    {
                        screen1 && <button className={findOnes(arr) < 4 ? 'not-confirm' : 'confirm'} onClick={() => {
                            setPatternHandler();
                        }}>Confirm Pattern</button>
                    }
                    {
                        screen2 && <button className={findOnes(arr) < 4 ? 'not-confirm' : 'confirm'} onClick={() => {
                            verifyHandler();
                        }}>Verify</button>
                    }
                    {
                        screen3 && <button className={findOnes(arr) < 4 ? 'not-confirm' : 'confirm'} onClick={() => {
                            logInHandler();
                        }}>Log IN</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
