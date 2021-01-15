import React, { useState } from "react";

const ModalCategoryAdd = ({ onCloseModal }) => {
  const [values, setValues] = useState({ name: "", description: "" });

  return (
    <div className="modal-add">
      <div className="modal-add__container">
        <h2 className="modal-add__title">Add Category</h2>

        <hr align="left" style={{ width: "70%" }}></hr>

        <div className="modal-add__label">
          <label htmlFor="name">
            <h4>Name: </h4>
          </label>
          <input
            type="text"
            id="name"
            className="modal-add__input"
            maxLength={30}
            autoFocus={true}
            placeholder="enter category name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          ></input>
        </div>

        <div className="modal-add__label">
          <label htmlFor="description">
            <h4>Description: </h4>
          </label>
          <textarea
            id="description"
            className="modal-add__textarea"
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

        <div className="modal-add__buttons">
          <button
            className="button__square modal-add__acept"
            onClick={(e) => onCloseModal(values)}
          ></button>
          <button
            className="button__square modal-add__cancel"
            onClick={(e) => onCloseModal(values)}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ModalCategoryAdd;
