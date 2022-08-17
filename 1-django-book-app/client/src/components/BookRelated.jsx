import React from "react";
import { Link } from "react-router-dom";

const BookRelated = (props) => {
  const { image, id, title } = props;
  return (
    <div style={{ width: 200, height: 400 }}>
      <Link to={`/book-detail/${id}`}>
        <img
          src={window.location.origin + `/utils/images/${image}`}
          className="img-thumbnail"
          style={{ width: 200, height: 300, objectFit: "cover" }}
        />
      </Link>
      <p className="text-center lead">{title}</p>
    </div>
  );
};

export default BookRelated;
