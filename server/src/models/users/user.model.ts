// src/models/user.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { IUser } from './user.interface';

interface UserCreationAttributes extends IUser {}

export class User extends Model<IUser, UserCreationAttributes> implements IUser {
	public id!: number;
	public username!: string;
	public password!: string;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'users',
		timestamps: false,
	}
);
