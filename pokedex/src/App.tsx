import { Route, Routes } from "react-router";
import Home from "./components/Home/Home";
import Page from "./components/Page";
import Pokemon from "./components/Pokemon";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generation/:id" element={<Page />} />
        <Route path="/pokemon-species/:id" element={<Pokemon />} />
      </Routes>
    </>
  );
}

export default App;
