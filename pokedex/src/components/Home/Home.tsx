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
      <div className={styles.boxred}>
        <h1>Hello!</h1>
      </div>
      <div className={styles.boxblack}>
        <p>Welcome to the pokedex!</p>
      </div>
      <div className={styles.boxgray}>
        <p>Select any generation of pokemon you want!</p>
      </div>

      <HomeNav generation={generation} />
    </div>
  );
}
