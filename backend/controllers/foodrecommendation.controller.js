import FoodRecommendationRequest from '../models/foodrecommendationrequest.model.js';
import { generateFoodRecommendationPrompt } from '../utils/generateFoodRecommdPrompt.js';
import { getFoodRecommendation } from '../utils/getFoodRecommendation.js';

// handle food recommendation post
const postRecommend = async (req, res) => {
    console.log('Recieve a request')
    const { userId, goal, mealType, foodChoice, preferences } = req.body;

    // create FoodRecommendationRequest
    const userData = new FoodRecommendationRequest(userId, goal, mealType, foodChoice, preferences);

    // validate user input
    const { error } = FoodRecommendationRequest.validate(req.body);

    if (error) {
        console.log("user request is not valid")
        return res.status(400).json({
            message: 'Validation failed',
            details: error.details,
        });
    }

    try {
        // successfully validate user input，get prompt
        console.log('user input is valid, forward msg to AI')
        const prompt = generateFoodRecommendationPrompt(userData);

        // get food recommendation
        const recommendation = await getFoodRecommendation(prompt);
        console.log("successful get fodd recommendation", recommendation)
        // return response
        res.status(200).json(recommendation);
    } catch (err) {
        console.error('Error fetching recommendation:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

