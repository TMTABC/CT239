import React, { useContext, useState, useEffect } from 'react';
import MatrixInput from './MatrixInput';
import { findWorker, jobSeeker, timeMin } from '../Components/Greedy.jsx';
import ResultTable from '../Components/ResultTable';
import { MatrixContext } from "../Context/MatrixContext.jsx";

function GreedyPage() {
    const { matrix, N, setN } = useContext(MatrixContext);

    const [resultJob, setResultJob] = useState(null);
    const [resultFind, setResultFind] = useState(null);
    const [resultTime, setResultTime] = useState(null);

    // Hàm để cập nhật kết quả
    const calculateGreedyResults = () => {
        setResultJob(jobSeeker(matrix, N));
        setResultFind(findWorker(matrix, N));
        setResultTime(timeMin(matrix, N));
    };
    const handleGreedy = () => {
        console.log(matrix, N)
        setN(matrix.length)
        setResultJob(jobSeeker(matrix, N));
        setResultFind(findWorker(matrix, N));
        setResultTime(timeMin(matrix, N));
    };
    // Tự động tính toán khi matrix hoặc N thay đổi
    useEffect(() => {
        //if (matrix.length > 0) {
            // Cập nhật số lượng hàng/cột (N) dựa trên matrix mới
            setN(matrix.length);
            console.log("Updated Matrix:", matrix,matrix.length); // Kiểm tra ma trận đã cập nhật
            // Tính toán lại kết quả dựa trên ma trận mới
            calculateGreedyResults();
        //}
    }, [matrix]); // Chỉ theo dõi sự thay đổi của matrix

    return (
        <div>
            <h1>Greedy Algorithm</h1>
            {/*<button onClick={handleGreedy}>Calculate Optimal Cost Greedy</button>*/}
            {/* Hiển thị kết quả */}
            <ResultTable data={resultJob} title="Greedy JobSeeker" costKey="costJob" assignmentsKey="assignmentsJob"/>
            <ResultTable data={resultFind} title="Greedy Find Worker" costKey="costFind"
                         assignmentsKey="assignmentsFind"/>
            <ResultTable data={resultTime} title="Greedy Time Smallest" costKey="costTime"
                         assignmentsKey="assignmentsTime"/>
        </div>
    );
}

export default GreedyPage;
