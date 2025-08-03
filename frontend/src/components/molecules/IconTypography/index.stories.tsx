import { StoryFn, Meta } from "@storybook/react";
import { IconTypography } from ".";
import InfoIcon from "../../../../public/assets/images/info-circle.svg";
import AppLogo from "../../../../public/assets/images/app-logo.svg";
import { theme } from "../../../theme/theme";

export default {
  title: "molecules/IconTypography",
  component: IconTypography,
} as Meta<typeof IconTypography>;

const Template: StoryFn<typeof IconTypography> = (args) => (
  <IconTypography {...args} />
);

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
Primary.args = {
  label: "Term cap",
  endIconSrc: InfoIcon,
  endIconAlt: "Info icon",
  endIconWidth: "16px",
  endIconHeight: "16px",
  labelColor: theme.palette.text.secondary,
  variant: "body1",
  gap: "8px",
};

Secondary.args = {
  label: "Seeder",
  startIconAlt: "seeder app logo",
  startIconSrc: AppLogo,
  startIconWidth: "36px",
  startIconHeight: "36px",
  labelColor: theme.palette.text.primary,
  gap: "8px",
  variant:"caption1"
};
