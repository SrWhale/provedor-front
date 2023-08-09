import { useState } from 'react';

import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';

export function InfoModal({ close }: { close: () => void }) {
  const [step, setStep] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="z-10 fixed w-[100vw] h-[100vh] top-0 left-0 bg-black/50"
    >
      <div className="z-10 fixed top-0 left-0 flex items-start justify-center overflow-auto w-[100vw] h-[-webkit-fill-available]">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-zinc-800 relative w-full max-w-[32rem] rounded-xl shadow-sm border border-black/5 my-auto"
        >
          <div className="flex items-center justify-between border-b border-zinc-700 p-8">
            <h3 className="text-white font-bold text-lg">Tutorial</h3>
            <div className="flex gap-3 items-center">
              <button
                onClick={close}
                className="bg-red-400 hover:bg-red-500 px-1 py-1 rounded-full text-white text-primary flex items-center gap-2 transition-all duration-300 ease-in disabled:opacity-50"
              >
                <IoMdClose className="font-bold text-sm" />
              </button>
            </div>
          </div>
          {step === 0 && (
            <div className="flex flex-col gap-5 p-8">
              <div className="flex flex-col gap-5 text-center">
                <h4 className="text-white font-medium text-xl">
                  Revele joias para aumentar o<br /> multiplicador de pagamento
                </h4>
                <p className="text-zinc-200 text-sm">
                  Revele cristais para aumentar o multiplicador
                  <br /> de pagamento.
                </p>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="flex flex-col gap-5 p-8">
              <div className="flex flex-col gap-5 text-center">
                <h4 className="text-white font-medium text-xl">Sacar</h4>
                <p className="text-zinc-200 text-sm">
                  Saque a qualquer momento para ganhar no
                  <br /> último multiplicador registrado.
                </p>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-5 p-8">
              <div className="flex flex-col gap-5 text-center">
                <h4 className="text-white font-medium text-xl">Revelação de bomba</h4>
                <p className="text-zinc-200 text-sm">
                  Assim que uma bomba é revelada, o jogo
                  <br /> termina e a aposta é perdida.
                </p>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-5 p-8">
              <div className="flex flex-col gap-5 text-center">
                <h4 className="text-white font-medium text-xl">Aumentar</h4>
                <p className="text-zinc-200 text-sm">
                  O aumento de bombas configuradas
                  <br /> aumentará os multiplicadores ao revelar.
                </p>
              </div>
            </div>
          )}
          <button
            className="bg-red-500 hover:bg-red-500/90 text-[14px] text-zinc-100 rounded-b-lg font-semibold shadow-sm block w-full py-[15px] outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              if (step === 3) {
                setStep(0);
                return;
              }

              setStep(step + 1);
            }}
          >
            {step === 3 ? 'Voltar' : 'Próximo passo'}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
