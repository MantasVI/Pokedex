# Pokédex

A Pokédex web app built with **React**, **TypeScript** and **Vite**, using data from [PokéAPI](https://pokeapi.co/).

Pick a generation, browse its Pokémon, and open any one to see its artwork, stats, types, moves and Pokédex description.

## Features

- **Generation picker:** the home page lists all 9 generations, loaded from the API.
- **Pokémon grid:** each generation page shows every Pokémon from that generation as a card with its sprite and name.
- **Detail page:** each Pokémon has its own page with:
  - official artwork
  - Pokédex ID, name, height and weight
  - type(s)
  - base happiness, generation and habitat
  - the English Pokédex description ("lore")
  - every move it can learn

## Tech stack

| Tool | Used for |
|---|---|
| [React 19](https://react.dev/) | UI components and state (`useState`, `useEffect`) |
| [TypeScript](https://www.typescriptlang.org/) | Types for the API data |
| [Vite](https://vite.dev/) | Dev server and build |
| [React Router](https://reactrouter.com/) | Page routing and URL parameters |
| [Axios](https://axios-http.com/) | Fetching data from PokéAPI |
| CSS Modules | Styles scoped to each component |
| ESLint | Linting |

## Getting started

You need [Node.js](https://nodejs.org/) installed.

```bash
cd pokedex
npm install
npm run dev
```

Then open the URL Vite prints, usually <http://localhost:5173>.

Other scripts:

```bash
npm run build     # type-check and build for production
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## How it works

### Routes

| URL | Component | Shows |
|---|---|---|
| `/` | `Home` | The list of generations |
| `/generation/:id` | `Page` | Every Pokémon in generation `id` |
| `/pokemon-species/:id` | `Pokemon` | Details for the Pokémon with Pokédex number `id` |

Each page reads its `:id` from the URL with `useParams()` and fetches its own data in a `useEffect`. Because the data each page needs is in the URL, every page also works when you refresh it or open a link to it directly.

### API endpoints used

| Endpoint | Used on | For |
|---|---|---|
| `/api/v2/generation` | Home | The list of all generations |
| `/api/v2/generation/{id}` | Page | The Pokémon species in one generation |
| `/api/v2/pokemon-species/{id}` | Pokemon | Description, generation, habitat, happiness |
| `/api/v2/pokemon/{id}` | Pokemon | Artwork, types, height, weight, moves |

The species data and the battle data come from two separate endpoints, so the detail page makes two requests and keeps each response in its own state.

Sprites on the grid don't need an extra request. The URL is built from the Pokédex number, which is taken from the end of each species URL:

```
https://pokeapi.co/api/v2/pokemon-species/4/  →  4
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png
```

### Project structure

```
src/
├── main.tsx                  # Entry point, wraps the app in BrowserRouter
├── App.tsx                   # Route definitions
└── components/
    ├── Home/
    │   ├── Home.tsx          # Home page, fetches the generation list
    │   ├── HomeNav.tsx       # Renders a link for each generation
    │   ├── HomeNav.module.css
    │   └── types.ts          # TypeScript types for the API responses
    ├── Page.tsx              # Generation page with the Pokémon grid
    ├── Page.module.css
    ├── Pokemon.tsx           # Pokémon detail page
    └── Pokemon.module.css
```

## Styling

The design uses the Pokémon colours (red, yellow and blue). Each component has its own CSS Module, so class names don't clash between pages. Layouts use CSS Grid for the generation buttons, the Pokémon cards and the move list, and Flexbox for centring.

## What I learned

- Setting up a React + TypeScript project with Vite
- Routing with React Router, including URL parameters (`/generation/:id`) and `useParams`
- Fetching data in `useEffect`, and re-fetching when the URL changes by listing `id` as a dependency
- Writing TypeScript types that match a real API response, including arrays, nested objects and fields that can be `null`
- Passing data to child components through props
- Handling the loading state before data arrives
- CSS Modules, CSS variables, Grid and Flexbox

## Ideas for later

- Search and filter Pokémon by name
- Base stats shown as bars
- Evolution chains
- Previous and next buttons on the detail page
- Error messages when a request fails

## Credits

All Pokémon data and images come from [PokéAPI](https://pokeapi.co/). Pokémon and its names are trademarks of Nintendo, Game Freak and The Pokémon Company. This is a non-commercial learning project.
