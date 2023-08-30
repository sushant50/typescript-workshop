import express, { Express, Request, Response } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import productRoutes from './routes/route'; // Import your route files

class App {
    private app: Express;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 3000;

        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.debug(`🚀 App listening on the port ${this.port}`);
        });
    }

    public getServer(): Express {
        return this.app;
    }

    private initializeMiddlewares(): void {
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initializeRoutes(): void {
        // Define your routes here using express.Router()
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello, World!');
        });

        this.app.use('/', productRoutes);
    }
}

export default App;
