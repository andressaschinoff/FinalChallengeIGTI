const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const create = async (req, res) => {
  const description = req.body.description;
  const value = req.body.value;
  const category = req.body.category;
  const year = req.body.year;
  const month = req.body.month;
  const day = req.body.day;
  const yearMonth = req.body.yearMonth;
  const yearMonthDay = req.body.yearMonthDay;
  const type = req.body.type;

  try {
    const newTrasaction = new TransactionModel({
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    });

    newTrasaction.save();

    res.send(newTrasaction);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const findOnlyPeriod = async (_req, res) => {
  try {
    const onlyPeriods = await TransactionModel.find(
      {},
      { _id: 0, yearMonth: 1 }
    );
    const periods = [];
    onlyPeriods.forEach(({ yearMonth }) => {
      if (periods.indexOf(yearMonth) === -1) {
        periods.push(yearMonth);
      }
    });

    const allPeriods = periods.map((period) => {
      const year = Number(period.split('-')[0]);
      const month = Number(period.split('-')[1]);
      const newPeriod =
        month === 1
          ? `Jan/${year}`
          : month === 2
          ? `Fev/${year}`
          : month === 3
          ? `Mar/${year}`
          : month === 4
          ? `Abr/${year}`
          : month === 5
          ? `Mai/${year}`
          : month === 6
          ? `Jun/${year}`
          : month === 7
          ? `Jul/${year}`
          : month === 8
          ? `Ago/${year}`
          : month === 9
          ? `Set/${year}`
          : month === 10
          ? `Out/${year}`
          : month === 11
          ? `Nov/${year}`
          : month === 12
          ? `Dez/${year}`
          : 'Mes invalido';
      return {
        yearMonth: period,
        formatedYearMonth: newPeriod,
      };
    });

    res.send(allPeriods);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o periodo: ' + period });
  }
};

const findByPeriod = async (req, res) => {
  const period = req.query.period;

  try {
    const periodTransactions = await TransactionModel.find({
      yearMonth: period,
    });

    if (periodTransactions.length < 1) {
      res.status(404).send({
        message: `Periodo ${period} não consta no banco de dados`,
      });
    }

    res.send(periodTransactions);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o periodo: ' + period });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  const description = req.body.description;
  const value = req.body.value;
  const category = req.body.category;
  const year = req.body.year;
  const month = req.body.month;
  const day = req.body.day;
  const yearMonth = req.body.yearMonth;
  const yearMonthDay = req.body.yearMonthDay;
  const type = req.body.type;

  try {
    await TransactionModel.findByIdAndUpdate(id, {
      description: description,
      value: value,
      category: category,
      year: year,
      month: month,
      day: day,
      yearMonth: yearMonth,
      yearMonthDay: yearMonthDay,
      type: type,
    });
    res.send({ message: 'Registro de transação atualizado' });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a transação id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await TransactionModel.findByIdAndRemove(id);
    res.send({ message: 'Grade excluido com sucesso' });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

exports.create = create;
exports.findByPeriod = findByPeriod;
exports.findOnlyPeriod = findOnlyPeriod;
exports.update = update;
exports.remove = remove;
