import express from "express";
import {User} from "../models/user.model.js";

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

router.get("/:userId/favorites", async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate("favorites");
        console.log("Populated user:", user);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});


export default router;
