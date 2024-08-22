import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../../client";
import "./EditCreator.css";

const DeleteModal = ({ editedCreator, id, handleDelete, setIsModalOpen }) => {
  return (
    <div className="delete-modal__overlay">
      <div className="delete-modal__content">
        <h3 className="delete-modal__title">⚠️ WAIT!!!! ⚠️</h3>
        <p className="delete-modal__warning">
          Are you sure you want to delete: {editedCreator?.name} gh???
        </p>
        <div className="delete-modal__actions">
          <button className="btn yes-btn" onClick={() => setIsModalOpen(false)}>
            Nah, Never Mind
          </button>
          <button
            className="btn no-btn"
            onClick={() => handleDelete(parseInt(id))}
          >
            Yes! Totally Sure
          </button>
        </div>
      </div>
    </div>
  );
};

const EditCreator = ({ setRefetch, setCreators }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedCreator, setEditedCreator] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSingleCreator = async () => {
      try {
        const { data, error } = await supabase
          .from("creators")
          .select()
          .eq("id", parseInt(id))
          .maybeSingle();

        if (error) {
          throw new Error(
            `Failed to fetch the creator with id: ${id}: ${error.message} `
          );
        }
        setEditedCreator(data);
      } catch (err) {
        console.error(`Fetching a single creator error: ${err.message}`);
      }
    };

    fetchSingleCreator();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCreator((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("creators")
        .update({ ...editedCreator })
        .eq("id", parseInt(id))
        .select();

      if (error) {
        throw new Error(
          `An error occured while updating the creator record with id: ${creator.id}: ${error.message}`
        );
      }

      console.log("data", data);

      setRefetch((prevState) => !prevState);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data, error } = await supabase
        .from("creators")
        .delete()
        .eq("id", parseInt(id))
        .select();

      if (error) {
        throw new Error(
          `Failed to delete a creator record with id: ${id}: ${error.message}`
        );
      }

      setCreators((prevState) =>
        prevState.filter((creator) => creator.id !== parseInt(id))
      );

      navigate("/");
    } catch (err) {
      console.error(`Deleting a record error: ${err.message}`);
    }
  };

  return (
    <div>
      <form className="creator-form">
        <div className="creator-form__field">
          <label htmlFor="name" className="creator-form__label">
            Name
          </label>
          <input
            className="creator-form__input"
            type="text"
            id="name"
            name="name"
            value={editedCreator.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="creator-form__field">
          <label htmlFor="imageUrl" className="creator-form__label">
            <span>Image</span>
            <p>
              Provide a link to an image of your creator. Be sure to include the
              http://
            </p>
          </label>
          <input
            className="creator-form__input"
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={editedCreator.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="creator-form__field">
          <label htmlFor="description" className="creator-form__label">
            <span>Description</span>
            <p>
              Provide a description of the creator. Who are they? What makes
              them interesting?
            </p>
          </label>
          <textarea
            className="creator-form__input"
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={editedCreator.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <h3 className="creator-form__social-title">Social Media Links</h3>
        <p>Provide at least one of the creator's social media links.</p>
        <div className="creator-form__field">
          <label htmlFor="youtube" className="creator-form__label">
            <span>
              <i class="fa-brands fa-youtube"></i> YouTube
            </span>
            <p>The creator's YouTube handle (without the @)</p>
          </label>
          <input
            className="creator-form__input"
            type="text"
            id="youtube"
            name="youtube"
            value={editedCreator.youtube}
            onChange={handleInputChange}
          />
        </div>
        <div className="creator-form__field">
          <label htmlFor="twitter" className="creator-form__label">
            <span>
              <i class="fa-brands fa-twitter"></i> Twitter
            </span>
            <p>The creator's Twitter handle (without the @)</p>
          </label>
          <input
            className="creator-form__input"
            type="text"
            id="twitter"
            name="twitter"
            value={editedCreator.twitter}
            onChange={handleInputChange}
          />
        </div>
        <div className="creator-form__field">
          <label htmlFor="instagram" className="creator-form__label">
            <span>
              <i class="fa-brands fa-instagram"></i> Instagram
            </span>
            <p>The creator's instagram handle (without the @)</p>
          </label>
          <input
            className="creator-form__input"
            type="text"
            id="instagram"
            name="instagram"
            value={editedCreator.instagram}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div className="creator__actions">
        <button
          type="submit"
          onClick={handleFormSubmit}
          className="btn submit-btn"
        >
          Submit
        </button>
        <button
          onClick={() => setIsModalOpen((prev) => !prev)}
          className="btn delete-btn"
        >
          Delete
        </button>
        {isModalOpen && (
          <DeleteModal
            editedCreator={editedCreator}
            id={id}
            handleDelete={handleDelete}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default EditCreator;
