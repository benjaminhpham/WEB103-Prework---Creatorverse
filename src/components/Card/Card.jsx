import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ creator }) => {
  const { id, name, imageUrl, description, youtube, twitter, instagram } =
    creator;

  return (
    <article
      className="card"
      style={{
        backgroundImage: `${imageUrl ? `url(${imageUrl}` : ""}`,
      }}
    >
      <div className="card__header">
        <h3 className="card__header-name">{name}</h3>
        <div className="card__header-icons">
          {youtube && <span className="fa-brands fa-youtube"></span>}
          {twitter && <span className="fa-brands fa-twitter"></span>}
          {instagram && <span className="fa-brands fa-instagram"></span>}
        </div>
      </div>
      <div className="card__actions">
        <Link to={`/${id}`}>
          <span className="fa-solid fa-circle-info icon"></span>
        </Link>
        <Link to={`/edit/${id}`}>
          <span className="fa-solid fa-pen icon"></span>
        </Link>
      </div>
      <p className="card__description">{description}</p>
    </article>
  );
};

export default Card;
