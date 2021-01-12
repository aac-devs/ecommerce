import React from "react";

const Reviews = ({ qualification, num }) => {
  let acum = 0.5;
  const arrayStars = [];
  for (let i = 1; i <= 5; i++) {
    if (qualification > acum) {
      arrayStars.push(<i className="fa fa-star global__star" key={i} />);
    } else if (qualification < acum) {
      arrayStars.push(<i className="fa fa-star-o global__star" key={i} />);
    } else {
      arrayStars.push(<i className="fa fa-star-half-o global__star" key={i} />);
    }
    acum = acum + 1;
  }
  return (
    <>
      {arrayStars.map((star, index) => (
        <span key={index}>{star} </span>
      ))}
      <span>
        <h1 className="text__thumb">{num} reviews</h1>
      </span>
    </>
  );
};

export default Reviews;
