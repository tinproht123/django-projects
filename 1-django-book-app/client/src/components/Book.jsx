import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/book.css";

const Book = (props) => {
  const [isImageHover, setIsImageHover] = useState(false);
  const { id, title, image, author, genres } = props;

  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="card" style={{ minHeight: "100%", overflow: "hidden" }}>
        <Link
          to={`/book-detail/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={window.location.origin + `/utils/images/${image}`}
            className="card-img-top"
            style={
              isImageHover === true
                ? {
                    maxHeight: 300,
                    objectFit: "cover",
                    transform: "scale(1.1)",
                  }
                : { maxHeight: 300, objectFit: "cover" }
            }
            onMouseEnter={() => setIsImageHover(true)}
            onMouseLeave={() => setIsImageHover(false)}
          />
        </Link>
        <div className="card-body">
          <Link
            to={`/book-detail/${id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h4 style={{ fontFamily: "Merri Weather" }} className="card-title">
              {title}
            </h4>
            <p className="card-subtitle text-muted my-2">{author}</p>
          </Link>
          {genres.map((genre, index) => (
            <div className="badge text-bg-dark me-2" key={index}>
              {genre}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Book;
