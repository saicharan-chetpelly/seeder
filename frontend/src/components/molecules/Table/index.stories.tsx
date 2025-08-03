import { StoryFn, Meta } from "@storybook/react";
import { Table } from ".";
import { DEFAULT_USERNAME, MOCK_CONTRACT_DATA } from "../../../constants";
import { myContractsColumnData } from "../../organisms/YourContractsTable";

export default {
  title: "molecules/Table",
  component: Table,
} as Meta<typeof Table>;

const Template: StoryFn<typeof Table> = (args) => <Table {...args} />;

export const YourContracts = Template.bind({});
YourContracts.args = {
  width: "100%",
  columns: myContractsColumnData,
  rows: MOCK_CONTRACT_DATA,
};

export const YourContractsWithCheckBox = Template.bind({});
YourContractsWithCheckBox.args = {
  width: "100%",
  columns: myContractsColumnData,
  rows: MOCK_CONTRACT_DATA,
  checkboxSelection: true,
};
