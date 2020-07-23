import React, { useState, useEffect } from 'react';
import api from '../../../services/transactionsService';
import { zeroLeft } from '../../../helpers/formatter';

export default function Period({ isOpen, onPeriod, settedYearMonth }) {
  const [allPeriods, setAllPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonLeft, setButtonLeft] = useState(
    'waves-effect waves-light btn disabled'
  );
  const [buttonRight, setButtonRight] = useState(
    'waves-effect waves-light btn'
  );

  const buttonStyle = isModalOpen
    ? styles.buttonInvisible
    : styles.buttonVisible;

  useEffect(() => {
    api
      .getPeriod()
      .then((response) => {
        setAllPeriods(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (currentPeriod < 1) {
      setCurrentPeriod(settedYearMonth);
    }
  }, [currentPeriod, settedYearMonth]);

  useEffect(() => {
    if (!isOpen) {
      setIsModalOpen(false);
    }
  }, [isOpen]);

  const handlePeriod = (event) => {
    const period = event.target.value;
    const formatedPeriod = allPeriods.find(
      ({ yearMonth }) => yearMonth === period
    );

    setCurrentPeriod(formatedPeriod);
    onPeriod(formatedPeriod);
  };

  const handleButton = (button = 'less') => {
    const year = currentPeriod.yearMonth.split('-')[0];
    const month = currentPeriod.yearMonth.split('-')[1];
    let period = '';
    let newYear = year;

    if (button === 'more') {
      let newMonth = Number(month) + 1;
      if (newMonth === 13) {
        newMonth = 1;
        newYear = Number(year) + 1;
        period = `${newYear}-${zeroLeft.format(newMonth)}`;
      } else {
        period = `${newYear}-${zeroLeft.format(newMonth)}`;
      }

      const newPeriod = allPeriods.find(
        ({ yearMonth }) => yearMonth === period
      );

      if (newPeriod === undefined) {
        setButtonRight('waves-effect waves-light btn disabled');
        return;
      }
      setCurrentPeriod(newPeriod);
      onPeriod(newPeriod);
      setButtonLeft('waves-effect waves-light btn');
      return;
    }

    let newMonth = Number(month) - 1;
    if (newMonth === 0) {
      newMonth = 12;
      newYear = Number(year) - 1;
      period = `${newYear}-${zeroLeft.format(newMonth)}`;
    } else {
      period = `${newYear}-${zeroLeft.format(newMonth)}`;
    }

    const newPeriod = allPeriods.find(({ yearMonth }) => yearMonth === period);
    if (newPeriod === undefined) {
      setButtonLeft('waves-effect waves-light btn disabled');
      return;
    }
    onPeriod(newPeriod);
    setCurrentPeriod(newPeriod);
    setButtonRight('waves-effect waves-light btn');
  };

  return (
    <div style={styles.flexRow}>
      <input
        style={buttonStyle}
        className={buttonLeft}
        type="button"
        onClick={() => {
          handleButton();
        }}
        value="<"
      />

      <select
        value={currentPeriod.yearMonth}
        onChange={handlePeriod}
        className="browser-default"
      >
        {allPeriods.map(({ formatedYearMonth, yearMonth }) => {
          return (
            <option key={yearMonth} value={yearMonth}>
              {formatedYearMonth}
            </option>
          );
        })}
      </select>

      <input
        style={buttonStyle}
        className={buttonRight}
        type="button"
        onClick={() => {
          handleButton('more');
        }}
        value=">"
      />
    </div>
  );
}

const styles = {
  flexRow: {
    width: 250,
    fontSize: '1.5rem',
    display: 'flex',
    flexDirection: 'row',
    margin: '0 auto',
    marginBottom: 30,
  },

  buttonInvisible: {
    opacity: 0,
  },

  buttonVisible: {
    opacity: 1,
  },
};
