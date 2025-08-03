import { StoryFn, Meta } from "@storybook/react";
import { CustomSlider } from ".";

export default {
  title: "atoms/Slider",
  component: CustomSlider,
} as Meta<typeof CustomSlider>;

const Template: StoryFn<typeof CustomSlider> = (args) => (
  <CustomSlider {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  max: 100,
  valueLabelDisplay: "auto",
};
