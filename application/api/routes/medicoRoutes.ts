import * as express from "express";
import MedicoController from "../../../controllers/medicoController";
import { IDataBase } from "../../../interfaces/IDataBase";


export default function agendaRoutes(dbconnection: IDataBase) {
    let router = express.Router();
    const medicoController = new MedicoController(dbconnection);

    router.get('/medico', medicoController.all);// lista todos medicos
    router.post('/medico', medicoController.store);// cadastra medicos
    router.get('/medico/autentica', medicoController.show);// autentica medico
    router.put('/medico/:id', medicoController.update);
    return router;
}

//export default router;