import { DataTypes } from 'sequelize'
import Config from './config.models.js'
import { sequelize } from '../../config/db.connection.js';


Config.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inhale: {
            type: DataTypes.FLOAT(4, 2),
            allowNull: false
        },
        exhale: {
            type: DataTypes.FLOAT(4, 2),
            allowNull: false
        },
        inhold: {
            type: DataTypes.FLOAT(4, 2),
            allowNull: false
        },
        exhold: {
            type: DataTypes.FLOAT(4, 2),
            allowNull: false
        },
        cycles: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sound: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        currentColor: {
            type: DataTypes.STRING(7),
            allowNull: false,
        },
        color1: {
            type: DataTypes.STRING(7),
            allowNull: true,
        },
        color2: {
            type: DataTypes.STRING(7),
            allowNull: true,
        },
        color3: {
            type: DataTypes.STRING(7),
            allowNull: true,
        },
        theme: {
            type: DataTypes.ENUM('dark', 'light'),
            allowNull: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: true,
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
        tableName: 'Configurations',
        sequelize: sequelize
    }
)


export { Config };