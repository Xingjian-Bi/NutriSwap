import { DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";
import { useAuthStore } from "../store/auth";
import axios from "axios";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user } = useAuthStore();

  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.includes(product._id) || false
  );

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleToggleFavorite = async (pid) => {
    try {
      if (!user || !user._id) {
        throw new Error("User is not logged in.");
      }
      const endpoint = isFavorite
        ? "api/products/favorites/remove" // Call remove endpoint if already a favorite
        : "api/products/favorites/add"; // Call add endpoint otherwise

      const response = await axios.post(endpoint, {
        userId: user._id,
        productId: pid,
      });

      if (response.data.success) {
        setIsFavorite(!isFavorite); // Toggle favorite state
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Heading as="h3" size="md">
            {product.name}
          </Heading>
          <Text fontSize="xl" fontWeight="bold">
            ${product.price}
            {isFavorite && <StarIcon color="yellow.400" />}
          </Text>
        </Box>

        <Box mb={4}>
          <Text fontSize="xl" color={textColor} mb={1}>
            {product.calories} calories
          </Text>
          <Text fontSize="xl" color={textColor}>
            {product.protein}g protein
          </Text>
        </Box>

        {isAuthenticated && (
          <HStack spacing={2}>
            <IconButton
              icon={<StarIcon />}
              onClick={() => handleToggleFavorite(product._id)}
              colorScheme="yellow"
            />
            <IconButton
              icon={<EditIcon />}
              onClick={onOpen}
              colorScheme="blue"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDeleteProduct(product._id)}
              colorScheme="red"
            />
          </HStack>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Price"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Calories</FormLabel>
                <Input
                  placeholder="Calories"
                  name="calories"
                  type="number"
                  value={updatedProduct.calories}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      calories: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Protein</FormLabel>
                <Input
                  placeholder="Protein"
                  name="protein"
                  type="number"
                  value={updatedProduct.protein}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      protein: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default ProductCard;
