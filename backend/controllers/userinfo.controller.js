import { User } from "../models/user.model.js";

// Fetch User Profile
export const getUserProfile = async (req, res) => {
  const { email } = req.params;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If profile exists, return it
    if (user.profile) {
      return res
        .status(200)
        .json({ message: "Profile found", profile: user.profile });
    }

    // If no profile exists, prompt the client to fill in profile details
    return res.status(200).json({
      message: "No profile found. Please complete your profile.",
      profile: null,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update user profile information
export const updateUserInfo = async (req, res) => {
  const { email } = req.params;
  const {
    height,
    weight,
    bodyfat,
    age,
    gender,
    preferences,
    allergies,
    targetWeight,
    fatIntake,
    carbIntake,
    proteinIntake,
    caloriesIntake,
  } = req.body;

  try {
    // Update the profile of the user identified by email
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        profile: {
          height,
          weight,
          bodyfat,
          age,
          gender,
          preferences,
          allergies,
          targetWeight,
          fatIntake,
          carbIntake,
          proteinIntake,
          caloriesIntake,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log("User profile updated successfully", updatedUser.profile)
    res.json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
