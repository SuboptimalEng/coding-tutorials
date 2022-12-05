import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  let currentOffset = 0;
  const [pokemon, setPokemon] = useState([]);

  const loadTenPokemon = () => {
    const tenPokemon = [];
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${currentOffset}`)
      .then(({ data }) => {
        data.results.forEach((p) => tenPokemon.push(p.name));
        setPokemon((pokemon) => [...pokemon, ...tenPokemon]);
      });
    currentOffset += 10;
  };

  const handleScroll = (e) => {
    console.log(e.target.documentElement.scrollTop);
    console.log(window.innerHeight);
    console.log(e.target.documentElement.scrollHeight);
    // console.log(
    //   Math.ceil(e.target.documentElement.scrollTop + window.innerHeight)
    // );
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      loadTenPokemon();
    }
  };

  useEffect(() => {
    loadTenPokemon();
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="flex
      flex-col items-center
      justify-center min-h-screen py-2
    bg-gray-900 text-gray-200"
    >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col text-4xl font-bold items-center justify-center w-full px-20 text-center">
        {pokemon.map((p, i) => {
          return (
            <div
              key={i}
              className="border w-80 h-40 flex justify-around place-items-center"
            >
              <div>{i + 1}.</div>
              <div>{p}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
