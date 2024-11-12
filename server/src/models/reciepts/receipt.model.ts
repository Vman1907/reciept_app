import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/db.config';
import { IReceipt } from './receipt.interface';
interface ReceiptCreationAttributes extends Optional<IReceipt, 'id' | 'referenceNumber'> {}
export class Receipt extends Model<IReceipt, ReceiptCreationAttributes> implements IReceipt {
	public user_id!: number;
	public id!: string;
	public date!: Date;
	public name!: string;
	public mobile!: string;
	public address!: string;
	public city!: string;
	public amount!: number;
	public paymentMethod!: 'UPI' | 'Netbanking' | 'Card' | 'Cash' | 'Other';
	public referenceNumber?: string;
	public idType!: 'PAN Card' | 'Aadhar Card' | 'Passport' | 'Driving License' | 'Other';
	public idNumber!: string;
	public receiptNumber!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Receipt.init(
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
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mobile: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		amount: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		paymentMethod: {
			type: DataTypes.ENUM('UPI', 'Netbanking', 'Card', 'Cash', 'Other'),
			allowNull: false,
		},
		referenceNumber: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		idType: {
			type: DataTypes.ENUM('PAN Card', 'Aadhar Card', 'Passport', 'Driving License', 'Other'),
			allowNull: false,
		},
		idNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		receiptNumber: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		tableName: 'receipts',
	}
);
