import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    favorite: {
        type: Boolean,
        required: true,
        default: false,
      }
  },
  {
    // Automaticly create createdAt, updatedAt field in db
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
