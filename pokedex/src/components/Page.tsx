import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import type { Generation } from "./Home/types";
import styles from "./Page.module.css";
import axios from "axios";

export default function Page() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Generation[]>([]);

  async function GetPokemonData(id: string | undefined) {
    await axios
      .get(`https://pokeapi.co/api/v2/generation/${id}`)
      .then((pokemon) => setPokemon(pokemon.data.pokemon_species));
  }

  useEffect(() => {
    GetPokemonData(id);
  }, [id]);

  if (pokemon.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.PageWelcome}>
        <h1>Generation {id}</h1>
        <p>Click on any pokemon you would like to see info about!</p>
      </div>
      <div className={styles.box}>
        {pokemon.map((e) => {
          const pokemonId = e.url.split("/").at(-2);
          return (
            <div className={styles.gridas} key={e.name}>
              <div className={styles.boxImageLink}>
                {" "}
                <Link
                  className={styles.Linkas}
                  to={`/pokemon-species/${pokemonId}`}
                >
                  <div className={styles.image}>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                      alt={e.name}
                    />
                  </div>

                  {e.name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
