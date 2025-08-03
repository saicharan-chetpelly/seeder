import { StoryFn, Meta } from "@storybook/react";
import InputField from ".";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default {
  title: "Atoms/InputField",
  component: InputField,
} as Meta<typeof InputField>;

const Template: StoryFn<typeof InputField> = (args) => <InputField {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  width: "434px",
  height: "56px",
};

export const StartIcon = Template.bind({});

StartIcon.args = {
  width: "434px",
  height: "56px",
  startAdornment: <SearchOutlinedIcon />,
};

export const EndIcon = Template.bind({});

EndIcon.args = {
  width: "434px",
  height: "56px",
  type: "password",
  endAdornment: <VisibilityOffIcon />,
};
