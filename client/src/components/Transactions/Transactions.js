import React from 'react';

export default function Transactions({ currentTransactions }) {
  return (
    <div>
      {currentTransactions.map(
        ({
          _id,
          description,
          value,
          category,
          year,
          month,
          day,
          yearMonth,
          yearMonthDay,
          type,
        }) => {
          return (
            <div key={_id}>
              <div>
                <span>{day}</span>
                <div>
                  <span>{category} - </span>
                  <span>{description}</span>
                </div>
              </div>
              <span>R$ {value}</span>
            </div>
          );
        }
      )}
    </div>
  );
}
