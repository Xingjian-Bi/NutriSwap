/* eslint-disable no-unused-vars */
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useToast,
  Box,
  Image,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthStore } from "../store/auth";
import { Link, useNavigate } from "react-router-dom";
import { PlusSquareIcon, SearchIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isAuthenticated, checkAuth, logout } = useAuthStore();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };
    verifyAuth();
  }, [checkAuth, isAuthenticated]);

  const handleLogout = async () => {
    const { success, message } = await logout();
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
      window.location.reload();
    }
  };

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>NutriSwap</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          {isAuthenticated && (
            <>
              <Link to={"/create"}>
                <Button>
                  <PlusSquareIcon fontSize={20} />
                </Button>
              </Link>

              <Link to={"/recommend"}>
                <Button>
                  <SearchIcon fontSize={20} />
                </Button>
              </Link>

              <Link to={"/favorites"}>
                <Button colorScheme="yellow">Favorites</Button>
              </Link>
            </>
          )}
          <HStack spacing={2} alignItems={"center"}>
            {isAuthenticated ? (
              <>
                <Link to={"/profile"}>
                  <Image
                    src={user?.profilePicture || "/default-profile.png"}
                    alt="Profile"
                    boxSize="50px"
                    borderRadius="full"
                    // objectFit="cover"
                  />
                </Link>
                <Button
                  colorScheme="cyan"
                  variant="outline"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button colorScheme="cyan" variant="outline">
                  Sign In
                </Button>
                {/* colorScheme="teal" variant="solid" */}
              </Link>
            )}
          </HStack>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};
export default Navbar;
