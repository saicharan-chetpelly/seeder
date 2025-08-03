import { screen, render, fireEvent } from "@testing-library/react";
import { CashAccelerationPage } from ".";
import {
  CASH_ACCELERATION_PAGE_HEADER,
  CASH_ACCELERATION_PAGE_SUB_HEADER,
  LAUNCH_A_NEW_CASHKICK,
} from "@src/constants";
import * as services from "../../services";
import { BrowserRouter } from "react-router-dom";
import { ThemeContext, UserDataProps } from "../../utils/ThemeContext";
const currUser:UserDataProps ={
  id: 1,
  name: "Kane Cooper",
  email: "kanee44cooper@gmail.com",
  availableCredit: 100,
}
const mockResponseCashkickData = {
  data: [
    {
      name: "My First Advance",
      status: "Pending",
      maturity: "2023-11-21T12:02:33Z",
      totalFinanced: 199128.2384,
      totalReceived: 177793.07,
      termRate: 12,
      id: 1,
      userId: 1,
    },
  ],
  status: 200,
};
const mockResponseContractData = {
  data: [
    {
      id: 1,
      name: "Contract 1",
      status: "Available",
      type: "Monthly",
      perPayment: 12000.25,
      totalFinanced: "-",
      totalAvailable: 126722.64,
      termLength: 12,
      termRate: 12,
      paymentAmount: 63360,
    },
  ],
};
const mockResponseCashkickContracts = {
  data: [
    {
      cashkickId: 1,
      contractId: 1,
      id: 1,
    },
    {
      cashkickId: 1,
      contractId: 2,
      id: 2,
    },
    {
      cashkickId: 1,
      contractId: 3,
      id: 3,
    },
  ],
};

describe("CashAcceleration page component testcases", () => {
  const handleUpdateCurrUser = jest.fn()
  const handleUpdateAvailableCredit = jest.fn()
  it("should render navbar and content as expected", () => {
    jest
      .spyOn(services, "getAllCashKicksOfUser")
      .mockResolvedValue(mockResponseCashkickData as any);
    jest
      .spyOn(services, "getAllContractById")
      .mockResolvedValue(mockResponseContractData as any);
    jest
      .spyOn(services, "getAllContractsByCashkickId")
      .mockResolvedValue(mockResponseCashkickContracts as any);
    render(<ThemeContext.Provider value={{ currUser, handleUpdateCurrUser, handleUpdateAvailableCredit }}><BrowserRouter><CashAccelerationPage /></BrowserRouter></ThemeContext.Provider>);
    const appName = screen.getByText("Seeder");
    expect(appName).toBeInTheDocument();
    const pageTitle = screen.getAllByText(CASH_ACCELERATION_PAGE_HEADER);
    expect(pageTitle[0]).toBeInTheDocument();
    const pageSubTitle = screen.getByText(CASH_ACCELERATION_PAGE_SUB_HEADER);
    expect(pageSubTitle).toBeInTheDocument();
  });
  it("should render balance datacard of user", () => {
    jest
      .spyOn(services, "getAllCashKicksOfUser")
      .mockResolvedValue(mockResponseCashkickData as any);
    jest
      .spyOn(services, "getAllContractById")
      .mockRejectedValue(mockResponseContractData as any);
    jest
      .spyOn(services, "getAllContractsByCashkickId")
      .mockResolvedValue(mockResponseCashkickContracts as any);
    render(<BrowserRouter><CashAccelerationPage /></BrowserRouter>);
    const balance = screen.getByText(LAUNCH_A_NEW_CASHKICK);
    expect(balance).toBeInTheDocument();
  });
  it("should render error when failed to fetch cashkick data of current user", () => {
    jest
      .spyOn(services, "getAllCashKicksOfUser")
      .mockRejectedValue(mockResponseCashkickData as any);
    jest
      .spyOn(services, "getAllContractById")
      .mockRejectedValue(mockResponseContractData as any);
    jest
      .spyOn(services, "getAllContractsByCashkickId")
      .mockResolvedValue(mockResponseCashkickContracts as any);
    render(<BrowserRouter><CashAccelerationPage /></BrowserRouter>);
  });
  it("should fetch all cashkicks when tab is switched", () => {
    jest
      .spyOn(services, "getAllCashKicksOfUser")
      .mockResolvedValue(mockResponseCashkickData as any);
    jest
      .spyOn(services, "getAllContractById")
      .mockResolvedValue(mockResponseContractData as any);
    jest
      .spyOn(services, "getAllContractsByCashkickId")
      .mockResolvedValue(mockResponseCashkickContracts as any);
    render(<BrowserRouter><CashAccelerationPage /></BrowserRouter>);
    const myCashKick = screen.getByText("My Cash Kicks");
    expect(myCashKick).toBeInTheDocument();
    fireEvent.click(myCashKick);
  });
});
