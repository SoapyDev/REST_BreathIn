import { Model } from 'sequelize';


class Text extends Model {
    public title!: string;
    public text!: string;
    public link!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}



export default Text;
