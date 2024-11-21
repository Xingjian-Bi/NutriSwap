import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import LoginPage from "./LoginPage";
import { ChakraProvider } from "@chakra-ui/react";

// mock useAuthStore and useNavigate
jest.mock("../store/auth", () => ({
  useAuthStore: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(() => mockNavigate),
}));

describe("LoginPage", () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    // set up the mocked store and reset mocks
    useAuthStore.mockReturnValue({
      login: mockLogin,
    });
    mockLogin.mockReset();
    mockNavigate.mockReset();
  });

  const renderComponent = () =>
    render(
      <ChakraProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </ChakraProvider>
    );

  it("renders the login page correctly", () => {
    renderComponent();

    // check for heading, input fields and login button
    expect(
      screen.getByRole("heading", { name: /log in/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("calls login and shows success toast on successful login", async () => {
    mockLogin.mockResolvedValueOnce({
      success: true,
      message: "Welcome back!",
    });
    renderComponent();

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /log in/i });

    // simulate user input and button click
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    // wait for state updates
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("calls login and shows error toast on failed login", async () => {
    mockLogin.mockResolvedValueOnce({
      success: false,
      message: "Invalid credentials.",
    });

    renderComponent();

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /log in/i });

    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        "wrong@example.com",
        "wrongpassword"
      );
      expect(mockLogin).toHaveBeenCalledTimes(1);

      // check navigation was not called
      expect(mockNavigate).not.toHaveBeenCalled();
      // check toast
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
