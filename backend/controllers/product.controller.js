import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { User } from "../models/user.model.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createProduct = async (req, res) => {
	const product = req.body; // user will send this data

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const addFavorite = async (req, res) => {
	const { userId, productId } = req.body;

	// Validate product ID
	if (!mongoose.Types.ObjectId.isValid(productId)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		// Find the user
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		// Check if the product is already a favorite
		if (user.favorites.includes(productId)) {
			return res.status(400).json({ success: false, message: "Product already in favorites" });
		}

		// Add product to favorites
		user.favorites.push(productId);
		await user.save();

		res.status(200).json({ success: true, message: "Product added to favorites", favorites: user.favorites });
	} catch (error) {
		console.error("Error in adding favorite:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const removeFavorite = async (req, res) => {
	const { userId, productId } = req.body;

	// Validate product ID
	if (!mongoose.Types.ObjectId.isValid(productId)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		// Find the user
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		// Remove product from favorites
		user.favorites = user.favorites.filter((id) => id.toString() !== productId);
		await user.save();

		res.status(200).json({ success: true, message: "Product removed from favorites", favorites: user.favorites });
	} catch (error) {
		console.error("Error in removing favorite:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};