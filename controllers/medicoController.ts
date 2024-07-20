import * as HttpStatus from 'http-status';
import MedicoRepository from "../gateway/medicoRepository";
import ResponseAPI from '../adapters/ResponseAPI';
import Medico from '../entity/medico';
import { IDataBase } from "../interfaces/IDataBase";
import { MedicoCasoDeUso } from '../useCase/medicoCasoDeUso';
import BadRequestError from '../application/exception/BadRequestError';
import ResponseErrors from '../adapters/ResponseErrors';
import Usuario from '../entity/usuario';
import { UsuarioCasoDeUso } from '../useCase/usuarioCasodeUso';
import UsuarioRepository from '../gateway/usuarioRepository';

class MedicoController {

    private repository: MedicoRepository;
    private repositoryUsuario: UsuarioRepository;

    constructor(dbconnection: IDataBase) {
        this.repository = new MedicoRepository(dbconnection);
        this.repositoryUsuario = new UsuarioRepository(dbconnection);
    }

    public all = async (request, response) => {
        try {
            let medico = await MedicoCasoDeUso.getAllMedicos(request.query, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.list(medico));
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

    public store = async (request, response) => {
        try {

            let usuario = new Usuario(
                request.body.senha
            );

            let medico = new Medico(
                request.body.nome,
                request.body.crm,
                request.body.especialidade,
                request.body.Estado_CRM
            );



            usuario = await UsuarioCasoDeUso.criarUsuarioMedico(usuario,medico, this.repository,  this.repositoryUsuario);
          
            medico.idUsuario=usuario.id;
            medico = await MedicoCasoDeUso.criarMedico(medico, this.repository);
            response.status(HttpStatus.OK).json(medico);
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

    public update = async (request, response) => {
        try {
            let medico = new Medico(
                request.body.crm,
                request.body.nome,
                request.body.especialidade,
                request.body.idUsuario
            );

            medico = await MedicoCasoDeUso.atualizarMedico(medico, request.params.id, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(medico));
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

    public show = async (request, response) => {
        try {
            if (typeof request.body.crm === 'undefined' && request.body.senha === '') {
                throw new BadRequestError("CRM e Senha são obrigatório.");
            }

            let paciente = await MedicoCasoDeUso.autenticarMedico(request.body.crm,request.body.senha, this.repositoryUsuario, this.repository, );
            response.status(HttpStatus.OK).json(ResponseAPI.data(paciente));

        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }
}

export default MedicoController;
