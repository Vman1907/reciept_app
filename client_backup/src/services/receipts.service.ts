import RNFS from 'react-native-fs';
import {Receipt} from '../store/types/ReceiptState';
import api from '../utils/api';

export default class ReceiptService {
  static async createReceipt(receiptData: Omit<Receipt, 'createdAt'>) {
    try {
      const {data} = await api.post('/receipts/', receiptData);
      console.log(data.receipt);
      return data.receipt as Receipt;
    } catch (err) {
      return Error('Error creating receipt');
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

  static async downloadReceipt(receiptId: string) {
    try {
      const response = await api.get(`/receipts/${receiptId}/download`, {
        responseType: 'blob', // Ensure response is treated as a binary blob
      });

      const fileBlob = response.data; // Blob received from the server
      const fileName = 'receipt.pdf'; // You can dynamically generate this from the response
      const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`; // File path to save the receipt

      // Convert the blob to a base64 string
      const base64Data = await fileBlobToBase64(fileBlob);

      // Write the file to the device
      await RNFS.writeFile(filePath, base64Data, 'base64');

      console.log('File path:', RNFS.DownloadDirectoryPath);

      console.log(`File saved to: ${filePath}`);
      return filePath; // Return the path for further use (e.g., sharing)
    } catch (error) {
      console.error('Error downloading receipt:', error);
      throw error;
    }
  }
}
async function fileBlobToBase64(blob: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () =>
      resolve(reader.result?.toString().split(',')[1] ?? '');
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
