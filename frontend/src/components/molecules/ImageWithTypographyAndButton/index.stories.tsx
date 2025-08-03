import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import ImageWithTypographyAndButton, {
  ImageWithTypographyAndButtonProps,
} from "./index";
import FinancePlanning from "../../../../public/assets/images/FinancePlanning.svg";
import WarningImg from "../../../../public/assets/images/Warning.svg";
import CoinsBag from "../../../../public/assets/images/CoinsBag.svg";

import { Box } from "@mui/material";
import Typography from "../../atoms/Typography/index";
import { theme } from "../../../theme/theme";

export default {
  title: "molecules/ImageWithTypography",
  component: ImageWithTypographyAndButton,
} as Meta;

const Template: StoryFn<ImageWithTypographyAndButtonProps> = (args) => (
  <ImageWithTypographyAndButton {...args} />
);

export const EmptyState = Template.bind({});
EmptyState.args = {
  image: FinancePlanning,
  body: (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Typography
        children="Connect your preferred payments or"
        variant="h3"
        color={theme.palette.text.disabled}
      />
      <Typography
        children="subscriptions platform to import contracts"
        variant="h3"
        color={theme.palette.text.disabled}
      />
    </Box>
  ),
  buttonLabel: "Connect Now",
};

export const Warning = Template.bind({});
Warning.args = {
  image: WarningImg,
  body: (
    <Box
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={"4px"}
    >
      <Typography
        children="oops! Failed to connect"
        variant="h3"
        color={theme.palette.grey[400]}
      />
      <Typography
        children="please contact customer support if this problem persists"
        variant="caption1"
        color={theme.palette.text.disabled}
      />
    </Box>
  ),
  buttonLabel: "Retry",
};

export const ConnectedSuccessfully = Template.bind({});
ConnectedSuccessfully.args = {
  image: CoinsBag,
  body: (
    <Box>
      <Typography
        children="Connected Successfully!"
        variant="h3"
        color={theme.palette.text.primary}
      />
    </Box>
  ),
};