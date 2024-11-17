

export const generateFoodRecommendationPrompt = (userData) => {
    const {userId, goal, mealType, foodChoice, preferences} = userData;
    return `
        Based on the following information about a user:

        Goal: ${goal} (options: lose weight, maintain weight, or gain weight)
        Meal Type: ${mealType} (options: breakfast, lunch, dinner, snack)
        Food Choice: ${foodChoice}
        Preferences: ${JSON.stringify(preferences)}

        Recommend a delicious food alternative that aligns with their goal and tastes. 
        The recommendation should be flavorful, satisfying, and take into account 
        any specific dietary preferences listed.
        
        If possible, consider recommending the food choice that the user has provided: ${foodChoice}. 
        The recommended food should align with their goal, whether it's for losing weight, maintaining weight, or gaining weight.
        
        Provide the response in the following JSON format:
                
        {
            "recommendedFood": "Spicy Grilled Chicken Wrap",
            "message": "For your goal of losing weight, we recommend a spicy grilled chicken wrap, which is both flavorful and satisfying.",
            "alternativeChoices": ["Spicy Lentil Soup", "Grilled Shrimp Tacos"],
            "reasoning": "The spicy grilled chicken wrap is high in protein, low in calories, and offers the bold flavors you enjoy while keeping in line with your goal of losing weight."
        }
        
        Ensure that the response follows this exact format and includes the necessary fields. Do not provide any explanation outside of the structured format.    
    `;
};
