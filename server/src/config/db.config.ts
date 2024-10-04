import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
	dialect: 'sqlite',
	host: './database/receipts.sqlite',
});

export const connectDB = async () => {
	try {
		await sequelize.sync();
		console.log('Database connected...');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};
