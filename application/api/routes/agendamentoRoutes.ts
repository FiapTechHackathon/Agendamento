import * as express from "express";
import AgendamentoController from "../../../controllers/agendamentoController";
import { IDataBase } from "../../../interfaces/IDataBase";


export default function agendaRoutes(dbconnection: IDataBase) {
    let router = express.Router();
    const agendamentoController = new AgendamentoController(dbconnection);

    router.post('/agendamento', agendamentoController.store);//cria agendamento
    router.put('/agendamento/status', agendamentoController.updateStatus);//medico/aceita/recusa agendamento
    router.put('/agendamento/cancela', agendamentoController.update);//cancela agendamento
 
    return router;
}

//export default router;