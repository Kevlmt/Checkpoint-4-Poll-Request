/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import { useState, useEffect, useRef } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import Home from "@pages/Home/Home";
import Profile from "@pages/Profile/Profile";
import Register from "@pages/Register/Register";
import Login from "@pages/Login/Login";
import axios from "@services/axios";
import { io } from "socket.io-client";
import "./App.css";
import Chat from "@pages/Chat/Chat";
import Admin from "@pages/Admin/Admin";

function App() {
  const [user, setUser] = useState();
  const socket = useRef();
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

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:8000");
      socket.current.emit("add-user", user.id);
    }
  }, [user]);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <UserContext.Provider value={{ user, setUser, socket }}>
        <Router>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            {user && <Route path="/home" element={<Home />} />}
            {user && <Route path="/chat" element={<Chat />} />}
            {user && <Route path="/profile/:userId" element={<Profile />} />}
            {!user && <Route path="/login" element={<Login />} />}
            {!user && <Route path="/register" element={<Register />} />}
            {user && user.role === "ADMIN" && (
              <Route path="/admin" element={<Admin />} />
            )}
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
