import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../redux/actions/categoryActions";
import ModalCategory from "./modal/ModalCategory";
import CategoryTableCrud from "./table";

let countCategoryCrud = 0;

const CategoryCrud = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryData);
  const [categoryToModal, setCategoryToModal] = useState({
    type: "add",
    action: "",
    id: "",
    name: "",
    description: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState({ add: false, edit: false });

  console.log("-----------------");
  console.log("Renderiza category crud", countCategoryCrud);
  countCategoryCrud++;

  console.log(categories.list.data);

  const handleTableActions = (e) => {
    const { id, name } = e.target;
    if (name === "edit") {
      const data = categories.list.data.filter(
        (item) => id.toString() === item.id.toString()
      )[0];
      setCategoryToModal({
        type: "edit",
        action: "",
        id,
        name: data.name,
        description: data.description,
      });
      setModalIsOpen({ ...modalIsOpen, edit: true });
    } else {
      dispatch(deleteCategory(id));
    }
  };

  const handleCloseModal = (value) => {
    setModalIsOpen({ add: false, edit: false });
    if (value.action === "acept") {
      if (value.type === "add") {
        dispatch(createCategory(value));
      } else {
        dispatch(updateCategory(value));
      }
    } else {
      console.log("Acción Cancelada");
    }
  };

  const handleAddAction = (e) => {
    setCategoryToModal({
      type: "add",
      action: "",
      id: "",
      name: "",
      description: "",
    });
    setModalIsOpen({ ...modalIsOpen, add: true });
  };

  return (
    <div className="crud-category flex-col-cen-str">
      <div className="crud-category__header flex-row-between-center">
        <h1 className="crud-category__title">categories</h1>
        <button
          className="crud-category__button-add button__square"
          name="add"
          onClick={handleAddAction}
        ></button>
      </div>
      <div className="crud-category__body">
        <CategoryTableCrud
          data={categories.list.data}
          handleActions={handleTableActions}
        />
      </div>
      {modalIsOpen.add ? (
        <ModalCategory data={categoryToModal} onCloseModal={handleCloseModal} />
      ) : null}
      {modalIsOpen.edit ? (
        <ModalCategory data={categoryToModal} onCloseModal={handleCloseModal} />
      ) : null}
    </div>
  );
};

export default CategoryCrud;
