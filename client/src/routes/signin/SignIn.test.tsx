import { describe, test, expect } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignIn from "./signin.component";
import { server } from "../../mocks/server";
import { HttpResponse, http } from "msw";
import { GLOBAL } from "../../consts";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/auth.context";
import { AllTheProviders } from "../../test-utils/all-providers.utils";

describe("SignIn", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render the sign in form", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /Welcome/i })).toBeDefined();
    expect(screen.getByPlaceholderText("Username")).toBeDefined();
    expect(screen.getByPlaceholderText("Password")).toBeDefined();
    expect(screen.getByRole("button", { name: /Sign In/i })).toBeDefined();
  });

  test("should sign in", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<SignIn />, { wrapper: AllTheProviders });
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const signInButton = screen.getByRole("button", { name: /Sign In/i });

    await user.type(usernameInput, "luiscarlos");
    await user.type(passwordInput, "12345");
    await user.click(signInButton);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Logout/i })).toBeDefined();
      expect(
        screen.getByRole("heading", { name: /@luiscarlos/i })
      ).toBeDefined();
    });

    unmount();
  });

  test("should display error messages", async () => {
    server.resetHandlers(
      http.post(`${GLOBAL.API_URL}/auth/signin`, () => {
        return HttpResponse.json({
          statusCode: 422,
          error: "Unprocessable Entity",
          message:
            '{"formErrors":[],"fieldErrors":{"username":["Username must be longer than or equal to 3 characters","Username not exists"],"password":["Password must be longer than or equal to 5 characters"]}}',
        });
      })
    );

    render(
      <BrowserRouter>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const signInButton = screen.getByRole("button", { name: /Sign In/i });

    await user.click(signInButton);

    expect(
      await screen.findByText(
        "Username must be longer than or equal to 3 characters"
      )
    ).toBeDefined();
    expect(await screen.findByText("Username not exists")).toBeDefined();
    expect(
      await screen.findByText(
        "Password must be longer than or equal to 5 characters"
      )
    ).toBeDefined();
  });
});
