import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "./user.model.js";
import { expect } from "chai";

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

after(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("User Model", () => {
  it("create a user", async () => {
    const user = new User({
      email: "test@example.com",
      password: "securepassword123",
      name: "Test User",
    });

    const savedUser = await user.save();

    expect(savedUser._id).to.exist;
    expect(savedUser.email).to.equal("test@example.com");
    expect(savedUser.password).to.equal("securepassword123");
    expect(savedUser.name).to.equal("Test User");
    expect(savedUser.lastLogin).to.exist;
  });

  it("create user w/ incomplete fields", async () => {
    const user = new User({}); // No fields provided

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).to.exist;
    expect(error.errors).to.have.property("email");
    expect(error.errors).to.have.property("password");
    expect(error.errors).to.have.property("name");
  });

  it("create two users w/ same email", async () => {
    const user1 = new User({
      email: "test@example.com",
      password: "password1",
      name: "User One",
    });

    const user2 = new User({
      email: "test@example.com",
      password: "password2",
      name: "User Two",
    });

    await user1.save();

    let error;
    try {
      await user2.save();
    } catch (err) {
      error = err;
    }

    expect(error).to.exist;
    // duplicate key error code
    expect(error.code).to.equal(11000);
  });

  it("update user's last login time", async () => {
    const user = new User({
      email: "test@example.com",
      password: "password",
      name: "Test User",
    });

    const savedUser = await user.save();

    savedUser.lastLogin = new Date("2024-01-01");
    const updatedUser = await savedUser.save();

    expect(updatedUser.lastLogin.toISOString()).to.equal(
      "2024-01-01T00:00:00.000Z"
    );
  });

  it("delete a user", async () => {
    const user = new User({
      email: "test@example.com",
      password: "password",
      name: "Test User",
    });

    const savedUser = await user.save();
    await User.deleteOne({ _id: savedUser._id });

    const foundUser = await User.findById(savedUser._id);
    expect(foundUser).to.be.null;
  });
});
