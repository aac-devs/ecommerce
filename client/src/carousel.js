import React from "react";

const Carousel = ({ data, size, simultaneous }) => {
  console.log("Estoy en carousel");
  console.log(data);
  const cant = simultaneous;
  const image_size = size;

  let btn_left_enable = true;
  let btn_right_enable = true;
  const arrayImagesSize = data.length;
  if (cant >= arrayImagesSize) {
    btn_left_enable = false;
    btn_right_enable = false;
  }

  const image_space = Math.round(image_size * 0.1);
  const image_top_position = image_space;
  const window_top_width = image_space;
  const window_side_width = image_space * 2;

  // Carousel size:
  const carousel_height = window_top_width * 2 + image_size;
  const carousel_width =
    window_side_width * 2 + (cant + 1) * image_space + cant * image_size;
  document.documentElement.style.setProperty(
    "--carousel-width",
    `${carousel_width}px`
  );
  document.documentElement.style.setProperty(
    "--carousel-height",
    `${carousel_height}px`
  );

  // Window:
  // Position:
  const window_top_pos = 0;
  const window_left_pos = 0;
  document.documentElement.style.setProperty(
    "--window-top-pos",
    `${window_top_pos}px`
  );
  document.documentElement.style.setProperty(
    "--window-left-pos",
    `${window_left_pos}px`
  );
  // Size:
  const window_width = carousel_width - window_side_width * 2;
  const window_height = image_size;
  document.documentElement.style.setProperty(
    "--window-width",
    `${window_width}px`
  );
  document.documentElement.style.setProperty(
    "--window-height",
    `${window_height}px`
  );
  // Borders:
  document.documentElement.style.setProperty(
    "--window-top-width",
    `${window_top_width}px`
  );
  document.documentElement.style.setProperty(
    "--window-side-width",
    `${window_side_width}px`
  );

  // Image:
  document.documentElement.style.setProperty("--image-size", `${image_size}px`);
  document.documentElement.style.setProperty(
    "--image-top-pos",
    `${image_top_position}px`
  );
  // Left Position:
  if (arrayImagesSize === 1) {
    let initialLeftPos = window_side_width + image_space;
    switch (cant) {
      case 2:
        initialLeftPos += Math.round((image_size + image_space) / 2);
        break;
      case 3:
        initialLeftPos += image_space + image_size;
        break;
      default:
        break;
    }
    document.documentElement.style.setProperty(
      "--image-left-pos",
      `${initialLeftPos}px`
    );
  } else if (arrayImagesSize === 2) {
    if (cant === 3) {
      let initialLeftPos =
        window_side_width +
        image_space +
        Math.round((image_size + image_space) / 2);
      document.documentElement.style.setProperty(
        "--image-left-pos",
        `${initialLeftPos}px`
      );
    } else {
      let initialLeftPos = window_side_width + image_space;
      document.documentElement.style.setProperty(
        "--image-left-pos",
        `${initialLeftPos}px`
      );
    }
  } else {
    let initialLeftPos = window_side_width + image_space;
    document.documentElement.style.setProperty(
      "--image-left-pos",
      `${initialLeftPos}px`
    );
  }

  // Buttons position:
  // const top_buttons_position = 25;
  // const right_button_position = 100;
  // const left_button_position = 50;
  // document.documentElement.style.setProperty("--image-size", `${size}px`);

  //document.getElementById('image-item-0').style.setProperty('color', 'blue')
  //document.getElementById('image-item-0').style.getPropertyValue('color')
  const handleLeft = (e) => {
    console.log("Click right");

    if (btn_left_enable) {
      data.map((item, index) => {
        const value = document
          .getElementById(`image-item-${index}`)
          .style.getPropertyValue("left");

        const res = parseInt(value.replace("px", "")) - size - image_space;
        document
          .getElementById(`image-item-${index}`)
          .style.setProperty("left", `${res}px`);

        console.log(res);
        return {};
      });
    }
  };
  const handleRight = (e) => {
    console.log("Click left");

    if (btn_right_enable) {
      data.map((item, index) => {
        const value = document
          .getElementById(`image-item-${index}`)
          .style.getPropertyValue("left");

        const res = parseInt(value.replace("px", "")) + size + image_space;

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
    }
  };

  return (
    <div className="main-carousel">
      <div className="carousel">
        <div className="carousel__window"></div>
        {/* {arrayDivs.map((item) => item)} */}
        {data.map((item, index) => {
          const leftValue = getComputedStyle(
            document.documentElement
          ).getPropertyValue("--image-left-pos");
          const res = parseInt(leftValue.replace("px", ""));
          document.documentElement.style.setProperty(
            "--image-left-pos",
            `${res + size + image_space}px`
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
          className="carousel__button"
          onClick={handleLeft}
          style={{
            // top: `${Math.round(size / 2) - 20}px`,
            // left: `${15}px`,
            top: "20px",
            left: "20px",
            // backgroundColor: "blue",
          }}
        >
          <span
            style={{ fontSize: "3.5rem", color: "fuchsia", margin: "auto" }}
          >
            <i className="fa fa-chevron-left"></i>
          </span>
        </div>
        <div
          className="carousel__button"
          onClick={handleRight}
          style={{
            // top: `${Math.round(size / 2) - 20}px`,
            // left: `${size + 135}px`,
            top: "20px",
            left: "120px",
            // backgroundColor: "cyan",
          }}
        >
          <span
            style={{ fontSize: "3.5rem", color: "fuchsia", margin: "auto" }}
          >
            <i className="fa fa-chevron-right fa-x5"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
