import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import type { PokemonSpecies } from "./Home/types";
export default function Pokemon() {
  const [pokeData, setPokeData] = useState<PokemonSpecies | null>(null);
  const { id } = useParams();

  async function GetPokemon() {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((pokemon) => setPokeData(pokemon.data));
  }

  useEffect(() => {
    GetPokemon();
  }, [id]);

  if (!pokeData) {
    return <p>Loading...</p>;
  }

  const description = pokeData.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  )?.flavor_text;

  return (
    <div>
      <div>
        
        <p>{pokeData.id}</p>
        <p>{pokeData.name}</p>
        <p>{pokeData.base_happiness}</p>
        <p>{pokeData.generation.name}</p>
        <p>{pokeData.habitat?.name ?? "Unknown"}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
