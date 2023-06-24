const Expense = require('../models/expenseModel');

const addExpense = async(req, res, next) => {
    console.log(req.body);

    try{
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        const data = await Expense.create({
            amount: amount,
            description: description,
            category: category
        })
        res.status(201).json({newExpenseDetails: data})
    }
    catch(err){
        console.log('error occurred during adding expenses',JSON.stringify(err));
        res.status(500).json({error:err})
    }
}


//get Expense
const getExpense = async (req,res,next) => {
    try{
        const expenses = await Expense.findAll();
        res.status(200).json({allExpenses: expenses})
    }
    catch(err){
        console.log('error occurred during get expense',JSON.stringify(err));
        res.status(500).json({error: err});
    }
}


//delete expense
const deleteExpense = async (req,res,next) => {
    try{
        const expense = await Expense.findAll();
        res.status(200).json({allExpenses: expense})
    }
    catch(err){
        console.log('error occurred during delete expense',JSON.stringify(err));
        res.status(500).json({error: err});

    }
}


//edit expense
const editExpense = async (req,res,next) => {
    try{
        if(req.params.id == 'undefined'){
            console.log('For Delete, expense id is missing');
            return res.status(400).json({err : 'ID is missing'})
          }
      
          const eId = req.params.id;
          const expense = await Expense.findOne({where : {id: eId}});
      
      
          await expense.save();
          res.sendStatus(200).json({expense});
    }
    catch(err){
        console.log('Edit Expense is Failing', JSON.stringify(err));
         res.status(500).json({
            error:err
        })
    }
}       

module.exports = {
addExpense,
getExpense,
deleteExpense,
editExpense
}