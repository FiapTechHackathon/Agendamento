import * as express from "express";
import PacienteController from "../../../controllers/pacienteController";
import { IDataBase } from "../../../interfaces/IDataBase";


export default function agendaRoutes(dbconnection: IDataBase) {
    let router = express.Router();
    const pacienteController = new PacienteController(dbconnection);

    router.get('/paciente', pacienteController.all);//trazer todos pacientes
    router.post('/paciente', pacienteController.store);//cadastrar paciente
    router.get('/paciente/autentica', pacienteController.show);//autenticar
    return router;
}

//export default router;