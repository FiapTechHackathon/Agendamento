import * as express from "express";
import AgendaRoutes from './agendaRoutes';
//import ClienteDesabilitarRoutes from './clienteDesabilitarRoutes';
import AgendamentoRoutes from './agendamentoRoutes';
import MedicoRoutes from './medicoRoutes';
import PacienteRoutes from './pacienteRoutes';
import { IDataBase } from '../../../interfaces/IDataBase';

export default function urls(dbconnection: IDataBase) {
    const router = express.Router();
    router.use("/api/v1/", AgendaRoutes(dbconnection));
    router.use("/api/v1/", AgendamentoRoutes(dbconnection));
    router.use("/api/v1/", MedicoRoutes(dbconnection));
    router.use("/api/v1/", PacienteRoutes(dbconnection));
    return router;
}

