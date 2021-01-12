import React from "react";

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

const btn_state = {
  start: false,
  end: false,
};

const cssvars = {
  image_size: "--image-size",
  image_top: "--image-top-pos",
  image_left: "--image-left-pos",
  carousel_width: "--carousel-width",
  carousel_height: "--carousel-height",
  side_height: "--side-height",
  side_width: "--side-width",
  side_top: "--side-top",
  side_left_end: "--side-left-end",
  outline: "--outline-offset",
};

const vbles = {
  js: {
    data: 0,
    simultaneous: 0,
    image_size: 0,
    array_length: 0,
    image_space: 0,
    window_width: 0,
    button: {
      size: 0,
      pos: {
        top: 0,
        start: 0,
        end: 0,
      },
    },
  },
  css: {
    image_size: 0,
    image_top: 0,
    image_left: 0,
    carousel_width: 0,
    carousel_height: 0,
    side_height: 0,
    side_width: 0,
    side_top: 0,
    side_left_end: 0,
    outline: 0,
  },
};

const element = document.documentElement;

const bem = {
  carousel: {
    main: "carousel",
    side: "carousel__side",
    side_end: "carousel__side carousel__side-end",
    images: "carousel__images",
  },
};

const id = {
  button: {
    start: "btn_start",
    end: "btn_end",
  },
  icon: {
    start: "icon_start",
    end: "icon_end",
  },
};

