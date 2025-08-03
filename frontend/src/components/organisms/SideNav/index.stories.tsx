import { StoryFn, Meta } from "@storybook/react";
import NavBar from ".";
import { NAV_BAR_ITEMS } from "../../organisms/SideNav/NavBarUtils";
export default {
  title: "Organisms/NavBar",
  component: NavBar,
} as Meta<typeof NavBar>;

const Template: StoryFn<typeof Image> = (args) => (
  <NavBar activeElement={NAV_BAR_ITEMS[0].title} navBarItems={NAV_BAR_ITEMS} />
);

export const Primary = Template.bind({});

Primary.args = {};
