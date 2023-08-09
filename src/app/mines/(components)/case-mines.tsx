'use client';

import { useState, useEffect } from 'react';

import { Cell } from '.';

import { placeMines } from '@src/helpers/mines';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { PiSpeakerHighBold } from 'react-icons/pi';
import { IoMdInformationCircle } from 'react-icons/io';
import { BiFullscreen } from 'react-icons/bi';
import { AnimatePresence } from 'framer-motion';
import { InfoModal } from './info-modal';

import axios from "axios";

interface IFormData {
  value: number;
  mines: number;
}

export function CaseMines({ mines }: { mines: number[] }) {
  const [loading, setLoading] = useState(false);

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [sound, setSound] = useState(true);

  const [minesValues, setMinesValues] = useState<number[]>(mines);

  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [clickedMineIndex, setClickedMineIndex] = useState(-1);

  const [credentials, setCredentials] = useState({});

  const [reveal, setReveal] = useState<number[]>([]);

  const { register, handleSubmit, watch, setValue } = useForm<IFormData>({
    defaultValues: {
      value: 1,
      mines: 3,
    },
  });

  const watchMines = watch('mines');
  const watchValue = watch('value');


  function handleStartGame() {
    const params = new URLSearchParams({
      id: "1",
      ...credentials,
      mines: watchMines.toString(),
    });

    console.log(params.toString());

    axios.get(`http://191.241.144.59:25565/mines/newGame?${params.toString()}`).then(res => {
      console.log(res.data)
      if (res.data.success) {
        setGameOver(false);
        setStartGame(true);
        setMinesValues(Array(25).fill(0));

        setReveal(Array(25).fill(0));
      } else if (res.data.error && res.data.error === 'User already in game') {
        setGameOver(false);
        setStartGame(true);
        setMinesValues(Array(25).fill(0));

        setReveal(r => {
          for (let i = 0; i < res.data.lastGrid.length; i++) {
            r[i] = res.data.lastGrid[i]
          }
          return r
        });
      }
    })
  }

  function handleHalfClick() {
    console.log("HANDLED!")
    if (watchValue <= 1 || startGame) return;

    setValue('value', watchValue / 2);
  }

  function handleDoubleClick() {
    if (watchValue <= 0 || startGame) return;

    setValue('value', watchValue * 2);
  }

  const onSubmit = ({ value, mines }: IFormData) => {
    setLoading(true);

    if (!value || value < 1) {
      toast.error('Você precisa informar um valor!');

      setLoading(false);
      return;
    }

    if (!mines) {
      toast.error('Você precisa informar o número de minas!');

      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);

      handleStartGame();
    }, 1000);
  };

  useEffect(() => {
    if (gameOver) {
      setStartGame(false);
    }
  }, [gameOver]);

  // useEffect(() => {
  //   if (startGame) {
  //     const params = new URLSearchParams({
  //       user: 'pauloheroo',
  //       id: "1",
  //       mines: watchMines.toString(),
  //     });

  //     axios.get(`http://191.241.144.59:25565/startGame?${params.toString()}`).then(res => {
  //       if (res.data.success) {
  //         setMinesValues(Array(25).fill(0));
  //       } else {
  //         setStartGame(false);
  //       }
  //     })
  //   }
  // }, [startGame]);

  useEffect(() => {
    const paramsString = window.location.href.split('?')[1];

    const jsonParams = {};

    const params = Object.fromEntries(new URLSearchParams(paramsString).entries());

    setCredentials(params);
  }, []);

  return (
    <>
      <AnimatePresence initial={false}>
        {openInfoModal && <InfoModal close={() => setOpenInfoModal(false)} />}
      </AnimatePresence>
      <div className="grid grid-cols-1 grid-flow-row-dense md:grid-cols-4 gap-5">
        <div className="flex flex-col order-2 md:order-1 justify-between p-6 md:border-r h-full border-zinc-700 gap-5">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  id="value"
                  type="number"
                  min={1}
                  defaultValue={1}
                  placeholder="Valor"
                  className="bg-zinc-900 text-zinc-100 border-zinc-700 border rounded-lg shadow-sm block w-full p-3 outline-none"
                  readOnly={loading || startGame}
                  required
                  {...register('value', { required: true })}
                />
              </div>
              <button
                type="button"
                className="bg-zinc-800 text-[18px] hover:bg-zinc-900 text-zinc-100 border-zinc-700 border rounded-lg shadow-sm block w-[20%] py-[10px] outline-none"
                onClick={handleHalfClick}
              >
                ½
              </button>
              <button
                type="button"
                className="bg-zinc-800 text-[12px] hover:bg-zinc-900 text-zinc-100 border-zinc-700 border rounded-lg shadow-sm block w-[20%] py-[15px] outline-none"
                onClick={handleDoubleClick}
              >
                2x
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="mines" className="text-zinc-200 text-[14px]">
                Quantidade de minas
              </label>
              <select
                id="mines"
                className="bg-zinc-900 text-zinc-100 border-zinc-700 border rounded-lg shadow-sm block w-full p-3 outline-none"
                disabled={loading || startGame}
                defaultValue={3}
                required
                {...register('mines', { required: true })}
              >
                {Array(24)
                  .fill(0)
                  .map((_, index) => (
                    <option key={index}>{index + 1}</option>
                  ))}
              </select>
            </div>
            <button
              className="bg-red-500 hover:bg-red-500/90 text-[14px] text-zinc-100 rounded-lg font-semibold shadow-sm block w-full py-[15px] outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading
                ? 'Carregando...'
                : startGame
                  ? 'Retirar o dinheiro'
                  : 'Começar o jogo'}
            </button>
          </form>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="hidden md:block bg-zinc-800 text-[18px] hover:bg-zinc-900 text-zinc-100 border-zinc-700 border rounded-lg shadow-sm w-fit p-1 outline-none "
              onClick={() => {
                document.documentElement.requestFullscreen();
              }}
            >
              <BiFullscreen size={24} />
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="bg-zinc-800 text-[18px] hover:bg-zinc-900 text-zinc-100 border-zinc-700 border rounded-lg shadow-sm block w-fit p-1 outline-none"
                onClick={() => setOpenInfoModal(true)}
              >
                <IoMdInformationCircle size={22} />
              </button>
              <button
                type="button"
                className="bg-zinc-800 text-[18px] hover:bg-zinc-900 text-zinc-100 border-zinc-700 border rounded-lg shadow-sm block w-fit p-1 outline-none"
                onClick={() => {
                  setSound(!sound);
                }}
              >
                {sound ? (
                  <PiSpeakerHighBold size={22} />
                ) : (
                  <PiSpeakerHighBold size={22} className="text-red-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center md:col-span-3 p-6">
          <div className="grid grid-cols-5 md:grid-cols-5 gap-5">
            {minesValues.map((_, index) => (
              <Cell
                key={index}
                value={_}
                opacity={gameOver ? (index === clickedMineIndex ? 1 : 0.5) : 1}
                gameOver={gameOver}
                startGame={startGame}
                sound={sound}
                reveal={Boolean(reveal[index])}
                onClick={async () => {
                  const row = Math.floor(index / 5);

                  const column = index % 5;

                  const paramsS = new URLSearchParams({
                    row: row.toString(),
                    column: column.toString(),
                    ...credentials
                  });

                  console.log(`http://191.241.144.59:25565/mines/openMine?${paramsS.toString()}`, reveal[index])
                  const check = await axios.get(`http://191.241.144.59:25565/mines/openMine?${paramsS.toString()}`);

                  console.log(check.data)
                  if (!gameOver && check.data.result === "Mine") {
                    const fullGrid = check.data.grid;

                    const nowValues = minesValues;

                    console.log(nowValues)
                    for (let i = 0; i < 5; i++) {
                      for (let j = 0; j < 5; j++) {
                        nowValues[i * 5 + j] = fullGrid[i][j].number;
                      }
                    };
                    console.log(nowValues)
                    setGameOver(true);
                    setClickedMineIndex(index);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
