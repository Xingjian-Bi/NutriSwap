import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  List,
  ListItem,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// import "./FoodRecommendationForm.css";

const FoodRecommendation = () => {
  const [formData, setFormData] = useState({
    userId: "123",
    goal: "",
    mealType: "",
    foodChoice: "",
    preferences: "",
  });
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState("");
  const bg = useColorModeValue("gray.50", "gray.800");
  const toast = useToast();

  // convert empty strong preference into null object, avoid backend error
  const dataToSend = {
    ...formData,
    preferences: formData.preferences === "" ? {} : formData.preferences,
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Probobality not nessary but just for another safety
    if (
      !formData.goal ||
      !formData.mealType ||
      !formData.foodChoice ||
      !formData.preferences
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    toast({
      title: "AI Analysis in Progress",
      description:
        "Analyzing your preferences and generating recommendations...",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });

    try {
      const response = await fetch("api/foodrecommend/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      const data = await response.json();

      if (data.success) {
        setRecommendation(data.data.recommendations); 
        setError(""); 
      } else {
        setError(data.message || "An error occurred while fetching recommendations.");
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setError("An error occurred while fetching recommendations.");
    }
  };

  return (
    <Box
      p={8}
      maxWidth="600px"
      mx="auto"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg={bg}
    >
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        Food Recommendation
      </Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="goal" isRequired>
            <FormLabel>Goal</FormLabel>
            <Select
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              placeholder="--Select Goal--"
            >
              <option value="lose_weight">Lose Weight</option>
              <option value="maintain_weight">Maintain Weight</option>
              <option value="gain_weight">Gain Weight</option>
            </Select>
          </FormControl>

          <FormControl id="mealType" isRequired>
            <FormLabel>Meal Type</FormLabel>
            <Select
              name="mealType"
              value={formData.mealType}
              onChange={handleInputChange}
              placeholder="--Select Meal Type--"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </Select>
          </FormControl>

          <FormControl id="foodChoice" isRequired>
            <FormLabel>Food Choice</FormLabel>
            <Input
              type="text"
              name="foodChoice"
              value={formData.foodChoice}
              onChange={handleInputChange}
              placeholder="Enter your preferred food"
            />
          </FormControl>

          <FormControl id="preferences" isRequired>
            <FormLabel>Preferences</FormLabel>
            <Textarea
              name="preferences"
              value={formData.preferences}
              onChange={handleInputChange}
              placeholder="Enter your preferences (e.g., low salt, gluten-free)"
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Get Recommendation
          </Button>
        </VStack>
      </form>

      {recommendation && (
        <Box mt={8} p={4} borderWidth={1} borderRadius="lg" boxShadow="sm">
          <Heading as="h2" size="md" mb={2} color="blue.500">
            Recommended Food: {recommendation.recommendedFood}
          </Heading>
          <Box mb={4}>
            <p>{recommendation.message}</p>
          </Box>
          <Heading as="h3" size="sm" mt={4} mb={2}>
            Alternative Choices:
          </Heading>
          {Array.isArray(recommendation.alternativeChoices) &&
          recommendation.alternativeChoices.length > 0 ? (
            <List spacing={2} styleType="disc" pl={6}>
              {recommendation.alternativeChoices.map((choice, index) => (
                <ListItem key={index}>{choice}</ListItem>
              ))}
            </List>
          ) : (
            <Box as="p" fontStyle="italic" color="gray.500">
              No alternative choices available.
            </Box>
          )}
          <Box mt={4}>
            <p>{recommendation.reasoning}</p>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FoodRecommendation;
