import { Link } from "react-router";
import type { Generation } from "./types";
import styles from "./HomeNav.module.css";

export default function HomeNav({ generation }: { generation: Generation[] }) {
  return (
    <nav className={styles.HomeNav}>
      {generation.map((gen, index) => (
        <Link
          className={styles.Links}
          key={gen.name}
          to={`/generation/${index + 1}`}
        >
          {gen.name}
        </Link>
      ))}
    </nav>
  );
}
