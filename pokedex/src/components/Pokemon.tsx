import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import type { PokemonSpecies, PokemonStats } from "./Home/types";
import styles from "./Pokemon.module.css";
export default function Pokemon() {
  const [pokeData, setPokeData] = useState<PokemonSpecies | null>(null);
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<PokemonStats | null>(null);

  async function GetPokemon() {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((pokemon) => setPokeData(pokemon.data));
  }

  async function GetPokemonData() {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((pokemon) => setPokemon(pokemon.data));
  }

  useEffect(() => {
    GetPokemon();
    GetPokemonData();
  }, [id]);

  if (!pokeData || !pokemon) {
    return <p>Loading...</p>;
  }

  const description = pokeData.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  )?.flavor_text;

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <img
          className={styles.image}
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
        />

        <p>
          <b>Pokedex ID :</b> {pokeData.id}
        </p>
        <p>
          <b>Pokemon Name:</b> {pokeData.name}
        </p>
        <p>
          <b>Pokemon Height:</b> {pokemon.height}
        </p>
        <p>
          <b>Pokemon Weigth:</b> {pokemon.weight}
        </p>
        <p>
          <b>Base Happiness</b>
          {pokeData.base_happiness}
        </p>
        <p>
          <b>Pokemon Generation</b>
          {pokeData.generation.name}
        </p>
        <p>
          <b>Pokemon Habitat</b>
          {pokeData.habitat?.name ?? "Unknown"}
        </p>
        <p>
          <b>Pokemon Lore: </b>
          {description}
        </p>
        <div>
          <h3>Pokemon Type: </h3>
          {pokemon.types.map((e) => (
            <p key={e.slot}>{e.type.name}</p>
          ))}
        </div>
        <div className={styles.skills}>
          <h3>Pokemon skills he/she can learn: </h3>
          {pokemon.moves.map((e) => (
            <span>{e.move.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
