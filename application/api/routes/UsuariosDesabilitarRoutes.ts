import * as express from "express";
import UsuarioDesabilitarController from "../../../controllers/usuarioDesabilitarController";
import { IDataBase } from '../../../interfaces/IDataBase';

export default function UsuariosDesabilitarRoutes(dbconnection: IDataBase) {
    const router = express.Router();
    const usuarioDesabilitarController = new UsuarioDesabilitarController(dbconnection);
    router.post('/cliente/desabilitar', usuarioDesabilitarController.disable);
    return router;
}

//export default router;
