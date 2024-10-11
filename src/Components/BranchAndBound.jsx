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

// print Assignments
function printAssignments(min) {
    if (min.parent === null) return [];
    const result = printAssignments(min.parent);
    result.push({ worker: min.workerID, job: min.jobID , cost:min.value});
    return result;
}

// Finds minimum cost using Branch and Bound.
export function findMinCost(costMatrix, N) {
    let pq = [];
    let assigned = Array(N).fill(false);
    let root = { parent: null, workerID: -1, pathCost: 0, cost: 0, assigned , value:0 };
    pq.push(root);

    while (pq.length > 0) {
        let min = pq.shift();
        let i = min.workerID + 1;

        if (i === N) {
            return { costBranch: min.cost, assignmentsBranch: printAssignments(min) };
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
                child.cost = child.pathCost + calculateCost(costMatrix, i, j, child.assigned, N);

                pq.push(child);
            }
        }

        pq.sort((a, b) => a.cost - b.cost);
    }
}
