import React from "react";

const Reviews = ({ qualification }) => {
  let acum = 0.5;
  const arrayStars = [];
  for (let i = 1; i <= 5; i++) {
    if (qualification > acum) {
      arrayStars.push(<i className="fa fa-star star" key={i} />);
    } else if (qualification < acum) {
      arrayStars.push(<i className="fa fa-star-o star" key={i} />);
    } else {
      arrayStars.push(<i className="fa fa-star-half-o star" key={i} />);
    }
    acum = acum + 1;
  }
  return (
    <>
      {arrayStars.map((star, index) => (
        <span key={index}>{star} </span>
      ))}
    </>
  );
};

export default Reviews;
