const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService');

transactionRouter.post('/', transactionService.create);
transactionRouter.get('/', transactionService.findByPeriod);
transactionRouter.get('/period', transactionService.findOnlyPeriod);
transactionRouter.put('/:id', transactionService.update);
transactionRouter.delete('/:id', transactionService.remove);

module.exports = transactionRouter;
