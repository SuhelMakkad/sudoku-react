const checkIfPossible = (matrix: number[][], x: number, y: number, n: number): boolean => {
  if (n < 1 || n > 10) return false;

  for (let i = 0; i < 9; i++) {
    const value = matrix[i][x];
    if (value === n) return false;
  }

  for (let i = 0; i < 9; i++) {
    const value = matrix[y][i];
    if (value === n) return false;
  }

  const x0 = Math.floor(x / 3) * 3;
  const y0 = Math.floor(y / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const value = matrix[x0 + i][y0 + j];
      if (value === n) return false;
    }
  }

  return true;
};

function solve(matrix: number[][]): number[][] | false {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (matrix[y][x] === 0) {
        for (let n = 1; n <= 9; n++) {
          if (checkIfPossible(matrix, y, x, n)) {
            matrix[y][x] = n;

            if (solve(matrix)) return matrix;
          }
        }

        matrix[y][x] = 0;
        return false;
      }
    }
  }

  return matrix;
}

export default solve;
