import { app } from "../server.js"; // Import your app
import { expect } from "chai";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { User } from "../models/user.model.js";

describe("Signup API", () => {
  let mongoServer;

  // set up an in-memory MongoDB instance
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // clean up after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // stop MongoDB instance after all test
  after(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("create a new user", async () => {
    const response = await request(app).post("/api/auth/signup").send({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    });

    // should create a new user
    expect(response.status).to.equal(201);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal("User Created!");

    // check the user is saved in the database
    const userInDB = await User.findOne({ email: "test@example.com" });
    expect(userInDB).not.to.be.null;
    expect(userInDB.name).to.equal("Test User");
  });

  it("check if email already exists", async () => {
    await User.create({
      email: "test@example.com",
      password: "hashedpassword",
      name: "Existing User",
    });

    const response = await request(app).post("/api/auth/signup").send({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    });

    // should return an error
    expect(response.status).to.equal(400);
    expect(response.body.success).to.be.false;
    expect(response.body.message).to.equal("User already exists");
  });

  it("check if required fields are missing", async () => {
    const response = await request(app).post("/api/auth/signup").send({
      email: "",
      password: "password123",
      name: "Test User",
    });

    // should return an error
    expect(response.status).to.equal(400);
    expect(response.body.success).to.be.false;
    expect(response.body.message).to.equal("All fields are required");
  });
});
