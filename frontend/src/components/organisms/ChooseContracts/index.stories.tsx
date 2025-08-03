import { StoryFn, Meta } from "@storybook/react";
import { ChooseContracts } from ".";

export default {
  title: "organisms/ChooseContracts",
  component: ChooseContracts,
} as Meta<typeof ChooseContracts>;

const Template: StoryFn<typeof ChooseContracts> = (args) => <ChooseContracts {...args}/>;
export const Default = Template.bind({});
