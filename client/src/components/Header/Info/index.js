import React, { useEffect, useState } from 'react';
import InputNumber from './InputNumber/index';

export default function Info({ transactions }) {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [total, setTotal] = useState(0);
  const [transactionsLength, setTransactionsLength] = useState(0);

  const totalColor = total > 0 ? '#009688' : '#c0392b';

  useEffect(() => {
    const mapTrans = transactions.map(({ type, value }) => {
      let acc = [];
      if (type === '+') {
        acc.push(value);
      }
      return acc;
    });

    const calculateIncome = mapTrans.reduce((acc, curr) => {
      return acc + Number(curr);
    }, 0);

    const calculateExpenses = transactions.reduce((acc, curr) => {
      return curr.type === '-' && acc + curr.value;
    }, 0);

    const calculateTotal = calculateIncome - calculateExpenses;

    setIncome(calculateIncome);
    setExpenses(calculateExpenses);
    setTotal(calculateTotal);
    setTransactionsLength(transactions.length);
  }, [transactions]);

  return (
    <div style={styles.flexRow}>
      <InputNumber title="Lançamentos:" length={transactionsLength} />
      <InputNumber title="Receitas:" color="#009688" value={income} />
      <InputNumber title="Despesas:" color="#c0392b" value={expenses} />
      <InputNumber title="Saldos:" color={totalColor} value={total} />
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
};
