import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfile from "./UserProfile";

global.fetch = jest.fn();

describe("UserProfile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("case loading", () => {
    render(<UserProfile userId={123} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("case fetch success", async () => {
    const mockUserData = { name: "test name", email: "test email" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUserData,
    });

    render(<UserProfile userId={123} />);

    expect(await screen.findByText("test name")).toBeInTheDocument();
    expect(await screen.findByText("Email: test email")).toBeInTheDocument();
  });

  test("case error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<UserProfile userId={123} />);

    expect(
      await screen.findByText("Error: Failed to fetch user data")
    ).toBeInTheDocument();
  });
});
