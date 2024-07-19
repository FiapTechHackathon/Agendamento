import * as HttpStatus from 'http-status';
import AgendamentoPacienteRepository from "../gateway/agendamentoPacienteRepository";
import ResponseAPI from '../adapters/ResponseAPI';
import AgendamentoPaciente from '../entity/agendamentoPaciente';
import { IDataBase } from "../interfaces/IDataBase";
import { AgendamentoPacienteCasoDeUso } from '../useCase/agendaPacienteCasodeUso';
import BadRequestError from '../application/exception/BadRequestError';
import ResponseErrors from '../adapters/ResponseErrors';

class AgendamentoPacienteController {

    private repository: AgendamentoPacienteRepository;

    constructor(dbconnection: IDataBase) {
        this.repository = new AgendamentoPacienteRepository(dbconnection);
    }

    public store = async (request, response) => {
        try {
            let agendamento = new AgendamentoPaciente(
                request.body.ID_Paciente,
                request.body.ID_Agenda
            );

            agendamento = await AgendamentoPacienteCasoDeUso.criarAgendamentoPaciente(agendamento, this.repository);
            response.status(HttpStatus.OK).json(agendamento);
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

    public update = async (request, response) => {
        try {
            let agendamento = new AgendamentoPaciente(
                request.body.ID_Paciente,
                request.body.ID_Agenda,
                request.body.Status,
                request.body.Justificativa
                
            );

            agendamento = await AgendamentoPacienteCasoDeUso.atualizarAgendamentoPaciente(agendamento, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(agendamento));
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

    public updateStatus = async (request, response) => {
        try {
            let agendamento = new AgendamentoPaciente(
                request.body.ID_Paciente,
                request.body.ID_Agenda,
                request.body.Status,
            );

            agendamento = await AgendamentoPacienteCasoDeUso.atualizarStatusAgendamentoPaciente(agendamento, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(agendamento));
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

}

export default AgendamentoPacienteController;
