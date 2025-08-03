import { StoryFn, Meta } from "@storybook/react";
import { MyPaymentTable } from ".";
import { MOCK_My_PAYMENT_DATA } from "../../../constants";

export default {
  title: "organisms/MyPaymentTable",
  component: MyPaymentTable,
} as Meta<typeof MyPaymentTable>;

const Template: StoryFn<typeof MyPaymentTable> = (args) => (
  <MyPaymentTable {...args} />
);
export const Default = Template.bind({});

Default.args = {
  paymentData: MOCK_My_PAYMENT_DATA,
};
