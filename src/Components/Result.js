import React, { useEffect } from "react";
import { useAlert } from '../Context/AlertContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../firebaseConfig";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Chart from "./Chart";


const Result = ({ wpm, accuracy, chartData, correctChars, incorrectChars, extraChars, missedChars, resetTest }) => {

    const [user] = useAuthState(auth);
    const { setAlert } = useAlert();
    var timeSet = new Set();
    const newChart = chartData.filter((i) => {
        if(!timeSet.has(i[0])) {
            timeSet.add(i[0]);
            return i;
        }
    });


    const pushResultsToDB = async () => {
        const resultsRef = db.collection('wpmData');
        const {uid} = auth.currentUser;
        if(!isNaN(accuracy)){
            // push resullts to db
            await resultsRef.add({
                userId: uid,
                wpm: wpm,
                accuracy: accuracy,
                characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
                timeStamp: new Date()
            }).then(res => {
                setAlert({
                    open: true,
                    type: 'success',
                    message: 'Result saved to DataBase'
                });
            });
        }
        else{
            setAlert({
                open: true,
                type: 'error',
                message: 'Invalid Test'
            });
        }
    }
    useEffect(() => {
        if (user) pushResultsToDB();
        else {
            setAlert({
                open: true,
                type: 'warning',
                message: 'Login to Save Results!'
            })
        }
    }, []);


    return (
        <div className="stats-box">
            <div className="left-stats">
                <div className="stats">
                    <div className="title">WPM</div>
                    <div className="subtitle">{wpm}</div>
                    <div className="title">Accuracy</div>
                    <div className="subtitle">{accuracy}</div>
                    <div className="title">Characters</div>
                    <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
                </div>

                <RestartAltIcon onClick={resetTest} className='reset-btn' />
            </div>

            <div className="right-stats">
                <Chart chartData={newChart} />
            </div>
        </div>
    );
};

export default Result;