const Carousel = ({ data, size, simultaneous, border, rounded }) => {
  console.clear();
  vbles.js.data = data;
  vbles.js.simultaneous = simultaneous;
  vbles.js.image_size = size;
  vbles.js.array_length = vbles.js.data.length;

  class_state.button.start = class_text.button.disabled;
  class_state.button.end = class_text.button.disabled;
  class_state.icon.start = class_text.icon.start.disabled;
  class_state.icon.end = class_text.icon.end.disabled;

  console.log(class_text);
  console.log(class_state);

  // state: true || false
  // el: 'start' || 'end'
  const button_enable = (state, el) => {
    btn_state[el] = state;
    document
      .getElementById(id.button[el])
      .setAttribute(
        "class",
        state ? class_text.button.enabled : class_text.button.disabled
      );
    document
      .getElementById(id.icon[el])
      .setAttribute(
        "class",
        state ? class_text.icon[el].enabled : class_text.icon[el].disabled
      );
  };

  if (vbles.js.simultaneous < vbles.js.array_length) {
    btn_state.start = true;
    class_state.button.start = class_text.button.enabled;
    class_state.icon.start = class_text.icon.start.enabled;
  }

  vbles.js.image_space = Math.round(vbles.js.image_size * 0.1);
  vbles.css.image_top = vbles.js.image_space;
  vbles.css.carousel_height = vbles.js.image_space * 2 + vbles.js.image_size;
  vbles.css.side_width = vbles.js.image_space * 2;
  vbles.css.carousel_width =
    vbles.css.side_width * 2 +
    (vbles.js.simultaneous + 1) * vbles.js.image_space +
    vbles.js.simultaneous * vbles.js.image_size;
  vbles.css.side_height = vbles.js.image_size;
  vbles.css.side_top = vbles.js.image_space;
  vbles.css.side_left_end = vbles.css.carousel_width - vbles.css.side_width;
  vbles.css.outline = Math.round(vbles.js.image_space * 0.25);

  // Buttons:
  vbles.js.button.size = Math.round(vbles.css.side_width * 0.8);
  vbles.js.button.pos.start = Math.round(vbles.css.side_width * 0.1);
  vbles.js.button.pos.end =
    vbles.css.carousel_width - vbles.css.side_width + vbles.js.button.pos.start;
  vbles.js.button.pos.top = Math.round(
    (vbles.css.carousel_height - vbles.js.button.size) / 2
  );

  const style = element.style;
  vbles.css.image_size = vbles.js.image_size;
  for (let prop in vbles.css) {
    style.setProperty(cssvars[prop], `${vbles.css[prop]}px`);
  }

  console.log(vbles);

  // Left Position:
  if (vbles.js.array_length === 1) {
    let initialLeftPos = vbles.css.side_width + vbles.js.image_space;
    switch (vbles.js.simultaneous) {
      case 2:
        initialLeftPos += Math.round(
          (vbles.js.image_size + vbles.js.image_space) / 2
        );
        break;
      case 3:
        initialLeftPos += vbles.js.image_size + vbles.js.image_space;
        break;
      default:
        break;
    }
    style.setProperty(`${cssvars.image_left}`, `${initialLeftPos}px`);
  } else if (vbles.js.array_length === 2) {
    if (vbles.js.simultaneous === 3) {
      let initialLeftPos =
        vbles.css.side_width +
        vbles.js.image_space +
        Math.round((vbles.js.image_size + vbles.js.image_space) / 2);
      style.setProperty(`${cssvars.image_left}`, `${initialLeftPos}px`);
    } else {
      let initialLeftPos = vbles.css.side_width + vbles.js.image_space;
      style.setProperty(`${cssvars.image_left}`, `${initialLeftPos}px`);
    }
  } else {
    let initialLeftPos = vbles.css.side_width + vbles.js.image_space;
    style.setProperty(`${cssvars.image_left}`, `${initialLeftPos}px`);
  }

  const handleLeft = (e) => {
    if (btn_state.start) {
      button_enable(true, "end");
      vbles.js.data.map((item, index) => {
        const value = document
          .getElementById(`image-item-${index}`)
          .style.getPropertyValue("left");
        const res =
          parseInt(value.replace("px", "")) -
          vbles.js.image_size -
          vbles.js.image_space;
        document
          .getElementById(`image-item-${index}`)
          .style.setProperty("left", `${res}px`);
        return {};
      });
    }
    const value = document
      .getElementById(`image-item-${vbles.js.array_length - 1}`)
      .style.getPropertyValue("left");
    const res = parseInt(value.replace("px", ""));
    if (res < vbles.js.window_width) {
      button_enable(false, "start");
    }
    console.log("res", res);
    console.log("window_width", vbles.js.window_width);
  };
  const handleRight = (e) => {
    if (btn_state.end) {
      button_enable(true, "start");
      vbles.js.data.map((item, index) => {
        const value = document
          .getElementById(`image-item-${index}`)
          .style.getPropertyValue("left");
        const res =
          parseInt(value.replace("px", "")) +
          vbles.js.image_size +
          vbles.js.image_space;
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
      button_enable(false, "end");
    }
  };

  const handleImageClick = (e) => {
    console.log("Entro en el click");
    console.log(e.target.id);
  };

  return (
    <div className="main-carousel">
      <div className={bem.carousel.main}>
        {vbles.js.data.map((item, index) => {
          const leftValue = getComputedStyle(element).getPropertyValue(
            cssvars.image_left
          );
          const res = parseInt(leftValue.replace("px", ""));
          style.setProperty(
            cssvars.image_left,
            `${res + vbles.js.image_size + vbles.js.image_space}px`
          );
          return (
            <div
              key={index}
              id={`image-item-${index}`}
              className={bem.carousel.images}
              style={{
                left: `${leftValue}`,
                backgroundImage: `url(${item.url})`,
              }}
              onClick={handleImageClick}
            ></div>
          );
        })}

        <div
          id={id.button.start}
          className={class_state.button.start}
          onClick={handleLeft}
          style={{
            top: `${vbles.js.button.pos.top}px`,
            left: `${vbles.js.button.pos.start}px`,
            width: `${vbles.js.button.size}px`,
            minWidth: `${vbles.js.button.size}px`,
            height: `${vbles.js.button.size}px`,
            minHeight: `${vbles.js.button.size}px`,
          }}
        >
          <i
            id={id.icon.start}
            className={class_state.icon.start}
            style={{
              fontSize: `${vbles.js.button.size}px`,
            }}
          ></i>
        </div>
        <div className={bem.carousel.side}></div>
        <div className={bem.carousel.side_end}></div>
        <div
          id={id.button.end}
          className={class_state.button.end}
          onClick={handleRight}
          style={{
            width: `${vbles.js.button.size}px`,
            minWidth: `${vbles.js.button.size}px`,
            height: `${vbles.js.button.size}px`,
            minHeight: `${vbles.js.button.size}px`,
            top: `${vbles.js.button.pos.top}px`,
            left: `${vbles.js.button.pos.end}px`,
          }}
        >
          <i
            id={id.icon.end}
            className={class_state.icon.end}
            style={{
              fontSize: `${vbles.js.button.size}px`,
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
