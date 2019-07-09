import * as userRepository from './../repositories/user-repository';
import { UserEntity } from './../entities/user-entity';
import * as bcryptService from './../services/bcrypt-service';

export let getAllUsers = async () : Promise<UserEntity[]> => {
    let users : UserEntity[] = await userRepository.getAllUsers();
    return users;
}

export let checkUserExists = async (username: string) : Promise<boolean> => {
    let exists = await userRepository.checkUserExists(username);
    return exists;
}

export let saveNewUser = async (username: string, password: string) : Promise<UserEntity> => {
    const encryptedPassword = await bcryptService.getEncryptedPassword(password);
    let user : UserEntity = new UserEntity();
    user.username = username;
    user.password = encryptedPassword;
    let newUser = await userRepository.saveUser( user );
    return newUser;
}

export let getUser = async (username: string) : Promise<UserEntity> => {
    let user : UserEntity = await userRepository.getUser(username);
    if( user && user.id ) {
        return user;
    } else {
        return null;
    }
}