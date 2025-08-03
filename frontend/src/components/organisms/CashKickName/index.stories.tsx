import { StoryFn, Meta } from "@storybook/react";

import { NameCashkick } from ".";

export default {
  title: "Organisms/NameCashkick",
  component: NameCashkick,
} as Meta<typeof NameCashkick>;

const Template: StoryFn<typeof NameCashkick> = (args) => (
  <NameCashkick {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  isOpen:true
};
