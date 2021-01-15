import React from "react";

const CategoryTableCrud = ({ data, handleActions }) => {
  let headers = [];
  if (data) {
    for (let prop in data[0]) {
      headers.push(prop);
    }
  } else {
    return null;
  }

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th className="crud-category__th" key={index}>
              <h3>{header}</h3>
            </th>
          ))}
          {/* Columna de los botones: */}
          <th className="crud-category__th">
            <h3>actions</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr className="crud-category__tr" key={index}>
            {headers.map((header, index) => (
              <td className="crud-category__td" key={index}>
                <h3>{item[header]}</h3>
              </td>
            ))}
            {/* Botones para la columna Actions: */}
            {/* <TableCell style={{ textAlign: "center" }}>
              <TableBtnGroup>
                <Button
                  id={item.id}
                  name="edit"
                  tooltip={`edit category #${item.id}`}
                  onClick={handleActions}
                />
                <Button
                  id={item.id}
                  name="delete"
                  tooltip={`delete category #${item.id}`}
                  onClick={handleActions}
                />
              </TableBtnGroup>
            </TableCell> */}
            <td className="crud-category__td">
              <div className="crud-category__btn-group flex-row-center-center">
                <button
                  className="crud-category__button-edit button__square"
                  id={item.id}
                  name="edit"
                  onClick={handleActions}
                ></button>
                <button
                  className="crud-category__button-delete button__square"
                  id={item.id}
                  name="delete"
                  onClick={handleActions}
                ></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTableCrud;
