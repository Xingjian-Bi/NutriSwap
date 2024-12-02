import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useAuthStore } from "../store/auth";
import ProductCard from "../components/ProductCard";
import NutritionSummary from "../components/NutritionSummary";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const { checkAuth, isAuthenticated } = useAuthStore();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    (async () => {
      await checkAuth();
      fetchProducts();
    })();
  }, [checkAuth, fetchProducts]);
  console.log("products", products);

  const handleAddToSummary = (product) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  const handleResetSummary = () => {
    setSelectedProducts([]);
  };

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        {isAuthenticated && (
          <NutritionSummary
            selectedItems={selectedProducts}
            onReset={handleResetSummary}
          />
        )}

        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Meal Selection 🍗
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
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToSummary={handleAddToSummary}
            />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No food found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Add a food choice
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};
export default HomePage;
