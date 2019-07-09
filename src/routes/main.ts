import { Application } from "express";
import * as userRoute from './user-route';

export let registerRoutes = (app: Application)  => {
    userRoute.resiter(app);
}