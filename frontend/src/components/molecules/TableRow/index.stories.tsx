import { StoryFn, Meta } from "@storybook/react";
import { TableRow } from ".";
import { DEFAULT_TABLE_ROW_DATA } from "../../../constants";

export default {
  title: "molecules/TableRow",
  component: TableRow,
} as Meta<typeof TableRow>;

const Template: StoryFn<typeof TableRow> = (args) => <TableRow {...args} />;
export const Default = Template.bind({});

Default.args = {
  data: DEFAULT_TABLE_ROW_DATA,
};
