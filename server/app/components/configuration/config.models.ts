import { Model } from "sequelize";

class Config extends Model {
  public id!: number;
  public name!: string;
  public inhale!: number;
  public exhale!: number;
  public holdIn!: number;
  public holdOut!: number;
  public cycles!: number;
  public sound: boolean;
  public currentColor!: string;
  public theme: string;
  public user_id!: string;
  public shared: boolean;
  public current: boolean;
  public createdAt: Date;
  public updatedAt: Date;
}

export default Config;
