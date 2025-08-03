import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import {MyCashKickType, MyContractsType } from '../../../constants/index';
import CashAcceleration from '.';
import { MyCashKickTable, MyContractsTable } from './tabUtils';

 const MOCK_CASHKICK_DATA: MyCashKickType[] = [
    {
      id: 1,
      name: "My First Advance",
      status: "Pending",
      maturity: "Apr 03,2022",
      totalRecieved: "$1,26,000.00",
      totalFinanced: "$1,70,456.00",
    },
  ];
  

 const MOCK_My_CONTRACT_DATA: MyContractsType[] = [
    {
      id: 1,
      name: "Contract 1",
      status: "Pending",
      type: "Monthly",
      perPayment: "$5,000.00",
      totalFinanced: "-",
      totalAvailable: "$1,26,000.00",
    },
    {
      id: 2,
      name: "Contract 2",
      status: "Pending",
      type: "Monthly",
      perPayment: "$6,000.00",
      totalFinanced: "-",
      totalAvailable: "$1,26,000.00",
    },
]


describe('CashAcceleration Component', () => {
    it("should render table with specified rows as expected", () => {
     const { getByText, getByTestId } = render(<CashAcceleration myCashkicksData={MOCK_CASHKICK_DATA} myContractsData={[]} activeTab={0} isLoading={false} isError={false} isConnected={false} />);
     const tab = getByText('Cash accleration');
    expect(tab).toBeInTheDocument();
    
    

    const myContract = getByText('My Contracts');
    expect(myContract).toBeInTheDocument();

    const myCashKick = getByText('My Cash Kicks');
    expect(myCashKick).toBeInTheDocument();
    fireEvent.click(myCashKick);
    fireEvent.click(myContract);
      });
});

describe('Contract Component', () => {
    

      test("should have all the rows in the contract table generated", () => {
        render(<MyContractsTable contractsData={MOCK_My_CONTRACT_DATA} isLoading={false} isError={false} isConnected={false} />);
        MOCK_My_CONTRACT_DATA.forEach((item) => {
          expect(screen.getByText(item.name)).toBeInTheDocument();
        });
      });
      test("should display empty row image", () => {
        render(<MyContractsTable contractsData={[]} isLoading={false} isError={false} isConnected={false} />);
        const textToDisplay = screen.getByText("subscriptions platform to import contracts");
        expect(textToDisplay).toBeInTheDocument();
      });
      test("should display error image", () => {
        render(<MyContractsTable contractsData={[]} isLoading={false} isError={true} isConnected={false} />);
        const errorMessage = screen.getByText("oops! Failed to connect");
        expect(errorMessage).toBeInTheDocument();
      });
      test("should display loading skeleton", () => {
        render(<MyContractsTable contractsData={[]} isLoading={true} isError={false} isConnected={false} />);
        const headerName = screen.getByText('Name');
        expect(headerName).toBeInTheDocument();
      });
      test("should display connect succefully", () => {
        render(<MyContractsTable contractsData={[]} isLoading={false} isError={false} isConnected={true} />);
        const connectedMessage = screen.getByText("Connected Succesfully!");
        expect(connectedMessage).toBeInTheDocument();
      });

      test("should have all the rows in the cash kick table generated", () => {
        render(<MyCashKickTable cashKickData={MOCK_CASHKICK_DATA} isLoading={false} isError={false} isConnected={false} />);
        MOCK_CASHKICK_DATA.forEach((item) => {
          expect(screen.getByText(item.name)).toBeInTheDocument();
        });
      });
      test("should display loading skeleton while loading", () => {
        render(<MyCashKickTable cashKickData={MOCK_CASHKICK_DATA} isLoading={true} isError={false} isConnected={false} />);
        const headerName = screen.getByText('Name');
        expect(headerName).toBeInTheDocument();
      });
      test("should display empty row image in cashkick tab", () => {
        render(<MyCashKickTable cashKickData={[]} isLoading={false} isError={false} isConnected={false} />);
        const textToDisplay = screen.getByText("You don’t have any Cash Kick");
        expect(textToDisplay).toBeInTheDocument();
      });
      test("should display error message ", () => {
        render(<MyCashKickTable cashKickData={[]} isLoading={false} isError={true} isConnected={false} />);
        const errorMessage = screen.getByText("oops! Failed to connect");
        expect(errorMessage).toBeInTheDocument();
      });
      test("should display connect succesfully", () => {
        render(<MyCashKickTable cashKickData={[]} isLoading={false} isError={false} isConnected={true} />);
        const connectedMessage = screen.getByText("Connected Succesfully!");
        expect(connectedMessage).toBeInTheDocument();
      });
});