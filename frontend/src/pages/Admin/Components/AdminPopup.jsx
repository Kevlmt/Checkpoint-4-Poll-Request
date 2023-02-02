/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "@services/axios";

export default function AdminPopup({ popup, id, name, fetchCategories }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "" });

  const navigateBack = () => {
    return navigate(-1);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const createdCategory = await axios
        .post("/categories", category, {
          withCredentials: true,
        })
        .then((response) => response.status);
      if (createdCategory === 201) {
        setCategory({ name: "" });
        fetchCategories();
        return navigateBack();
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const editedCategory = await axios
        .put(`/categories/${id}`, category, {
          withCredentials: true,
        })
        .then((response) => response.status);
      if (editedCategory === 204) {
        setCategory({ name: "" });
        fetchCategories();
        return navigateBack();
      }
      return null;
    } catch (err) {
      return alert(err.response.data);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const deletedCategory = await axios
        .delete(`/categories/${id}`, { withCredentials: true })
        .then((response) => response.status);
      if (deletedCategory === 200) {
        setCategory({ name: "" });
        fetchCategories();
        return navigateBack();
      }
      return null;
    } catch (err) {
      return alert(err.reponse.data);
    }
  };

  useEffect(() => {
    if (popup === "edit") {
      setCategory({ name });
    } else {
      setCategory({ name: "" });
    }
  }, [popup]);

  const handleAdminPopup = () => {
    switch (popup) {
      case "add":
        return (
          <section className="popup-container">
            <div className="popup-div">
              <button
                type="button"
                onClick={navigateBack}
                className="popup-close-button"
              >
                <RiCloseLine size={40} />
              </button>
              <div className="edit-profile-popup">
                <h1>Add a Category</h1>
                <form onSubmit={handleCreate}>
                  <div>
                    <input
                      className="edit-profile-input"
                      type="text"
                      placeholder="Enter your name"
                      required
                      autoComplete="on"
                      value={category.name}
                      onChange={(e) => setCategory({ name: e.target.value })}
                    />
                  </div>
                  <button type="submit">Create</button>
                </form>
              </div>
            </div>
          </section>
        );
      case "edit":
        return (
          <section className="popup-container">
            <div className="popup-div">
              <button
                type="button"
                onClick={navigateBack}
                className="popup-close-button"
              >
                <RiCloseLine size={40} />
              </button>
              <div className="edit-profile-popup">
                <h1>Edit a category</h1>
                <form onSubmit={handleEdit}>
                  <div>
                    <input
                      className="edit-profile-input"
                      type="text"
                      placeholder="Enter a name"
                      required
                      autoComplete="on"
                      value={category.name}
                      onChange={(e) => setCategory({ name: e.target.value })}
                    />
                  </div>
                  <button type="submit">Apply</button>
                </form>
              </div>
            </div>
          </section>
        );
      case "delete":
        return (
          <section className="popup-container">
            <div className="popup-div">
              <button
                type="button"
                onClick={navigateBack}
                className="popup-close-button"
              >
                <RiCloseLine size={40} />
              </button>
              <div className="delete-poll-container">
                <h1>Do you want to delete this Category ?</h1>
                <button
                  type="button"
                  className="popup-cancel-button"
                  onClick={navigateBack}
                >
                  No
                </button>
                <button
                  type="button"
                  className="popup-delete-button"
                  onClick={handleDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return <>{handleAdminPopup()}</>;
}
