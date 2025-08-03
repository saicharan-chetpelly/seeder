import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import SummaryCard, { Props } from './index';

export default {
  title: 'organisms/SummaryCard',
  component: SummaryCard,
} as Meta;

const Template: StoryFn<Props> = (args) => <SummaryCard {...args} />;

export const ReviewMode = Template.bind({});
ReviewMode.args = {
  term: 12,
  selectedcontracts: 5,
  review: true,
  balanceAmount: "880,000.00",
  maxValue: 880000,
  value:100000,
};

export const NoReviewMode = Template.bind({});
NoReviewMode.args = {
    handleClick: ()=>alert("Clicked!"),
    paybackamount: "170,454.55",
    payout: "150,000.00",
    rate: "20,454.55",
    review: false,
    selectedcontracts: 2,
    tableLength:4, 
    term:12,
    value:1000,
};
