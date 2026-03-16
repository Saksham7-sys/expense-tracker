const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addExpense, getExpenses, deleteExpense, updateExpense,getTotalExpenses} = require("../controllers/expensecontroller");




router.post("/add", authMiddleware, addExpense);

router.get("/", authMiddleware, getExpenses);

router.delete("/:id", authMiddleware, deleteExpense);

router.put("/:id", authMiddleware, updateExpense);

router.get("/total", authMiddleware, getTotalExpenses);

module.exports = router;