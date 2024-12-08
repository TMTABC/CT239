import React, {useContext, useState} from 'react';
import MatrixInput from './MatrixInput';
import { findWorker, jobSeeker, timeMin } from '../Components/Greedy.jsx';
import ResultTable from '../Components/ResultTable';
import {MatrixContext} from "../Context/MatrixContext.jsx";

function GreedyPage() {
    const { matrix,N,setN } = useContext(MatrixContext)

    const [resultJob, setResultJob] = useState(null);
    const [resultFind, setResultFind] = useState(null);
    const [resultTime, setResultTime] = useState(null);

    const handleGreedy = () => {
        console.log(matrix, N)
        setN(matrix.length)
        setResultJob(jobSeeker(matrix, N));
        setResultFind(findWorker(matrix, N));
        setResultTime(timeMin(matrix, N));
    };

    return (
        <div>
            <h1>Greedy Algorithm</h1>
            <button onClick={handleGreedy}>Calculate Optimal Cost Greedy</button>

            {/* Sử dụng ResultTable để hiển thị kết quả */}
            <ResultTable data={resultJob} title="Greedy JobSeeker" costKey="costJob" assignmentsKey="assignmentsJob" />
            <ResultTable data={resultFind} title="Greedy Find Worker" costKey="costFind" assignmentsKey="assignmentsFind" />
            <ResultTable data={resultTime} title="Greedy Time Smallest" costKey="costTime" assignmentsKey="assignmentsTime" />
        </div>
    );
}

export default GreedyPage;
