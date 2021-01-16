const server = require("express").Router();
const { Category, CategoryProduct } = require("../config/db.js");

// Route: http://localhost:5000/products/category - GET
server.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (categories.lenght === 0) {
      throw new Error("there are no categories created.");
    }
    res.json({
      message: "categories readed successfully.",
      data: categories,
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// Route: http://localhost:5000/products/category - POST
server.post("/", async (req, res) => {
  const { name, description, image } = req.body;
  if (!name || !description) {
    res
      .status(400)
      .json("all the fields of the category must be added to create it.");
  } else {
    try {
      // Buscar si la categoría ya se encuentra creada.
      const categoryFind = await Category.findOne({
        where: {
          name,
        },
      });
      // Si está creada envía un Error al next con el mensaje indicándolo.
      if (categoryFind) {
        throw new Error(
          "the category you are trying to create already exists."
        );
      }
      // Si no se encuentra creada, la crea.
      await Category.create({
        name,
        description,
      });
      // Lee todas la categorías (incluyendo la nueva) para enviarlas como respuesta.
      const listCategories = await Category.findAll();

      res.json({
        message: "the category has been created successfully.",
        data: listCategories,
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

// Route: http://localhost:5000/products/category/id - PUT
server.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res
      .status(400)
      .json("all the fields of the category must be added to update it.");
  } else {
    try {
      // Eliminar los productos relacionados con la categoría:
      await CategoryProduct.destroy({
        where: {
          categoryId: req.params.id,
        },
      });
      // Obtener la categoría que se desea actualizar:
      const categoryToUpdate = await Category.findByPk(req.params.id);
      // Actulizar la categoría con los nuevos datos:
      await categoryToUpdate.update({
        name,
        description,
      });
      // Lee todas la categorías (incluyendo la modificada) para enviarlas como respuesta.
      const listCategories = await Category.findAll();
      // Mensaje de respuesta.
      res.json({
        message: "the category has been updated successfully.",
        data: listCategories,
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

// Route: http://localhost:5000/products/category/id - DELETE
server.delete("/:id", async (req, res) => {
  try {
    // Eliminar la categoría (las relaciones de ésta se eliminan automáticamente):
    const response = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // Si no existe el producto, lanza un Error que luego será capturado por next():
    if (!response) {
      throw new Error("the category you want to delete does not exist.");
    }
    // Lee todas la categorías que aún quedan para enviarlas como respuesta.
    const listCategories = await Category.findAll();
    // Mensaje de respuesta:
    res.json({
      message: "category deleted successfully.",
      data: listCategories,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route: http://localhost:5000/products/category/nombreCat - GET
server.get("/:nombreCat", async (req, res) => {
  console.log("entramos a nombreCat", req.params.nombreCat);
  try {
    const category = await Category.findOne({
      where: {
        name: req.params.nombreCat,
      },
    });
    if (!category) {
      throw new Error("the requested category does not exist.");
    }
    const products = await category.getProduct({});
    if (products.length === 0) {
      res.json("there are no products for the requested category.");
    } else {
      res.json({
        message: "category products readed successfully.",
        data: products,
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = server;
