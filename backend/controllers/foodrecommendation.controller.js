import FoodRecommendationRequest from '../models/foodrecommendationrequest.model.js';


// handle food recommendation post
const postRecommend = async (req, res) => {
    const { userId, goal, mealType, foodChoice, preferences } = req.body;

    const foodRecommendationRequest = new FoodRecommendationRequest(userId, goal, mealType, foodChoice, preferences);

    // validate user input
    const { error } = FoodRecommendationRequest.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Validation failed',
            details: error.details,
        });
    }

    // after successful validate user input, 
    // connect to chatGPT to get some food recommendation
    const recommendation = {
        recommendedFood: 'Grilled Chicken Salad',
        message: 'For your goal of losing weight, we recommend a lighter meal like grilled chicken salad.',
    };

    res.status(200).json(recommendation);
};

export default postRecommend;
