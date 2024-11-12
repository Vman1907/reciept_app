import {Receipt} from '../types/receipt';
import api from '../utils/api';

export default class ReceiptService {
  static async createReceipt(receiptData: Omit<Receipt, 'createdAt'>) {
    const {data} = await api.post('/receipts/', receiptData);
    return data;
  }
  static async updateReceipt(receiptData: Omit<Receipt, 'createdAt'>) {
    const {data} = await api.put(`/receipts/${receiptData.id}`, receiptData);
    return data;
  }
}
