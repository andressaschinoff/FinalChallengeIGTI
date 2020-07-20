import React from 'react';

export default function InputNumber({ title, number }) {
  return (
    <div>
      <span>{title}</span>
      <span>{number}</span>
    </div>
  );
}
