import { StoryFn, Meta } from "@storybook/react";

import CashAcceleration from ".";
import { MOCK_CASHKICK_DATA, MOCK_My_CONTRACT_DATA } from "../../../constants";

export default {
  title: 'organisms/Tabs',
  component: CashAcceleration,
} as Meta<typeof CashAcceleration>;

const Template: StoryFn<typeof CashAcceleration> = (args) => <CashAcceleration {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  myCashkicksData:MOCK_CASHKICK_DATA,
  myContractsData:MOCK_My_CONTRACT_DATA
};
