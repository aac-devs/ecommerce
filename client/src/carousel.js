import React from "react";

const Carousel = ({ data, size }) => {
  console.log("Estoy en carousel");
  console.log(data);

  // Carousel size:
  const carousel_height = size + 20;
  const carousel_width = size + 120;
  document.documentElement.style.setProperty(
    "--width-carrousel",
    `${carousel_width}px`
  );
  document.documentElement.style.setProperty(
    "--height-carrousel",
    `${carousel_height}px`
  );

  // Window size:
  const window_height = size;
  const window_width = size + 40;
  document.documentElement.style.setProperty(
    "--width-window",
    `${window_width}px`
  );
  document.documentElement.style.setProperty(
    "--height-window",
    `${window_height}px`
  );

  // Window position:
  const window_top_position = 0;
  const window_left_position = 0;
  document.documentElement.style.setProperty(
    "--window-top-position",
    `${window_top_position}px`
  );
  document.documentElement.style.setProperty(
    "--window-left-position",
    `${window_left_position}px`
  );

  // Image size:
  document.documentElement.style.setProperty("--image-size", `${size}px`);

  //document.getElementById('image-item-0').style.setProperty('color', 'blue')
  //document.getElementById('image-item-0').style.getPropertyValue('color')
  const handleLeft = (e) => {
    console.log("Click right");

    data.map((item, index) => {
      const value = document
        .getElementById(`image-item-${index}`)
        .style.getPropertyValue("left");

      const res = parseInt(value.replace("px", "")) - size;
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

      const res = parseInt(value.replace("px", "")) + size;

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
      <div className="carousel">
        <div className="carousel__window"></div>
        {/* {arrayDivs.map((item) => item)} */}
        {data.map((item, index) => {
          const leftValue = getComputedStyle(
            document.documentElement
          ).getPropertyValue("--left-position");
          const res = parseInt(leftValue.replace("px", ""));
          document.documentElement.style.setProperty(
            "--left-position",
            `${res + size}px`
          );
          return (
            <div
              key={index}
              id={`image-item-${index}`}
              className={`carousel__images`}
              style={{ left: `${leftValue}` }}
            >
              imagen {index}
            </div>
          );
        })}

        <div
          className="button button-left"
          onClick={handleLeft}
          style={{
            top: `${Math.round(size / 2) - 5}px`,
            left: `${-10}px`,
            backgroundColor: "blue",
          }}
        ></div>
        <div
          className="button button-right"
          onClick={handleRight}
          style={{
            top: `${Math.round(size / 2) - 5}px`,
            left: `${size}px`,
            backgroundColor: "cyan",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Carousel;
