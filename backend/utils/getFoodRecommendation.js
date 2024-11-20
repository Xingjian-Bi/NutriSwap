import { OpenAI } from "openai";


export const getFoodRecommendation = async (prompt) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    // call GPT-4o-mini 
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    const { choices } = response;
    if (!choices || choices.length === 0) {
      throw new Error("No recommendations returned by the model.");
    }

    // return response
    const recommendationContent = choices[0].message.content.trim();

    // parse JSON 
    let recommendation;
    try {
      recommendation = JSON.parse(recommendationContent);
    } catch (parseError) {
      throw new Error(
        `Failed to parse response as JSON: ${recommendationContent}`
      );
    }

    console.log("Recommendation received:", recommendation);
    return recommendation;
  } catch (error) {
    console.error("Error fetching food recommendation:", error.message);
    throw error;
  }
};