import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  listCategories,
} from "../redux/actions/categoryActions";
import ModalCategoryAdd from "./modals/ModalCategoryAdd";
import ModalAdd, {
  destroy_modal,
  render_modal,
} from "./modals/ModalCategoryAdd";
import CategoryTableCrud from "./table";

let countCategoryCrud = 0;

const CategoryCrud = () => {
  const dispatch = useDispatch();
  // const stateModal = useSelector((state) => state.categoryModalState);
  const categories = useSelector((state) => state.categoryList);
  const updated = useSelector((state) => state.categoryUpdate);
  const created = useSelector((state) => state.categoryCreate);
  const deleted = useSelector((state) => state.categoryDelete);
  const [categorySelected, setCategorySelected] = useState(-1);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [modalData, setModalData] = useState({});

  // useEffect(() => {
  //   console.log("UseEffect del CategoryCrud Updated");
  //   if (stateModal.refresh && updated.success) {
  //     console.log("Se debe refrescar la lista");
  //     // dispatch(changeModalState("refresh", false));
  //     dispatch(listCategories());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [updated.success]);

  // useEffect(() => {
  //   console.log("UseEffect del CategoryCrud Created");
  //   if (stateModal.refresh && created.success) {
  //     console.log("Se debe refrescar la lista");
  //     // dispatch(changeModalState("refresh", false));
  //     dispatch(listCategories());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [created.success]);

  // useEffect(() => {
  //   console.log("UseEffect del CategoryCrud Deleted");
  //   if (stateModal.refresh && deleted.success) {
  //     console.log("Se debe refrescar la lista");
  //     // dispatch(changeModalState("refresh", false));
  //     dispatch(listCategories());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [deleted.success]);

  console.log("-----------------");
  console.log("Renderiza category crud", countCategoryCrud);
  countCategoryCrud++;

  // console.log("StateModal:", stateModal);
  console.log("Updated:", updated);
  console.log("Created:", created);
  console.log("Deleted:", deleted);
  console.log(categories.list.data);

  const handleTableActions = (e) => {
    const { id, name } = e.target;
    if (name === "edit") {
      // setCategorySelected(id);
      // dispatch(changeModalState("edit", true));
      console.log("Editar categoría", id);
    } else {
      // dispatch(deleteCategory(id));
      // dispatch(changeModalState("refresh", true));
      console.log("Eliminar categoría", id);
    }
  };

  const handleCloseModal = (value) => {
    console.log("Principal Close");
    console.log("value", value.name);
    console.log("value", value.description);

    setModalIsOpen(false);
  };

  const handleAddAction = (e) => {
    console.log("Principal Open");

    const modal_data = {};

    modal_data.id = "";
    modal_data.title = "Add category";
    modal_data.items = [];
    modal_data.items.push({
      label: "name",
      type: "text",
      value: "",
    });
    modal_data.items.push({
      label: "description",
      type: "textarea",
      value: "",
    });

    // setModalData(modal_data);
    setModalIsOpen(true);
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
      {modalIsOpen ? (
        <ModalCategoryAdd onCloseModal={handleCloseModal} />
      ) : null}
    </div>
  );
};

export default CategoryCrud;
