import {Column, Model, Table} from 'sequelize-typescript';

/**
 * @deprecated
 */
@Table
export class Person extends Model {
    @Column
    name: string;

    @Column
    birthday: Date;
}
