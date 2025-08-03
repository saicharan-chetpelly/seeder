import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { YourContractsTable } from ".";
import { YourContractsType } from "../../../constants";
import { ThemeContext, UserDataProps } from "../../../utils/ThemeContext";
const currUser:UserDataProps ={
  id: 0,
  name: "Kane Cooper",
  email: "kanee44cooper@gmail.com",
  availableCredit: 100,
}
const MOCK_CONTRACT_DATA: YourContractsType[] = [
  {
    id: 1,
    name: "Contract 1",
    type: "Monthly",
    perPayment: "$12,000.25",
    termLength: "12 months",
    termPercentage: "12.0% fee",
    paymentAmount: 126722.64,
    partialAmount: 0,
  },
  {
    id: 2,
    name: "Contract 2",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: "12 months",
    termPercentage: "12.0% fee",
    paymentAmount: 21120.0,
    partialAmount: 2000,
  },
];
describe("YourContractsTable component testcases", () => {
  const mockOnSelectedContractsChange = jest.fn();
  const handleUpdateCurrUser = jest.fn()
  const handleUpdateAvailableCredit = jest.fn()
  
  it("should render table with specified rows as expected", () => {
    render(<ThemeContext.Provider value={{ currUser, handleUpdateCurrUser, handleUpdateAvailableCredit }}><YourContractsTable contractsData={MOCK_CONTRACT_DATA} onSelectedContractsChange={mockOnSelectedContractsChange} areContractsSelected={false}/> </ThemeContext.Provider>);
    const contractsTable = screen.getByText("Your Contracts");
    expect(contractsTable).toBeInTheDocument();
    const contract1Name = screen.getByText("Contract 1");
    expect(contract1Name).toBeInTheDocument();
  });
  test("should have all the rows in the table generated", () => {
    render(<YourContractsTable contractsData={MOCK_CONTRACT_DATA} onSelectedContractsChange={mockOnSelectedContractsChange} areContractsSelected={false}/>);
    MOCK_CONTRACT_DATA.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
  test("should selects and deselects a contract on clicking checkbox", () => {
    render(<YourContractsTable contractsData={MOCK_CONTRACT_DATA} onSelectedContractsChange={mockOnSelectedContractsChange} selectedRows={MOCK_CONTRACT_DATA} areContractsSelected={false}/>);
    const gridItems = screen.getAllByRole("row");
    fireEvent.click(gridItems[1]);
  });
  test("should selects partial amount if paymentAmount is greater than availablecredit", () => {
    render(<ThemeContext.Provider value={{ currUser, handleUpdateCurrUser, handleUpdateAvailableCredit }}><YourContractsTable contractsData={MOCK_CONTRACT_DATA} onSelectedContractsChange={mockOnSelectedContractsChange} selectedRows={MOCK_CONTRACT_DATA} areContractsSelected={false}/> </ThemeContext.Provider>);
    const gridItems = screen.getAllByRole("row");
    fireEvent.click(gridItems[1]);
  });
});
