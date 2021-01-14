import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  listCategories,
} from "../redux/actions/categoryActions";

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
  console.log(categories.list);

  const handleTableActions = (e) => {
    const { id, name } = e.target;
    if (name === "edit") {
      setCategorySelected(id);
      // dispatch(changeModalState("edit", true));
    } else {
      dispatch(deleteCategory(id));
      // dispatch(changeModalState("refresh", true));
      console.log("Eliminar categoría");
    }
  };

  const handleAddAction = (e) => {
    console.log("Estoy en handleAddAction");
    // dispatch(changeModalState("add", true));
  };

  return (
    <div className="crudcategory flex-col-cen-str">
      <div className="crudcategory__header flex-row-bet-cen">
        <div className="crudcategory__title">
          <h1 className="text__title">categories</h1>
        </div>
        <button
          style={{
            backgroundImage: `url(/assets/images/add.png)`,
            backgroundColor: "#f7cb06",
          }}
          className="button__square crudcategory__addbutton"
        >
          {/* <i className="fa fa-plus"></i> */}
        </button>
      </div>
      <div className="crudcategory__body">
        aquí va la tabla de crud category
      </div>
    </div>
  );
};

export default CategoryCrud;
