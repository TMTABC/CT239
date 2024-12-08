import React from 'react';
import './CSS/ResultTable.css';  // Đường dẫn đến file CSS (nếu có)

const ResultTable = ({ data, title, costKey, assignmentsKey }) => {
    if (!data) return null;

    return (
        <div>
            <h2 className="result-header">{title}</h2>
            <h3>Optimal Cost: <span style={{ color: "green" }}>{data[costKey]}</span></h3>
            <h3>Assignments:</h3>
            <table className="result-table">
                <thead>
                <tr>
                    <th>Worker</th>
                    <th>Assigned Job</th>
                    <th>Cost</th>
                </tr>
                </thead>
                <tbody>
                {data[assignmentsKey].map((assignment, index) => (
                    <tr key={index}>
                        <td>Worker {assignment.worker}</td>
                        <td>Job {assignment.job}</td>
                        <td>{assignment.cost}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultTable;
