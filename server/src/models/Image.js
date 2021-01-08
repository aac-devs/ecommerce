const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "image",
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "[Image]: image url cannot be null.",
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
