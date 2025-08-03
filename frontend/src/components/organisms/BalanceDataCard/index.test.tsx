import { screen, render, fireEvent } from "@testing-library/react";
import { BalanceDataCard } from ".";
import { BALANCE_DATA_CARD_PROPS, BANNER_CONSTANTS } from "@src/constants";
import Banner from "@components/molecules/CongratulationCard";
import { BrowserRouter } from "react-router-dom";
describe("BalanceDataCard component testcases", () => {
  it("should render component when datablocks are sent as props", () => {
    render(<BrowserRouter><BalanceDataCard cardsData={BALANCE_DATA_CARD_PROPS} /></BrowserRouter>);
    BALANCE_DATA_CARD_PROPS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
  it("should render congratulations card when passed as prop", () => {
    render(
      <BrowserRouter>
      <BalanceDataCard
        card={
          <Banner
            title={BANNER_CONSTANTS.title}
            description={BANNER_CONSTANTS.description}
            uptoAmount={BANNER_CONSTANTS.uptoAmount}
            buttonName={BANNER_CONSTANTS.buttonName}
          />
        }
      />
      </BrowserRouter>
    );
    const titleElement = screen.getByText(BANNER_CONSTANTS.title);
    const descriptionElement = screen.getByText(BANNER_CONSTANTS.description);
    const uptoAmountElement = screen.getByText(BANNER_CONSTANTS.uptoAmount);
    const buttonElement = screen.getByRole("button", {
      name: BANNER_CONSTANTS.buttonName,
    });
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(uptoAmountElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();

    const createCashkickBtn = screen.getByRole("button",{name:"New Cash Kick"});
    fireEvent.click(createCashkickBtn)
  });
});
