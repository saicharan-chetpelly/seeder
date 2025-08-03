import { screen, render, fireEvent } from "@testing-library/react";
import { ChooseContracts } from ".";
import { YourContractsType } from "@src/constants";

describe("Choosecontracts component testcases", () => {
  it("should render selected contract amount correctly", () => {
    render(
      <ChooseContracts
        onSelectedContractsChange={() => {}}
        areContractsSelected={false}
        selectedContracts={[]}
        selectedAmount={0}
        onSliderChange={()=>{}}
        handleResetButton={()=>{}}
      />
    );
    const gridItems = screen.getAllByRole("row");
    fireEvent.click(gridItems[1]);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "146842" } });

    const resetButton = screen.getByTestId("reset");
    fireEvent.click(resetButton);
    expect(resetButton).toBeInTheDocument();
  });
});
