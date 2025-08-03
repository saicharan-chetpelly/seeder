import { DataBlockProps } from "../../src/components/molecules/DataBlock";
import CalenderLogo from "../../public/assets/icons/calendar.svg";
import DocumentDownloadIcon from "../../public/assets/icons/document-download.svg";
import PercentageSquareIcon from "../../public/assets/icons/percentage-square.svg";
import Progress from "../../public/assets/icons/circular-progress.svg";
import Reciept from "../../public/assets/icons/receipt.svg";

import InfoIcon from "../../public/assets/images/info-circle.svg";
import { theme } from "../theme/theme";
import { formatAvailableCredit } from "../utils/helper";

export const MANEGE_SUBSCRIPTION = "Manage Subscriptions";
export const HELP = "Help";
export const SETTINGS = "Settings";
export const LOGOUT = "Log Out";
export const EDIT_PROFILE = "Edit Profile";
export const DEFAULT_USERNAME = "Kane Cooper";
export const TERM_CAP = "Term cap";

export const CASH_ADVANCE = "available for a new cash advance";
export const HAVE_UPTO = "You have upto ";
export const DEFAULT_SALUATION = "Good afternoon ✋";
export const GOOD_MORNING_SALUATION = "Good morning ✋";
export const GOOD_EVENING_SALUATION = "Good morning ✋"
export const DEFAULT_DATE = "April 02, 2021";
export const CASHKICK_INFO =
  "It will remain on pending state until we review it internally. This can take upto 5 mins to couple of hours. Once reviewed, the cash will be transferred to your account and you’ll be notified.";
export const CASHKICK_REVIEW = "Your cash kick is under review";
export const CASHKICK_STATUS = "We are reviewing your cash kick";
export const CASHKICK_SUCCESS = "Cash kick launched successfully!";
export const CLOSE = "Close";
export const VIEW_CASHKICKS = "View Cash Kicks";
export const CASHKICKHEADER = "Launch a new Cash Kick";
export const BALANCE_AMOUNT = "$709,546.00";
export const ADD_NEW_CASHKICK_BUTTON = "New Cash Kick";

export const DEFAULT_TABLE_ROW_DATA = [
  {
    id: 1,
    title: "Contract 1",
  },
  {
    id: 1,
    title: "Monthly",
  },
  {
    id: 1,
    title: "$12,000.25",
  },
  {
    id: 1,
    title: "12 months",
  },
  {
    id: 1,
    title: "$126,722.64",
  },
];
export const ADD_NEW_CASHKICK = "Add a name to identify your cash kick";
export const CANCEL = "Cancel";
export const CASHKICK_NAME = "Cash kick name";
export const CREATE_CASHKICK = "Create Cash Kick";
export const NAME_CASHKICK = "Name your cash kick";
export const NAME_PLACEHOLDER = "Ex: marketing expenses";

export const LOGIN_TITLE = "Login to Seeder ✨";
export const LOGIN_DESCRIPTION = "Enter your mail id and password to login";
export const EMAIL_PLACEHOLDER = "Enter your email id";
export const PASSWORD_PLACEHOLDER = "Enter your password";
export const FORGOT_PASSWORD_TEXT = "Forgot Password?";
export const CONTINUE_BUTTON_LABEL = "Continue";
export const OR_TEXT = "Or";
export const SIGNUP_TEXT = "Sign Up";
export const DONT_HAVE_ACCOUNT = "Don’t have an account?";

export const SIGNUP_TITLE = "Sign Up ✨";
export const YOUR_NAME = "Your Name";
export const EMAIL_ADDRESS = "Email Address";
export const PASSWORD = "Password";
export const SIGNUP = "Sign Up";
export const ALREADY_HAVE_ACCOUNT = "Already have an account";

export const SUMMARY = "Summary";
export const TERM = "Term";
export const SELECTED_CONTRACTS = "Selected contracts";
export const PAY_BACK_AMOUNT = "Pay back amount";
export const RATE = "Rate %";
export const TOTAL_PAYOUT = "Total Payout";
export const SELECTED = "selected of ";
export type YourContractsType = {
  id: number;
  name: string;
  type: string;
  perPayment: string;
  termLength: string;
  termPercentage: string;
  paymentAmount: number;
  partialAmount: number;
};
export const MOCK_CONTRACT_DATA: YourContractsType[] = [
  {
    id: 1,
    name: "Contract 1",
    type: "Monthly",
    perPayment: "$12,000.25",
    termLength: "12 months",
    termPercentage: "12.0% fee",
    paymentAmount: 126722.64,
    partialAmount: 0,
  },
  {
    id: 2,
    name: "Contract 2",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: "12 months",
    termPercentage: "12.0% fee",
    paymentAmount: 21120.0,
    partialAmount: 0,
  },
  {
    id: 3,
    name: "Contract 3",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: "12 months",
    termPercentage: "12.0% fee",
    paymentAmount: 63360.0,
    partialAmount: 0,
  },
  {
    id: 4,
    name: "Contract 4",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: "12 months",
    termPercentage: "12.0% fee",
    paymentAmount: 63360.0,
    partialAmount: 0,
  },
  {
    id: 5,
    name: "Contract 5",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: "12 months",
    termPercentage: "12.0% fee",
    paymentAmount: 63360.0,
    partialAmount: 0,
  },
  {
    id: 6,
    name: "Contract 6",
    type: "Monthly",
    perPayment: "$6,000.00",
    termLength: "12 months",
    termPercentage: "12.0% fee",
    paymentAmount: 63360.0,
    partialAmount: 0,
  },
];

