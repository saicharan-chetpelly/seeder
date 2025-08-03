import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import NewCashkickCard, { NewCashkickCardProps } from "./index";

export default {
  title: "molecules/NewCashkickCard",
  component: NewCashkickCard,
} as Meta;

const Template: StoryFn<NewCashkickCardProps> = (args) => (
  <NewCashkickCard {...args} />
);

export const NewCashKick = Template.bind({});
NewCashKick.args = {
  cashKickHeader: "Launch a new Cash Kick",
  balanceAmount: "$880.000.00",
  buttonLabel: "New Cash Kick",
  handleClick: () => alert("licked!!"),
};

export const RequestCredit = Template.bind({});
RequestCredit.args = {
  cashKickHeader: "100% provided credit limit utilized ",
  balanceAmount: "$0.00",
  buttonLabel: "Request Credit Increase",
  handleClick: () => alert("Clicked!!"),
};
