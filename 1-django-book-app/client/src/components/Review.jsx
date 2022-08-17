import React from "react";

const Review = (props) => {
  const { user, title, rating, description } = props;
  return (
    <div className="p-3 my-5 shadow rounded bg-light">
      <h5 className="text-dark">{title}</h5>
      <p>by {user.username}</p>
      <p>{rating}/5</p>
      <p>{description}</p>
    </div>
  );
};

export default Review;
