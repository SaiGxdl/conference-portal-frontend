// src/components/EventCard/EventCard.test.jsx
import { render, screen } from "@testing-library/react";
import EventCard from "./EventCard";

const mockEvent = {
  id: "evt_test",
  title: "Test Event",
  startDate: "2025-12-01T10:00:00.000Z",
  seatsTotal: 10,
  seatsBooked: 2,
  location: "Online",
  imageUrl: "/assets/event_placeholder.jpg",
  type: "Workshop"
};

test("renders event card with title and seats left", () => {
  render(<EventCard event={mockEvent} onOpen={() => {}} />);
  expect(screen.getByText(/Test Event/)).toBeInTheDocument();
  expect(screen.getByText(/8 seats left/)).toBeInTheDocument();
});
