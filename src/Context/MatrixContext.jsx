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
    ]);
    const [N, setN] = useState(4);  // Số lượng công việc/nhân viên (N)

    return (
        <MatrixContext.Provider value={{ matrix, setMatrix, N, setN }}>
            {children}
        </MatrixContext.Provider>
    );
};
