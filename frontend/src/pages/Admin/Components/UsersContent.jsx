/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import "./UsersContent.scss";
import axios from "@services/axios";

export default function UserContent() {
  const [searchValue, setSearchValue] = useState("");
  const [userPopup, setUserPopup] = useState(false);
  const [userSelected, setUserSelected] = useState("");

  const [usersList, setUsersList] = useState(null);
  const fetchUsersList = async () => {
    try {
      const fetchedData = await axios
        .get("/users/admin", { withCredentials: true })
        .then((response) => response.data);
      if (fetchedData) {
        return setUsersList(fetchedData);
      }
      return null;
    } catch (err) {
      return alert(err.reponse.data);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`/users/${userSelected}`, { withCredentials: true });
      setUserSelected("");
      fetchUsersList();
      return setUserPopup(false);
    } catch (err) {
      return alert(err.response.data);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  return (
    <div className="categories-content-container">
      {userPopup && (
        <div className="admin-user-popup">
          <div className="admin-user-popup-content">
            <p> Do you really want to ban this user ?</p>
            <div>
              <button
                type="button"
                className="admin-button-no"
                onClick={() => setUserPopup(false)}
              >
                No
              </button>
              <button
                className="admin-button-yes"
                type="button"
                onClick={deleteUser}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="admin-input-container">
        <input
          type="text"
          placeholder="search a user"
          className="admin-search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className="categories-list">
        {usersList &&
          usersList
            .filter(
              (user) =>
                user.pseudo.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.firstname
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.lastname.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((user) => (
              <div className="category-card" key={user.id}>
                <p>
                  {user.firstname} {user.lastname}
                </p>
                <div>
                  <button
                    type="button"
                    className="admin-button-delete"
                    onClick={() => {
                      setUserPopup(true);
                      setUserSelected(user.id);
                    }}
                  >
                    Ban
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
