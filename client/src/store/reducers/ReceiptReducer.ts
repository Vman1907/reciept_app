import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StoreNames} from '../config';
import {ReceiptState} from '../types/ReceiptState';

const initState: ReceiptState = {
  list: [],
  details: {
    id: '',
    date: '',
    name: '',
    mobile: '',
    address: '',
    city: '',
    amount: 0,
    paymentMethod: 'UPI',
    referenceNumber: '',
    idType: 'PAN Card',
    idNumber: '',
    receiptNumber: 0,
    createdAt: '',
  },
  loading: false,
  error: '',
};

const ReceiptSlice = createSlice({
  name: StoreNames.RECEIPT,
  initialState: initState,
  reducers: {
    reset: state => {
      state.details = initState.details;
      state.error = initState.error;
      state.loading = initState.loading;
    },
    setReceiptDetails: (
      state,
      action: PayloadAction<typeof initState.details>,
    ) => {
      state.details = action.payload;
    },
    setList: (state, action: PayloadAction<typeof initState.list>) => {
      state.list = action.payload;
    },
    deleteReceipt: (state, action: PayloadAction<string[]>) => {
      state.list = state.list.filter(item => !action.payload.includes(item.id));
    },
    addReceipt: (state, action: PayloadAction<typeof initState.details>) => {
      state.list.push(action.payload);
    },
    setReceiptLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setReceiptName: (state, action: PayloadAction<string>) => {
      state.details.name = action.payload;
    },
    setReceiptMobile: (state, action: PayloadAction<string>) => {
      state.details.mobile = action.payload;
    },
    setReceiptAddress: (state, action: PayloadAction<string>) => {
      state.details.address = action.payload;
    },
    setReceiptCity: (state, action: PayloadAction<string>) => {
      state.details.city = action.payload;
    },
    setReceiptAmount: (state, action: PayloadAction<number>) => {
      state.details.amount = action.payload;
    },
    setReceiptPaymentMethod: (
      state,
      action: PayloadAction<'UPI' | 'Netbanking' | 'Card' | 'Cash' | 'Other'>,
    ) => {
      state.details.paymentMethod = action.payload;
    },
    setReceiptReferenceNumber: (state, action: PayloadAction<string>) => {
      state.details.referenceNumber = action.payload;
    },
    setReceiptIdType: (
      state,
      action: PayloadAction<
        'PAN Card' | 'Aadhar Card' | 'Passport' | 'Driving License' | 'Other'
      >,
    ) => {
      state.details.idType = action.payload;
    },
    setReceiptIdNumber: (state, action: PayloadAction<string>) => {
      state.details.idNumber = action.payload;
    },
    setReceiptReceiptNumber: (state, action: PayloadAction<number>) => {
      state.details.receiptNumber = action.payload;
    },
    setReceiptCreatedAt: (state, action: PayloadAction<string>) => {
      state.details.createdAt = action.payload;
    },
  },
});

export const {
  reset,
  addReceipt,
  deleteReceipt,
  setList,
  setReceiptDetails,
  setReceiptLoading,
  setError,
  setReceiptName,
  setReceiptMobile,
  setReceiptAddress,
  setReceiptCity,
  setReceiptAmount,
  setReceiptPaymentMethod,
  setReceiptReferenceNumber,
  setReceiptIdType,
  setReceiptIdNumber,
  setReceiptReceiptNumber,
  setReceiptCreatedAt,
} = ReceiptSlice.actions;

export default ReceiptSlice.reducer;
