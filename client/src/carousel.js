import React from "react";

const Carousel = ({ data, size, simultaneous }) => {
  console.log("Estoy en carousel");
  console.log(data);
  const cant = simultaneous;
  const image_size = size;

  const classButtonEnabled = "carousel__button carousel__button--enabled";
  const classButtonDisabled = "carousel__button";
  let classStartButton = classButtonDisabled;
  let classEndButton = classButtonDisabled;

  const classIconStartEnabled = "fa fa-chevron-left carousel__icon";
  const classIconStartDisabled = "fa fa-chevron-left carousel__icon--disabled";
  const classIconEndEnabled = "fa fa-chevron-right carousel__icon";
  const classIconEndDisabled = "fa fa-chevron-right carousel__icon--disabled";
  let classStartIcon = classIconStartDisabled;
  let classEndIcon = classIconEndDisabled;

  let btn_left_enable = false;
  let btn_right_enable = false;

  const enable_start = (state) => {
    btn_left_enable = state;
    if (state) {
      document
        .getElementById("btn_start")
        .setAttribute("class", classButtonEnabled);
      document
        .getElementById("icon_start")
        .setAttribute("class", classIconStartEnabled);
    } else {
      document
        .getElementById("btn_start")
        .setAttribute("class", classButtonDisabled);
      document
        .getElementById("icon_start")
        .setAttribute("class", classIconStartDisabled);
    }
    const boton = document.getElementById("btn_start");
    console.log("boton start:", boton);
  };

  const enable_end = (state) => {
    btn_right_enable = state;
    if (state) {
      document
        .getElementById("btn_end")
        .setAttribute("class", classButtonEnabled);
      document
        .getElementById("icon_end")
        .setAttribute("class", classIconEndEnabled);
    } else {
      document
        .getElementById("btn_end")
        .setAttribute("class", classButtonDisabled);
      document
        .getElementById("icon_end")
        .setAttribute("class", classIconEndDisabled);
    }
    const boton = document.getElementById("btn_end");
    console.log("boton end:", boton);
  };

  const arrayImagesSize = data.length;
  if (cant < arrayImagesSize) {
    btn_left_enable = true;
    classStartButton = classButtonEnabled;
    classStartIcon = classIconStartEnabled;
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

  // Buttons:
  const button_size = Math.round(window_side_width * 0.8);
  const button_start_position = window_side_width * 0.1;
  const button_end_position =
    carousel_width - window_side_width + button_start_position;
  const buttons_top_position = carousel_height / 2 - button_size / 2;
  console.log("button top position:", button_start_position);

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

  //document.getElementById('image-item-0').style.setProperty('color', 'blue')
  //document.getElementById('image-item-0').style.getPropertyValue('color')
  const handleLeft = (e) => {
    console.log("Click right");

    if (btn_left_enable) {
      console.clear();
      console.log("Position left:");
      enable_end(true);
      // btn_right_enable = true;

      data.map((item, index) => {
        const value = document
          .getElementById(`image-item-${index}`)
          .style.getPropertyValue("left");

        console.log("value", value);

        const res = parseInt(value.replace("px", "")) - size - image_space;
        document
          .getElementById(`image-item-${index}`)
          .style.setProperty("left", `${res}px`);

        // console.log(res);
        return {};
      });
    }
    const value = document
      .getElementById(`image-item-${arrayImagesSize - 1}`)
      .style.getPropertyValue("left");
    const res = parseInt(value.replace("px", ""));
    console.log("posición left última imagen:", res);
    console.log("tamaño de window:", window_width);
    if (res < window_width) {
      enable_start(false);
      // btn_left_enable = false;
    }
  };
  const handleRight = (e) => {
    console.log("Click left");

    if (btn_right_enable) {
      console.clear();
      console.log("Position right:");

      // btn_left_enable = true;
      enable_start(true);
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

        // console.log(res);
        return {};
      });
    }
    const value = document
      .getElementById(`image-item-0`)
      .style.getPropertyValue("left");
    const res = parseInt(value.replace("px", ""));
    console.log("posición left primera imagen:", res);
    console.log("tamaño de window:", window_width);
    if (res > 0) {
      enable_end(false);
      // btn_right_enable = false;
    }
  };

  const handleImageClick = (e) => {
    console.log("Entro en el click");
    console.log(e.target.id);
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
              style={{
                left: `${leftValue}`,
                backgroundImage: `url(${item.url})`,
              }}
              onClick={handleImageClick}
            ></div>
          );
        })}

        <div
          id="btn_start"
          className={`${classStartButton}`}
          onClick={handleLeft}
          style={{
            // top: `${Math.round(size / 2) - 20}px`,
            // left: `${15}px`,
            top: `${buttons_top_position}px`,
            left: `${button_start_position}px`,
            // backgroundColor: "blue",
            width: `${button_size}px`,
            minWidth: `${button_size}px`,
            height: `${button_size}px`,
            minHeight: `${button_size}px`,
          }}
        >
          {/* <span
            style={{
              // fontSize: "2rem",

              margin: "auto",
              backgroundColor: "wheat",
            }}
          > */}
          <i
            id="icon_start"
            className={`${classStartIcon}`}
            style={{
              fontSize: `${button_size}px`,
            }}
          ></i>
          {/* </span> */}
        </div>
        <div
          id="btn_end"
          className={`${classEndButton}`}
          onClick={handleRight}
          style={{
            width: `${button_size}px`,
            minWidth: `${button_size}px`,
            height: `${button_size}px`,
            minHeight: `${button_size}px`,
            top: `${buttons_top_position}px`,
            left: `${button_end_position}px`,
          }}
        >
          <i
            id="icon_end"
            className={`${classEndIcon}`}
            style={{
              fontSize: `${button_size}px`,
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
