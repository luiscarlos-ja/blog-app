import { describe, test, expect } from "vitest";

import { cleanup, render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import SignUp from "./signup.component";

import { server } from "../../mocks/server";
import { HttpResponse, http } from "msw";
import { GLOBAL } from "../../consts";
import { BrowserRouter } from "react-router-dom";

describe("SignUp", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render the sign up form", () => {
    render(<SignUp />);
    expect(screen.getByRole("heading", { name: /Sign Up/i })).toBeDefined();
    expect(screen.getByPlaceholderText("Username")).toBeDefined();
    expect(screen.getByPlaceholderText("Password")).toBeDefined();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeDefined();
  });

  test("should sign up", async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const passwordConfirmInput =
      screen.getByPlaceholderText("Password Confirm");
    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });

    await user.clear(usernameInput);
    await user.clear(passwordInput);
    await user.clear(passwordConfirmInput);
    await user.type(usernameInput, "lucapix");
    await user.type(passwordInput, "12345");
    await user.type(passwordConfirmInput, "12345");
    await user.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByText("Success! You are now signed up.")).toBeDefined();
      expect(
        screen.getByRole("link", { name: /Go to Sing In/i })
      ).toBeDefined();
    });

    unmount();
  });

  test("should display error messages", async () => {
    server.resetHandlers(
      http.post(`${GLOBAL.API_URL}/auth/signup`, () => {
        return HttpResponse.json({
          statusCode: 422,
          error: "Unprocessable Entity",
          message:
            '{"formErrors":[],"fieldErrors":{"username":["Username must be longer than or equal to 3 characters","Username must contain only letters and numbers"],"password":["Password must be longer than or equal to 5 characters"],"passwordConfirm":["Password Confirm must be longer than or equal to 5 characters"]}}',
        });
      })
    );

    const { unmount } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const passwordConfirmInput =
      screen.getByPlaceholderText("Password Confirm");
    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });

    await user.clear(usernameInput);
    await user.clear(passwordInput);
    await user.clear(passwordConfirmInput);
    await user.click(signUpButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Username must be longer than or equal to 3 characters"
        )
      ).toBeDefined();
      expect(
        screen.getByText("Username must contain only letters and numbers")
      ).toBeDefined();
      expect(
        screen.getByText(
          "Password must be longer than or equal to 5 characters"
        )
      ).toBeDefined();
      expect(
        screen.getByText(
          "Password Confirm must be longer than or equal to 5 characters"
        )
      ).toBeDefined();
    });

    unmount();
  });
});
