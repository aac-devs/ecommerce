import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./product_card";

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

  return (
    <div className="catalogue">
      <aside className="catalogue__categories">
        <h1 className="text-title text-title--light">categories</h1>
        <div className='catalogue__list'>
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
                <h1 className="text-body text-body--inline text-body--light ">
                  {item.name}
                </h1>
              </label>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn catalogue__button"
          onClick={handleButton}
        >
          browse all
        </button>
      </aside>
      <div className="catalogue__products">
        {products.list.data.map((prod, index) => {
          if (browseAll) {
            return (
              <ProductCard
                key={index}
                name={prod.name}
                price={prod.price}
                reviews={3.5}
                image={prod.images[0].url}
              ></ProductCard>
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
                        name={prod.name}
                        price={prod.price}
                        reviews={3.5}
                        image={prod.images[0].url}
                      ></ProductCard>
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
