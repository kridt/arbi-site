import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Start from "./pages/Start";
import Stage2 from "./pages/Stage2";
import Thanks from "./pages/Thanks";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/start" element={<Start />} />
        <Route path="/stage2" element={<Stage2 />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
