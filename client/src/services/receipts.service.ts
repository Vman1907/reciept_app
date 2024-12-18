import {Receipt} from '../store/types/ReceiptState';
import api from '../utils/api';

export default class ReceiptService {
  static async createReceipt(receiptData: Omit<Receipt, 'createdAt'>) {
    const {data} = await api.post('/receipts/', receiptData);
    return data as Receipt;
  }
  static async updateReceipt(receiptData: Omit<Receipt, 'createdAt'>) {
    const {data} = await api.put(`/receipts/${receiptData.id}`, receiptData);
    return data as Receipt;
  }
  static async getAllReceipts() {
    const {data} = await api.get('/receipts/');

    return data.receipts as Receipt[];
  }
  static async getDashboardData() {
    const {data} = await api.get('/receipts/');

    return data.receipts;
  }
}
