import { Category } from "../models/category.model.js";

export const fetchCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, message: categories });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const new_cat = new Category(req.body);
    await new_cat.save();

    res.json({ success: true, message: "Category Created Successfuly" });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Category Deleted Successfuly" });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Category Updated Successfuly" });
  } catch (error) {
    next(error);
  }
};

export const fetchCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({ success: true, message: category });
  } catch (error) {
    next(error);
  }
};
