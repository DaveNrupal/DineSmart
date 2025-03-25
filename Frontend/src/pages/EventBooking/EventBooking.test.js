import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EventBooking from "./EventBooking";
import { StoreContext } from "../../context/StoreContext";

// Mock axios and react-router-dom's useNavigate
jest.mock("axios", () => ({
    post: jest.fn(),
    get: jest.fn()
  }));

describe("EventBooking Component", () => {
    const mockBookEventForUser = jest.fn();

    const renderComponent = () => {
        return render(
            <StoreContext.Provider value={{ bookEventForUser: mockBookEventForUser }}>
                <EventBooking />
            </StoreContext.Provider>
        );
    };

    test("renders EventBooking form", () => {
        renderComponent();
        expect(screen.getByText("Book an Event")).toBeTruthy();
        expect(screen.getByPlaceholderText("Your Name")).toBeTruthy();
        expect(screen.getByPlaceholderText("Registered Email Address")).toBeTruthy();
        expect(screen.getByPlaceholderText("Phone Number")).toBeTruthy();
        expect(screen.getByPlaceholderText("Number of People")).toBeTruthy();
        expect(screen.getByText("Select Event Type")).toBeTruthy();
        expect(screen.getByText("Book Now")).toBeTruthy();
    });

    // test("submits form with valid inputs", () => {
    //     renderComponent();
    
    //     fireEvent.change(screen.getByPlaceholderText("Your Name"), { target: { value: "John Doe" } });
    //     fireEvent.change(screen.getByPlaceholderText("Registered Email Address"), { target: { value: "john@example.com" } });
    //     fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "1234567890" } });
    //     fireEvent.change(screen.getByPlaceholderText("Number of People"), { target: { value: "5" } });
    //     fireEvent.change(screen.getByText("Select Event Type"), { target: { value: "Birthday" } });
    
    //     fireEvent.click(screen.getByText("Book Now"));
    
    //     expect(mockBookEventForUser).toHaveBeenCalledWith({
    //         name: "John Doe",
    //         email: "john@example.com",
    //         phone: "1234567890",
    //         numberOfPeople: "5",
    //         eventType: "Birthday",
    //         date: "2025-03-10",
    //         fromTime: "18:00",
    //         Totime: "22:00",
    //         specialRequests: "",
    //     });
    // });
    
    test("shows alert when required fields are empty", () => {
        jest.spyOn(window, "alert").mockImplementation(() => {});

        renderComponent();

        fireEvent.click(screen.getByText("Book Now"));

        expect(window.alert).toHaveBeenCalledWith("Please fill in all required fields.");
    });
});
