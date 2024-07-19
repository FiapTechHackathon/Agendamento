import * as HttpStatus from 'http-status';
import UsuarioDesabilitarRepository from "../gateway/UsuarioDesabilitarRepository";
import ResponseAPI from '../adapters/ResponseAPI';
import { IDataBase } from "../interfaces/IDataBase";
import { usuarioDesabilitarCasodeUso } from '../useCase/usuarioDesabilitarCasodeUso';
import ResponseErrors from '../adapters/ResponseErrors';

class UsuarioDesabilitarController{
    private repository: UsuarioDesabilitarRepository;

    /**
     * 
     */
    constructor(dbconnection: IDataBase) {
        this.repository = new UsuarioDesabilitarRepository(dbconnection);
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public disable = async (request, response) => {
        try {
            const data = await usuarioDesabilitarCasodeUso.desabilitar(request.params, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

}

export default UsuarioDesabilitarController;
