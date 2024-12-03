import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  VStack,
  Heading,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { userFormValidationSchema } from "./validationSchemas";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const UserForm = () => {
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const textColor = useColorModeValue("gray.800", "gray.200");
  const bg = useColorModeValue("gray.50", "gray.800");

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
      proteinIntake: "",
      caloriesIntake: "",
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
      } catch (error) {
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
      setLoading(true);

      const authResult = await checkAuth();
      if (!authResult?.success) {
        navigate("/");
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
          formik.setValues(profile);
          setProfileExists(true);
        }
      } catch (error) {
        toast({
          title: "Error fetching profile",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
        setProfileLoaded(true);
      }
    };

    if (user && !profileLoaded) {
      fetchProfile();
    }
  }, [user, checkAuth, navigate, toast, profileLoaded]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      maxWidth="600px"
      mx="auto"
      mt="10"
      p="6"
      borderRadius="md"
      bg={bg}
      borderWidth={1}
      boxShadow="md"
      mb="10"
    >
      <Heading as="h1" size="lg" mb="6" textAlign="center" color={textColor}>
        {profileExists ? "Update Your Profile" : "Complete Your Profile"}
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4}>
          {[
            { id: "height", label: "Height (cm)", type: "number" },
            { id: "weight", label: "Weight (kg)", type: "number" },
            { id: "bodyfat", label: "Bodyfat (%)", type: "number" },
            { id: "age", label: "Age", type: "number" },
            {
              id: "gender",
              label: "Gender",
              type: "select",
              options: ["", "Male", "Female", "Other"],
            },
            { id: "preferences", label: "Dietary Preferences", type: "text" },
            { id: "allergies", label: "Allergies", type: "text" },
            { id: "targetWeight", label: "Target Weight (kg)", type: "number" },
            { id: "fatIntake", label: "Fat Intake (g)", type: "number" },
            { id: "carbIntake", label: "Carb Intake (g)", type: "number" },
            {
              id: "proteinIntake",
              label: "Protein Intake (g)",
              type: "number",
            },
            {
              id: "caloriesIntake",
              label: "Calories Intake (cal)",
              type: "number",
            },
          ].map(({ id, label, type, options }) => (
            <FormControl key={id}>
              <FormLabel color={textColor}>{label}:</FormLabel>
              {type === "select" ? (
                <Select
                  {...formik.getFieldProps(id)}
                  isInvalid={formik.touched[id] && formik.errors[id]}
                >
                  {options.map((option) => (
                    <option key={option} value={option.toLowerCase()}>
                      {option}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  type={type}
                  {...formik.getFieldProps(id)}
                  isInvalid={formik.touched[id] && formik.errors[id]}
                />
              )}
              {formik.touched[id] && formik.errors[id] && (
                <Text color="red.500" fontSize="sm">
                  {formik.errors[id]}
                </Text>
              )}
            </FormControl>
          ))}

          <Button type="submit" colorScheme="teal" width="full">
            {profileExists ? "Update Profile" : "Submit Profile"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UserForm;

// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import { userFormValidationSchema } from "./validationSchemas";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/auth"; // Import zustand store
// import { useToast } from "@chakra-ui/react";
// import "./UserForm.css";

// const UserForm = () => {
//   const { user, isAuthenticated, checkAuth } = useAuthStore(); // Get user info from zustand
//   const [loading, setLoading] = useState(true);
//   const [profileExists, setProfileExists] = useState(false);
//   const navigate = useNavigate();
//   const toast = useToast();
//   // console.log("Form user email:", user.email);

//   // Formik initialization
//   const formik = useFormik({
//     initialValues: {
//       height: "",
//       weight: "",
//       bodyfat: "",
//       age: "",
//       gender: "",
//       preferences: "",
//       allergies: "",
//       targetWeight: "",
//       fatIntake: "",
//       carbIntake: "",
//       proteinIntake: "",
//       caloriesIntake: "",
//     },
//     validationSchema: userFormValidationSchema,
//     onSubmit: async (values) => {
//       try {
//         const response = await fetch(`api/profile/${user.email}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(values),
//         });

//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }

//         const data = await response.json();
//         toast({
//           title: "Profile Updated",
//           description: "Your profile was updated successfully!",
//           status: "success",
//           duration: 2000,
//           isClosable: true,
//         });
//         console.log("Profile updated:", data);
//       } catch (error) {
//         console.error("Error updating profile:", error.message);
//         toast({
//           title: "Profile Update Failed",
//           description: "An error occurred while updating your profile.",
//           status: "error",
//           duration: 2000,
//           isClosable: true,
//         });
//       }
//     },
//   });

//   // Fetch user profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const authResult = await checkAuth();
//       if (!authResult?.success) {
//         navigate("/"); // Redirect if not authenticated or user doesn't exist
//         return;
//       }

//       try {
//         const response = await fetch(`/api/profile/${user.email}`, {
//           method: "GET",
//         });

//         if (!response.ok) {
//           toast({
//             title: response.status,
//             description: response.statusText,
//             status: "error",
//             duration: 2000,
//             isClosable: true,
//           });
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }

//         const { profile } = await response.json();
//         if (profile) {
//           formik.setValues(profile); // Set fetched profile data into Formik
//           setProfileExists(true);
//         }
//       } catch (error) {
//         toast({
//           title: "Error fetching profile:",
//           description: error.message,
//           status: "error",
//           duration: 2000,
//           isClosable: true,
//         });
//         console.error("Error fetching profile:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [checkAuth, isAuthenticated]); // Include user and isAuthenticated as dependencies

//   if (loading) {
//     return <div>Loading...</div>; // Show loading indicator while fetching data
//   }

//   return (
//     <div className="form-container">
//       <h1>{profileExists ? "Update Your Profile" : "Complete Your Profile"}</h1>
//       <form onSubmit={formik.handleSubmit}>
//         {/* Height Field */}
//         <div className="form-group">
//           <label htmlFor="height">Height (cm):</label>
//           <input
//             type="number"
//             id="height"
//             {...formik.getFieldProps("height")}
//           />
//           {formik.touched.height && formik.errors.height ? (
//             <div className="error">{formik.errors.height}</div>
//           ) : null}
//         </div>

//         {/* Weight Field */}
//         <div className="form-group">
//           <label htmlFor="weight">Weight (kg):</label>
//           <input
//             type="number"
//             id="weight"
//             {...formik.getFieldProps("weight")}
//           />
//           {formik.touched.weight && formik.errors.weight ? (
//             <div className="error">{formik.errors.weight}</div>
//           ) : null}
//         </div>

//         {/* Bodyfat Field */}
//         <div className="form-group">
//           <label htmlFor="bodyfat">Bodyfat (%):</label>
//           <input
//             type="number"
//             id="bodyfat"
//             {...formik.getFieldProps("bodyfat")}
//           />
//           {formik.touched.bodyfat && formik.errors.bodyfat ? (
//             <div className="error">{formik.errors.bodyfat}</div>
//           ) : null}
//         </div>

//         {/* Age Field */}
//         <div className="form-group">
//           <label htmlFor="age">Age:</label>
//           <input type="number" id="age" {...formik.getFieldProps("age")} />
//           {formik.touched.age && formik.errors.age ? (
//             <div className="error">{formik.errors.age}</div>
//           ) : null}
//         </div>

//         {/* Gender Field */}
//         <div className="form-group">
//           <label htmlFor="gender">Gender:</label>
//           <select id="gender" {...formik.getFieldProps("gender")}>
//             <option value="">Select</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           {formik.touched.gender && formik.errors.gender ? (
//             <div className="error">{formik.errors.gender}</div>
//           ) : null}
//         </div>

//         {/* Preferences Field */}
//         <div className="form-group">
//           <label htmlFor="preferences">Dietary Preferences:</label>
//           <input
//             type="text"
//             id="preferences"
//             {...formik.getFieldProps("preferences")}
//           />
//         </div>

//         {/* Allergies Field */}
//         <div className="form-group">
//           <label htmlFor="allergies">Allergies:</label>
//           <input
//             type="text"
//             id="allergies"
//             {...formik.getFieldProps("allergies")}
//           />
//         </div>

//         {/* Target Weight Field */}
//         <div className="form-group">
//           <label htmlFor="targetWeight">Target Weight (kg):</label>
//           <input
//             type="number"
//             id="targetWeight"
//             {...formik.getFieldProps("targetWeight")}
//           />
//           {formik.touched.targetWeight && formik.errors.targetWeight ? (
//             <div className="error">{formik.errors.targetWeight}</div>
//           ) : null}
//         </div>

//         {/* Fat Intake Field */}
//         <div className="form-group">
//           <label htmlFor="fatIntake">Fat Intake(g):</label>
//           <input
//             type="number"
//             id="fatIntake"
//             {...formik.getFieldProps("fatIntake")}
//           />
//           {formik.touched.fatIntake && formik.errors.fatIntake ? (
//             <div className="error">{formik.errors.fatIntake}</div>
//           ) : null}
//         </div>

//         {/* Carb Intake Field */}
//         <div className="form-group">
//           <label htmlFor="carbIntake">Carb Intake(g):</label>
//           <input
//             type="number"
//             id="carbIntake"
//             {...formik.getFieldProps("carbIntake")}
//           />
//           {formik.touched.carbIntake && formik.errors.carbIntake ? (
//             <div className="error">{formik.errors.carbIntake}</div>
//           ) : null}
//         </div>

//         {/* Protein Intake Field */}
//         <div className="form-group">
//           <label htmlFor="proteinIntake">Protein Intake(g):</label>
//           <input
//             type="number"
//             id="proteinIntake"
//             {...formik.getFieldProps("proteinIntake")}
//           />
//           {formik.touched.proteinIntake && formik.errors.proteinIntake ? (
//             <div className="error">{formik.errors.proteinIntake}</div>
//           ) : null}
//         </div>

//         {/* Calories Intake Field */}
//         <div className="form-group">
//           <label htmlFor="caloriesIntake">Calories Intake(cal):</label>
//           <input
//             type="number"
//             id="caloriesIntake"
//             {...formik.getFieldProps("caloriesIntake")}
//           />
//           {formik.touched.caloriesIntake && formik.errors.caloriesIntake ? (
//             <div className="error">{formik.errors.caloriesIntake}</div>
//           ) : null}
//         </div>

//         {/* Submit Button */}
//         <button type="submit">
//           {profileExists ? "Update Profile" : "Submit Profile"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;
