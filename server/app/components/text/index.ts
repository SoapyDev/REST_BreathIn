import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/db.connection.js';
import Text from './texts.models.js'




Text.init(
    {
        title: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lang: {
            type: DataTypes.STRING,
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
        tableName: 'Texts',
        sequelize: sequelize
    }
)




export { Text };