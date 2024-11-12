export type Receipt = {
  id: string;
  date: string;
  name: string;
  mobile: string;
  address: string;
  city: string;
  amount: number;
  paymentMethod: 'UPI' | 'Netbanking' | 'Card' | 'Cash' | 'Other';
  referenceNumber: string;
  idType: 'PAN Card' | 'Aadhar Card' | 'Passport' | 'Driving License' | 'Other';
  idNumber: string;
  receiptNumber: number;
  createdAt: string;
};
