import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import BottomNavigation from '../../components/container/bottomNavigation';
import ReceiptService from '../../services/receipts.service';
import {setList} from '../../store/reducers/ReceiptReducer';

export default function Home() {
  const dispatch = useDispatch();

  const fetchDetails = useCallback(async () => {
    const promises = [
      ReceiptService.getAllReceipts(),
      ReceiptService.getDashboardData(),
    ];

    const results = await Promise.all(promises);

    dispatch(setList(results[0]));
  }, [dispatch]);

  useEffect(() => {
    fetchDetails();
    console.log('fetching details');
  }, [fetchDetails]);
  return <BottomNavigation />;
}
