import { screen, render } from "@testing-library/react";
import { TableRow } from ".";
import { DEFAULT_TABLE_ROW_DATA } from "@src/constants";

describe("Table row component", () => {
  it("should render table data as expected with passed data", () => {
    render(<TableRow data={DEFAULT_TABLE_ROW_DATA} />);
    const tableRowValue = screen.getByText(DEFAULT_TABLE_ROW_DATA[0].title);
    expect(tableRowValue).toBeInTheDocument();
  });
});
