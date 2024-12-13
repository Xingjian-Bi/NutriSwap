import { useState } from "react";
import { useAuthStore } from "../store/auth";
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
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { success, message } = await login(email, password);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
      navigate("/");
    }
    setEmail("");
    setPassword("");
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
          Log In
        </Heading>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Text textAlign="left">
            <Link color="teal.500" href="/forgot-password">
              Forgot password?
            </Link>
          </Text>
          <Button colorScheme="teal" onClick={handleLogin} size="lg" w="full">
            Log In
          </Button>

          <Text textAlign="center">
            Don’t have an account?{" "}
            <Link color="teal.500" href="/signup">
              Sign up
            </Link>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
