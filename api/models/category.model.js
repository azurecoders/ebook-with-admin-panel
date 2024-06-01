import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    imgUrls: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
