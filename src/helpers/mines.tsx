//const numRows = 5;
//const numCols = 5;
//const totalMines = 3;

export function placeMines({
  numRows,
  numCols,
  totalMines,
}: {
  numRows: number;
  numCols: number;
  totalMines: number;
}) {
  const grid = Array.from({ length: numRows }, () => Array(numCols).fill(0));

  let minesPlaced = 0;

  while (minesPlaced < totalMines) {
    const row = Math.floor(Math.random() * numRows);
    const col = Math.floor(Math.random() * numCols);

    if (grid[row][col] === 0) {
      grid[row][col] = 1;
      minesPlaced++;
    }
  }

  const flattenedGrid: number[] = grid.flat();

  return flattenedGrid;
}
