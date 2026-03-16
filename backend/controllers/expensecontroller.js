const Expense = require("../models/expense");

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, note } = req.body;
const expense = new Expense({
  user: req.user.id,
  amount,
  category,
  note
});
    const savedExpense = await expense.save();

    res.json(savedExpense);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {

    const expenses = await Expense.find({ user: req.user.id });

    res.json(expenses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.deleteOne();

    res.json({ message: "Expense deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {

    const { amount, category, note } = req.body;

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.note = note || expense.note;

    const updatedExpense = await expense.save();

    res.json(updatedExpense);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalExpenses = async (req, res) => {
  try {

    const expenses = await Expense.find({ user: req.user.id });

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.json({ total });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};