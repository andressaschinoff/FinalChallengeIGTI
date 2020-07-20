import React, { useState } from 'react';
import Period from './Period';
import InputNumber from './InputNumber';

export default function Header({ onPeriod }) {
  const handlePeriod = (period) => {
    onPeriod(period);
  };
  return (
    <div>
      <h1>Bootcamp Full Stack - Desafio Final</h1>;
      <h2>Controle Financeiro Pessoal</h2>
      <Period onPeriod={handlePeriod} />
      <div>
        <InputNumber title="Lançamentos:" />
        <InputNumber title="Receitas:" value={0} />
        <InputNumber title="Despesas:" value={0} />
        <InputNumber title="Saldos:" value={0} />
      </div>
      <div>
        <button>+ NOVO LANÇAMENTO</button>
        <input type="text" />
      </div>
    </div>
  );
}
