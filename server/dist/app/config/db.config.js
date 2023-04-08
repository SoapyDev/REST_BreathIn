import dotenv from 'dotenv';
dotenv.config();
export const config = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
        max: 100,
        min: 0,
        acquire: parseInt(process.env.DB_ACQUIRE),
        idle: parseInt(process.env.DB_IDLE),
    }
};
//# sourceMappingURL=db.config.js.map