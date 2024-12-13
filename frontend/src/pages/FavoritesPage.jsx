import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import {useProductStore} from "../store/product.js";

const FavoritesPage = () => {
  const { user, checkAuth } = useAuthStore();
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const authResult = await checkAuth();
        if (!authResult?.success) {
          navigate("/");
        }

        if (!user || !user._id) {
          throw new Error("User not logged in");
        }

        const response = await axios.get(`api/products/${user._id}/favorites`);
        setFavorites(response.data.favorites || []);
      } catch (error) {
        console.error("Error fetching favorites:", error.message);
      }
    };

    fetchFavorites();
  }, [user, checkAuth]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, yellow.400, orange.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Your Favorite Foods ⭐
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.filter(
              (product) =>
                  product.isPublished || product.creator === (checkAuth() && user?._id)
          )
              .map((product) => (
                  <ProductCard
                      key={product._id}
                      product={product}
                  />
              ))}
        </SimpleGrid>

        {favorites.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            You have no favorite foods 😢{" "}
            <Link to={"/"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Go back to the home page
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default FavoritesPage;
