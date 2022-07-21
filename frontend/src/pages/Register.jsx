/* eslint-disable import/no-unresolved */
import { useReducer, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "../services/axios";
import "@styles/Login.scss";

const formInitialState = {
  password: "",
  email: "",
};

const registerForm = (state, action) => {
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
export default function Register() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(registerForm, formInitialState);

  const loginSubmit = async (e) => {
    e.preventDefault();
    const userCredit = {
      password: formData.password,
      email: formData.email,
    };

    try {
      const userData = await axios
        .post("users/", userCredit, {
          withCredentials: true,
        })
        .then((response) => response.data);
      // eslint-disable-next-line no-restricted-syntax
      setUser(userData);
      // alert("Successfully logged in");
      dispatch({ type: "RESET_FORM" });
      return navigate("/");
    } catch (err) {
      return alert(err.response.data);
    }
  };

  return (
    <div className="login-page">
      <section className="login-container">
        <form onSubmit={loginSubmit}>
          <div>
            <input
              className="input"
              type="email"
              placeholder="Enter your email"
              required
              autoComplete="on"
              value={formData.email}
              onChange={(e) =>
                dispatch({ type: "UPDATE_EMAIL", payload: e.target.value })
              }
            />
            <input
              className="input"
              type="password"
              placeholder="Enter your password"
              required
              autoComplete="on"
              value={formData.password}
              onChange={(e) =>
                dispatch({ type: "UPDATE_PASSWORD", payload: e.target.value })
              }
            />
          </div>
          <NavLink to="/register" className="login-page-navlink-register">
            <p>S'inscrire</p>
          </NavLink>
          <button className="login-page-submit-button" type="submit">
            Connection
          </button>
        </form>
      </section>
    </div>
  );
}
