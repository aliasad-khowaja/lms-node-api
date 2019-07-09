import {getManager} from 'typeorm';
import { UserEntity } from './../entities/user-entity';

export let getAllUsers = () => {
    return getManager().getRepository(UserEntity).find();
}

export let saveUser = (user: UserEntity) => {
    return getManager().getRepository(UserEntity).save(user);
} 

export let getUser = async (username: string) : Promise<UserEntity> => {
    return await getManager().getRepository(UserEntity)
                .createQueryBuilder('user')
                .where('user.username = :username', {username: username})
                .getOne();
}

export let checkUserExists = async (username: string) : Promise<boolean> => {
    return await getManager().getRepository(UserEntity)
                .createQueryBuilder('user')
                .where('user.username = :username', {username: username})
                .getCount() > 0;
}


