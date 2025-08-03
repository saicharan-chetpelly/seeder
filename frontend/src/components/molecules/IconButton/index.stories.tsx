import { StoryFn, Meta } from "@storybook/react";
import { IconButton } from ".";
import Google from "../../../../public/assets/icons/google.svg";

export default {
  title: "molecules/IconButton",
  component: IconButton,
} as Meta<typeof IconButton>;

const Template: StoryFn<typeof IconButton> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  iconSrc: Google,
  title: "Google",
  width: "129.67px",
  height: "96px",
};
