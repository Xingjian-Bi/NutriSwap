import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const { resetPassword } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const { success, message } = await resetPassword(token, password);
    if (success) {
      toast({
        title: "Password Reset Successful",
        description: "You can now log in with your new password.",
        status: "success",
        isClosable: true,
      });
      navigate("/login");
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        maxW="md"
        w="full"
        p={6}
        bg={bg}
        color={textColor}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Reset Password
        </Heading>
        <Stack spacing={4}>
          <FormControl id="password" isRequired>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              type="password"
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="teal"
            onClick={handleResetPassword}
            size="lg"
            w="full"
          >
            Reset Password
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
