import React, { useState } from "react";

let modalCategoryCount = 0;
const ModalCategory = ({ data, onCloseModal }) => {
  const [values, setValues] = useState(data);

  console.log("Renderiza ModalCategory:", modalCategoryCount);
  modalCategoryCount++;

  if (values.type === "add") {
    console.log("color add");
    document.documentElement.style.setProperty(
      "--modal-bg-color",
      "rgba(247, 203, 6, 0.2)"
    );
  } else {
    console.log("color edit");
    document.documentElement.style.setProperty(
      "--modal-bg-color",
      " rgba(0, 99, 209, 0.2)"
    );
  }

  return (
    <div className="modal-cat flex-row-center-center">
      <div className="modal-cat__container flex-column-center-stretch">
        {values.type === "add" ? (
          <h2 className="modal-cat__title">Add Category</h2>
        ) : (
          <h2 className="modal-cat__title">Edit Category {values.id}</h2>
        )}

        <hr align="left" style={{ width: "70%" }}></hr>

        <div className="modal-cat__label flex-row-between-stretch">
          <label htmlFor="name">
            <h4>Name: </h4>
          </label>
          <input
            type="text"
            id="name"
            className="modal-cat__input"
            maxLength={30}
            autoFocus={true}
            placeholder="enter category name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          ></input>
        </div>

        <div className="modal-cat__label flex-row-between-stretch">
          <label htmlFor="description">
            <h4>Description: </h4>
          </label>
          <textarea
            id="description"
            className="modal-cat__textarea"
            type="text"
            maxLength={100}
            placeholder="enter category description"
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          ></textarea>
        </div>

        <hr align="left" style={{ width: "70%" }}></hr>

        <div className="modal-cat__buttons">
          <button
            className="button__square modal-cat__acept"
            onClick={(e) => {
              values.action = "acept";
              return onCloseModal(values);
            }}
          ></button>
          <button
            className="button__square modal-cat__cancel"
            onClick={(e) => {
              values.action = "cancel";
              return onCloseModal(values);
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ModalCategory;