export type MyCashKickType = {
  id: number;
  name: string;
  status: string;
  maturity: string;
  totalRecieved: string;
  totalFinanced: string;
  userId?:number;
};
export const MOCK_CASHKICK_DATA: MyCashKickType[] = [
  {
    id: 1,
    name: "My First Advance",
    status: "Pending",
    maturity: "Apr 03,2022",
    totalRecieved: "$1,26,000.00",
    totalFinanced: "$1,70,456.00",
  },
];

export type MyContractsType = {
  id: number;
  name: string;
  status: string;
  type: string;
  perPayment: string;
  totalFinanced: string;
  totalAvailable: string;
};
export const MOCK_My_CONTRACT_DATA: MyContractsType[] = [
  {
    id: 1,
    name: "Contract 1",
    status: "Pending",
    type: "Monthly",
    perPayment: "$5,000.00",
    totalFinanced: "-",
    totalAvailable: "$1,26,000.00",
  },
  {
    id: 2,
    name: "Contract 2",
    status: "Pending",
    type: "Monthly",
    perPayment: "$6,000.00",
    totalFinanced: "-",
    totalAvailable: "$1,26,000.00",
  },
  {
    id: 3,
    name: "Contract 3",
    status: "Pending",
    type: "Monthly",
    perPayment: "$3,000.00",
    totalFinanced: "-",
    totalAvailable: "$1,26,000.00",
  },
  {
    id: 4,
    name: "Contract 4",
    status: "Pending",
    type: "Monthly",
    perPayment: "$8,000.00",
    totalFinanced: "-",
    totalAvailable: "$1,26,000.00",
  },
];
interface PaymentDueDateType {
  dueDate:string,
  fromDays:string
}
export type MyPaymentType = {
  id: number;
  dueDate: PaymentDueDateType;
  status: string;
  expectedAmount: string;
  outstandingAmount: string;
};
export const MOCK_My_PAYMENT_DATA: MyPaymentType[] = [
  {
    id: 1,
    dueDate: {
      dueDate:"Mar 03 2021",
      fromDays:"31 day(s) from now"
    },
    status: "Pending",
    expectedAmount: "-$5,000.00",
    outstandingAmount: "$1,15,000.00",
  },
  {
    id: 2,
    dueDate: {
      dueDate:"Jun 03, 2021",
      fromDays:"62 day(s) from now"
    },
    status: "Pending",
    expectedAmount: "-$5,000.00",
    outstandingAmount: "$1,16,000.00",
  },
  {
    id: 3,
    dueDate: {
      dueDate:"Jul 03, 2021",
      fromDays:"92 day(s) from now"
    },
    status: "Pending",
    expectedAmount: "-$15,000.00",
    outstandingAmount: "$1,13,000.00",
  },
];

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-z]{2,}(?:\.[a-z]{2})?$/;
export const VALID_EMAIL = "please enter a valid email";
export const FORGOT_PASSWORD_PAGE_CAPTION =
  "No worries, we’ll send you link to your email id to reset your password";
export const ENTER_YOUR_EMAIL_ID = "Enter your email id";
export const WE_HAVE_MAIL_TO = "We have sent mail to";
export const RESET_PASSWORD_INSTRUCTIONS_TEXT =
  "with reset password instructions";
export const RESET_EMAIL_SENT = "Reset email sent";
export const RESET_PASSWORD = "Reset Password";
export const CONTINUE = "Continue";
export const GO_BACK_TO = "Go back to ";
export const LOGIN = "Login";
export const FORGOT_PASSWORD = "Forgot Password";
export const AVAILABLE_CREDIT = "Available credit";
export const MAX_INTEREST_RATE = "Max interest rate";
const userData = localStorage.getItem("userData");

