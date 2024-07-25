import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import urls from './application/api/routes/urls';
import Auth from "./application/api/middler/auth";
import Logger from "./application/api/middler/logger";
import userJWTRoutes from './application/api/routes/userJWTRouter';
import setupSwagger from './swagger'; // Adicione a importação do Swagger
import { IDataBase } from './interfaces/IDataBase';

export default class Server {
    public app: express.Application;

    constructor(readonly dbconnection: IDataBase) {
        this.app = express();
        this.middler();
        this.routes();
    }

    enableCors() {
        const options: cors.CorsOptions = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        }
        this.app.use(cors(options));
    }

    middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use(Logger.log);

        this.app.route('/').get((req, res) => {
            res.json({
                'version': '1.0.2',
                "app": "APP Agendamentos Hackathon FIAP",
                'date': '2024-07-23'
            });
        });

        // Configure Swagger antes das rotas que requerem autenticação
        setupSwagger(this.app);

        // Rotas públicas
        this.app.use('/api/v1/', userJWTRoutes(this.dbconnection));

        // Middleware de autenticação
        this.app.use(Auth.validate);

        // Rotas autenticadas
        this.app.use("/", urls(this.dbconnection));
    }
}
