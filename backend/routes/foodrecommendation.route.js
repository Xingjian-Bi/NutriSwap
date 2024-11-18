import express from 'express';
import postRecommend from '../controllers/foodrecommendation.controller.js'; 

const router = express.Router();

router.post('/recommend', postRecommend);

export default router;
