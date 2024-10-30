import React, { useContext } from 'react';
import { MatrixContext } from '../Context/MatrixContext.jsx';

function MatrixInputPage() {
    const { matrix, setMatrix } = useContext(MatrixContext);

    const addRowAndColumn = () => {
        if (matrix.length < 10 && matrix[0]?.length < 10) {
            setMatrix(prev => {
                // Tạo hàng mới với giá trị 0 cho cột mới
                const newRow = Array(prev[0]?.length).fill(0);
                const updatedMatrix = [...prev, newRow];

                // Cập nhật tất cả các hàng hiện tại để thêm một cột mới
                return updatedMatrix.map(row => [...row, 0]); // Thêm cột mới
            });
        } else {
            alert("Không thể thêm hàng và cột mới. Giới hạn là 10 hàng và 10 cột.");
        }
    };

    const removeRowAndColumn = () => {
        setMatrix(prev => {
            // Nếu ma trận có ít nhất 1 hàng và 1 cột thì mới giảm
            if (prev.length > 1 && prev[0].length > 1) {
                const updatedMatrix = prev.slice(0, prev.length - 1); // Giảm hàng
                return updatedMatrix.map(row => row.slice(0, row.length - 1)); // Giảm cột
            }
            return prev; // Không thay đổi nếu không đủ hàng hoặc cột
        });
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

            <button onClick={addRowAndColumn}>Add Row and Column</button>
            <button onClick={removeRowAndColumn}>Remove Row and Column</button>
            <h2>Enter Matrix:</h2>
            <table border="1" cellPadding="10">
                <thead>
                <tr>
                    <th>Worker / Job</th>
                    {[...Array(matrix[0]?.length)].map((_, j) => <th key={j}>Job {j + 1}</th>)}
                </tr>
                </thead>
                <tbody>
                {matrix.map((row, i) => (
                    <tr key={i}>
                        <td>Worker {i + 1}</td>
                        {row.map((value, j) => (
                            <td key={j}>
                                <input
                                    type="number"
                                    value={value}
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
