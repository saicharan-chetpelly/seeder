import { screen, render } from "@testing-library/react";
import { DataBlocks } from ".";
import { BALANCE_DATA_CARD_PROPS, BANNER_CONSTANTS, DUE_DATE_PROPS } from "@src/constants";

describe("BalanceDataCard component testcases", () => {
  it("should render component when datablocks are sent as props", () => {
    render(<DataBlocks cardData={DUE_DATE_PROPS} />);
  });

  it("should render outstanding amount",()=>{
    render(<DataBlocks card cardData={DUE_DATE_PROPS} outstandingAmount={88000}/>);
    expect(screen.getByText("$88,000.00")).toBeInTheDocument()
  })
  it("should render card when cardData prop is not sent",()=>{
    render(<DataBlocks card={<h1>This is card</h1>}/>);
    expect(screen.getByText("This is card")).toBeInTheDocument()
  })

  it("should render daystpay",()=>{
    render(<DataBlocks cardData={DUE_DATE_PROPS} daysLeftToPay="30days"/>);
    expect(screen.getByText("30days")).toBeInTheDocument()
  })

});
