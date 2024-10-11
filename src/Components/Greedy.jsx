export const jobSeeker = (matrix, N) => {
    let assigned = Array(N).fill(false);
    let result = [];
    let total = 0;

    for (let i = 0; i < N; i++) {
        let assignMin = Number.MAX_VALUE, assignIndex = -1;

        for (let j = 0; j < N; j++) {
            if (!assigned[j] && matrix[i][j] < assignMin) {
                assignMin = matrix[i][j];
                assignIndex = j;
            }
        }

        assigned[assignIndex] = true;
        result.push({ worker: i, job: assignIndex ,cost:assignMin});
        total += assignMin;
    }

    return { costJob: total, assignmentsJob: result };
};
export const findWorker = (matrix, N) => {
    let worker = Array(N).fill(false);
    let result = [];
    let total = 0;

    for (let i = 0; i < N; i++) {
        let assignMin = Number.MAX_VALUE, workerIndex = -1;

        for (let j = 0; j < N; j++) {
            if (!worker[j] && matrix[j][i] < assignMin) {
                assignMin = matrix[j][i];
                workerIndex = j;
            }
        }
        worker[workerIndex] = true;
        result.push({ worker: i, job: workerIndex ,cost:assignMin});
        total += assignMin;
    }

    return { costFind: total, assignmentsFind: result };
};
export const timeMin = (matrix, N) => {
    let worker = Array(N).fill(false);
    let assigned = Array(N).fill(false);
    let result = [];
    let total = 0;
    for(let u = 0;u<N;u++) {
        let assignMin = Number.MAX_VALUE, workerIndex = -1,assignIndex=-1;

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                if (!worker[i] && !assigned[j] && matrix[i][j] < assignMin) {
                    assignMin = matrix[i][j];
                    workerIndex = i;
                    assignIndex = j;
                }
            }
        }
        console.log(assignMin)
        worker[workerIndex] = true;
        assigned[assignIndex] = true;
        result.push({worker: workerIndex, job: assignIndex, cost:assignMin});
        total += assignMin;
    }
    return { costTime: total, assignmentsTime: result };
};
