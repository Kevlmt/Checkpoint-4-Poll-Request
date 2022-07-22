/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import Home from "@pages/Home";
import Profil from "@pages/Profil";
import Register from "@pages/Register";
import Login from "@pages/Login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profil" element={<Profil />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
