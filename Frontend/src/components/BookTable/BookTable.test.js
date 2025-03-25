import { render, screen, fireEvent } from "@testing-library/react";
import BookTable from "./BookTable";
import { StoreContext } from "../../context/StoreContext";

jest.mock("axios", () => ({
    post: jest.fn(),
    get: jest.fn()
  }));
// Mock function to simulate `bookTableForUser`
const mockBookTableForUser = jest.fn();

const renderComponent = () => {
  render(
    <StoreContext.Provider value={{ bookTableForUser: mockBookTableForUser }}>
      <BookTable />
    </StoreContext.Provider>
  );
};

test("renders the BookTable component", () => {
  renderComponent();
  expect(screen.getByText("Reserve Your Table")).toBeTruthy();
});

test("updates input fields on change", () => {
  renderComponent();

  const emailInput = screen.getByPlaceholderText("Registered email address");
  const numberInput = screen.getByPlaceholderText("Number of people");
  const dateInput = screen.getByPlaceholderText("Enter Date");
  const timeInput = screen.getByPlaceholderText("Enter Time");

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(numberInput, { target: { value: "4" } });
  fireEvent.change(dateInput, { target: { value: "2025-03-10" } });
  fireEvent.change(timeInput, { target: { value: "18:30" } });

  expect(emailInput.value).toBe("test@example.com");
  expect(numberInput.value).toBe("4");
  expect(dateInput.value).toBe("2025-03-10");
  expect(timeInput.value).toBe("18:30");
});

test("calls bookTableForUser on form submission", () => {
  renderComponent();

  const button = screen.getByText("Book Now");
  fireEvent.click(button);

  expect(mockBookTableForUser).toHaveBeenCalled();
});
