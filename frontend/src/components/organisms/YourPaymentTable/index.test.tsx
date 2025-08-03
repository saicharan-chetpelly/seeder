import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MyPaymentTable } from ".";
import { MOCK_My_PAYMENT_DATA, MyPaymentType } from "../../../constants";

describe("MyPaymentTable component testcases", () => {
  const mockOnSelectedContractsChange = jest.fn();
  
  it("should render table with specified rows as expected", () => {
    render(<MyPaymentTable paymentData={MOCK_My_PAYMENT_DATA} isLoading={false} isError={false} isConnected={false}/>);
    const contractsTable = screen.getByText("Your payments");
    expect(contractsTable).toBeInTheDocument();
  });
  it("should render table with specified rows as expected", () => {
    render(<MyPaymentTable paymentData={[]} isLoading={false} isError={false} isConnected={false}/>);
    const contractsTable = screen.getByText("Your payments");
    expect(contractsTable).toBeInTheDocument();
  });
  it("should render table with specified rows as expected", () => {
    render(<MyPaymentTable paymentData={[]} isLoading={true} isError={false} isConnected={false}/>);
    const contractsTable = screen.getByText("Your payments");
    expect(contractsTable).toBeInTheDocument();
  });
  it("should render table with specified rows as expected", () => {
    render(<MyPaymentTable paymentData={[]} isLoading={true} isError={true} isConnected={false}/>);
    const contractsTable = screen.getByText("Your payments");
    expect(contractsTable).toBeInTheDocument();
  });
  it("should render table with specified rows as expected", () => {
    render(<MyPaymentTable paymentData={[]} isLoading={true} isError={false} isConnected={true}/>);
    const contractsTable = screen.getByText("Your payments");
    expect(contractsTable).toBeInTheDocument();
  });

});
