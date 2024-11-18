import FoodRecommendationRequest from '../models/foodrecommendationrequest.model.js';
import { generateFoodRecommendationPrompt } from '../utils/generateFoodRecommdPrompt.js';
import { getFoodRecommendation } from '../utils/getFoodRecommendation.js';

// handle food recommendation post
const postRecommend = async (req, res) => {
    console.log('Recieve a request from user \n')
    const { userId, goal, mealType, foodChoice, preferences } = req.body;

    // create FoodRecommendationRequest
    const userData = new FoodRecommendationRequest(userId, goal, mealType, foodChoice, preferences);

    // validate user input
    const { error } = FoodRecommendationRequest.validate(req.body);

    if (error) {
        console.log("user request is not valid, ", error)
        return res.status(400).json({
            message: 'Validation failed',
            details: error.details,
        });
    }

    try {
        // successfully validate user input，get prompt
        console.log('user input is valid, forward msg to AI', JSON.stringify(userData) + '\n')
        const prompt = generateFoodRecommendationPrompt(userData);

        // get food recommendation
        const recommendation = await getFoodRecommendation(prompt);
        // return response
        res.status(200).json(recommendation);
    } catch (err) {
        console.error('Error fetching recommendation:', err + '\n');
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

export default postRecommend;

