import { StoryFn, Meta } from "@storybook/react";
import Chip from ".";

export default {
  title: "Atoms/Chip",
  component: Chip,
} as Meta<typeof Chip>;

const Template: StoryFn<typeof Chip> = (args) => <Chip {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label: "Available",
  bgColor: "#2D2D30",
  sx:{
    padding:"0px 12px"
  }
};
