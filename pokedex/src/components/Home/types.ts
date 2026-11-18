export type Generation = {
  name: string;
  url: string;
};

export type PokemonSpecies = {
  id: number;
  name: string;
  base_happiness: number;
  generation: Generation;

  habitat: Generation | null;
  flavor_text_entries: {
    flavor_text: string;
    language: Generation;
  }[];
};

export type Stat = {
  base_stat: number;
  stat: Generation; // { name: "hp", url }
};

export type PokemonType = {
  slot: number;
  type: Generation;
};

export type Move = {
  move: Generation;
};

export type PokemonStats = {
  id: number;
  name: string;
  weight: number;
  height: number;
  moves: Move[];
  types: PokemonType[]; // array
  stats: Stat[]; // added
  sprites: {
    front_default: string;
    other: {
      "official-artwork": { front_default: string };
    };
  };
};
