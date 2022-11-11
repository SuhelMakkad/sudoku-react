import { useState } from "react";

import "./App.css";

function App() {
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

  return (
    <div className="wrapper">
      <h1 className="heading">Sudoku</h1>

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
              <input value={col} className={`input `} type="number" />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
