import { Route, Routes } from "react-router";
import Home from "./components/Home/Home";
import Page from "./components/Page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generation/:id" element={<Page />} />
      </Routes>
    </>
  );
}

export default App;
