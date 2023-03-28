import { Model } from 'sequelize';


class User extends Model {
    public id!: string;
    public email!: string;
    public name!: string;
    public password!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}



export default User;
