import BuilderPage from "./pages/BuilderPage";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<BuilderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
