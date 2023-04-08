import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.connection.js";
import Connection from "./connectionModels.js";


Connection.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dateToDisconnect: {
            type: DataTypes.DATE,
            allowNull: true,
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
        tableName: 'Connections',
        sequelize: sequelize
    }
)

export { Connection }