export const BALANCE_DATA_CARD_PROPS: DataBlockProps[] = [
  {
    logoSrc: CalenderLogo,
    logoAlt: "calender-logo",
    iconSrc: InfoIcon,
    iconAlt: "info-icon",
    title: TERM_CAP,
    titleVariant: "body1",
    titleColor: theme.palette.text.secondary,
    caption: "12 months",
    captionVariant: "h2",
    captionColor: theme.palette.text.primary,
    titleInfoGap: "8px",
    titleCaptionGap: "8px",
  },
  {
    logoSrc: DocumentDownloadIcon,
    logoAlt: "document-download-logo",
    iconSrc: InfoIcon,
    iconAlt: "info-icon",
    title: AVAILABLE_CREDIT,
    titleVariant: "body1",
    titleColor: theme.palette.text.secondary,
    caption: formatAvailableCredit(80000),
    captionVariant: "h2",
    captionColor: theme.palette.text.primary,
    titleInfoGap: "8px",
    titleCaptionGap: "8px",
  },
  {
    logoSrc: PercentageSquareIcon,
    logoAlt: "percentage-square-logo",
    iconSrc: InfoIcon,
    iconAlt: "info-icon",
    title: MAX_INTEREST_RATE,
    titleVariant: "body1",
    titleColor: theme.palette.text.secondary,
    caption: "12.00%",
    captionVariant: "h2",
    captionColor: theme.palette.text.primary,
    titleInfoGap: "8px",
    titleCaptionGap: "8px",
  },
];

export const DUE_DATE_PROPS: DataBlockProps[] = [
  {
    logoSrc: Reciept,
    logoAlt: "reciept-logo",
    iconSrc: InfoIcon,
    iconAlt: "info-icon",
    title: "Due - May 03 2021",
    titleVariant: "body1",
    titleColor: theme.palette.text.secondary,
    caption: "$14,204.55 ",
    captionVariant: "h2",
    captionColor: theme.palette.text.primary,
    titleInfoGap: "8px",
    titleCaptionGap: "8px",
  },
];

export const OUTSTANDING_AMOUNT: DataBlockProps[] = [
  {
    logoSrc: Progress,
    logoAlt: "calender-logo",
    iconSrc: InfoIcon,
    iconAlt: "info-icon",
    title: "Outstanding Amount",
    titleVariant: "body1",
    titleColor: theme.palette.text.secondary,
    caption: "$170,454.55",
    captionVariant: "h2",
    captionColor: theme.palette.text.primary,
    titleInfoGap: "8px",
    titleCaptionGap: "8px",
  },
];
export const BANNER_CONSTANTS = {
  title: "Congratulations You are ready to start!",
  description: "You are approved for funding. We are ready to advice you upto",
  uptoAmount: "$8.8M",
  buttonName: "Learn More",
};

export const DOMAIN: string = process.env.REACT_APP_AUTH0_DOMAIN!
export const CLIENT_ID: string = process.env.REACT_APP_AUTH0_CLIENT_ID!
export const REDIRECT_URL = {
  redirect_uri: window.location.origin + "/homePage"
}
export const CASH_ACCELERATION_PAGE_HEADER = "Cash accleration";
export const CASH_ACCELERATION_PAGE_SUB_HEADER = "Place to create new cash kicks to run your business";
export const LAUNCH_A_NEW_CASHKICK = "Launch a new Cash Kick";

export const RESET_SCREEN_DATA={
  RESET_PASSWORD:'Enter Reset Code',
  RESET_CODE_INSTRUCTIONS:'Please enter reset code sent to your email to proceed further',
  CHANGE_PASSWORD:'Change Password',
  PLACEHOLDER_TEXT:'Enter Reset Code',
  PASSWORD_RULE:'Password must contain at least 7 letters and 1 number',
  BUTTON1_TEXT:'Reset Password',
  BUTTON2_TEXT:'Change Password',
  GO_BACK:'Go back to',
  LOGIN:'Login',
  VALID_PASSWORD: 'Please enter valid password',
  PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
}
export const LOGIN_FAILED = "Invalid user credentials"

export const NEW_CASHKICK_SUBTITLE="Let’s setup a new cash kick to power your Saas";
export const NEW_CASHKICK_TITLE="New cash kick"

export const EMAIL_SENT_TO = "Click on button below to proceed to login";
export const PASSWORD_STATE = "Password reset successful";
export const LOGIN_NOW_BUTTON_LABEL = "Login Now";
export const PASSWORD_DOESNOT_MATCH = "Please match with above password";
export const CASHKICK_LIMIT_EXCEEDED_MESSAGE = "100% provided credit limit utilized";
export const REQUEST_CREDIT_INCREASE="Request Credit increase";