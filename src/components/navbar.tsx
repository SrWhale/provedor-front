'use client';

import { Container } from '.';

import { useEffect, useState } from 'react';

import axios from "axios";

export function Navbar() {

  const [money, setMoney] = useState(0);

  const [credentials, setCredentials] = useState({});

  const [parameters, setParameters] = useState("");


  useEffect(() => {
    const paramsString = window.location.href.split('?')[1];

    const jsonParams = {};

    const params = Object.fromEntries(new URLSearchParams(paramsString).entries());

    setCredentials(params);

    const URLS = new URLSearchParams(params);

    setParameters(URLS.toString());

    axios.get(`http://191.241.144.59:25565/getUserData?${URLS.toString()}`).then(res => {
      setMoney(res.data.balance)
    });

    setInterval(async () => {
      const userData = await axios.get(`http://191.241.144.59:25565/getUserData?${URLS.toString()}`);

      setMoney(userData.data.balance)
    }, 3000)
  }, []);

  return (
    <div className="bg-zinc-800/50 py-5 mb-10 shadow-lg">
      <Container>
        <div className="flex justify-end items-center">
          <div className="flex items-center gap-5">
            <div className="bg-zinc-900 border border-zinc-700 py-2 px-8 rounded-lg">
              <p className="font-medium text-zinc-300">
                <span className="border-r border-zinc-700 pr-2 text-white">R$</span>{' '}
                {money.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
