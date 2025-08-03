import { StoryFn, Meta } from "@storybook/react";
import { InfoCard } from ".";
import { DEFAULT_USERNAME } from "../../../constants";

export default {
  title: "molecules/InfoCard",
  component: InfoCard,
} as Meta<typeof InfoCard>;

const Template: StoryFn<typeof InfoCard> = (args) => <InfoCard {...args} />;

export const Primary = Template.bind({})
Primary.args = {
  isOpen:true,
  userName:DEFAULT_USERNAME
}