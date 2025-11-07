import { render, screen } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/supabase/auth";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock signOut
jest.mock("@/lib/supabase/auth", () => ({
  signOut: jest.fn(),
}));

describe("Header", () => {
  it("renders the header with the correct title", () => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() }); // Mock the router's push method
    render(<Header />);
    expect(screen.getByText("Journal")).toBeInTheDocument(); // Check for the text "Journal"
  });
});
