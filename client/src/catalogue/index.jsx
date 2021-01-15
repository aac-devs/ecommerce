import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./product_card/";

let countCatalogue = 0;

const Catalogue = () => {
  const products = useSelector((state) => state.productList);
  const categories = useSelector((state) => state.categoryList);
  const [categoriesWithStatus, setCategoriesWithStatus] = useState([]);
  const [browseAll, setBrowseAll] = useState(true);

  console.log("Renderiza catalogo:", countCatalogue);
  countCatalogue++;

  if (categoriesWithStatus.length > 0) {
    console.log("----------Permitido Catálogo");
  }

  useEffect(() => {
    console.log("useEffect de Catalogo (categories)");
    setCategoriesWithStatus(
      categories
        ? categories.list.data.map((item) => {
            return {
              ...item,
              status: false,
            };
          })
        : []
    );
  }, [categories]);

  console.log("Product list:", products);
  console.log("Category list:", categories);

  function handleClick(e) {
    const { id, checked } = e.target;
    console.log(id);
    console.log(checked);
    if (checked) {
      setBrowseAll(false);
    }
    setCategoriesWithStatus(
      categoriesWithStatus.map((item) => {
        if (item.id.toString() === id.toString()) {
          return {
            ...item,
            status: checked,
          };
        } else {
          return item;
        }
      })
    );
  }
  function handleButton() {
    setBrowseAll(true);
    setCategoriesWithStatus(
      categories.list.data.map((item) => {
        return {
          ...item,
          status: false,
        };
      })
    );
  }

  const handlerAddToCart = (e) => {
    console.log("Add to cart clicked!");
    console.log(e.target.id);
  };

  const handlerProductDetails = (e) => {
    console.log("Details clicked!");
    console.log(e.target.id);
  };

  return (
    <div className="catalogue flex-row-start-start">
      <aside className="catalogue__categories flex-column-center-center">
        <h2>categories</h2>
        <div className="catalogue__list">
          {categoriesWithStatus.map((item, index) => (
            <div className="catalogue__item" key={index}>
              <input
                className="catalogue__checkbox"
                type="checkbox"
                value={item.status}
                id={item.id}
                checked={item.status}
                onChange={handleClick}
              ></input>
              <label className="catalogue__label" htmlFor={item.id}>
                <h3>{item.name}</h3>
              </label>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="button button--light"
          onClick={handleButton}
        >
          browse all
        </button>
      </aside>
      <div className="catalogue__products flex-row-evenly-stretch">
        {products.list.data.map((prod, index) => {
          if (browseAll) {
            return (
              <ProductCard
                key={index}
                product={prod}
                reviews={3.5}
                onAddToCartClick={handlerAddToCart}
                onDetailsClick={handlerProductDetails}
              />
            );
          } else {
            let alreadyRender = false;
            return categoriesWithStatus.map((item) => {
              if (item.status) {
                return prod.category.map((cat) => {
                  if (cat.id === item.id && alreadyRender === false) {
                    alreadyRender = true;
                    return (
                      <ProductCard
                        key={index}
                        product={prod}
                        reviews={3.5}
                        onAddToCartClick={handlerAddToCart}
                        onDetailsClick={handlerProductDetails}
                      />
                    );
                  } else {
                    return null;
                  }
                });
              } else {
                return null;
              }
            });
          }
        })}
      </div>
    </div>
  );
};

export default Catalogue;
