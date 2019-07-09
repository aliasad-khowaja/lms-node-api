import * as userController from './../controllers/user-controller';
import { Application } from 'express';
import { checkJwt } from './../middlewares/jwt-middleware';

export let resiter = (app: Application) => {
    app.route('/user').get( [checkJwt], userController.getAllUsers );
    app.route('/register').post( userController.register );
    app.route('/login').post( userController.login );
}