import { StoryFn, Meta } from "@storybook/react";
import CashKickSuccess from ".";

export default {
  title: "organisms/CashKickSuccess",
  component: CashKickSuccess,
} as Meta<typeof CashKickSuccess>;

const Template: StoryFn<typeof CashKickSuccess> = (args) => (
  <CashKickSuccess {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  isOpen:true
};
