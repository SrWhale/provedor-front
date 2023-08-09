'use client';

import { Container } from '.';

export function Navbar() {
  return (
    <div className="bg-zinc-800/50 py-5 mb-10 shadow-lg">
      <Container>
        <div className="flex justify-end items-center">
          <div className="flex items-center gap-5">
            <div className="bg-zinc-900 border border-zinc-700 py-2 px-8 rounded-lg">
              <p className="font-medium text-zinc-300">
                <span className="border-r border-zinc-700 pr-2 text-white">R$</span>{' '}
                100,00
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
