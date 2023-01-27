/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import Home from "@pages/Home/Home";
import Profile from "@pages/Profile/Profile";
import Register from "@pages/Register/Register";
import Login from "@pages/Login/Login";
import axios from "@services/axios";
import "./App.css";
import Chat from "@pages/Chat/Chat";

function App() {
  const [user, setUser] = useState();
  const checkConnection = async () => {
    try {
      const data = await axios
        .get("/users/refreshToken", {
          withCredentials: true,
        })
        .then((result) => result.data);
      return setUser(data);
    } catch (err) {
      return alert(err);
    }
  };

  useEffect(() => {
    checkConnection();
    const refreshToken = setTimeout(() => {
      checkConnection();
    }, parseInt(user?.expiresIn, 10));
    return clearTimeout(refreshToken);
  }, []);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            {user && <Route path="/home" element={<Home />} />}
            {user && <Route path="/chat" element={<Chat />} />}
            {user && <Route path="/profile/:userId" element={<Profile />} />}
            {!user && <Route path="/login" element={<Login />} />}
            {!user && <Route path="/register" element={<Register />} />}
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
