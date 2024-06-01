import express from "express";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  fetchCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.get("/get", fetchCategories);
router.post("/create", createCategory);
router.delete("/delete/:id", deleteCategory);
router.post("/update/:id", updateCategory);
router.get("/fetch/:id", fetchCategory);

export default router;
