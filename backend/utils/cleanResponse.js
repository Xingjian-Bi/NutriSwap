/**
 * Clean up OpenAI API response by removing markdown code block delimiters.
 * @param {string} response - The raw response string from OpenAI API.
 * @returns {string} - The cleaned response string.
 */
export const cleanResponse = (response) => {
    return response.replace(/```json|```/g, '').trim();
};

/**
 * Parse a cleaned OpenAI API response into JSON.
 * @param {string} response - The cleaned response string.
 * @returns {object} - The parsed JSON object.
 * @throws {Error} - If JSON parsing fails.
 */
export const parseResponse = (response) => {
    try {
        const cleanedResponse = cleanResponse(response);
        return JSON.parse(cleanedResponse);
    } catch (error) {
        throw new Error(`Failed to parse OpenAI response: ${error.message}`);
    }
};
