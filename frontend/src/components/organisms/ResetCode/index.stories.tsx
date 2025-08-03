import type { Meta, StoryObj } from "@storybook/react";
import ResetPassword from ".";

const meta: Meta<typeof ResetPassword> = {
  title: "organisms/ResetPassword",
  component: ResetPassword,
};
export default meta;
type Story = StoryObj<typeof ResetPassword>;

const handleContinuePassword = (userpassword: string) => {
  console.log("Continue Password:", userpassword);
};

export const ResetPasswordOrganism: Story = {
  args: {
    onContinuePassword: handleContinuePassword,
  },
};
