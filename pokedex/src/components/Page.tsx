import { useState, useEffect } from "react";
import { useParams } from "react-router";
import type { Generation } from "./Home/types";
import axios from "axios";
export default function Page() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Generation[]>([]);

  async function GetPokemonData(id: string | undefined) {
    await axios
      .get(`https://pokeapi.co/api/v2/generation/${id}`)
      .then((pokemon) => setPokemon(pokemon.data.pokemon_species));
  }
  console.log(pokemon);
  useEffect(() => {
    GetPokemonData(id);
  }, [id]);
  return (
    <div>
      <p>
        {pokemon.map((e) => (
          <div>
            <p>{e.name}</p>
            <p>{e.url}</p>
          </div>
        ))}
      </p>
    </div>
  );
}
