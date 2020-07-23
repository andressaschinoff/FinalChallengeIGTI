import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { zeroLeft } from '../../helpers/formatter';

Modal.setAppElement('#root');

const currentDate = new Date();

const currentYear = currentDate.getFullYear();
const currentMonth = zeroLeft.format(currentDate.getMonth() + 1);
const currentDay = currentDate.getDate();

const DATE = `${currentYear}-${currentMonth}-${currentDay}`;

export default function CreateModal({ onSave, onClose }) {
  const [transactionValue, setTransactionValue] = useState(0);
  const [transactionDescription, setTransactionDescription] = useState('');
  const [transactionCategory, setTransactionCategory] = useState('');
  const [transactionDate, setTransactionDate] = useState(DATE);
  const [transactionType, setTransactionType] = useState('-');

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const year = Number(transactionDate.split('-')[0]);
    const month = zeroLeft.format(Number(transactionDate.split('-')[1]));
    const day = zeroLeft.format(Number(transactionDate.split('-')[2]));
    const yearMonth = `${year}-${month}`;

    const formData = {
      description: transactionDescription,
      value: transactionValue,
      category: transactionCategory,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay: transactionDate,
      type: transactionType,
    };

    onSave(formData);
  };

  const handleDescriptionChange = (event) => {
    setTransactionDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setTransactionCategory(event.target.value);
  };

  const handleValueChange = (event) => {
    setTransactionValue(Number(event.target.value));
  };

  const handleDateChange = (event) => {
    setTransactionDate(event.target.value);
  };

  const handleSelectedType = (event) => {
    setTransactionType(event.target.value);
  };

  const handleModalClose = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Nova Transação</span>
          <button
            className="waves-effect waves-light btn red darken-4"
            onClick={handleModalClose}
          >
            x
          </button>
        </div>

        <form className="row" onSubmit={handleFormSubmit}>
          <div style={styles.radioButton}>
            <label style={styles.despesa}>
              <input
                name="typeSelection"
                type="radio"
                value="-"
                checked={transactionType === '-'}
                onChange={handleSelectedType}
              />
              <span>Despesa</span>
            </label>

            <label style={styles.receita}>
              <input
                name="typeSelection"
                type="radio"
                value="+"
                checked={transactionType === '+'}
                onChange={handleSelectedType}
              />
              <span>Receita</span>
            </label>
          </div>

          <div className="input-field col s12">
            <input
              onChange={handleDescriptionChange}
              id="inputName"
              type="text"
            />
            <label className="active" htmlFor="inputName">
              Descrição:
            </label>
          </div>

          <div className="input-field col s12">
            <input onChange={handleCategoryChange} id="inputType" type="text" />
            <label className="active" htmlFor="inputType">
              Categoria:
            </label>
          </div>

          <div className="input-field col s6">
            <input
              id="inputGrade"
              type="number"
              step="1"
              autoFocus
              value={transactionValue}
              onChange={handleValueChange}
            />
            <label className="active" htmlFor="inputGrade">
              Valor:
            </label>
          </div>

          <div className="input-field col s6">
            <input
              id="inputSubject"
              type="date"
              value={transactionDate}
              onChange={handleDateChange}
            />
          </div>

          <div className="input-field col s12" style={styles.flexRow}>
            <button className="waves-effect waves-light btn">Salvar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  radioButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  despesa: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '20px',
    paddingRight: '40px',
  },

  receita: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: '20px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
};
