import { screen, render } from "@testing-library/react";
import { Table } from ".";
import { myContractsColumnData } from "../../organisms/YourContractsTable";
import { MOCK_CONTRACT_DATA } from "../../../constants";

describe("Table component testcases", () => {
  it("should render Table component with all rows data as expected", () => {
    render(
      <Table
        width={""}
        columns={myContractsColumnData}
        rows={MOCK_CONTRACT_DATA}
      />
    );
    MOCK_CONTRACT_DATA.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
