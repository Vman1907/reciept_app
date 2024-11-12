import api from '../utils/api';

export default class UserService {
  static async getAllReceipts() {
    try {
      const {data} = await api.get('/receipts/');

      return data.receipts;
    } catch (err) {
      return [
        {
          id: 1,
          date: '2022-01-01',
          name: 'John Doe',
          mobile: '1234567890',
          address: '123, Lorem Ipsum',
          city: 'City',
          amount: 1000,
          paymentMethod: 'Cash',
          referenceNumber: null,
          idType: 'PAN Card',
          idNumber: 'ABCDE1234F',
          receiptNumber: 1,
          createdAt: '2024-10-06T06:33:48.575Z',
          updatedAt: '2024-10-06T06:33:48.575Z',
        },
        {
          id: 2,
          date: '2022-01-01',
          name: 'John Doe',
          mobile: '1234567890',
          address: '123, Lorem Ipsum',
          city: 'City',
          amount: 1000,
          paymentMethod: 'Cash',
          referenceNumber: null,
          idType: 'PAN Card',
          idNumber: 'ABCDE1234F',
          receiptNumber: 2,
          createdAt: '2024-10-06T06:34:44.600Z',
          updatedAt: '2024-10-06T06:34:44.600Z',
        },
      ];
    }
  }
}
