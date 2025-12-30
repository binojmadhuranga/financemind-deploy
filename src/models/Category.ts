import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Category extends Model {
  public id!: number;
  public name!: string;
  public type!: "income" | "expense";
  public userId!: number;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("income", "expense"),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "categories",
  }
);

export default Category;
