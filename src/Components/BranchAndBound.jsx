import React from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';

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

function printAssignments(min) {
    if (min.parent === null) return [];
    const result = printAssignments(min.parent);
    result.push({ worker: min.workerID, job: min.jobID, cost: min.value });
    return result;
}

export function findMinCost(costMatrix, N) {
    let pq = [];
    let assigned = Array(N).fill(false);
    let root = { parent: null, workerID: -1, pathCost: 0, cost: 0, assigned, value: 0, lowerBound: 0 };
    let nodes = [];
    let edges = [];

    // Thêm nút gốc
    nodes.push({
        id: `root`,
        data: { label: `TTG=0, CD=${root.cost}` },
        position: { x: 250, y: 0 },
    });

    pq.push(root);

    while (pq.length > 0) {
        let min = pq.shift();
        let i = min.workerID + 1;

        if (i === N) {
            return {
                costBranch: min.cost,
                assignmentsBranch: printAssignments(min),
                nodes,
                edges
            };
        }

        for (let j = 0; j < N; j++) {
            if (!min.assigned[j]) {
                let child = {
                    parent: min,
                    workerID: i,
                    jobID: j,
                    pathCost: min.pathCost + costMatrix[i][j],
                    assigned: [...min.assigned],
                    value: costMatrix[i][j],
                };
                child.assigned[j] = true;
                child.lowerBound = calculateCost(costMatrix, i, j, child.assigned, N);
                child.cost = child.pathCost + child.lowerBound;

                const nodeId = `${i}-${j}`;
                const parentId = min.workerID === -1 ? "root" : `${min.workerID}-${min.jobID}`;

                nodes.push({
                    id: nodeId,
                    data: { label: `TTG=${child.pathCost}, CD=${child.cost}` },
                    position: { x: 250 + j * 150 - i * 75, y: i * 100 }
                });

                edges.push({
                    id: `e${parentId}-${nodeId}`,
                    source: parentId,
                    target: nodeId,
                    label: `Worker${i+1} -> Job${j+1}`
                });

                pq.push(child);
            }
        }

        pq.sort((a, b) => a.cost - b.cost);
    }
}
