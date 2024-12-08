import React, { useContext } from 'react';
import { MatrixContext } from '../Context/MatrixContext.jsx';

function MatrixInputPage() {
    const { matrix, setMatrix, N, setN } = useContext(MatrixContext);

    const handleNChange = (e) => {
        const newN = e.target.value === "" ? "" : parseInt(e.target.value, 10);
        if (!isNaN(newN) && newN >= 1) {
            setN(newN);
            setMatrix(Array(newN).fill().map(() => Array(newN).fill(0)));
        } else {
            setN("");
        }
    };


    const handleInputChange = (i, j, value) => {
        setMatrix(prev => {
            const updated = [...prev];
            updated[i][j] = parseInt(value, 10);
            return updated;
        });
    };

    return (
        <div>
            <h1>Enter Cost Matrix</h1>

            <label htmlFor="numTasks">Number of workers/jobs (N): </label>
            <input
                type="number"
                id="numTasks"
                value={N === "" ? "" : N}
                onChange={handleNChange}
                min="1"
            />


            <h2>Enter Matrix:</h2>
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
        </div>
    );
}

export default MatrixInputPage;
