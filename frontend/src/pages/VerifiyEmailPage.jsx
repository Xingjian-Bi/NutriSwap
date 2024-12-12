import { useState } from "react";
import { useAuthStore } from "../store/auth";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const toast = useToast();
  const navigate = useNavigate();

  const { verifyEmail } = useAuthStore();

  const handleVerifyEmail = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Verification code must be 6 characters.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const { success, message } = await verifyEmail(verificationCode);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Verified",
        description: "Email verification successful!",
        status: "success",
        isClosable: true,
      });
      navigate("/");
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
          Verify Email
        </Heading>
        <Stack spacing={4}>
          <FormControl id="verification-code" isRequired>
            <FormLabel>Verification Code</FormLabel>
            <Input
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="teal"
            onClick={handleVerifyEmail}
            size="lg"
            w="full"
          >
            Verify
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default VerifyEmailPage;
