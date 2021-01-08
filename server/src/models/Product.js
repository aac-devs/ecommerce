const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "[Product]: product name cannot be null.",
          },
          len: {
            args: [3, 30],
            msg:
              "[Product]: product name must contain between 3 and 30 characters",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 255],
            msg:
              "[Product]: product description must contain between 3 and 255 characters",
          },
        },
      },
      brand: {
        type: DataTypes.STRING,
      },
      condition: {
        type: DataTypes.STRING,
      },
      origin: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.REAL,
        validate: {
          isFloat: {
            args: true,
            msg: "[Product]: product price must be a number.",
          },
          min: {
            args: 0.1,
            msg: "[Product]: product price must be greater than 0.",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            args: true,
            msg: "[Product]: product stock must be a whole number.",
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
