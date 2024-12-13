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
  const { checkAuth, isAuthenticated, user } = useAuthStore();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    (async () => {
      await checkAuth();
      fetchProducts();
    })();
  }, [checkAuth, fetchProducts]);

  const handleAddToSummary = (product) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  const handleResetSummary = () => {
    setSelectedProducts([]);
  };

  console.log("Products", products);
  // Treat null/undefined as public; Include products with no creator; Check if created by the current user; Include private products created by the user
  const filteredProducts = products.filter((product) => {
    const isPublic = product.isPrivate === false || product.isPrivate == null;
    const noCreator = product.createdBy == null;
    const isCreatedByUser = user && product.createdBy === user._id;
    const isPrivateAndCreatedByUser =
      product.isPrivate === true && isCreatedByUser;

    return isPublic || noCreator || isPrivateAndCreatedByUser;
  });
  console.log("filteredProducts", filteredProducts);

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
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToSummary={handleAddToSummary}
            />
          ))}
        </SimpleGrid>

        {filteredProducts.length === 0 && (
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
