import { describe, test, expect } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Posts from "./posts.component";
import { AuthProvider } from "../../context/auth.context";
import { PostsProvider } from "../../context/posts.context";

describe("Comments", () => {
  afterAll(() => {
    cleanup();
  });

  beforeAll(() => {
    window.localStorage.setItem(
      "authUser",
      JSON.stringify({
        uuid: "59cbfb5a-9891-4e8f-8180-5c9ca54be101",
        username: "luiscarlos",
        createdAt: "2024-06-18T02:12:55.229Z",
        updatedAt: "2024-06-18T02:12:55.229Z",
      })
    );
  });

  test("should render the comments", async () => {
    render(
      <AuthProvider>
        <PostsProvider>
          <Posts />
        </PostsProvider>
      </AuthProvider>
    );
    expect(screen.getByRole("heading", { name: /Posts/i })).toBeDefined();
    const commentsButton = await screen.findAllByRole("button", {
      name: /Comments/i,
    });
    userEvent.click(commentsButton[1]);
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Add Comment/i })
      ).toBeDefined();
      expect(screen.getByText("Comment by luis carlos")).toBeDefined();
      expect(screen.getByText("Third comment")).toBeDefined();
      expect(screen.getByText("Second comment")).toBeDefined();
      expect(screen.getByText("First comment")).toBeDefined();
    });
  });

  test("should add a comment", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <PostsProvider>
          <Posts />
        </PostsProvider>
      </AuthProvider>
    );

    const commentsButton = await screen.findAllByRole("button", {
      name: /Comments/i,
    });
    await userEvent.click(commentsButton[1]);

    const addCommentButton = await screen.findByRole("button", {
      name: /Add Comment/i,
    });
    await user.click(addCommentButton);

    await user.type(
      screen.getByPlaceholderText("New Comment"),
      "Comment by luis carlos two"
    );

    const submitButton = await screen.findByRole("button", {
      name: /Save/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Comment by luis carlos two")).toBeDefined();
    });
  });

  test("should edit a comment", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <PostsProvider>
          <Posts />
        </PostsProvider>
      </AuthProvider>
    );

    const commentsButton = await screen.findAllByRole("button", {
      name: /Comments/i,
    });
    await userEvent.click(commentsButton[1]);

    const editCommentButton = await screen.findAllByRole("button", {
      name: /Edit/i,
    });
    await user.click(editCommentButton[1]);

    await user.type(
      await screen.findByRole("textbox"),
      "Comment by luis carlos edited"
    );

    const submitButton = await screen.findByRole("button", {
      name: /Save/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Comment by luis carlos edited")).toBeDefined();
    });
  });

  test("should delete a comment", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <PostsProvider>
          <Posts />
        </PostsProvider>
      </AuthProvider>
    );

    const commentsButton = await screen.findAllByRole("button", {
      name: /Comments/i,
    });
    await userEvent.click(commentsButton[1]);

    const deleteCommentButton = await screen.findAllByRole("button", {
      name: /Delete/i,
    });
    await user.click(deleteCommentButton[1]);

    await waitFor(() => {
      expect(screen.queryByText("Comment by luis carlos")).toBeNull();
    });
  });
});
