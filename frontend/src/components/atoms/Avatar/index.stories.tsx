import type { Meta, StoryObj } from "@storybook/react";
import Avatar from ".";
import AvatarLogo from "../../../../public/assets/images/avatar.svg";
const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Rounded: Story = {
  args: {
    src: `${AvatarLogo}`,
    alt: "Avatar Logo",
    variant: "rounded",
    width: 32,
    height: 32,
  },
};

export const Circular: Story = {
  args: {
    src: `${AvatarLogo}`,
    alt: "Avatar Logo",
    variant: "circular",
    width: 32,
    height: 32,
  },
};