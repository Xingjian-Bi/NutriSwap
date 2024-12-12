import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import FoodRecommendation from "./components/FoodRecommendationForm";
import UserForm from "./components/UserForm";
import FavoritesPage from "./pages/FavoritesPage";
import VerifiyEmailPage from "./pages/VerifiyEmailPage";
import ForgotPWPage from "./pages/ForgotPWPage";
import ResetPWPage from "./pages/ResetPWPage";
function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifiyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPWPage />} />
        <Route path="/reset-password/:token" element={<ResetPWPage />} />
        <Route path="/recommend" element={<FoodRecommendation />} />
        <Route path="/profile" element={<UserForm />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Box>
  );
}

export default App;
