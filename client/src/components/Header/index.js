import React, { useState, useEffect } from 'react';
import Period from './Period';
import Info from './Info/index';

export default function Header({
  isOpen,
  settedYearMonth,
  onPeriod,
  onCreate,
  transactions,
  onChangeFilter,
}) {
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonStyle = isModalOpen ? styles.buttonInvisible : styles.button;

  useEffect(() => {
    if (!isOpen) {
      setIsModalOpen(false);
    }
  }, [isOpen]);

  const handlePeriod = (period) => {
    onPeriod(period);
  };

  const handleModal = () => {
    onCreate(isModalOpen);
    setIsModalOpen(true);
  };

  const handleTextIput = (event) => {
    event.preventDefault();
    const newFilter = event.target.value;
    onChangeFilter(newFilter);
    setFilter(newFilter);
  };

  return (
    <div>
      <h3 className="center">Bootcamp Full Stack - Desafio Final</h3>
      <h4 className="center">Controle Financeiro Pessoal</h4>
      <Period
        isOpen={isOpen}
        settedYearMonth={settedYearMonth}
        onPeriod={handlePeriod}
      />
      <Info transactions={transactions} />
      <div style={styles.flexRow}>
        <input
          type="button"
          value="+ NOVO LANÇAMENTO"
          style={buttonStyle}
          className="waves-effect waves-light btn"
          onClick={handleModal}
        />
        <input type="text" value={filter} onChange={handleTextIput} />
      </div>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
  },

  button: {
    marginRight: 10,
    width: 270,
  },

  buttonInvisible: {
    opacity: 0,
  },
};
