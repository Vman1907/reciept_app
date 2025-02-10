// src/models/user.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { IUser } from './user.interface';

interface UserCreationAttributes extends IUser {}

export class User extends Model<IUser, UserCreationAttributes> implements IUser {
	public id!: string;
	public email!: string;
	public password!: string;
	public receiptStartNumber!: number;
	public receiptUpdatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		receiptStartNumber: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		receiptUpdatedAt: {
			type: DataTypes.DATE,
			defaultValue: new Date(),
		},
	},
	{
		sequelize,
		tableName: 'users',
		timestamps: true,
	}
);
