const express = require("express");

const router = express.Router();

const expenseController = require('../controller/expenses');

router.post('/add-expense',expenseController.addExpense);

router.get('/get-expense',expenseController.getExpense);

router.delete('/delete-expense',expenseController.deleteExpense);

router.put('/edit-expense',expenseController.getExpense);

module.exports = router;