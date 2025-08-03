import { StoryFn, Meta } from "@storybook/react";
import { YourContractsTable } from ".";
import { MOCK_CONTRACT_DATA } from "../../../constants";

export default {
  title: "organisms/YourContractsTable",
  component: YourContractsTable,
} as Meta<typeof YourContractsTable>;

const Template: StoryFn<typeof YourContractsTable> = (args) => (
  <YourContractsTable {...args} />
);
export const Default = Template.bind({});

Default.args = {
  contractsData: MOCK_CONTRACT_DATA,
};
