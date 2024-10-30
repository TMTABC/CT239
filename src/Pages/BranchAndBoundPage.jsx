import React, {useContext, useState} from 'react';
import MatrixInput from './MatrixInput';
import { findMinCost } from '../Components/BranchAndBound.jsx';
import ResultTable from '../Components/ResultTable';
import {MatrixContext} from "../Context/MatrixContext.jsx";
import FlowChart from "../Components/FlowChart.jsx";
import FlowTree from "../Components/FlowChart.jsx";  // Import component mới

function BranchAndBoundPage() {
    const { matrix, N } = useContext(MatrixContext);
    const [resultBranch, setResultBranch] = useState(null);
    const handleBranchAndBound = () => {
        setResultBranch(findMinCost(matrix, N));
    };

    return (
        <div>
            <h1>Branch and Bound Algorithm</h1>
            <button onClick={handleBranchAndBound}>Calculate Optimal Cost Branch and Bound</button>

            {/* Sử dụng ResultTable để hiển thị kết quả */}
            <ResultTable data={resultBranch} title="Branch and Bound" costKey="costBranch" assignmentsKey="assignmentsBranch" />
            <FlowTree></FlowTree>
        </div>
    );
}

export default BranchAndBoundPage;
