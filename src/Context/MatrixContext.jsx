import React, { createContext, useState } from 'react';

// Tạo context
export const MatrixContext = createContext();

// Tạo Provider cho context
export const MatrixProvider = ({ children }) => {
    const [matrix, setMatrix] = useState([ // Ma trận mặc định 4x4
        [9, 2, 7, 8],
        [6, 4, 3, 7],
        [5, 8, 1, 8],
        [7, 6, 9, 4]
        // [7,2,7,4,2],
        // [7,1,6,2,2],
        // [5,2,6,2,1],
        // [7,2,2,5,2],
        // [4,6,1,1,4],
    ]);
    const [N, setN] = useState(matrix.length);  // Số lượng công việc/nhân viên (N)
    return (
        <MatrixContext.Provider value={{ matrix, setMatrix, N, setN }}>
            {children}
        </MatrixContext.Provider>
    );
};
