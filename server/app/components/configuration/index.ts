import { DataTypes } from "sequelize";
import Config from "./config.models.js";
import { sequelize } from "../../config/db.connection.js";

Config.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inhale: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    exhale: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    holdIn: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    holdOut: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
    },
    cycles: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sound: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    currentColor: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    theme: {
      type: DataTypes.ENUM("dark", "light"),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    shared: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    current: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Configurations",
    sequelize: sequelize,
  }
);

export { Config };
