import { app } from "../server.js"; // Import your app
import { expect } from "chai";
import request from "supertest";

describe("Food Recommendation API", () => {
  it("should return a food recommendation for valid input", async () => {
    const response = await request(app)
      .post("/api/foodrecommend/recommend")
      .send({
        userId: "123",
        goal: "lose_weight",
        mealType: "lunch",
        foodChoice: "chicken",
        preferences: "low salt, high protein",
      });

    // Check if the response is successful
    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
  });

  it("should return an error if required fields are missing", async () => {
    const response = await request(app)
      .post("/api/foodrecommend/recommend")
      .send({
        userId: "123",
        goal: "",
        mealType: "lunch",
        foodChoice: "chicken",
        preferences: "low salt, high protein",
      });

    // Should return a bad request error
    expect(response.status).to.equal(400);
    expect(response.body.success).to.be.false;
  });

  it("should handle invalid goal gracefully", async () => {
    const response = await request(app)
      .post("/api/foodrecommend/recommend")
      .send({
        userId: "123",
        goal: "invalid_goal",
        mealType: "lunch",
        foodChoice: "chicken",
        preferences: "low salt, high protein",
      });

    // Should return an error
    expect(response.status).to.equal(400);
    expect(response.body.success).to.be.false;
  });

  it("should return an error for unsupported meal types", async () => {
    const response = await request(app)
      .post("/api/foodrecommend/recommend")
      .send({
        userId: "123",
        goal: "lose_weight",
        mealType: "midnight_snack",
        foodChoice: "chicken",
        preferences: "low salt, high protein",
      });

    // Should return an error
    expect(response.status).to.equal(400);
    expect(response.body.success).to.be.false;
  });
});
