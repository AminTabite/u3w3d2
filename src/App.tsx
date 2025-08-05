import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarSp from "./components/NavbarSp";
import HotTopics from "./components/Hottopics";
import Details from "./components/Details";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <NavbarSp />
      <Routes>
        <Route path="/" element={<HotTopics />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
