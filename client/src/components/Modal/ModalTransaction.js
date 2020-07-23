import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { zeroLeft } from '../../helpers/formatter';

Modal.setAppElement('#root');

export default function ModalTransaction({
  onSave,
  onClose,
  selectedTransaction,
}) {
  const {
    _id,
    description,
    value,
    category,
    yearMonthDay,
    type,
  } = selectedTransaction;

  const [transactionValue, setTransactionValue] = useState(value);
  const [transactionDescription, setTransactionDescription] = useState(
    description
  );
  const [transactionCategory, setTransactionCategory] = useState(category);
  const [transactionDate, setTransactionDate] = useState(yearMonthDay);

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

    const newYear = Number(transactionDate.split('-')[0]);
    const newMonth = zeroLeft.format(Number(transactionDate.split('-')[1]));
    const newDay = zeroLeft.format(Number(transactionDate.split('-')[2]));
    const newYearMonth = `${newYear}-${newMonth}`;

    const formData = {
      _id,
      newDescription: transactionDescription,
      newCategory: transactionCategory,
      newValue: transactionValue,
      newYear,
      newMonth,
      newDay,
      newYearMonth,
      newYearMonthDay: transactionDate,
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

  const handleModalClose = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Editar Transação</span>
          <button
            className="waves-effect waves-light btn red darken-4"
            onClick={handleModalClose}
          >
            x
          </button>
        </div>

        <form className="row" onSubmit={handleFormSubmit}>
          <div style={styles.radioButton}>
            <label style={{ paddingRight: 40 }}>
              <input
                name="typeSelection"
                type="radio"
                value="-"
                checked={type === '-'}
                disabled="disabled"
              />
              <span>Despesa</span>
            </label>

            <label>
              <input
                name="typeSelection"
                type="radio"
                value="+"
                checked={type === '+'}
                disabled="disabled"
              />
              <span>Receita</span>
            </label>
          </div>

          <div className="input-field col s12">
            <input
              onChange={handleDescriptionChange}
              id="inputName"
              type="text"
              value={description}
            />
            <label className="active" htmlFor="inputName">
              Descrição:
            </label>
          </div>

          <div className="input-field col s12">
            <input
              onChange={handleCategoryChange}
              id="inputType"
              type="text"
              value={category}
            />
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

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
};
