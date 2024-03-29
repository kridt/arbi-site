import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Start from "./pages/Start";
import Stage2 from "./pages/Stage2";
import Thanks from "./pages/Thanks";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import CustomerList from "./pages/CustomerList";
import Custemize from "./pages/Custemize";
import RateMe from "./pages/RateMe";
import MakeBet from "./pages/MakeBet";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<LandingPage />} />
        <Route path="/start" element={<Start />} />
        <Route path="/stage2" element={<Stage2 />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/kundeliste" element={<CustomerList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change" element={<Custemize />} />
        <Route path="/rateMe/:id" element={<RateMe />} />
        <Route path="/makeBet/:id" element={<MakeBet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
