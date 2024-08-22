import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { supabase } from "../../client";
import "./ViewCreator.css";

const ViewCreator = ({ setCreators }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creator, setCretor] = useState(null);

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
        setCretor(data);
      } catch (err) {
        console.error(`Fetching a single creator error: ${err.message}`);
      }
    };

    fetchSingleCreator();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const { data, error } = await supabase
        .from("creators")
        .delete()
        .eq("id", id)
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
    <article className="creator">
      <div className="creator__image-container">
        <img
          src={creator?.imageUrl}
          alt="creator__image"
          className="creator__image"
        />
      </div>
      <div className="creator__content">
        <h3 className="creator__content-name">{creator?.name}</h3>
        <p className="creator__content-description">{creator?.description}</p>
        <div className="creator__content-socials">
          {creator?.youtube && (
            <Link
              className="content-socials__item"
              to={creator.youtube}
              target="_blank"
            >
              <span className="fa-brands fa-youtube"></span>
              <span>{creator?.youtube}</span>
            </Link>
          )}
          {creator?.twitter && (
            <Link
              className="content-socials__item"
              to={creator.youtube}
              target="_blank"
            >
              <span className="fa-brands fa-twitter"></span>
              <span>{creator?.twitter}</span>
            </Link>
          )}
          {creator?.instagram && (
            <Link
              className="content-socials__item"
              to={creator.youtube}
              target="_blank"
            >
              <span className="fa-brands fa-instagram"></span>
              <span>{creator?.instagram}</span>
            </Link>
          )}
        </div>
      </div>
      <div className="creator__actions">
        <Link to={`/edit/${id}`}>
          <button className="btn edit-btn">Edit</button>
        </Link>
        <button
          className="btn delete-btn"
          onClick={() => handleDelete(parseInt(id))}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default ViewCreator;
