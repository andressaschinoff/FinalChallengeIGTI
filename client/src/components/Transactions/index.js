import React from 'react';
import { moneyFormatter, zeroLeft } from '../../helpers/formatter';
import Action from '../Action/Action';

export default function Transactions({ transactions, onDelete, onPersist }) {
  const handleActionClick = (id, type) => {
    const transaction = transactions.find(
      (transaction) => transaction._id === id
    );
    if (type === 'delete') {
      onDelete(transaction);
      return;
    }

    onPersist(transaction);
  };

  return (
    <div>
      {transactions.map(({ _id, description, value, category, day, type }) => {
        const classGrade = type === '+' ? styles.goodGrade : styles.badGrade;
        return (
          <div style={classGrade} key={_id}>
            <div style={styles.flexRow}>
              <span style={styles.day}>{zeroLeft.format(day)}</span>
              <div style={styles.flexColumn}>
                <span style={styles.category}>{category}</span>
                <span>{description}</span>
              </div>
            </div>
            <div>
              <span style={styles.value}>{moneyFormatter.format(value)}</span>
              <Action onActionClick={handleActionClick} id={_id} type="edit" />
              <Action
                onActionClick={handleActionClick}
                id={_id}
                type="delete"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  goodGrade: {
    backgroundColor: '#55E6C1',
    borderRadius: 5,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 30,
  },

  badGrade: {
    backgroundColor: '#FD7272',
    borderRadius: 5,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingLeft: 30,
  },

  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
  },

  value: {
    paddingRight: 40,
    fontSize: '1.5rem',
  },

  day: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    paddingRight: 10,
  },

  category: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },

  button: {
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
};
