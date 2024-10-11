import React, { useState } from 'react';
import { findMinCost } from "./Components/BranchAndBound.jsx";
import {findWorker, jobSeeker, timeMin} from "./Components/Greedy.jsx";

function App() {
    const [N, setN] = useState(4);  // Default value for N
    const [matrix, setMatrix] = useState([
        [9, 2, 7, 8],
        [6, 4, 3, 7],
        [5, 8, 1, 8],
        [7, 6, 9, 4]
    ]);
    const [resultBranch, setResultBranch] = useState(null);
    const [resultJob, setResultJob] = useState(null);
    const [resultFind, setResultFind] = useState(null);
    const [resultTime, setResultTime] = useState(null);

    const handleNChange = (e) => {
        const newN = parseInt(e.target.value, 10);
        setN(newN);
        setMatrix(Array(newN).fill().map(() => Array(newN).fill(0)));  // Reset matrix based on new N
    };

    const handleInputChange = (i, j, value) => {
        setMatrix(prev => {
            const updated = [...prev];
            updated[i][j] = parseInt(value, 10);
            return updated;
        });
    };

    const handleCalculate = () => {
        setResultBranch(findMinCost(matrix, N));
        setResultJob(jobSeeker(matrix, N));
        setResultFind(findWorker(matrix,N));
        setResultTime(timeMin(matrix,N));
    };

    const renderTable = (data, title, costKey, assignmentsKey) => (
        data && (
            <div>
                <h2>Optimal Cost: {data[costKey]}</h2>
                <h3>Assignments:</h3>
                <table border="1" cellPadding="10">
                    <thead>
                    <tr>
                        <th>Worker</th>
                        <th>Assigned Job</th>
                        <th>Cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data[assignmentsKey].map((a, i) => (
                        <tr key={i}>
                            <td>Worker {a.worker}</td>
                            <td>Job {a.job}</td>
                            <td>{a.cost}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    );

    return (
        <div>
            <h1>Job Assignment Problem</h1>

            <label htmlFor="numTasks">Number of workers/jobs (N): </label>
            <input type="number" id="numTasks" value={N} onChange={handleNChange} min="1" />

            <h2>Enter Cost Matrix:</h2>
            <table border="1" cellPadding="10">
                <thead>
                <tr>
                    <th>Worker / Job</th>
                    {[...Array(N)].map((_, j) => <th key={j}>Job {j}</th>)}
                </tr>
                </thead>
                <tbody>
                {[...Array(N)].map((_, i) => (
                    <tr key={i}>
                        <td>Worker {i}</td>
                        {[...Array(N)].map((_, j) => (
                            <td key={j}>
                                <input
                                    type="number"
                                    value={matrix[i][j]}
                                    onChange={(e) => handleInputChange(i, j, e.target.value)}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <button onClick={handleCalculate}>Calculate Optimal Cost</button>

            <h1>Branch and Bound</h1>
            {renderTable(resultBranch, "Branch and Bound", "costBranch", "assignmentsBranch")}

            <h1>Greedy JobSeeker</h1>
            {renderTable(resultJob, "Greedy JobSeeker", "costJob", "assignmentsJob")}
            <h1>Greedy Find Worker</h1>
            {renderTable(resultFind, "Greedy Find Worker", "costFind", "assignmentsFind")}
            <h1>Greedy Time Smallest</h1>
            {renderTable(resultTime, "Greedy Find Worker", "costTime", "assignmentsTime")}
        </div>
    );
}

export default App;
