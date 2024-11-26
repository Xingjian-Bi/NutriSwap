import * as Yup from "yup"; // Import Yup for validation

// Define the validation schema using Yup
export const userFormValidationSchema = Yup.object({
  height: Yup.number()
    .required("Height is required")
    .min(50, "Height must be at least 50 cm")
    .max(300, "Height can't exceed 300 cm"),
  weight: Yup.number()
    .required("Weight is required")
    .min(20, "Weight must be at least 20 kg")
    .max(500, "Weight can't exceed 500 kg"),
  bodyfat: Yup.number()
    .required("Bodyfat is required")
    .min(3, "Bodyfat must be at least 3%")
    .max(50, "Bodyfat can't exceed 50%"),
  age: Yup.number()
    .required("Age is required")
    .min(1, "Age must be at least 1")
    .max(120, "Age can't exceed 120"),
  gender: Yup.string().required("Gender is required"),
  preferences: Yup.string().optional(),
  allergies: Yup.string().optional(),
  targetWeight: Yup.number()
    .required("Target weight is required")
    .min(20, "Target weight must be at least 20 kg")
    .max(500, "Target weight can't exceed 500 kg"),
  fatIntake: Yup.number()
    .required("Fat intake is required")
    .min(0, "Fat intake must be at least 0g")
    .max(200, "Fat intake one day shouldn't exceed 200g"),
  carbIntake: Yup.number()
    .required("Carb intake is required")
    .min(0, "Carb intake must be at least 0g")
    .max(500, "Carb intake one day shouldn't exceed 500g"),
  proteinIntake: Yup.number()
    .required("Protein intake is required")
    .min(0, "Protein intake must be at least 0g")
    .max(300, "Protein intake one day shouldn't exceed 300g"),
  caloriesIntake: Yup.number()
    .required("Calories intake is required")
    .min(0, "Calories intake must be at least 0")
    .max(10000, "Calories intake one day shouldn't exceed 10,000cal"),
});
