import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import api from './services/transactionsService';
import Transactions from './components/Transactions';
import Spinner from './components/Spinner';
import ModalTransaction from './components/Modal/ModalTransaction';
import CreateModal from './components/Modal/CreateModal';

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const isOpen = isNewModalOpen || isModalOpen;

  useEffect(() => {
    api
      .findByPeriod(currentPeriod.yearMonth)
      .then((response) => {
        setAllTransactions(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPeriod]);

  useEffect(() => {
    setFilteredTransactions(allTransactions);
  }, [allTransactions]);

  useEffect(() => {
    if (currentPeriod < 1) {
      const newPeriod = {
        yearMonth: '2019-01',
        formatedYearMonth: 'Jan/2019',
      };
      setCurrentPeriod(newPeriod);
    }
  }, [currentPeriod]);

  const handlePeriod = (period) => {
    setCurrentPeriod(period);
  };

  const handleDelete = async (transactionToDelete) => {
    await api.remove(transactionToDelete._id);

    const deleteTransactions = allTransactions.filter(
      ({ _id }) => _id !== transactionToDelete._id
    );

    setAllTransactions(deleteTransactions);
  };

  const handlePersist = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCreation = () => {
    setIsNewModalOpen(true);
  };

  const handlePersistData = async (formData) => {
    const {
      _id,
      newDescription,
      newCategory,
      newValue,
      newYear,
      newMonth,
      newDay,
      newYearMonth,
      newYearMonthDay,
    } = formData;

    const newTransaction = Object.assign([], allTransactions);
    const transactionToPersist = newTransaction.find(
      (transaction) => transaction._id === _id
    );

    transactionToPersist.description = newDescription;
    transactionToPersist.category = newCategory;
    transactionToPersist.value = newValue;
    transactionToPersist.year = newYear;
    transactionToPersist.month = newMonth;
    transactionToPersist.day = newDay;
    transactionToPersist.yearMonth = newYearMonth;
    transactionToPersist.yearMonthDay = newYearMonthDay;

    await api.update(_id, transactionToPersist);

    setIsModalOpen(false);
  };
  const handleCreateData = async (formData) => {
    await api.create(formData);
    setCurrentPeriod(formData.yearMonth);

    setIsNewModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsNewModalOpen(false);
  };

  const handleFilter = (currentFilter) => {
    const filterToLowerCase = currentFilter.toLowerCase();
    const newTransactions = allTransactions.filter(({ description }) => {
      const descriptionLowerCase = description.toLowerCase();
      return descriptionLowerCase.includes(filterToLowerCase);
    });

    setFilteredTransactions(newTransactions);
  };

  return (
    <div className="container">
      <Header
        isOpen={isOpen}
        settedYearMonth={currentPeriod}
        transactions={filteredTransactions}
        onCreate={handleCreation}
        onPeriod={handlePeriod}
        onChangeFilter={handleFilter}
      />

      {filteredTransactions.length > 0 && (
        <Transactions
          onDelete={handleDelete}
          onPersist={handlePersist}
          transactions={filteredTransactions}
        />
      )}

      {filteredTransactions.length === 0 && <Spinner />}

      {isModalOpen && (
        <ModalTransaction
          onSave={handlePersistData}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
        />
      )}

      {isNewModalOpen && (
        <CreateModal onSave={handleCreateData} onClose={handleClose} />
      )}
    </div>
  );
}
