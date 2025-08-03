import { StoryFn, Meta } from "@storybook/react";
import { DataBlocks } from ".";
import { BALANCE_DATA_CARD_PROPS, DUE_DATE_PROPS } from "../../../constants";

export default {
  title: "organisms/DataBlocks",
  component: DataBlocks,
} as Meta<typeof DataBlocks>;

const Template: StoryFn<typeof DataBlocks> = (args) => (
    <DataBlocks cardData={DUE_DATE_PROPS} />
);
export const Primary = Template.bind({});

Primary.args = {

}

