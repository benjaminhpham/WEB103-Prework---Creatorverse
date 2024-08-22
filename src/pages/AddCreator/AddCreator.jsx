import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../client";
import "./AddCreator.css";

const AddCreator = ({ setCreators }) => {
  const navigate = useNavigate();

  const [creator, setCreator] = useState({
    name: "",
    imageUrl: "",
    description: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreator((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("creators")
        .insert([{ ...creator }])
        .select();

      if (error) {
        throw new Error(
          `An error occured while adding a new creator record: ${error.message}`
        );
      }

      setCreators((prevState) => [...prevState, data]);
      setCreator({
        name: "",
        imageUrl: "",
        description: "",
        youtube: "",
        twitter: "",
        instagram: "",
      });
      navigate("/");
    } catch (err) {
      console.error(`Adding error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="creator-form">
      <div className="creator-form__field">
        <label htmlFor="name" className="creator-form__label">
          <span>Name</span>
        </label>
        <input
          className="creator-form__input"
          type="text"
          id="name"
          name="name"
          value={creator.name}
          required
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
          value={creator.imageUrl}
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="creator-form__field">
        <label htmlFor="description" className="creator-form__label">
          <span>Description</span>
          <p>
            Provide a description of the creator. Who are they? What makes them
            interesting?
          </p>
        </label>
        <textarea
          className="creator-form__input"
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={creator.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <h3 className="creator-form__social-title">Social Media Links</h3>
      <p>Provide at least one of the creator's social media links.</p>
      <div className="creator-form__field">
        <label htmlFor="youtube" className="creator-form__label">
          <span>
            <i className="fa-brands fa-youtube"></i> YouTube
          </span>
          <p>The creator's YouTube handle (without the @)</p>
        </label>
        <input
          className="creator-form__input"
          type="text"
          id="youtube"
          name="youtube"
          value={creator.youtube}
          onChange={handleInputChange}
        />
      </div>
      <div className="creator-form__field">
        <label htmlFor="twitter" className="creator-form__label">
          <span>
            <i className="fa-brands fa-twitter"></i> Twitter
          </span>
          <p>The creator's Twitter handle (without the @)</p>
        </label>
        <input
          className="creator-form__input"
          type="text"
          id="twitter"
          name="twitter"
          value={creator.twitter}
          onChange={handleInputChange}
        />
      </div>
      <div className="creator-form__field">
        <label htmlFor="instagram" className="creator-form__label">
          <span>
            <i className="fa-brands fa-instagram"></i> Instagram
          </span>
          <p>The creator's instagram handle (without the @)</p>
        </label>
        <input
          className="creator-form__input"
          type="text"
          id="instagram"
          name="instagram"
          value={creator.instagram}
          onChange={handleInputChange}
        />
      </div>
      <button className="creator-form__submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddCreator;
