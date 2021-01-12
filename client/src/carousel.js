import React from "react";

const Carousel = ({ data, size, simultaneous, border, rounded }) => {
  console.clear();
  const cant = simultaneous;
  const image_size = size;
  const arrayImagesSize = data.length;
  // Clases CSS para los botones e íconos de desplazamiento de imágenes:
  const class_text = {
    button: {
      enabled: "carousel__button carousel__button--enabled",
      disabled: "carousel__button",
    },
    icon: {
      start: {
        enabled: "fa fa-chevron-left carousel__icon",
        disabled: "fa fa-chevron-left carousel__icon--disabled",
      },
      end: {
        enabled: "fa fa-chevron-right carousel__icon",
        disabled: "fa fa-chevron-right carousel__icon--disabled",
      },
    },
  };
  // Mantiene el estado de los botones e iconos:
  const class_state = {
    button: {
      start: "",
      end: "",
    },
    icon: {
      start: "",
      end: "",
    },
  };
  // Guarda el estado
  const btn_state = {
    start: false,
    end: false,
  };

  class_state.button.start = class_text.button.disabled;
  class_state.button.end = class_text.button.disabled;
  class_state.icon.start = class_text.icon.start.disabled;
  class_state.icon.end = class_text.icon.end.disabled;

  const cssvar = {
    image: {
      size: "--image-size",
      top: "--image-top-pos",
      left: "--image-left-pos",
    },
    carousel: {
      width: "--carousel-width",
      height: "--carousel-height",
    },
    side: {
      height: "--side-height",
      width: "--side-width",
      top: "--side-top",
      left_end: "--side-left-end",
    },
    outline: "--outline-offset",
  };

  console.log(class_text);
  console.log(class_state);

  const enable_start = (state) => {
    btn_state.start = state;
    if (state) {
      document
        .getElementById("btn_start")
        .setAttribute("class", class_text.button.enabled);
      document
        .getElementById("icon_start")
        .setAttribute("class", class_text.icon.start.enabled);
    } else {
      document
        .getElementById("btn_start")
        .setAttribute("class", class_text.button.disabled);
      document
        .getElementById("icon_start")
        .setAttribute("class", class_text.icon.start.disabled);
    }
  };

  const enable_end = (state) => {
    btn_state.end = state;
    if (state) {
      document
        .getElementById("btn_end")
        .setAttribute("class", class_text.button.enabled);
      document
        .getElementById("icon_end")
        .setAttribute("class", class_text.icon.end.enabled);
    } else {
      document
        .getElementById("btn_end")
        .setAttribute("class", class_text.button.disabled);
      document
        .getElementById("icon_end")
        .setAttribute("class", class_text.icon.end.disabled);
    }
  };

  if (cant < arrayImagesSize) {
    btn_state.start = true;
    class_state.button.start = class_text.button.enabled;
    class_state.icon.start = class_text.icon.start.enabled;
  }

  const image_space = Math.round(image_size * 0.1);
  const image_top_position = image_space;
  const carousel_height = image_space * 2 + image_size;
  const side_width = image_space * 2;
  const carousel_width =
    side_width * 2 + (cant + 1) * image_space + cant * image_size;

  const side_height = image_size;
  const side_top = image_space;
  const side_left_end = carousel_width - side_width;
  const outline_offset = Math.round(image_space * 0.25);

  // Carousel size:
  document.documentElement.style.setProperty(
    // "--carousel-width",
    `${cssvar.carousel.width}`,
    `${carousel_width}px`
  );
  document.documentElement.style.setProperty(
    // "--carousel-height",
    `${cssvar.carousel.height}`,
    `${carousel_height}px`
  );

  // Buttons:
  const button_size = Math.round(side_width * 0.8);
  const button_start_position = side_width * 0.1;
  const button_end_position =
    carousel_width - side_width + button_start_position;
  const buttons_top_position = carousel_height / 2 - button_size / 2;

  // Side:
  // Width-Heigh:
  document.documentElement.style.setProperty(
    `${cssvar.side.height}`,
    // "--side-height",
    `${side_height}px`
  );
  document.documentElement.style.setProperty(
    `${cssvar.side.width}`,
    // "--side-width",
    `${side_width}px`
  );
  // Position:
  // Top:
  document.documentElement.style.setProperty(
    `${cssvar.side.top}`,
    // "--side-top",
    `${side_top}px`
  );
  document.documentElement.style.setProperty(
    `${cssvar.side.left_end}`,
    // "--side-left-end",
    `${side_left_end}px`
  );

  // Outline offset:
  document.documentElement.style.setProperty(
    `${cssvar.outline}`,
    // "--outline-offset",
    `${outline_offset}px`
  );
  const window_width = carousel_width - side_width * 2;

  // Image:
  document.documentElement.style.setProperty(
    `${cssvar.image.size}`,
    // "--image-size",
    `${image_size}px`
  );
  document.documentElement.style.setProperty(
    `${cssvar.image.top}`,
    // "--image-top-pos",
    `${image_top_position}px`
  );
  // Left Position:
  if (arrayImagesSize === 1) {
    let initialLeftPos = side_width + image_space;
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
      `${cssvar.image.left}`,
      // "--image-left-pos",
      `${initialLeftPos}px`
    );
  } else if (arrayImagesSize === 2) {
    if (cant === 3) {
      let initialLeftPos =
        side_width + image_space + Math.round((image_size + image_space) / 2);
      document.documentElement.style.setProperty(
        `${cssvar.image.left}`,
        // "--image-left-pos",
        `${initialLeftPos}px`
      );
    } else {
      let initialLeftPos = side_width + image_space;
      document.documentElement.style.setProperty(
        `${cssvar.image.left}`,
        // "--image-left-pos",
        `${initialLeftPos}px`
      );
    }
  } else {
    let initialLeftPos = side_width + image_space;
    document.documentElement.style.setProperty(
      `${cssvar.image.left}`,
      // "--image-left-pos",
      `${initialLeftPos}px`
    );
  }

  const handleLeft = (e) => {
    // if (btn_left_enable) {
    if (btn_state.start) {
      enable_end(true);
      data.map((item, index) => {
        const value = document
          .getElementById(`image-item-${index}`)
          .style.getPropertyValue("left");

        const res = parseInt(value.replace("px", "")) - size - image_space;
        document
          .getElementById(`image-item-${index}`)
          .style.setProperty("left", `${res}px`);
        return {};
      });
    }
    const value = document
      .getElementById(`image-item-${arrayImagesSize - 1}`)
      .style.getPropertyValue("left");
    const res = parseInt(value.replace("px", ""));
    if (res < window_width) {
      enable_start(false);
    }
  };
  const handleRight = (e) => {
    // if (btn_right_enable) {
    if (btn_state.end) {
      enable_start(true);
      data.map((item, index) => {
        const value = document
          .getElementById(`image-item-${index}`)
          .style.getPropertyValue("left");
        const res = parseInt(value.replace("px", "")) + size + image_space;
        document
          .getElementById(`image-item-${index}`)
          .style.setProperty("left", `${res}px`);
        return {};
      });
    }
    const value = document
      .getElementById(`image-item-0`)
      .style.getPropertyValue("left");
    const res = parseInt(value.replace("px", ""));
    if (res > 0) {
      enable_end(false);
    }
  };

  const handleImageClick = (e) => {
    console.log("Entro en el click");
    console.log(e.target.id);
  };

  return (
    <div className="main-carousel">
      <div className="carousel">
        {data.map((item, index) => {
          const leftValue = getComputedStyle(
            document.documentElement
          // ).getPropertyValue("--image-left-pos");
          ).getPropertyValue(cssvar.image.left);
          const res = parseInt(leftValue.replace("px", ""));
          document.documentElement.style.setProperty(
            // "--image-left-pos",
            cssvar.image.left,
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
          // className={`${classStartButton}`}
          className={`${class_state.button.start}`}
          onClick={handleLeft}
          style={{
            top: `${buttons_top_position}px`,
            left: `${button_start_position}px`,
            width: `${button_size}px`,
            minWidth: `${button_size}px`,
            height: `${button_size}px`,
            minHeight: `${button_size}px`,
          }}
        >
          <i
            id="icon_start"
            // className={`${classStartIcon}`}
            className={`${class_state.icon.start}`}
            style={{
              fontSize: `${button_size}px`,
            }}
          ></i>
        </div>
        <div className="carousel__side"></div>
        <div className="carousel__side carousel__side-end"></div>
        <div
          id="btn_end"
          // className={`${classEndButton}`}
          className={`${class_state.button.end}`}
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
            // className={`${classEndIcon}`}
            className={`${class_state.icon.end}`}
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
