import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { NewCashKick } from ".";
import { BrowserRouter as Router } from "react-router-dom";
import * as services from "../../services";

const mockCashkickData = {
  data: [
    {
      name: "second",
      status: "Pending",
      maturity: "2023-11-13T06:19:34.383Z",
      totalFinanced: 449436.5568,
      totalReceived: 401282.64,
      id: 7728,
      userId: 1,
    },
  ],
};
const mockUserData = {
  data: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "Password@123",
      availableCredit: 430563.4432,
    },
  ],
};
const mockPaymentData = {
  data: [
    {
      userId: 1,
      dueDate: "2023-12-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 411983.5104,
      expectedAmount: 37453.0464,
      id: 1,
    },
    {
      userId: 1,
      dueDate: "2024-01-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 374530.46400000004,
      expectedAmount: 37453.0464,
      id: 2,
    },
    {
      userId: 1,
      dueDate: "2024-02-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 337077.41760000004,
      expectedAmount: 37453.0464,
      id: 3,
    },
    {
      userId: 1,
      dueDate: "2024-03-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 299624.37120000005,
      expectedAmount: 37453.0464,
      id: 4,
    },
    {
      userId: 1,
      dueDate: "2024-04-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 262171.32480000006,
      expectedAmount: 37453.0464,
      id: 5,
    },
    {
      userId: 1,
      dueDate: "2024-05-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 224718.27840000007,
      expectedAmount: 37453.0464,
      id: 6,
    },
    {
      userId: 1,
      dueDate: "2024-06-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 187265.23200000008,
      expectedAmount: 37453.0464,
      id: 7,
    },
    {
      userId: 1,
      dueDate: "2024-07-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 149812.18560000008,
      expectedAmount: 37453.0464,
      id: 8,
    },
    {
      userId: 1,
      dueDate: "2024-08-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 112359.13920000009,
      expectedAmount: 37453.0464,
      id: 9,
    },
    {
      userId: 1,
      dueDate: "2024-09-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 74906.0928000001,
      expectedAmount: 37453.0464,
      id: 10,
    },
    {
      userId: 1,
      dueDate: "2024-10-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 37453.0464000001,
      expectedAmount: 37453.0464,
      id: 11,
    },
    {
      userId: 1,
      dueDate: "2024-11-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 1.0186340659856796e-10,
      expectedAmount: 37453.0464,
      id: 12,
    },
  ],
};
const mockCashkickContract = {
  data: [
    {
      id: 257,
      cashkickId: 8012,
      contractId: 1,
    },
  ],
};
describe("NewCashKick page component testcases", () => {
  jest
      .spyOn(services, "createNewCashkick")
      .mockResolvedValue(mockCashkickData as any);
    jest
      .spyOn(services, "updateAvailableCreditOfUser")
      .mockResolvedValue(mockUserData as any);
    jest
      .spyOn(services, "getAllPaymentsOfUser")
      .mockResolvedValue(mockPaymentData as any);
    jest
      .spyOn(services, "updatePaymentsOfUser")
      .mockResolvedValue(mockPaymentData as any);
    jest
      .spyOn(services, "createCashkickContract")
      .mockResolvedValue(mockCashkickContract as any);
  it("should render navbar and content as expected", () => {
    render(
      <Router>
        <NewCashKick />
      </Router>
    );
    const appName = screen.getByText("Seeder");
    expect(appName).toBeInTheDocument();
  });
  it("should render balance datacard of user", () => {
    jest
      .spyOn(services, "createNewCashkick")
      .mockResolvedValue(mockCashkickData as any);
    jest
      .spyOn(services, "updateAvailableCreditOfUser")
      .mockResolvedValue(mockUserData as any);
    jest
      .spyOn(services, "getAllPaymentsOfUser")
      .mockResolvedValue(mockPaymentData as any);
    jest
      .spyOn(services, "updatePaymentsOfUser")
      .mockResolvedValue(mockPaymentData as any);
    jest
      .spyOn(services, "createCashkickContract")
      .mockResolvedValue(mockCashkickContract as any);
    render(
      <Router>
        <NewCashKick />
      </Router>
    );
    const balance = screen.getByText(
      "Let’s setup a new cash kick to power your Saas"
    );
    expect(balance).toBeInTheDocument();
  });
  test("renders the NewCashKick component", async () => {
    jest
      .spyOn(services, "createNewCashkick")
      .mockResolvedValue(mockCashkickData as any);
    jest
      .spyOn(services, "updateAvailableCreditOfUser")
      .mockResolvedValue(mockUserData as any);
    jest
      .spyOn(services, "getAllPaymentsOfUser")
      .mockResolvedValue(mockPaymentData as any);
    jest
      .spyOn(services, "updatePaymentsOfUser")
      .mockResolvedValue(mockPaymentData as any);
    jest
      .spyOn(services, "createCashkickContract")
      .mockResolvedValue(mockCashkickContract as any);
    render(
      <Router>
        <NewCashKick />
      </Router>
    );
    const gridItems = screen.getAllByRole("row");
    fireEvent.click(gridItems[1]);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "146842" } });

    const resetButton = screen.getByTestId("reset");
    fireEvent.click(resetButton);
    expect(resetButton).toBeInTheDocument();

    fireEvent.change(slider, { target: { value: "14567" } });

    const backBtn = screen.getByText("Back");
    fireEvent.click(backBtn);
  });
  it("should open cashkick name modal", () => {
    jest
      .spyOn(services, "createNewCashkick")
      .mockResolvedValue(mockCashkickData as any);
    jest
      .spyOn(services, "updateAvailableCreditOfUser")
      .mockResolvedValue(mockUserData as any);
    jest
      .spyOn(services, "getAllPaymentsOfUser")
      .mockResolvedValue(mockPaymentData as any);
    jest
      .spyOn(services, "updatePaymentsOfUser")
      .mockResolvedValue(mockPaymentData as any);
    jest
      .spyOn(services, "createCashkickContract")
      .mockResolvedValue(mockCashkickContract as any);
    render(
      <Router>
        <NewCashKick />
      </Router>
    );
    const gridItems = screen.getAllByRole("row");
    fireEvent.click(gridItems[1]);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "84480" } });
    const resetButton = screen.getByTestId("reset");
    fireEvent.click(resetButton);
    fireEvent.change(slider, { target: { value: "84480" } });
    const reviewBtn = screen.getByTestId("submitButton1");
    expect(reviewBtn).toBeEnabled();
    fireEvent.click(reviewBtn);
    const submitBtn = screen.getByTestId("submitButton2");
    fireEvent.click(submitBtn);
    const inputElement = screen.getByPlaceholderText("Ex: marketing expenses");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "Test Cashkick" } });
    const closeButton = screen.getByText("Cancel");
    fireEvent.click(closeButton);
    fireEvent.click(submitBtn);
    fireEvent.change(inputElement, { target: { value: "Test Cashkick" } });
    const submitButton = screen.getByText("Create Cash Kick");
    fireEvent.click(submitButton);
    const successModalCloseButton = screen.getByText("Close");
    fireEvent.click(successModalCloseButton);
  });
  it("should create cashkick", () => {
    jest
      .spyOn(services, "createNewCashkick")
      .mockResolvedValue(mockCashkickData as any);
    jest
      .spyOn(services, "updateAvailableCreditOfUser")
      .mockResolvedValue(mockUserData as any);
    jest
      .spyOn(services, "getAllPaymentsOfUser")
      .mockResolvedValue(mockPaymentData as any);
    jest
      .spyOn(services, "updatePaymentsOfUser")
      .mockResolvedValue(mockPaymentData as any);
    jest
      .spyOn(services, "createCashkickContract")
      .mockResolvedValue(mockCashkickContract as any);

    render(
      <Router>
        <NewCashKick />
      </Router>
    );
    const gridItems = screen.getAllByRole("row");
    fireEvent.click(gridItems[1]);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "84480" } });
    const resetButton = screen.getByTestId("reset");
    fireEvent.click(resetButton);
    fireEvent.change(slider, { target: { value: "84480" } });
    const reviewBtn = screen.getByTestId("submitButton1");
    expect(reviewBtn).toBeEnabled();
    fireEvent.click(reviewBtn);
    const submitBtn = screen.getByTestId("submitButton2");
    fireEvent.click(submitBtn);
    const inputElement = screen.getByPlaceholderText("Ex: marketing expenses");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "Test Cashkick" } });
    const closeButton = screen.getByText("Cancel");
    fireEvent.click(closeButton);
    fireEvent.click(submitBtn);
    fireEvent.change(inputElement, { target: { value: "Test Cashkick" } });
    const submitButton = screen.getByText("Create Cash Kick");
    fireEvent.click(submitButton);
    const viewCashkicksButton = screen.getByText("View Cash Kicks");
    fireEvent.click(viewCashkicksButton);
  });
  it("should render error while creating cashkick", () => {
    jest
      .spyOn(services, "createNewCashkick")
      .mockResolvedValue(mockCashkickData as any);
    jest
      .spyOn(services, "updateAvailableCreditOfUser")
      .mockResolvedValue(mockUserData as any);
    jest
      .spyOn(services, "getAllPaymentsOfUser")
      .mockResolvedValue(mockPaymentData as any);
    jest
      .spyOn(services, "updatePaymentsOfUser")
      .mockResolvedValue(mockPaymentData as any);
    jest
      .spyOn(services, "createCashkickContract")
      .mockRejectedValue(mockCashkickContract as any);

    render(
      <Router>
        <NewCashKick />
      </Router>
    );
    const gridItems = screen.getAllByRole("row");
    fireEvent.click(gridItems[1]);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "84480" } });
    const resetButton = screen.getByTestId("reset");
    fireEvent.click(resetButton);
    fireEvent.change(slider, { target: { value: "84480" } });
    const reviewBtn = screen.getByTestId("submitButton1");
    expect(reviewBtn).toBeEnabled();
    fireEvent.click(reviewBtn);
    const submitBtn = screen.getByTestId("submitButton2");
    fireEvent.click(submitBtn);
    const inputElement = screen.getByPlaceholderText("Ex: marketing expenses");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "Test Cashkick" } });
    const closeButton = screen.getByText("Cancel");
    fireEvent.click(closeButton);
    fireEvent.click(submitBtn);
    fireEvent.change(inputElement, { target: { value: "Test Cashkick" } });
    const submitButton = screen.getByText("Create Cash Kick");
    fireEvent.click(submitButton);
    const viewCashkicksButton = screen.getByText("View Cash Kicks");
    fireEvent.click(viewCashkicksButton);
  });
  
});
