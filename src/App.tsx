import { useState } from "react";
import solve from "./utils/sudoku";

import "./App.css";

function App() {
  const [error, setError] = useState("");
  const [matrix, setMatrix] = useState<number[][]>(
    Array(9)
      .fill(0)
      .map((_) => Array(9).fill(0))
  );

  const getClassFromIndex = (index: number, className: string): string => {
    const isLastCell = (index + 1) % 9 === 0;
    const showBorder = (index + 1) % 3 === 0;
    return !isLastCell && showBorder ? className : "";
  };

  const updateMatrix = (rowIndex: number, colIndex: number, value: string): void => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = +value.slice(-1);

    setMatrix(newMatrix);
  };

  const handleReset = () => {
    setMatrix(
      Array(9)
        .fill(0)
        .map((_) => Array(9).fill(0))
    );
  };

  const handleSolveClick = () => {
    const solvedMatrix = solve(matrix);
    console.log(solvedMatrix);
    if (!solvedMatrix) {
      setError("Incorrect Input");
      console.log("ERROR");
      return;
    }

    setMatrix(solvedMatrix);
    console.log("DONE");
  };

  return (
    <div className="wrapper">
      <h1 className="heading">Sudoku Solver</h1>

      <ul className="grid">
        {matrix.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <li
              className={`cell ${getClassFromIndex(colIndex, "border-right")} ${getClassFromIndex(
                rowIndex,
                "border-bottom"
              )}`}
              key={colIndex}
            >
              <input
                value={col ? col : ""}
                onChange={(e) => updateMatrix(rowIndex, colIndex, e.target.value)}
                className="input"
                type="number"
              />
            </li>
          ))
        )}
      </ul>

      <div className="action-btns">
        <button onClick={handleSolveClick} className="solve-btn">
          Solve
        </button>

        <button onClick={handleReset} className="reset-btn">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
