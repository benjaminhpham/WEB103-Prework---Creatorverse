import React from "react";
import Card from "../../components/Card/Card";
import "./ShowCreators.css";

const ShowCreators = ({ creators }) => {
  return (
    <ul className="creators">
      {creators.length === 0 ? (
        <h3 className="no-creators">There're no creators, please add some!</h3>
      ) : (
        creators
          .sort((a, b) => a.id - b.id)
          .map((creator) => (
            <li key={creator.id} className="creators-item">
              <Card key={creator.id} creator={creator} />
            </li>
          ))
      )}
    </ul>
  );
};

export default ShowCreators;
