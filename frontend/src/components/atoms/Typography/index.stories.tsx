import { StoryFn, Meta } from "@storybook/react";
import Typography from ".";

export default {
  title: "Atoms/Typography",
  component: Typography,
} as Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = (args) => <Typography {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  variant: "h6",
  children: "bootcamp-135-seeder",
};
