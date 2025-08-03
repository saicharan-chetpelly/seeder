import { StoryFn, Meta } from "@storybook/react";
import { Gif } from ".";
import CashkickReviewGif from "../../../../public/assets/animations/cashlick_in_review.gif";

export default {
  title: "atoms/Gif",
  component: Gif,
} as Meta<typeof Gif>;

const Template: StoryFn<typeof Gif> = (args) => <Gif {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  src: CashkickReviewGif,
  width: "172px",
  height: "172px",
  alt: "cashkick in review",
};
