import * as HttpStatus from 'http-status';
import ResponseAPI from "../adapters/ResponseAPI"
import UsuarioCasoDeUso from '../useCase/jwtUsuarioCasoDeUso';
import User from '../entity/userJWT';
import { IDataBase } from '../interfaces/IDataBase';
import ResponseErrors from '../adapters/ResponseErrors';

export default class UserJwtController{

    constructor (readonly dbconnection: IDataBase) {}

    auth = (request, response) => {
        try {
            let user = new User(
                "Bruno Blauzius schuindt",
                "brunoblauzius@gmail.com"
            );
            let token = new UsuarioCasoDeUso(user).autenticar()
            response.status(HttpStatus.OK).send(ResponseAPI.data(token));

        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }
}