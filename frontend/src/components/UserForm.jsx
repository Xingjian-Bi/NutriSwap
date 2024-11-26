import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { userFormValidationSchema } from "./validationSchemas";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth"; // Import zustand store
import { useToast } from "@chakra-ui/react";
import "./UserForm.css";

const UserForm = () => {
  const { user, isAuthenticated, checkAuth } = useAuthStore(); // Get user info from zustand
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      height: "",
      weight: "",
      bodyfat: "",
      age: "",
      gender: "",
      preferences: "",
      allergies: "",
      targetWeight: "",
      fatIntake: "",
      carbIntake: "",
      proteinIntake:"",
      caloriesIntake:"",
    },
    validationSchema: userFormValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`api/profile/${user.email}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        toast({
          title: "Profile Updated",
          description: "Your profile was updated successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        console.log("Profile updated:", data);
      } catch (error) {
        console.error("Error updating profile:", error.message);
        toast({
          title: "Profile Update Failed",
          description: "An error occurred while updating your profile.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    },
  });

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const authResult = await checkAuth();
      if (!authResult?.success) {
        navigate("/"); // Redirect if not authenticated or user doesn't exist
        return;
      }

      try {
        const response = await fetch(`/api/profile/${user.email}`, {
          method: "GET",
        });

        if (!response.ok) {
          toast({
            title: response.status,
            description: response.statusText,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const { profile } = await response.json();
        if (profile) {
          formik.setValues(profile); // Set fetched profile data into Formik
          setProfileExists(true);
        }
      } catch (error) {
        toast({
          title: "Error fetching profile:",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, isAuthenticated, checkAuth]); // Include user and isAuthenticated as dependencies

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="form-container">
      <h1>{profileExists ? "Update Your Profile" : "Complete Your Profile"}</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Height Field */}
        <div className="form-group">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            {...formik.getFieldProps("height")}
          />
          {formik.touched.height && formik.errors.height ? (
            <div className="error">{formik.errors.height}</div>
          ) : null}
        </div>

        {/* Weight Field */}
        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            {...formik.getFieldProps("weight")}
          />
          {formik.touched.weight && formik.errors.weight ? (
            <div className="error">{formik.errors.weight}</div>
          ) : null}
        </div>

        {/* Bodyfat Field */}
        <div className="form-group">
          <label htmlFor="bodyfat">Bodyfat (%):</label>
          <input
            type="number"
            id="bodyfat"
            {...formik.getFieldProps("bodyfat")}
          />
          {formik.touched.bodyfat && formik.errors.bodyfat ? (
            <div className="error">{formik.errors.bodyfat}</div>
          ) : null}
        </div>

        {/* Age Field */}
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" {...formik.getFieldProps("age")} />
          {formik.touched.age && formik.errors.age ? (
            <div className="error">{formik.errors.age}</div>
          ) : null}
        </div>

        {/* Gender Field */}
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" {...formik.getFieldProps("gender")}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="error">{formik.errors.gender}</div>
          ) : null}
        </div>

        {/* Preferences Field */}
        <div className="form-group">
          <label htmlFor="preferences">Dietary Preferences:</label>
          <input
            type="text"
            id="preferences"
            {...formik.getFieldProps("preferences")}
          />
        </div>

        {/* Allergies Field */}
        <div className="form-group">
          <label htmlFor="allergies">Allergies:</label>
          <input
            type="text"
            id="allergies"
            {...formik.getFieldProps("allergies")}
          />
        </div>

        {/* Target Weight Field */}
        <div className="form-group">
          <label htmlFor="targetWeight">Target Weight (kg):</label>
          <input
            type="number"
            id="targetWeight"
            {...formik.getFieldProps("targetWeight")}
          />
          {formik.touched.targetWeight && formik.errors.targetWeight ? (
            <div className="error">{formik.errors.targetWeight}</div>
          ) : null}
        </div>


        {/* Fat Intake Field */}
        <div className = "form-group">
          <label htmlFor="fatIntake">Fat Intake(g):</label>
          <input
            type = "number"
            id = "fatIntake"
            {...formik.getFieldProps("fatIntake")}
          />
          {formik.touched.fatIntake && formik.errors.fatIntake ? (
            <div className="error">{formik.errors.fatIntake}</div>
          ) : null}
        </div>

        {/* Carb Intake Field */}
        <div className = "form-group">
          <label htmlFor="carbIntake">Carb Intake(g):</label>
          <input
            type = "number"
            id = "carbIntake"
            {...formik.getFieldProps("carbIntake")}
          />
          {formik.touched.carbIntake && formik.errors.carbIntake ? (
            <div className="error">{formik.errors.carbIntake}</div>
          ) : null}
        </div>

        {/* Protein Intake Field */}
        <div className = "form-group">
          <label htmlFor="proteinIntake">Protein Intake(g):</label>
          <input
            type = "number"
            id = "proteinIntake"
            {...formik.getFieldProps("proteinIntake")}
          />
          {formik.touched.proteinIntake && formik.errors.proteinIntake ? (
            <div className="error">{formik.errors.proteinIntake}</div>
          ) : null}
        </div>

        {/* Calories Intake Field */}
        <div className = "form-group">
          <label htmlFor="caloriesIntake">Calories Intake(cal):</label>
          <input
            type = "number"
            id = "caloriesIntake"
            {...formik.getFieldProps("caloriesIntake")}
          />
          {formik.touched.caloriesIntake && formik.errors.caloriesIntake ? (
            <div className="error">{formik.errors.caloriesIntake}</div>
          ) : null}
        </div>


        {/* Submit Button */}
        <button type="submit">
          {profileExists ? "Update Profile" : "Submit Profile"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
