import { Container, Navbar } from '@src/components';

import { CaseMines } from './(components)';

import { placeMines } from '@src/helpers/mines';

export default function Mines() {
  const mines = placeMines({
    numRows: 5,
    numCols: 5,
    totalMines: 3,
  });

  return (
    <div>
      <Container>
        <div className="bg-zinc-800/50 rounded-lg shadow-lg">
          <CaseMines mines={mines} />
        </div>
      </Container>
    </div>
  );
}
