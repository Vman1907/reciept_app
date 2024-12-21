import {Receipt} from '../store/types/ReceiptState';
import api from '../utils/api';

export default class ReceiptService {
  static async createReceipt(receiptData: Omit<Receipt, 'createdAt'>) {
    try {
      const {data} = await api.post('/receipts/', receiptData);
      return data as Receipt;
    } catch (err) {
      return Error(err as any);
    }
  }
  static async updateReceipt(receiptData: Omit<Receipt, 'createdAt'>) {
    try {
      const {data} = await api.put(`/receipts/${receiptData.id}`, receiptData);
      return data as Receipt;
    } catch (err) {
      return Error(err as any);
    }
  }
  static async getAllReceipts() {
    try {
      const {data} = await api.get('/receipts/');

      return data.receipts as Receipt[];
    } catch (err) {
      return Error(err as any);
    }
  }
  static async getDashboardData() {
    try {
      const {data} = await api.get('/receipts/');

      return data.receipts;
    } catch (err) {
      return Error(err as any);
    }
  }
  static async deleteReceipt(id: string) {
    try {
      const {data} = await api.delete(`/receipts/${id}`);
      return data.success;
    } catch (err) {
      return false;
    }
  }
}
