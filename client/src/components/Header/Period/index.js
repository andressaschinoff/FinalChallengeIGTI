import React, { useState, useEffect } from 'react';
import api from '../../../services/transactionsService';

export default function Period({ onPeriod }) {
  const [formatedPeriods, setFormatedPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState([]);

  useEffect(() => {
    api
      .getPeriod()
      .then((response) => {
        setFormatedPeriods(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (currentPeriod.length < 1) {
      onPeriod('2019-01');
    }
  }, [currentPeriod, onPeriod]);

  const handlePeriod = (event) => {
    const period = event.target.value;
    const formatedPeriod = formatedPeriods.find(
      ({ yearMonth }) => yearMonth === period
    );
    setCurrentPeriod(formatedPeriod);
    onPeriod(period);
  };

  const handleButton = (button) => {};

  return (
    <div>
      <button
        onClick={() => {
          handleButton('less');
        }}
      >
        +
      </button>
      <select
        value={currentPeriod.yearMonth}
        onChange={handlePeriod}
        className="browser-default"
      >
        {formatedPeriods.map(({ formatedYearMonth, yearMonth }) => {
          return (
            <option key={yearMonth} value={yearMonth}>
              {formatedYearMonth}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          handleButton('more');
        }}
      >
        -
      </button>
    </div>
  );
}
