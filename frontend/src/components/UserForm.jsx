import React from "react";
import { useFormik } from "formik"; // Import useFormik hook
import { userFormValidationSchema } from "./validationSchemas"; // Import validation schema
import "./UserForm.css";   // Import CSS file for styling

// Define the form component
const UserForm = () => {
  // Initialize Formik
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
    },
    validationSchema: userFormValidationSchema, // Apply validation schema
    onSubmit: (values) => {
      console.log("Form Submitted with Values:", values);
    },
  });

  return (
    <div className="form-container">
      <h1>Personal Information</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Height Field */}
        <div className="form-group">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            {...formik.getFieldProps("height")} // Connect Formik to the field
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
            {...formik.getFieldProps("weight")} // Connect Formik to the field
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
            {...formik.getFieldProps("bodyfat")} // Connect Formik to the field
          />
          {formik.touched.bodyfat && formik.errors.bodyfat ? (
            <div className="error">{formik.errors.bodyfat}</div>
          ) : null}
        </div>

        {/* Age Field */}
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            {...formik.getFieldProps("age")} // Connect Formik to the field
          />
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

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
