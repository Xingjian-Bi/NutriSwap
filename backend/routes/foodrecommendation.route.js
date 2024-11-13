import express from 'express';
import postRecommend from '../controllers/product.controller.js'; 

const router = express.Router();

router.post('/recommend', postRecommend)