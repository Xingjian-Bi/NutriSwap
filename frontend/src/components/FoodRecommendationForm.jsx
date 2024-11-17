import React, { useState } from 'react';
import './FoodRecommendationForm.css';

const FoodRecommendation = () => {
  const [formData, setFormData] = useState({
    userId: '123',
    goal: '',
    mealType: '',
    foodChoice: '',
    preferences: '',
  });
  const [recommendation, setRecommendation] = useState(null);

  // convert empty strong preference into null object, avoid backend error
  const dataToSend = { 
    ...formData,
    preferences: formData.preferences === '' ? {} : formData.preferences,
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5050/api/foodrecommend/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      setRecommendation(data);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    }
  };

  return (
    <div className="recommendation-container">
      <h1>Food Recommendation</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="goal">Goal</label>
        <select
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleInputChange}
          required
        >
          <option value="">--Select Goal--</option>
          <option value="lose_weight">Lose Weight</option>
          <option value="maintain_weight">Maintain Weight</option>
          <option value="gain_weight">Gain Weight</option>
        </select>

        <label htmlFor="mealType">Meal Type</label>
        <select
          id="mealType"
          name="mealType"
          value={formData.mealType}
          onChange={handleInputChange}
          required
        >
          <option value="">--Select Meal Type--</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>

        <label htmlFor="foodChoice">Food Choice</label>
        <input
          type="text"
          id="foodChoice"
          name="foodChoice"
          value={formData.foodChoice}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="preferences">Preferences</label>
        <textarea
          id="preferences"
          name="preferences"
          value={formData.preferences}
          onChange={handleInputChange}
        ></textarea>

        <button type="submit">Get Recommendation</button>
      </form>

      {recommendation && (
        <div className="recommendation-result">
          <h2>Recommended Food: {recommendation.recommendedFood}</h2>
          <p>{recommendation.message}</p>
          <h3>Alternative Choices:</h3>
          <ul>
            {recommendation.alternativeChoices.map((choice, index) => (
              <li key={index}>{choice}</li>
            ))}
          </ul>
          <p>{recommendation.reasoning}</p>
        </div>
      )}
    </div>
  );
};

export default FoodRecommendation;
