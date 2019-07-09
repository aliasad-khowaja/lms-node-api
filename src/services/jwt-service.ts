import * as jwt from 'jsonwebtoken';
import { UserEntity } from './../entities/user-entity';

export let getNewToken = (user: UserEntity) : string => {
    const token = jwt.sign(
        {username: user.username, password: user.password},
        "SECRET-KEY",
        { expiresIn: '1h' }
    );
    return token;
}

export let verifyToken = (token: string) : UserEntity => {
    let decodedUser: UserEntity = null;
    jwt.verify(token, "SECRET-KEY", (err, authData : UserEntity) => {
        if(!err) {
            decodedUser = authData
        }
    });
    return decodedUser;
}