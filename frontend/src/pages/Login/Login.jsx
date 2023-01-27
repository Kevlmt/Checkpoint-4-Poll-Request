/* eslint-disable import/no-unresolved */
import { useReducer, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import axios from "../../services/axios";
import "./Login.scss";

const formInitialState = {
  password: "",
  email: "",
  remember: true,
};

const loginForm = (state, action) => {
  switch (action.type) {
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.payload };
    case "RESET_FORM":
      return { ...formInitialState };
    default:
      return state;
  }
};
export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(loginForm, formInitialState);

  const loginSubmit = async (e) => {
    e.preventDefault();
    const userCredit = {
      password: formData.password,
      email: formData.email,
      remember: true,
    };

    try {
      const userData = await axios
        .post("users/login", userCredit, {
          withCredentials: true,
        })
        .then((response) => response.data);
      // eslint-disable-next-line no-restricted-syntax
      setUser(userData);
      // alert("Successfully logged in");
      dispatch({ type: "RESET_FORM" });
      return navigate("/home?category=Recent");
    } catch (err) {
      return alert(err.response.data);
    }
  };
  return (
    <div className="login-page">
      <h1 className="login-page-title">Poll Request</h1>
      <form onSubmit={loginSubmit} className="login-page-form">
        <h2 className="login-page-form-title">Connexion</h2>
        <div className="login-page-input-container">
          <input
            className="login-page-input"
            type="email"
            placeholder="Email"
            required
            autoComplete="on"
            value={formData.email}
            onChange={(e) =>
              dispatch({ type: "UPDATE_EMAIL", payload: e.target.value })
            }
          />
          <input
            className="login-page-input"
            type="password"
            placeholder="Password"
            required
            autoComplete="on"
            value={formData.password}
            onChange={(e) =>
              dispatch({ type: "UPDATE_PASSWORD", payload: e.target.value })
            }
          />
        </div>
        <NavLink to="/register" className="login-page-navlink">
          <p>Register</p>
        </NavLink>
        <button className="login-page-submit-button" type="submit">
          Connection
        </button>
      </form>
    </div>
  );
}
