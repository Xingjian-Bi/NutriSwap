import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
  HStack,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useAuthStore } from "../store/auth";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    image: "",
    isPrivate: true,
  });
  const toast = useToast();
  const { createProduct } = useProductStore();
  const { checkAuth, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const authResult = await checkAuth();
      if (!authResult?.success) {
        navigate("/");
      }
    })();
  }, [checkAuth]);

  const handleAddProduct = async () => {
    const productWithCreator = {
      ...newProduct,
      createdBy: user?._id,
    };

    const { success, message } = await createProduct(productWithCreator);
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
    }
    setNewProduct({
      name: "",
      price: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      image: "",
      isPrivate: true,
    });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Food
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4} align="stretch">
            <HStack>
              <Text w="150px">Product Name</Text>
              <Input
                placeholder="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text w="150px">Price</Text>
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text w="150px">Calories</Text>
              <Input
                placeholder="Calories"
                name="calories"
                type="number"
                value={newProduct.calories}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, calories: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text w="150px">Protein</Text>
              <Input
                placeholder="Protein"
                name="protein"
                type="number"
                value={newProduct.protein}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, protein: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text w="150px">Carbs</Text>
              <Input
                placeholder="Carbs"
                name="carbs"
                type="number"
                value={newProduct.carbs}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, carbs: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text w="150px">Fat</Text>
              <Input
                placeholder="Fat"
                name="fat"
                type="number"
                value={newProduct.fat}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, fat: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text w="150px">Image URL</Text>
              <Input
                placeholder="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </HStack>
            <HStack>
              <Text w="95px">Private</Text>
              <Checkbox
                isChecked={newProduct.isPrivate}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, isPrivate: e.target.checked })
                }
                pl="22px"
              />
            </HStack>

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
