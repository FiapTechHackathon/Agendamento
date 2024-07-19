import * as express from "express";
import AgendaController from "../../../controllers/agendaController";
import { IDataBase } from "../../../interfaces/IDataBase";


export default function agendaRoutes(dbconnection: IDataBase) {
    let router = express.Router();
    const agendaController = new AgendaController(dbconnection);

    router.get('/agenda', agendaController.allDisponivel);//retorna todas as agendas disponiveis
    router.post('/agenda', agendaController.store);//medico/cadastrar Agenda
    router.get('/agenda/:id', agendaController.show);//pega agenda disponivel por ID do medico
    router.put('/agenda/:id', agendaController.update);//medico/Editar agenda
    return router;
}

//export default router;