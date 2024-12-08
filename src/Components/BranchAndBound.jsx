import React from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';

// function calculateCost(costMatrix, x, y, assigned, N) {
//     let cost = 0;
//     let available = Array(N).fill(true);
//     let i,j;
//     for ( i = x + 1; i < N; i++) {
//         let min = Number.MAX_SAFE_INTEGER, minIndex = -1;
//
//         for ( j = 0; j < N; j++) {
//             if (!assigned[j] && available[j] && costMatrix[i][j] < min) {
//                 minIndex = j;
//                 min = costMatrix[i][j];
//             }
//         }
//
//         cost += min;
//         available[minIndex] = false;
//     }
//     return {cost,j,i};
// }
//
// function printAssignments(min) {
//     if (min.parent === null) return [];
//     const result = printAssignments(min.parent);
//     result.push({ worker: min.workerID, job: min.jobID, cost: min.value });
//     return result;
// }
// export function findMinCost(costMatrix, N) {
//     let pq = [];
//     let assigned = Array(N).fill(false);
//     let root = { parent: null, workerID: -1, pathCost: 0, cost: 0, assigned, value: 0, lowerBound: 0 };
//     let nodes = [];
//     let edges = [];
//
//     // Thêm nút gốc
//     nodes.push({
//         id: `0`,
//         data: { label: `TTG=0, CD=${root.cost}` },
//         position: { x: 250, y: 0 },
//         parentId: null // Thêm thông tin parentId cho nút gốc
//     });
//
//     pq.push(root);
//
//     while (pq.length > 0) {
//         let min = pq.shift();
//         let i = min.workerID + 1;
//
//         if (i === N) {
//             return {
//                 costBranch: min.cost,
//                 assignmentsBranch: printAssignments(min),
//                 nodes,
//                 edges
//             };
//         }
//
//         for (let j = 0; j < N; j++) {
//             if (!min.assigned[j]) { // Chỉ xử lý Job chưa được gán
//                 let child = {
//                     parent: min,
//                     workerID: i,
//                     jobID: j,
//                     pathCost: min.pathCost + costMatrix[i][j],
//                     assigned: [...min.assigned],
//                     value: costMatrix[i][j],
//                 };
//                 child.assigned[j] = true; // Đánh dấu Job này đã được gán
//                 let calculate = calculateCost(costMatrix, i, j, child.assigned, N);
//                 child.lowerBound = calculate.cost
//                 child.cost = child.pathCost + child.lowerBound;
//                 console.log(calculate)
//                 const parentId = min.workerID === -1 ? "0" : `${i}-${min.jobID}`;
//                 const nodeId = `${parentId}-${calculate.j}`;
//
//                 // Kiểm tra nếu nút con đã tồn tại thì bỏ qua việc tạo lại
//                 if (!nodes.some((node) => node.id === nodeId)) {
//                     nodes.push({
//                         id: nodeId,
//                         parentId: parentId,  // Lưu trữ mối quan hệ cha-con
//                         data: { label: `TTG=${child.pathCost}, CD=${child.cost}` },
//                         position: { x: 250 + j * 150 - i * 75, y: i * 100 },
//                     });
//                 }
//
//                 // Kiểm tra nếu cạnh đã tồn tại thì không thêm lại
//                 if (!edges.some((edge) => edge.source === parentId && edge.target === nodeId)) {
//                     edges.push({
//                         id: `${parentId}-${nodeId}`,
//                         source: parentId,
//                         target: nodeId,
//                         label: `Worker${i + 1} -> Job${j + 1}`,
//                     });
//                 }
//
//                 // Thêm child vào hàng đợi
//                 pq.push(child);
//             }
//         }
//
//         pq.sort((a, b) => a.cost - b.cost);
//     }
// }
// Function to calculate the least promising cost
// Function to calculate the least promising cost
function calculateCost(costMatrix, x, y, assigned, N) {
    let cost = 0;
    let available = Array(N).fill(true);

    for (let i = x + 1; i < N; i++) {
        let min = Number.MAX_SAFE_INTEGER, minIndex = -1;

        for (let j = 0; j < N; j++) {
            if (!assigned[j] && available[j] && costMatrix[i][j] < min) {
                minIndex = j;
                min = costMatrix[i][j];
            }
        }

        cost += min;
        available[minIndex] = false;
    }

    return cost;
}

// Function to find minimum cost and return nodes and edges for React Flow
export function findMinCost(costMatrix, N) {
    let pq = [];
    let assigned = Array(N).fill(false);

    let root = {
        parent: null,
        workerID: -1,
        pathCost: 0,
        cost: 0,
        assigned: assigned,
        id: "root",
        assignments: [] // Lưu tất cả các phân công tại nút này
    };

    let nodes = [
        { id: "root", data: { label: "Root" }, position: { x: 250, y: 0 } }
    ];
    let edges = [];

    pq.push(root);

    let finalNode = null;
    let optimalCost = Number.MAX_SAFE_INTEGER; // Giá trị tối ưu ban đầu

    while (pq.length > 0) {
        let min = pq.shift(); // Lấy nút có cận dưới nhỏ nhất
        let i = min.workerID + 1;

        if (i === N) {
            // Nếu đã duyệt hết các công việc, cập nhật giá trị tối ưu
            if (min.cost < optimalCost) {
                optimalCost = min.cost;
                finalNode = min;
            }
            continue;
        }

        for (let j = 0; j < N; j++) {
            if (!min.assigned[j]) {
                // Tạo nút con
                const nodeId = `${min.id}-worker-${i}-job-${j}`;
                const edgeId = `edge-${min.id}-${nodeId}`;

                let child = {
                    parent: min,
                    workerID: i,
                    jobID: j,
                    pathCost: min.pathCost + costMatrix[i][j],
                    assigned: [...min.assigned],
                    id: nodeId,
                    assignments: [...min.assignments] // Copy danh sách phân công từ nút cha
                };
                child.assigned[j] = true;
                child.cost = child.pathCost + calculateCost(costMatrix, i, j, child.assigned, N);

                // Thêm công việc hiện tại vào danh sách phân công
                child.assignments.push({
                    worker: i,
                    job: j,
                    cost: costMatrix[i][j]
                });

                // Chỉ tạo nút nếu cận dưới nhỏ hơn optimalCost
                if (child.cost < optimalCost) {
                    pq.push(child);

                    // Thêm nút
                    nodes.push({
                        id: child.id,
                        data: {
                            label: i === N - 1
                                ? `TGT: ${child.cost}`
                                : `TGT: ${child.pathCost} (Cận dưới: ${child.cost})`
                        },
                        position: { x: 250 + j * 150, y: i * 100 }
                    });

                    // Thêm cạnh
                    edges.push({
                        id: edgeId,
                        source: min.id,
                        target: child.id,
                        label: `Worker ${i + 1} -> Job ${j + 1}`
                    });
                }
            }
        }

        // Sắp xếp hàng đợi ưu tiên theo cận dưới
        pq.sort((a, b) => a.cost - b.cost);
    }

    // Thu thập tất cả các assignments từ tất cả các nút
    const allAssignments = nodes.map((node) => ({
        id: node.id,
        assignments: node.data.assignments || [] // Lấy danh sách phân công của mỗi nút
    }));

    return {
        optimalCost,
        assignments: finalNode ? finalNode.assignments : [],
        allAssignments, // Thêm tất cả các danh sách phân công
        nodes,
        edges
    };
}
