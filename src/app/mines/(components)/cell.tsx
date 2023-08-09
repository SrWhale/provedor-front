'use client';

import Image from 'next/image';

import { useState, useEffect } from 'react';

export function Cell({
  value,
  startGame,
  gameOver,
  opacity,
  sound,
  onClick,
  reveal
}: {
  value: number;
  startGame: boolean;
  gameOver: boolean;
  opacity: number;
  sound: boolean;
  onClick: () => void;
  reveal: boolean
}) {
  const [flipped, setFlipped] = useState(false);

  const handleCellClick = () => {
    if (gameOver) return;

    setFlipped(true);
  };

  const playLostSound = () => {
    if (!sound) return;

    const audio = new Audio('/lost.mp3');
    audio.play();
  };

  useEffect(() => {
    if (gameOver) {
      setFlipped(true);
      playLostSound();
    }
  }, [gameOver]);

  useEffect(() => {
    if (reveal) {
      setFlipped(true);
    }
  }, [reveal])
  useEffect(() => {
    if (startGame && !reveal) {
      setFlipped(false);
    }
  }, [startGame]);

  return (
    <button
      className="group [perspective:1000px] disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={!gameOver && !startGame}
      onClick={() => {
        if (!gameOver && startGame) {
          onClick();
          handleCellClick();
        }
      }}
    >
      <div
        className={`relative md:h-[100px] md:w-[100px] h-[50px] w-[50px] rounded-[14px] border-b-8 shadow-lg flex items-center justify-center text-2xl text-zinc-100 hover:-mt-2 transition-all duration-300 ease-in-out cursor-pointer ${flipped
          ? value === 1
            ? 'bg-red-500 hover:bg-red-500 border-red-600/50 '
            : 'bg-zinc-700/80 hover:bg-zinc-700/80 border-zinc-800/50 ' +
            'transition-all duration-300 [transform-style:preserve-3d] [transform:rotateY(180deg)]'
          : 'bg-zinc-700/50 border-zinc-800/50  hover:bg-zinc-600'
          }`}
        style={{ opacity }}
      >
        <div className={`transition-transform ${flipped ? 'rotate-y-180' : ''}`}>
          {flipped ? (
            value === 1 ? (
              <Image
                src="/bomb.png"
                alt="Bomba"
                width={50}
                height={50}
                className="select-none w-[32px] h-[32px] md:w-[50px] md:h-[50px]"
                onDragStart={event => event.preventDefault()}
              />
            ) : (
              <Image
                src="/crystal.png"
                alt="Cristal"
                width={50}
                height={50}
                className="select-none"
                onDragStart={event => event.preventDefault()}
              />
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </button>
  );
}

export default Cell;
