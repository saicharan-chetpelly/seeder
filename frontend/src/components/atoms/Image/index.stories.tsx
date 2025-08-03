import { StoryFn, Meta } from "@storybook/react";
import Image from ".";
import LoginPageImage from "../../../../public/assets/images/LoginPageImage.svg";

export default {
  title: "Atoms/Image",
  component: Image,
} as Meta<typeof Image>;

const Template: StoryFn<typeof Image> = (args) => <Image {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  src: LoginPageImage,
};
