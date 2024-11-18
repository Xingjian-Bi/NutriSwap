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

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const toast = useToast();
  const navigate = useNavigate();

  const { signup } = useAuthStore();
  const handleAddUser = async () => {
    const { success, message } = await signup(email, password, name);
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
    setName("");
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
          Create Account
        </Heading>
        <Stack spacing={4}>
          <FormControl id="full-name" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
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
          <Button colorScheme="teal" onClick={handleAddUser} size="lg" w="full">
            Sign Up
          </Button>
          <Text textAlign="center">
            Already have an account?{" "}
            <Link color="teal.500" href="/login">
              Log in
            </Link>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignupPage;
