const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const productRoutes = require('./routes/route'); // Import your route files


class App {
    constructor() {
        this.app = express();
        this.port = 3000;

        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.debug(`🚀 App listening on the port ${this.port}`);
        });
    }

    getServer() {
        return this.app;
    }

    initializeMiddlewares() {
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    initializeRoutes() {
        // Define your routes here using express.Router()
        this.app.get('/', (req, res) => {
            res.send('Hello, World!');
        });

        this.app.use('/', productRoutes);

    }
}

module.exports = App;
