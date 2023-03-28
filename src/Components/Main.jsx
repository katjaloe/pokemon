import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Main=()=>{
  const [pokeData,setPokeData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")

  const pokeFun=async()=>{
    setLoading(true)
    const response=await axios.get(url);
    console.log(response.data.results[0])
  }

  useEffect(()=>{
    pokeFun();
  },[url])
  return(
    <>
    <div className="container">
      <div className="left-content">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <div className="btn-group">
          <button>previous</button>
          <button>next</button>
        </div>
      </div>
      <div className="right-content">
        <Pokeinfo/>
      </div>
    </div>
    </>
  )
}
export default Main;
