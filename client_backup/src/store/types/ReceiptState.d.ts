export type ReceiptState = {
  list: Receipt[];
  details: Receipt;
  loading: boolean;
  error: string;
};

export type Receipt = {
  id: string;
  name: string;
  mobile: string;
  address: string;
  city: string;
  amount: number;
  paymentMethod: 'UPI' | 'Netbanking' | 'Card' | 'Cash' | 'Other';
  referenceNumber?: string;
  idType: 'PAN Card' | 'Aadhar Card' | 'Passport' | 'Driving License' | 'Other';
  idNumber: string;
  receiptNumber: number;
  createdAt: string;
};
