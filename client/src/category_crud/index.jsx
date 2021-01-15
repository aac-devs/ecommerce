import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  listCategories,
} from "../redux/actions/categoryActions";
import ModalAdd from "./modals/ModalAdd";
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

  const handleAddAction = (e) => {
    console.log("Estoy en handleAddAction", e.target.name);
    // dispatch(changeModalState("add", true));
    console.log(e.target.name);
    console.log(e.target.id);

    ReactDOM.render(
      <ModalAdd></ModalAdd>,

      document.getElementById("modals")
    );
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
    </div>
  );
};

export default CategoryCrud;
