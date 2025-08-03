import { render, screen, fireEvent } from "@testing-library/react";
import SummaryCard from ".";

describe("SummaryCard component", () => {
  test("should renders the component without any props", () => {
    const mockHandleReviewCreditBtn = jest.fn()
    const props = {
      handleClick: jest.fn(),
    };
    render(<SummaryCard areContractsSelected={true} value={0} {...props} handleReviewCreditButton={mockHandleReviewCreditBtn}/>);
    expect(screen.getByTestId("submitButton2")).toBeInTheDocument();
    expect(screen.queryByTestId("submitButton1")).not.toBeInTheDocument();
  });
  test("should render review button when contrcts are selected", () => {
    const mockHandleReviewCreditBtn = jest.fn()
    const props = {
      handleClick: jest.fn(),
    };
    render(<SummaryCard review={true} areContractsSelected={false} value={0} {...props} handleReviewCreditButton={mockHandleReviewCreditBtn}/>);
    expect(screen.getByTestId("submitButton1")).toBeInTheDocument();
    expect(screen.queryByTestId("submitButton2")).not.toBeInTheDocument();
  });
  test("should handle handleReview fn when review is false", () => {
    const mockHandleReviewCreditBtn = jest.fn()
    const props = {
      handleClick: jest.fn(),
    };
    render(<SummaryCard review={false} areContractsSelected={false} value={0} {...props} handleReviewCreditButton={mockHandleReviewCreditBtn}/>);
    expect(screen.getByTestId("submitButton2")).toBeInTheDocument();
    expect(screen.queryByTestId("submitButton1")).not.toBeInTheDocument();
  });

  it("simulates slider change and reset click", () => {
    const handleClick = jest.fn();
    const term = 12;
    const selectedContracts = 2;
    const paybackAmount = "170335";
    const rate = "0.12";
    const payout = "88033";
    const review = true;
    const mockOpenNameCashkick = jest.fn()

    const {} = render(
      <SummaryCard
        term={term}
        selectedcontracts={selectedContracts}
        paybackamount={paybackAmount}
        rate={rate}
        payout={payout}
        handleClick={handleClick}
        review={review} value={0}
        areContractsSelected={true}
        openNamecashKickModal={mockOpenNameCashkick}    />
    );

    const sliderElement = screen.getByTestId("slider-element");
    expect(sliderElement).toBeInTheDocument();

    const sliderInput = screen.getByTestId("slider-element") as HTMLElement;
    sliderInput.getBoundingClientRect = jest.fn(() => ({
      bottom: 286.22918701171875,
      height: 28,
      left: 19.572917938232422,
      right: 583.0937919616699,
      top: 258.22918701171875,
      width: 563.5208740234375,
      x: 19.572917938232422,
      y: 258.22918701171875,
      toJSON: () => null,
    }));

    expect(sliderInput).toBeInTheDocument();

    fireEvent.mouseDown(sliderInput, { clientX: 162, clientY: 302 });

    const resetButton = screen.getByTestId("reset");
    fireEvent.click(resetButton);
    expect(resetButton).toBeInTheDocument();
  });
});
