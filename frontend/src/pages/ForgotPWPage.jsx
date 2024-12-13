import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const ForgotPWPage = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const { forgotPassword } = useAuthStore();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    const { success, message } = await forgotPassword(email);
    if (success) {
      toast({
        title: "Reset link sent!",
        description: "Check your email for the password reset link.",
        status: "success",
        isClosable: true,
      });
      setEmail("");
      //   navigate("/");
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
          Forgot Password
        </Heading>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="teal"
            onClick={handleResetPassword}
            size="lg"
            w="full"
          >
            Send Reset Link
          </Button>
          <Text textAlign="center">
            Remember your password?{" "}
            <Link color="teal.500" href="/login">
              Log in
            </Link>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default ForgotPWPage;
