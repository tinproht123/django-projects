import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuthor } from "../app/features/author-slice";
import BookRelated from "../components/BookRelated";

const AuthorDetail = () => {
  const [readmore, setReadmore] = useState(false);
  const { id } = useParams();

  const author = useSelector((state) => state.author.author);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, dob, description, image, books } = author;

  useEffect(() => {
    dispatch(getAuthor({ id }));
  }, [dispatch]);

  return (
    <div className="container my-5">
      <button
        className="btn text-primary mb-5"
        style={{ fontSize: 20 }}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div style={{ maxWidth: 1100 }} className="row mx-auto shadow py-4 px-3">
        <div className="col-12 col-md-4">
          <img
            src={window.location.origin + `/utils/book-author-image/${image}`}
            className="card-img-top"
            style={{ maxHeight: 800, objectFit: "cover" }}
          />
        </div>
        <div className="col-12 col-md-8">
          <h2
            className="text-dark mt-4"
            style={{ letterSpacing: 3, fontFamily: "Merri Weather" }}
          >
            {name}
          </h2>
          <p className="text-muted fs-italic">Date of birth: {dob}</p>
          <h5>About this author:</h5>
          <p style={{ fontFamily: "Roboto Slab" }} className="my-3 d-inline">
            {readmore ? description : `${description?.substring(0, 800)}...`}
          </p>
          {description?.length > 800 && (
            <button
              className={`${readmore ? "btn-showless" : "btn-readmore"}`}
              onClick={() => setReadmore(!readmore)}
            >
              {readmore ? "show less" : "read more"}
            </button>
          )}
        </div>
      </div>
      <div>
        <h4 className="my-4">Book of this authors: </h4>
        <div className="d-flex flex-row">
          {books?.map((book) => (
            <BookRelated key={book.id} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;
