export interface IUser {
	id: string;
	email: string;
	password: string;
	receiptStartNumber?: number;
	receiptUpdatedAt?: Date;
}
