import { Sequelize } from 'sequelize'; // to connect to the database

import dotenv from 'dotenv'; // to load the environment variables
dotenv.config(); // load the environment variables

class Database {
    constructor() {
        // Check if the environment variables are set
        if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST || !process.env.DB_PORT) {
            throw new Error('Database environment variables are not set');
        }

        this.sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dialect: 'mysql',
            }
        );
    }
}

const database = new Database();
export default database.sequelize; // export the sequelize instance to be used in other modules 