import * as HttpStatus from 'http-status';
import AgendaRepository from "../gateway/agendaRepository";
import ResponseAPI from '../adapters/ResponseAPI';
import Agenda from '../entity/agenda';
import { IDataBase } from "../interfaces/IDataBase";
import { AgendaCasoDeUso } from '../useCase/agendaCasodeUso';
import BadRequestError from '../application/exception/BadRequestError';
import ResponseErrors from '../adapters/ResponseErrors';
import { format } from 'date-fns';

class AgendaController {

    private repository: AgendaRepository;

    constructor(dbconnection: IDataBase) {
        this.repository = new AgendaRepository(dbconnection);
    }

    public allDisponivel = async (request, response) => {
        try {
            let agenda = await AgendaCasoDeUso.getAllAgendasDiponiveis(this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.list(agenda));
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

    public store = async (request, response) => {
        try {
            let agenda = new Agenda(
                new Date(request.body.Data),
                request.body.HoraInicio,
                request.body.HoraFim,
                request.body.disponivel,
                request.body.IdMedico,
                request.body.Valor 
            );
            console.log(agenda)
            agenda = await AgendaCasoDeUso.criarAgenda(agenda, this.repository);
            response.status(HttpStatus.OK).json(agenda);
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

    public update = async (request, response) => {
        try {
            let agenda = new Agenda(
                new Date(request.body.Data),
                request.body.HoraInicio,
                request.body.HoraFim,
                request.body.disponivel,
                request.body.IdMedico,
                request.body.Valor 
            );

            agenda = await AgendaCasoDeUso.atualizarAgenda(agenda, request.params.id, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(agenda));
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

    public show = async (request, response) => {
        try {
            if (!request.params.id) {
                throw new BadRequestError("ID do medico é requerido.");
            }

            let agenda = await AgendaCasoDeUso.encontrarAgendaPorIdMedico(request.params.id, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(agenda));
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

}

export default AgendaController;
