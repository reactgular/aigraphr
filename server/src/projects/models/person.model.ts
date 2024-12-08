import {Column, Model, Table} from 'sequelize-typescript';

@Table
export class Person extends Model {
    @Column
    name: string;

    @Column
    birthday: Date;
}
