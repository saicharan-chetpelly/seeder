import { StoryFn, Meta } from "@storybook/react";
import { DataBlock } from ".";
import CalenderLogo from "../../../../public/assets/icons/calendar.svg";
import InfoIcon from "../../../../public/assets/images/info-circle.svg";
import { TERM_CAP } from "../../../constants";
import { theme } from "../../../theme/theme";

export default {
  title: "molecules/DataBlock",
  component: DataBlock,
} as Meta<typeof DataBlock>;

const Template: StoryFn<typeof DataBlock> = (args) => <DataBlock {...args} />;
export const TeamCap = Template.bind({});

TeamCap.args = {
  logoSrc: CalenderLogo,
  logoAlt: "calender-logo",
  iconSrc: InfoIcon,
  iconAlt: "info-icon",
  title: TERM_CAP,
  titleVariant: "body1",
  titleColor: theme.palette.text.secondary,
  caption: "12 months",
  captionVariant: "h2",
  captionColor: theme.palette.text.primary,
  titleInfoGap: "8px",
  titleCaptionGap: "8px",
};
