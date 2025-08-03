import { StoryFn, Meta } from "@storybook/react";
import CongratulationCard from ".";

export default {
  title: "molecules/CongratulationCard",
  component: CongratulationCard,
} as Meta<typeof CongratulationCard>;

const Template: StoryFn<typeof CongratulationCard> = (args) => (
  <CongratulationCard {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  title: "Congratulations You are ready to start!",
  description: "You are approved for funding. We are ready to advice you upto",
  uptoAmount: "$8.8M",
  buttonName: "Learn More",
};
