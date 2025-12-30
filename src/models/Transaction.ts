import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Transaction extends Model {
  public id!: number;
  public amount!: number;
  public type!: "income" | "expense";
  public date!: Date;
  public note?: string;
  public userId!: number;
  public categoryId!: number;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("income", "expense"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "transactions",
  }
);

export default Transaction;
