// import packages
import express from 'express';
import dotenv from 'dotenv';

// database connection
import sequelize from './DatabaseModule/ConnectDB.js';
import cors from 'cors';

// All routes
import UserRoute from './UserModule/UserRouter.js'; // import User Route
import AgencyRoute from './AgencyModule/AgencyRouter.js'; // import Agency Route
import InterventionRoute from './InterventionModule/InterventionRouter.js'; // import Intervention Route
import EmailRoute from './EmailModule/EmailRouter.js'; // import Email Route
import SectionRouter from './SectionModule/SectionRouter.js';
import StatistiquesRouter from './StatistiquesService/RouterStatistiques.js'; // import Statistics Route

class Application {
    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    setupMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    setupRoutes() {
        this.app.use('/api/user', UserRoute);
        this.app.use('/api/agency', AgencyRoute);
        this.app.use('/api/intervention', InterventionRoute);
        this.app.use('/api/email', EmailRoute);
        this.app.use('/api/section', SectionRouter);
        this.app.use('/api/statistiques', StatistiquesRouter);
    }

    setupErrorHandling() {
        // Global error handling
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Une erreur interne est survenue.');
        });
    }

    async start() {
        try {
            // Connect to the database
            await sequelize.sync({});
            console.log('Good.');

            this.app.listen(3000, () => {
                console.log('Database connected successfully!');
            });

            await sequelize.sync();

            // lance the server
            dotenv.config();
            const PORT = process.env.PORT || 8000;
            this.app.listen(PORT, () => {
                console.log(`Server running on port: ${PORT}`);
            });
        } catch (error) {
            console.error('Error from the database :', error);
        }
    }
}

// Create and start the application
const application = new Application();
application.start();
