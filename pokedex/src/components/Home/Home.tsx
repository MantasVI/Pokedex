import { useEffect, useState } from "react";
import axios from "axios";
import HomeNav from "./HomeNav";
import type { Generation } from "./types";
import styles from "./HomeNav.module.css";

export default function Home() {
  const [generation, setGeneration] = useState<Generation[]>([]);

  async function getGenerations() {
    await axios
      .get("https://pokeapi.co/api/v2/generation")
      .then((res) => setGeneration(res.data.results));
  }

  useEffect(() => {
    getGenerations();
  }, []);

  return (
    <div className={styles.box}>
      <h1>Hello!</h1>
      <p>Welcome to the pokedex!</p>
      <p>Select any generation of pokemon you want!</p>

      <HomeNav generation={generation} />
    </div>
  );
}
