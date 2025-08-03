import { MuiCheckbox } from ".";
import { StoryFn, Meta } from "@storybook/react";

export default {
  title: "atoms/Checkbox",
  component: MuiCheckbox,
  argTypes: {
    onChange: { action: "Checkbox clicked" },
  },
} as Meta<typeof MuiCheckbox>;

const Template: StoryFn<typeof MuiCheckbox> = (args) => (
  <MuiCheckbox {...args} />
);
export const Primary = Template.bind({});
export const Secondary = Template.bind({});

Primary.args = {
  defaultChecked: true,
};

Secondary.args = {
  defaultChecked:false,
  indeterminate: true,
};
