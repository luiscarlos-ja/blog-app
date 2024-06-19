import { describe, test } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Posts from "./posts.component";
import { AuthProvider } from "../../context/auth.context";
import { PostsProvider } from "../../context/posts.context";

describe("Posts", () => {
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

  test("should render the post", async () => {
    render(
      <AuthProvider>
        <PostsProvider>
          <Posts />
        </PostsProvider>
      </AuthProvider>
    );
    expect(screen.getByRole("heading", { name: /Posts/i })).toBeDefined();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Add Post/i })).toBeDefined();

      expect(
        screen.getByRole("heading", { name: /Post by luis carlos/i })
      ).toBeDefined();
      expect(screen.getAllByText("Content of the post")).toBeDefined();
      expect(screen.getByRole("button", { name: /Edit/i })).toBeDefined();
      expect(screen.getByRole("button", { name: /Delete/i })).toBeDefined();
      expect(screen.getAllByText("Comments")).toBeDefined();
    });
  });

  test("should add a post", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <PostsProvider>
          <Posts />
        </PostsProvider>
      </AuthProvider>
    );

    const addPostButton = await screen.findByRole("button", {
      name: /Add Post/i,
    });
    await user.click(addPostButton);

    const nameInput = await screen.findByPlaceholderText("Name");
    const contentInput = await screen.findByPlaceholderText("Content");
    const submitButton = await screen.findByRole("button", {
      name: /Create Post/i,
    });

    await user.clear(nameInput);
    await user.clear(contentInput);
    await user.type(nameInput, "New post in the test");
    await user.type(contentInput, "Content of the post in the test");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /New post in the test/i })
      ).toBeDefined();
      expect(screen.getByText("Content of the post in the test")).toBeDefined();
    });
  });

  test("should edit a post", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <PostsProvider>
          <Posts />
        </PostsProvider>
      </AuthProvider>
    );

    const editButton = await screen.findByRole("button", { name: /Edit/i });
    await user.click(editButton);

    const nameInput = await screen.findByPlaceholderText("Name");
    const contentInput = await screen.findByPlaceholderText("Content");
    const submitButton = await screen.findByRole("button", { name: /Save/i });

    await user.clear(nameInput);
    await user.clear(contentInput);
    await user.type(nameInput, "Post edited in the test");
    await user.type(contentInput, "Post content edited in the test");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Post edited in the test/i })
      ).toBeDefined();
      expect(screen.getByText("Post edited in the test")).toBeDefined();
    });
  });

  test("should delete a post", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <PostsProvider>
          <Posts />
        </PostsProvider>
      </AuthProvider>
    );

    const deleteButton = await screen.findByRole("button", { name: /Delete/i });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: /Post de luis carlos/i })
      ).toBeNull();
      expect(
        screen.queryByText("Content of the post by luis carlos")
      ).toBeNull();
    });
  });
});
