const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const zeroLeft = Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 2 });

export { moneyFormatter, zeroLeft };
