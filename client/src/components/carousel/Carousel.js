/*  COMPONENTE CARRUSEL:
Este componente se podrá usar para mostrar un carrusel de imágenes ajustable en tamaño. El tamaño hace referencia a imágenes cuadradas dadas en pixeles, probadas en múltiplos de 50px. Además del tamaño de la imagen, tambien se puede ajustar la cantidad de imágenes que mostrará simultáneamente, probado para 1, 2 y 3 imágenes visualizadas simultáneamente. Posee además dos botones laterales para mover las imágenes hacia la derecha o izquierda.

Los parámetros que se deben agregar como props son:
- data: corresponde a un array de objetos cuyas propiedades son 'url' que contiene la url de cada imagen e 'id' que contiene la id de dicha imagen.
- size: corresponde al tamaño en pixeles.
- simultaneous: corresponde a la cantidad de imágenes mostradas en simultáneo.
- onImageClick: corresponde al evento click sobre las imágenes, devuelve el id de la imágen seleccionada.

'Carousel.js' se usa 'carousel.css' para los estilos css.
*/

import React from "react";
import "./carousel.css";

const Carousel = ({ data, size, simultaneous, onImageClick }) => {
  //#################################################################################
  //#################################################################################
  // DECLARACIÓN DE VARIABLES (OBJETOS):

  // Objeto usado para guardar el texto correspondiente a las clases de los botones e iconos laterales que luego se modificarán, en tiempo de ejecución, dependiendo del caso de uso:
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

  // Objeto usado para mantener el estado de las clases de los botones e iconos:
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

  // Objeto para controlar el estado de los botones laterales:
  const btn_state = {
    start: false,
    end: false,
  };

  // Objeto que guarda el texto que coincide con las variables css usadas:
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

  // Objeto usado para guardar los valores de los cálculos realizados para dibujar y controlar el comportamiento del carrusel:
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

  // Objeto que guarda los textos correspondientes a las clases de los componentes html usados:
  const bem = {
    carousel: {
      main: "carousel",
      side: "carousel__side",
      side_end: "carousel__side carousel__side-end",
      images: "carousel__images",
    },
  };

  // Objeto que guarda los id's de los botones e iconos laterales:
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

  //#################################################################################
  //#################################################################################
  // INICIALIZACIÓN DE VARIABLES Y CÁLCULOS:

  // Carga de props al objeto vbles:
  vbles.js.data = data;
  vbles.js.simultaneous = simultaneous;
  vbles.js.image_size = size;
  vbles.js.array_length = vbles.js.data.length;

  // Se configuran como deshabilitados los botones laterales:
  btn_state.start = false;
  btn_state.end = false;

  // Se cargan las clases usadas para el comportamiento de los botones e iconos laterales:
  class_state.button.start = class_text.button.disabled;
  class_state.button.end = class_text.button.disabled;
  class_state.icon.start = class_text.icon.start.disabled;
  class_state.icon.end = class_text.icon.end.disabled;

  // Controla si he habilita o no el botón de la izquierda para cuando hayan imágenes ocultas:
  if (vbles.js.simultaneous < vbles.js.array_length) {
    btn_state.start = true;
    class_state.button.start = class_text.button.enabled;
    class_state.icon.start = class_text.icon.start.enabled;
  }

  // Configuración de posición y tamaño de los elementos que dibujarán el marco del carrusel:
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

  // Configuraciones de posición y tamaño de los botones e iconos:
  vbles.js.button.size = Math.round(vbles.css.side_width * 0.8);
  vbles.js.button.pos.start = Math.round(vbles.css.side_width * 0.1);
  vbles.js.button.pos.end =
    vbles.css.carousel_width - vbles.css.side_width + vbles.js.button.pos.start;
  vbles.js.button.pos.top = Math.round(
    (vbles.css.carousel_height - vbles.js.button.size) / 2
  );

  // Se cargan todos los valores de las variables css:
  const style = element.style;
  vbles.css.image_size = vbles.js.image_size;
  for (let prop in vbles.css) {
    style.setProperty(cssvars[prop], `${vbles.css[prop]}px`);
  }

  // window_width se usa para controlar los finales del carrusel.
  vbles.js.window_width = vbles.css.carousel_width - vbles.css.side_width * 2;

  // Posición inicial de la imágenes:
  if (vbles.js.array_length === 1) {
    let initialLeftPos = vbles.css.side_width + vbles.js.image_space;
    if (vbles.js.simultaneous === 2) {
      initialLeftPos += Math.round(
        (vbles.js.image_size + vbles.js.image_space) / 2
      );
    } else if (vbles.js.simultaneous === 3) {
      initialLeftPos += vbles.js.image_size + vbles.js.image_space;
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

  //#################################################################################
  //#################################################################################
  // FUNCIONES:

  // Controla la activación o desactivación de los botones e iconos laterales:
  // state: true || false, el: 'start' || 'end'
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

  // Controla cuando se hace click en el botón de la izquierda:
  const handleStartButton = (e) => {
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
  };

  // Controla cuando se hace click en el botón de la derecha:
  const handleEndButton = (e) => {
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

  // Controla cuando se hace click en alguna imagen, devuelve por props el id de dicha imagen:
  const handleImageClick = (e) => {
    onImageClick(e.target.title.split("-").pop());
  };

  return (
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
            title={`image-id-${item.id}`}
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
        onClick={handleStartButton}
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
        onClick={handleEndButton}
        style={{
          top: `${vbles.js.button.pos.top}px`,
          left: `${vbles.js.button.pos.end}px`,
          width: `${vbles.js.button.size}px`,
          minWidth: `${vbles.js.button.size}px`,
          height: `${vbles.js.button.size}px`,
          minHeight: `${vbles.js.button.size}px`,
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
  );
};

export default Carousel;
