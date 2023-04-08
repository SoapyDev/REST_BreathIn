import { Model } from 'sequelize';


class Connection extends Model {
    public id!: string;
    public user_id!: number;
    public dateToDisconnect!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}
export default Connection;