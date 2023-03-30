import React from "react";

const Pokeinfo=({data})=>{
  // console.log(data)
  return(
    <>
      {
        (!data)? <h2 class="no-pokemon-chosen" >Click a card on the left</h2> :
        <>
           <h2>{data.name}</h2>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png` } alt="" />
          <div className="abilities">
            {
              data.abilities.map(poke=> {
                return (
                  <>
                    <div className="group">
                      <h3>{poke.ability.name}</h3>
                    </div>
                  </>
                )
              })
            }
          </div>
          <div className="base-stat">
            {
              data.stats.map(poke=> {
                return (
                  <>
                    <h4>{poke.stat.name}: {poke.base_stat}</h4>
                  </>
                )
              })
            }

          </div>
        </>
      }
    </>
  )
}
 export default Pokeinfo;
