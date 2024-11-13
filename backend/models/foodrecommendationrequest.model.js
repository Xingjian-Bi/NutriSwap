import Joi from 'joi';

class FoodRecommendationRequest {
    constructor(userId, goal, mealType, foodChoice, preferences) {
        this.userId = userId;
        this.goal = goal;
        this.mealType = mealType;
        this.foodChoice = foodChoice;
        this.preferences = preferences;
    }

    // Validation schema using Joi
    static get schema() {
        return Joi.object({
            userId: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Please sign in first.',
                }),
            goal: Joi.string()
                .valid('lose_weight', 'maintain_weight', 'gain_weight')
                .required()
                .messages({
                    'any.only': 'Invalid goal type',
                }),
            mealType: Joi.string()
                .valid('breakfast', 'lunch', 'dinner', 'snack')
                .required()
                .messages({
                    'any.only': 'Invalid meal type',
                }),
            foodChoice: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Food choice cannot be empty',
                }),
            preferences: Joi.object().optional(), // Optional preferences field
        });
    }

    // Validation method
    static validate(data) {
        return this.schema.validate(data, { abortEarly: false }); // Return all validation errors
    }
}

export default FoodRecommendationRequest;
