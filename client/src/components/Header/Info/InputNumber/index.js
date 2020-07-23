import React from 'react';
import { moneyFormatter } from '../../../../helpers/formatter';

export default function InputNumber({ title, value, length, color = 'black' }) {
  const num = value ? moneyFormatter.format(value) : length;
  return (
    <div>
      <span style={{ fontWeight: 'bold' }}>{title}</span>
      <span style={{ color: color, fontWeight: 'bold', paddingLeft: '10px' }}>
        {num}
      </span>
    </div>
  );
}
