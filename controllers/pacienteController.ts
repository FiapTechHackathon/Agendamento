import * as HttpStatus from 'http-status';
import PacienteRepository from '../gateway/pacienteRepository';
import ResponseAPI from '../adapters/ResponseAPI';
import Paciente from '../entity/paciente';
import { IDataBase } from '../interfaces/IDataBase';
import { PacienteCasoDeUso } from '../useCase/pacienteCasodeUso';
import  {UsuarioCasoDeUso}  from '../useCase/usuarioCasodeUso';
import BadRequestError from '../application/exception/BadRequestError';
import ResponseErrors from '../adapters/ResponseErrors';
import Usuario from '../entity/usuario';
import UsuarioRepository from '../gateway/usuarioRepository';

class PacienteController {

    private repository: PacienteRepository;
    private repositoryUsuario: UsuarioRepository;

    constructor(dbconnection: IDataBase) {
        this.repository = new PacienteRepository(dbconnection);
        this.repositoryUsuario = new UsuarioRepository(dbconnection);
    }

    public all = async (request, response) => {
        try {
            let pacientes = await PacienteCasoDeUso.getAllPacientes(request,this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.list(pacientes));
        } catch(err) {
            ResponseErrors.err(response, err);
        }
    }

    public store = async (request, response) => {
        try {
            let usuario = new Usuario(
                request.body.senha
            );
            let paciente = new Paciente(
                request.body.nome,
                request.body.cpf,
                request.body.email
            );
            usuario = await UsuarioCasoDeUso.criarUsuarioPaciente(usuario,paciente, this.repository,  this.repositoryUsuario);
          
            paciente.idUsuario=usuario.id;
            console.log('2',paciente);
            paciente = await PacienteCasoDeUso.criarPaciente(paciente, this.repository);
            response.status(HttpStatus.OK).json(paciente);

        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

    public show = async (request, response) => {
        try {
            if (typeof request.body.cpf === 'undefined' && request.body.senha === '') {
                throw new BadRequestError("Cpf e Senha são obrigatório.");
            }

            let paciente = await PacienteCasoDeUso.autenticarPaciente(request.body.cpf,request.body.senha, this.repositoryUsuario, this.repository, );
            response.status(HttpStatus.OK).json(ResponseAPI.data(paciente));

        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }


}

export default PacienteController;
