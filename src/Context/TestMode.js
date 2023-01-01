import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();

export const TestModeContextProvider = ({children}) => {

    const [testTime, setTestTime] = useState(15);
    const [testMode, setTestMode] = useState('time'); // words or time 
    const [testWords, setTestWords] = useState(10); // this means user will have to type 10 words

    const values = {
        testTime,
        setTestTime,
        testMode,
        setTestMode,
        testWords,
        setTestWords
    }

    return ( <TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>);
}

export const useTestMode = () => useContext(TestModeContext);