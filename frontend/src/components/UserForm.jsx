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
  const { user, checkAuth } = useAuthStore();
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
