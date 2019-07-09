import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity("user")
export class UserEntity {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'username', length: 500})
    username: string;

    @Column({name: 'password', length: 500})
    password: string;

}