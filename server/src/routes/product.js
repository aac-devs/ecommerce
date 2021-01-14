const server = require("express").Router();
const {
  Product,
  Image,
  Category,
  CategoryProduct,
} = require("../config/db.js");

// Ruta: http://localhost:5000/products/ - GET
server.get("/", async (req, res) => {
  try {
    // Se buscan todos los productos de la tabla Product y se les agregan las imágenes y las categorías asociadas.
    const products = await Product.findAll({
      include: [{ model: Image }, { model: Category, as: "category" }],
    });
    res.json({
      message: "products readed successfully.",
      data: products,
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// Ruta: http://localhost:5000/products/ - POST
server.post("/", async (req, res) => {
  const {
    name,
    description,
    brand,
    condition,
    origin,
    price,
    stock,
    imageList,
    categoryList,
  } = req.body;
  // Se verifica que los parámetros que llegan con la petición estén completos, no exige que se agreguen categorías.
  if (
    !name ||
    !description ||
    !brand ||
    !condition ||
    !origin ||
    !price ||
    !stock ||
    !imageList
  ) {
    res
      .status(400)
      .json("all the fields of the product must be added to create it.");
  } else {
    try {
      // Se lanza un Error en caso de no agregar por lo menos una imagen.
      if (imageList.length === 0) {
        throw new Error("at least one image must be added.");
      }

      // Se crea un nuevo producto en la tabla Product, incluye las imágenes.
      const product = await Product.create(
        {
          name,
          description,
          brand,
          condition,
          origin,
          price,
          stock,
          images: imageList,
        },
        { include: [Image] }
      );
      // Se agregan las categorías al producto.
      let categoryProduct = [];
      // Si el arreglo de categorías recibido no es undefined y contiene al menos un elemento, crea la relación:
      if (categoryList) {
        if (categoryList.length !== 0) {
          categoryList.forEach((categoryId) =>
            (async function () {
              const category = await Category.findByPk(categoryId.id);
              product.addCategory(category);
            })()
          );
          // Se leen las categorías desde la tabla Category a partir del id que llega con la petición http.
          for (let i = 0; i < categoryList.length; i++) {
            categoryProduct.push(await Category.findByPk(categoryList[i].id));
          }
        }
      }
      // Se retorna: mensaje de creación exitosa, datos: producto creado y categorías asociadas.
      res.status(201).json({
        message: "the product has been created successfully",
        data: { product: product, categoryList: categoryProduct },
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

// Ruta: http://localhost:5000/products/:id - PUT
server.put("/:id", async (req, res) => {
  const {
    name,
    description,
    brand,
    condition,
    origin,
    price,
    stock,
    imageList,
    categoryList,
  } = req.body;
  // Se verifica que los parámetros que llegan con la petición estén completos, no exige que se agreguen categorías.
  if (
    !name ||
    !description ||
    !brand ||
    !condition ||
    !origin ||
    !price ||
    !stock ||
    !imageList
  ) {
    res
      .status(400)
      .json("all the fields of the product must be added to update it.");
  } else {
    try {
      // Se lanza un Error en caso de no agregar por lo menos una imagen.
      if (imageList.length === 0) {
        throw new Error("at least one image must be added.");
      }
      // Obtener producto que se desea actualizar:
      const productToUpdate = await Product.findByPk(req.params.id);
      // Actualizar producto:
      const productUpdated = await productToUpdate.update({
        name,
        description,
        brand,
        condition,
        origin,
        price,
        stock,
      });
      // Eliminar imágenes relacionadas con el producto (de la tabla Image):
      await Image.destroy({
        where: {
          prodId: req.params.id,
        },
      });
      // Crear nuevas imágenes y relacionarlas con el producto:
      imageList.forEach((image) => {
        (async function () {
          await Image.create({
            url: image.url,
            prodId: req.params.id,
          });
        })();
      });
      // Eliminar categorías relacionadas con el producto:
      await CategoryProduct.destroy({
        where: {
          productId: req.params.id,
        },
      });

      let categoryProduct = [];
      // Si el arreglo de categorías recibido no es undefined y contiene al menos un elemento, crea la relación:
      if (categoryList) {
        if (categoryList.length !== 0) {
          // Agregar las nuevas categorías al producto:
          categoryList.forEach((categoryId) =>
            (async function () {
              const category = await Category.findByPk(categoryId.id);
              productUpdated.addCategory(category);
            })()
          );
          // Leer las categoría relacionadas con el producto actualizado:
          for (let i = 0; i < categoryList.length; i++) {
            console.log(categoryList[i]);
            categoryProduct.push(await Category.findByPk(categoryList[i].id));
          }
        }
      }
      // Leer el producto actualizado:
      const prodRet = await Product.findOne({
        where: {
          id: req.params.id,
        },
        include: [Image],
      });

      // Retornar un obteto con un mensaje, el producto actualizado y las categorías relacionadas al producto:
      res.status(200).json({
        message: "the product has been updated successfully",
        data: { product: prodRet, categoryList: categoryProduct },
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

// Ruta: http://localhost:5000/products/:id - DELETE
server.delete("/:id", async (req, res) => {
  try {
    // Eliminar las imágenes relacionadas con el producto:
    await Image.destroy({
      where: {
        prodId: req.params.id,
      },
    });
    // Eliminar el producto (las relaciones del producto se eliminan automáticamente):
    const response = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    // Si no existe el producto, lanza un Error que luego será capturado por next():
    if (!response) {
      throw new Error("the product you want to delete does not exist.");
    }
    // Mensaje de respuesta:
    res.json({ message: "product deleted successfully." });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Ruta: http://localhost:5000/products/:id -  GET
server.get("/:id", async (req, res) => {
  try {
    // Se busca el producto que coincida con el id ingresado en la tabla Product y se les agregan las imágenes y las categorías asociadas.
    const products = await Product.findAll({
      where: {
        id: req.params.id,
      },
      include: [{ model: Image }, { model: Category, as: "category" }],
    });
    // Si ningún producto coincide con el id ingresado, lanza un error informándolo.
    if (products.length === 0) {
      throw new Error("there are no products with the requested id.");
    } else {
      res.json({
        message: "product readed successfully",
        data: products[0],
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Ruta: /products/:idProduct/category/:idCategory - POST
server.post("/:idProduct/category/:idCategory", async (req, res) => {
  const { idProduct, idCategory } = req.params;
  try {
    // Se obtiene el producto que se quiere relacionar:
    const product = await Product.findOne({
      where: {
        id: idProduct,
      },
      include: [{ model: Image }],
    });
    // Si el producto no existe, lanza un error:
    if (!product) {
      throw new Error("the product you want to relate does not exist.");
    }
    // Se obtiene la categoría que se quiere relacionar:
    const category = await Category.findOne({
      where: {
        id: idCategory,
      },
    });
    // Si la categoría no existe, lanza un error:
    if (!category) {
      throw new Error("the category you want to relate does not exist.");
    }
    // Se realiza la relación entre producto y categoría:
    const productCategory = await product.addCategory(category);
    // Si devuelve undefined, es porque la relación ya existe:
    if (productCategory === undefined) {
      res.json("the relationship you are trying to create already exists.");
    } else {
      // Caso contrario, devuelve un mensaje, el producto y la categoría que se relacionaron:
      res.json({
        message: "category successfully added to the product",
        data: {
          product: product,
          category: category,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Ruta: /products/:idProduct/category/:idCategory - DELETE
server.delete("/:idProduct/category/:idCategory", async (req, res) => {
  const { idProduct, idCategory } = req.params;
  try {
    // Se elimina la relación entre el producto y la categoría, cuyos id llegan como parámetros:
    const response = await CategoryProduct.destroy({
      where: {
        productId: idProduct,
        categoryId: idCategory,
      },
    });
    // Si la respuesta es 0, es porque se intenta eliminar una relación que no existe:
    if (response === 0) {
      throw new Error(
        "the relationship you are trying to delete already exists."
      );
    }
    // Caso contrario, envía el mensaje que confirma que se ha eliminado la relación:
    res.json({ message: "relationship successfully deleted." });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = server;
