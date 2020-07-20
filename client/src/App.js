import React, { useState } from 'react';
import Header from './components/Header';
import api from './services/transactionsService';
import Transactions from './components/Transactions/Transactions';

export default function App() {
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const handleTransactions = (period) => {
    api.findByPeriod(period).then((response) => {
      setCurrentTransactions(response.data);
    });
  };
  return (
    <div>
      <Header onPeriod={handleTransactions} />
      <Transactions currentTransactions={currentTransactions} />
    </div>
  );
}
