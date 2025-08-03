import { StoryFn, Meta } from "@storybook/react";
import { BalanceDataCard } from ".";
import { BALANCE_DATA_CARD_PROPS } from "../../../constants";
import Banner from "../../molecules/CongratulationCard";

export default {
  title: "organisms/BalanceDataCard",
  component: BalanceDataCard,
} as Meta<typeof BalanceDataCard>;

const Template: StoryFn<typeof BalanceDataCard> = (args) => (
  <BalanceDataCard {...args} />
);
export const Primary = Template.bind({});

Primary.args = {
  cardsData: BALANCE_DATA_CARD_PROPS,
};

