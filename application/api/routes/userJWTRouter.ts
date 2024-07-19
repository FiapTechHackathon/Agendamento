import * as express from "express";
import UserJwTController from "../../../controllers/UserJwTController";
import { IDataBase } from "../../../interfaces/IDataBase";

export default function userJWTRoutes(dbconnection: IDataBase) {
    let router = express.Router();
    const userController = new UserJwTController(dbconnection);
    router.post('/user/auth', userController.auth);
    return router;
}