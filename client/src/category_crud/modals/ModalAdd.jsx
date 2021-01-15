import React from "react";

const ModalAdd = () => {
  // document.documentElement.style.setProperty("--size-body-modal", "100%");
  document.documentElement.style.setProperty("--z-index", "1000");

  const handleCloseModal = (e) => {
    console.log("Cierra Modal");
    console.log(e.target.id);
    // document.documentElement.style.setProperty("--size-body-modal", "0%");
    document.documentElement.style.setProperty("--z-index", "-1");
  };

  return (
    <div className="modal-add">
      <h1>Hola Modal Add</h1>
      <button onClick={handleCloseModal}>cerrar</button>
    </div>
  );
};

export default ModalAdd;
