import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { ISession } from './session.interface';
interface SessionCreationAttributes extends Optional<ISession, 'id'> {}
export class Session extends Model<ISession, SessionCreationAttributes> implements ISession {
	public user_id!: string;
	public id!: string;
	public expiresAt!: Date;
	public loginAt!: Date;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Session.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			unique: true,
		},
		user_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		expiresAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		loginAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'sessions',
		timestamps: true,
	}
);
