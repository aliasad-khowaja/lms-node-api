import {Request, Response} from 'express';
import {BaseResponse} from './../base-reponse';
import { UserEntity } from './../entities/user-entity';
import * as userService from './../services/user-service';
import * as bcryptService from './../services/bcrypt-service';
import * as jwtService from './../services/jwt-service';


export let getAllUsers = async (req: Request, res: Response) => {
    let baseResponse: BaseResponse = new BaseResponse();
    try {
        let users : UserEntity[] = await userService.getAllUsers();
        baseResponse.isSuccess = true;
        baseResponse.response = users;
    } catch (e) {
        console.log(e);
        baseResponse.isSuccess = true;
        baseResponse.response = e;
    }
    return res.json(baseResponse);
}


export let register = async (req: Request, res: Response) => {
    let baseResponse: BaseResponse = new BaseResponse();
    try {
        let username = req.body.username;
        let password = req.body.password;
        if( username && password ) {
            let exists = await userService.checkUserExists(username);
            if( !exists ) {
                let result = await userService.saveNewUser(username, password);
                baseResponse.isSuccess = true;
                baseResponse.response = result;
            } else {
                baseResponse.isSuccess = false;
                baseResponse.response = {message: 'user already exists'};
            }
        } else {
            baseResponse.isSuccess = false;
            baseResponse.response = {message: 'required values are missing'};
        }        
    } catch (e) {
        console.log(e);
        baseResponse.isSuccess = false;
        baseResponse.response = {error: e};
    }
    return res.json(baseResponse);
}


export let login = async (req: Request, res: Response) => {
    let baseResponse: BaseResponse = new BaseResponse();
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;
        if( username && password ) {
            const user: UserEntity = await userService.getUser(username);
            if( user ) {
                const isValidPass = await bcryptService.verifyEncryptedPassword(password, user.password);
                if( isValidPass ) {
                    const token = jwtService.getNewToken(user);
                    baseResponse.isSuccess = true;
                    baseResponse.response = {token: token};
                } else {
                    baseResponse.isSuccess = false;
                    baseResponse.response = {message: 'Invalid username/password'};
                }
            } else {
                baseResponse.isSuccess = false;
                baseResponse.response = {message: 'Invalid username/password'};
            }
        } else {
            baseResponse.isSuccess = false;
            baseResponse.response = {message: 'required values are missing'};
        }
    } catch (e) {
        console.log(e);
        baseResponse.isSuccess = false;
        baseResponse.response = {error: e};
    }
    return res.json(baseResponse);
}