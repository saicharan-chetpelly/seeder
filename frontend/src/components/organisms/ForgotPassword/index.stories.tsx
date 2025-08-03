import { StoryFn, Meta } from "@storybook/react";
import { ForgotPassword } from ".";

export default {
  title: "organisms/ForgotPassword",
  component: ForgotPassword,
} as Meta<typeof ForgotPassword>;

const Template: StoryFn<typeof ForgotPassword> = () => <ForgotPassword />;
export const Default = Template.bind({});
