/* eslint-disable import/no-unresolved */
import { useReducer, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../services/axios";
import "@styles/Register.scss";

const formInitialState = {
  password: "",
  firstname: "",
  lastname: "",
  pseudo: "",
  email: "",
};

const registerForm = (state, action) => {
  switch (action.type) {
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.payload };
    case "UPDATE_FIRSTNAME":
      return { ...state, firstname: action.payload };
    case "UPDATE_LASTNAME":
      return { ...state, lastname: action.payload };
    case "UPDATE_PSEUDO":
      return { ...state, pseudo: action.payload };
    case "RESET_FORM":
      return { ...formInitialState };
    default:
      return state;
  }
};
export default function Register() {
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer(registerForm, formInitialState);
  const [file, setFile] = useState(null);

  const registerSubmit = async (e) => {
    e.preventDefault();
    const userCredit = {
      password: formData.password,
      email: formData.email,
      lastname: formData.lastname,
      firstname: formData.firstname,
      pseudo: formData.pseudo,
    };
    if (!file) {
      try {
        const userData = await axios
          .post("users/", userCredit, {
            withCredentials: true,
          })
          .then((response) => response.data);
        // eslint-disable-next-line no-restricted-syntax
        if (userData) {
          dispatch({ type: "RESET_FORM" });
          return navigate("/login");
        }
        return null;
      } catch (err) {
        return alert(err.response.data);
      }
    }
    const user = new FormData();
    user.append("file", file);
    user.append("newUser", JSON.stringify(userCredit));
    try {
      const userData = await axios
        .post("users/?file=users", user, {
          withCredentials: true,
        })
        .then((response) => response.data);
      // eslint-disable-next-line no-restricted-syntax
      if (userData) {
        dispatch({ type: "RESET_FORM" });
        return navigate("/login");
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  return (
    <div className="register-page">
      <section className="register-container">
        <form onSubmit={registerSubmit}>
          <h1>Register an account</h1>
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
            <input
              className="input"
              type="text"
              placeholder="Enter your firstname"
              required
              autoComplete="on"
              value={formData.firstname}
              onChange={(e) =>
                dispatch({ type: "UPDATE_FIRSTNAME", payload: e.target.value })
              }
            />
            <input
              className="input"
              type="text"
              placeholder="Enter your lastname"
              required
              autoComplete="on"
              value={formData.lastname}
              onChange={(e) =>
                dispatch({ type: "UPDATE_LASTNAME", payload: e.target.value })
              }
            />
            <input
              className="input"
              type="text"
              placeholder="Enter your pseudo"
              required
              autoComplete="on"
              value={formData.pseudo}
              onChange={(e) =>
                dispatch({ type: "UPDATE_PSEUDO", payload: e.target.value })
              }
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="input-file"
            />
          </div>
          <NavLink to="/login" className="register-page-navlink-register">
            <p>Connection</p>
          </NavLink>
          <button className="register-page-submit-button" type="submit">
            Register
          </button>
        </form>
      </section>
    </div>
  );
}
