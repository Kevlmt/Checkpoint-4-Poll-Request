/* eslint-disable import/no-unresolved */
// /* eslint-disable import/no-unresolved */
// // eslint-disable-next-line import/order
import { useContext, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import PopupProfil from "@components/PopupProfil";
import axios from "@services/axios";
import UserContext from "../contexts/UserContext";
import "@styles/Profil.scss";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Profil() {
  const { user, setUser } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);
  const query = useQuery();

  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const dataFetched = await axios
        .get(`/users/${user.id}`, { withCredentials: true })
        .then((result) => result.data);
      if (dataFetched) {
        setUser(dataFetched);
        return setUserInfo(dataFetched);
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/users/logout", { withCredentials: true }).then(() => {
        setUser(null);
        setUserInfo(null);
        return navigate("/");
      });
    } catch (err) {
      alert(err.reponse.data);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="page-profil">
      {query.get("popupProfil") && (
        <PopupProfil
          fetchUserInfo={fetchUserInfo}
          query={query}
          userInfo={userInfo}
        />
      )}
      <div className="profil-header">
        <NavLink to="/">Poll Request</NavLink>
      </div>
      {userInfo && (
        <div className="content-profil">
          <h1>Welcome to your Profil</h1>
          <div className="profil-card">
            <div>
              <NavLink
                to="/profil?popupProfil=open"
                className="change-profil-button"
              >
                Edit profil
              </NavLink>
            </div>

            <div className="profil-container">
              <div className="avatar-container">
                <img
                  src={
                    userInfo.imgLink
                      ? `${
                          import.meta.env.VITE_BACKEND_ASSETS_URL
                        }/images/users/${userInfo.imgLink}`
                      : `${
                          import.meta.env.VITE_BACKEND_ASSETS_URL
                        }/images/users/avatar.png`
                  }
                  alt="avatar"
                  className="avatar-profil-image"
                />
              </div>
              <div className="profil-info-container">
                <p>Pseudo: {userInfo.pseudo}</p>
                <p>Lastname: {userInfo.lastname}</p>
                <p>Firstname: {userInfo.firstname}</p>
              </div>
            </div>
            <div className="profil-stats-container">
              <h3>Stats:</h3>
              <h4>j'ai pas eu le temps.</h4>
            </div>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
