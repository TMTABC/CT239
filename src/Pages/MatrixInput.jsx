import React, { useContext } from 'react';
import { MatrixContext } from '../Context/MatrixContext.jsx';
import './Css/MatrixInput.css'

function MatrixInputPage() {
    const { matrix, setMatrix, setN } = useContext(MatrixContext);

    const addRowAndColumn = () => {
        if (matrix.length < 10 && matrix[0]?.length < 10) {
            setMatrix(prev => {
                const newRow = Array(prev[0]?.length).fill(0);
                const updatedMatrix = [...prev, newRow].map(row => [...row, 0]); // Thêm cột mới
                setN(updatedMatrix.length); // Cập nhật N sau khi ma trận thay đổi
                return updatedMatrix;
            });
        } else {
            alert("Không thể thêm hàng và cột mới. Giới hạn là 10 hàng và 10 cột.");
        }
    };

    const removeRowAndColumn = () => {
        setMatrix(prev => {
            if (prev.length > 1 && prev[0].length > 1) {
                const updatedMatrix = prev
                    .slice(0, prev.length - 1)
                    .map(row => row.slice(0, row.length - 1)); // Giảm hàng và cột
                setN(updatedMatrix.length); // Cập nhật N sau khi ma trận thay đổi
                return updatedMatrix;
            }
            return prev;
        });
    };

    const handleInputChange = (i, j, value) => {
        setMatrix(prev => {
            const updated = [...prev];
            updated[i][j] = parseInt(value, 10);
            return updated;
        });
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const text = e.target.result;

                    // Parse file content
                    let parsedMatrix;
                    if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
                        const delimiter = text.includes(',') ? ',' : /\s+/;
                        parsedMatrix = text
                            .trim()
                            .split('\n')
                            .map(row => row.split(delimiter).map(Number));
                        await setMatrix(parsedMatrix);
                        console.log("Upload file ",matrix,parsedMatrix)
                        await setN(parsedMatrix.length);
                    } else if (file.name.endsWith('.json')) {
                        parsedMatrix = JSON.parse(text);
                    } else {
                        alert('Chỉ hỗ trợ file CSV, TXT hoặc JSON');
                        return;
                    }

                    // Validate matrix
                    if (
                        parsedMatrix.every(row =>
                            Array.isArray(row) &&
                            row.length === parsedMatrix[0].length
                        )
                    ) {
                        console.log("lmk",matrix)
                        setMatrix(parsedMatrix);
                        setN(parsedMatrix.length);
                    } else {
                        alert('File không hợp lệ. Hãy kiểm tra định dạng.');
                    }
                } catch (error) {
                    alert('Đã xảy ra lỗi khi đọc file. Hãy kiểm tra định dạng.');
                }
            };

            reader.readAsText(file);
        }
    };

    return (
        <div>
            <h1>Enter Row/Colum Matrix</h1>

            <button onClick={addRowAndColumn}>Add Row and Column</button>
            <button onClick={removeRowAndColumn}>Remove Row and Column</button>
            <input type="file" accept=".csv,.json,.txt" onChange={handleFileUpload} />
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
