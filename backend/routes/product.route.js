import express from "express";

import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
    addFavorite,
    removeFavorite,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/favorites/add", addFavorite);
router.post("/favorites/remove", removeFavorite);

export default router;
