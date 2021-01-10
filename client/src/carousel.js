import React, { useState } from "react";

const Carousel = ({ data }) => {
  const [leftPos, setLeftPos] = useState(10);
  console.log("Estoy en carousel");
  console.log(data);

  let size = -200;

  const array = data.map((item) => item.url);

  const arrayDivs = data.map((item, index) =>
    index === 0 ? (
      <div className="lista-imagenes" key={index}>
        imagen {index}
      </div>
    ) : (
      <div className="lista-imagenes" key={index}>
        imagen {index}
      </div>
    )
  );

  // const arrayClases = data.map((item, index) =>
  //   index === 0 ? "lista-imagenes image-center" : "lista-imagenes image-start"
  // );
  //document.getElementById('image-item-0').style.setProperty('color', 'blue')
  //document.getElementById('image-item-0').style.getPropertyValue('color')
  const handleLeft = (e) => {
    console.log("Click right");

    data.map((item, index) => {
      const value = document
        .getElementById(`image-item-${index}`)
        .style.getPropertyValue("left");

      const res = parseInt(value.replace("px", "")) - 200;
      document
        .getElementById(`image-item-${index}`)
        .style.setProperty("left", `${res}px`);

      console.log(res);
      return {};
    });
  };
  const handleRight = (e) => {
    console.log("Click left");
    data.map((item, index) => {
      const value = document
        .getElementById(`image-item-${index}`)
        .style.getPropertyValue("left");

      const res = parseInt(value.replace("px", "")) + 200;

      // if (res !== 10) {
      //   document
      //     .getElementById(`image-item-${index}`)
      //     .style.setProperty("visibility", "hidden");
      // }else{
      //   document
      //     .getElementById(`image-item-${index}`)
      //     .style.setProperty("visibility", "visible");
      // }

      document
        .getElementById(`image-item-${index}`)
        .style.setProperty("left", `${res}px`);

      console.log(res);
      return {};
    });
  };

  return (
    <div className="main-carousel">
      <div className="container">
        <div className="ventana"></div>
        {/* {arrayDivs.map((item) => item)} */}
        {data.map((item, index) => {
          const leftValue = getComputedStyle(
            document.documentElement
          ).getPropertyValue("--left-position");
          const res = parseInt(leftValue.replace("px", ""));
          document.documentElement.style.setProperty(
            "--left-position",
            `${res + 200}px`
          );
          return (
            <div
              key={index}
              id={`image-item-${index}`}
              className={`lista-imagenes`}
              style={{ left: `${leftValue}` }}
            >
              imagen {index}
            </div>
          );
        })}

        <button className="button button-left" onClick={handleLeft}>
          left
        </button>
        <button className="button button-right" onClick={handleRight}>
          right
        </button>
      </div>
    </div>
  );
};

export default Carousel;
