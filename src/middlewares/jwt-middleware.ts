import { Request, Response, NextFunction } from "express";
import { BaseResponse } from "./../base-reponse";
import * as jwtService from './../services/jwt-service';
import { UserEntity } from "./../entities/user-entity";


export let checkJwt = (req: Request, res: Response, next: NextFunction) => {
    let baseResponse: BaseResponse = new BaseResponse();
    let token: string = req.headers['authorization'];
    if( token ) {
        let decodedUser: UserEntity = jwtService.verifyToken(token);
        if( decodedUser ) {
            next();
        } else {
            baseResponse.isSuccess = false;
            baseResponse.message = 'Invalid token';
            return res.json( baseResponse );
        }
    } else {
        baseResponse.isSuccess = false;
        baseResponse.message = 'Auth token is not supplied';
        return res.json( baseResponse );
    }
}