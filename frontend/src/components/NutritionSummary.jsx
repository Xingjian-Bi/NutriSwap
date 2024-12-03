import React from "react";
import {
  Box,
  HStack,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useAuthStore } from "../store/auth";

const NutritionSummary = ({ selectedItems, onReset }) => {
  const totals = selectedItems.reduce(
    (acc, item) => {
      acc.calories += item.calories || 0;
      acc.protein += item.protein || 0;
      acc.carbs += item.carbs || 0;
      acc.fat += item.fat || 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const { user } = useAuthStore();
  const goals = user?.profile || {};

  const getTextColor = (value, goal) =>
    value > goal ? "red.500" : useColorModeValue("gray.700", "gray.300");
  const formatNumber = (number) =>
    Number.isInteger(number) ? number : number.toFixed(2);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      w="full"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg={bgColor}
      borderColor={borderColor}
      shadow="md"
    >
      <HStack justifyContent="space-between" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Nutrition Summary
        </Text>
        <IconButton
          icon={<RepeatIcon />}
          colorScheme="red"
          size="sm"
          borderRadius="full"
          boxSize={8}
          onClick={onReset}
          aria-label="Reset Nutrition Summary"
        />
      </HStack>

      <HStack justify="space-between" align="center" w="full">
        <Box textAlign="center">
          <Text fontSize="md" fontWeight="bold">
            Calories
          </Text>
          <Text
            fontSize="lg"
            color={getTextColor(
              totals.calories,
              goals.caloriesIntake || Infinity
            )}
          >
            {formatNumber(totals.calories)} / {goals.caloriesIntake || "-"}
          </Text>
        </Box>

        <Box textAlign="center">
          <Text fontSize="md" fontWeight="bold">
            Protein
          </Text>
          <Text
            fontSize="lg"
            color={getTextColor(
              totals.protein,
              goals.proteinIntake || Infinity
            )}
          >
            {formatNumber(totals.protein)}g / {goals.proteinIntake || "-"}g
          </Text>
        </Box>

        <Box textAlign="center">
          <Text fontSize="md" fontWeight="bold">
            Carbs
          </Text>
          <Text
            fontSize="lg"
            color={getTextColor(totals.carbs, goals.carbIntake || Infinity)}
          >
            {formatNumber(totals.carbs)}g / {goals.carbIntake || "-"}g
          </Text>
        </Box>

        <Box textAlign="center">
          <Text fontSize="md" fontWeight="bold">
            Fat
          </Text>
          <Text
            fontSize="lg"
            color={getTextColor(totals.fat, goals.fatIntake || Infinity)}
          >
            {formatNumber(totals.fat)}g / {goals.fatIntake || "-"}g
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default NutritionSummary;
