import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const response = await axios.get(url);
    // console.log(response.data.next)
    setNextUrl(response.data.next);
    setPreviousUrl(response.data.previous);
    getPokemon(response.data.results);
    setLoading(false);
  };
  const getPokemon = async (response) => {
    response.map(async (item) => {
      // console.log(item.url)
      const result = await axios.get(item.url);
      // console.log(result.data)
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => a.id > b.id? 1 : -1);
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return (
    <>
      <h1>Welcome to the World of Pokemon!</h1>
      <div className="container">
        <div className="left-content">
          <Card
            pokemon={pokeData}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />
          <div className="btn-group">
            {  previousUrl && <button onClick={()=>{
              setPokeData([])
              setUrl(previousUrl)
            }}>Previous</button>}

            { nextUrl && <button onClick={()=>{
              setPokeData([])
              setUrl(nextUrl)
            }}>Next</button>}

          </div>
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
      <div className="code-info">
        <a href="https://github.com/katjaloe/pokemon" target="_blank" rel="noreferrer noopener">Open-source code,</a> by Katja Löffler, built with the <a href="https://pokeapi.co/" target="_blank" rel="noreferrer noopener">Pokéapi.</a>
      </div>
    </>
  );
};
export default Main;
