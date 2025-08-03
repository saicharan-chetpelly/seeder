import { StoryFn, Meta } from "@storybook/react";
import { Header } from ".";
import { DEFAULT_DATE, DEFAULT_SALUATION } from "../../../constants";

export default {
  title: "organisms/Header",
  component: Header,
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => <Header {...args} />;
export const HomepageHeader = Template.bind({});

HomepageHeader.args = {
  title: DEFAULT_SALUATION,
  subtitle: DEFAULT_DATE,
};
