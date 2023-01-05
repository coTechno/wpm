import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Graph from '../Components/Graph';
import { auth, db } from '../firebaseConfig';

const ComparePage = () => {

    const { username } = useParams();
    const [loggedInUserData, setLoggedInUserData] = useState([]);
    const [compareUserData, setCompareUserData] = useState([]);
    const [loggedInUserChartData, setLoggedInUserChartData] = useState([]);
    const [compareUserChartData, setCompareUserChartData] = useState([]);

    const getUID = async () => {
        const ref = db.collection('usernames').doc(`${username}`);
        const response = await ref.get();
        return response.data().uid;
    }
    const getData = async () => {

        const userUID = await getUID();
        const { uid } = auth.currentUser;
        const resultRef = db.collection('wpmData');
        let tempData = [];
        let tempChartData = [];

        resultRef.where('userId', '==', uid).orderBy('timeStamp', 'desc').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                tempData.push({ ...doc.data() });
                tempChartData.push([doc.data().timeStamp, doc.data().wpm]);
                setLoggedInUserData(tempData);
                setLoggedInUserChartData(tempChartData);
            });
        });

        let tempData1 = [];
        let tempChartData1 = [];
        resultRef.where('userId', '==', userUID).orderBy('timeStamp', 'desc').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                tempData1.push({ ...doc.data() });
                tempChartData1.push([doc.data().timeStamp, doc.data().wpm]);
                setCompareUserData(tempData1);
                setCompareUserChartData(tempChartData1);
            });
        });
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <Graph key={0} chartData={loggedInUserChartData} type='data' />
            <Graph key={1} chartData={compareUserChartData} type='data' />
        </div>
    )
}

export default ComparePage