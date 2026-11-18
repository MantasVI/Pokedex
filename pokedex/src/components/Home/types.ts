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
