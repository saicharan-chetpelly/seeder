import { screen, render, fireEvent } from "@testing-library/react";
import { HomePage } from ".";
import * as services from "../../services";
import { BrowserRouter } from "react-router-dom";
const mockUserResponse = {
  data: [
    {
      id: 1,
      name: 'Sai Charan Chetpelly',
      email: 'saicharan.chetpelly@gmail.com',
      password: 'Password@123',
      availableCredit:880000
    }
  ],
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};
const mockUser = {
  data: [
  ],
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};
const mockLoginResponse = {
  data: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWljaGFyYW5AZ21haWwuY29tIiwiaWF0IjoxNjk1MTEzMjk4LCJleHAiOjE2OTUxMTUwOTh9.aDw40IY1w-46yoL9cH8yZ6NG_vIuD0XCnuVXZDopuq4',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};
const mockUserFundResponse = {
  "data": {
    "id": 17,
    "availableCredit": 880000,
    "maxInterestRate": 12,
    "termLength": 12
},
"status": 200,
"statusText": "OK",
}
const mockUserErrorResponse = {
  message: "Request failed with status code 400",
  name: "AxiosError",
  stack:
    "AxiosError: Request failed with status code 400\n    at settle (http://localhost:3000/bundle.js:121059:12)\n    at XMLHttpRequest.onloadend (http://localhost:3000/bundle.js:119550:66)",
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ["xhr", "http"],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: "application/json, text/plain, */*",
      "Access-Control-Allow-Origin": "*",
    },
    baseURL: "https://be-bc135.bootcamp64.tk/api",
    method: "get",
    url: "/user/email?email=saicharan.chetpelly@gmail.com",
  },
  code: "ERR_BAD_REQUEST",
  status: 400,
}
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      given_name: 'Sai Charan',
      family_name: 'Chetpelly',
      nickname: 'saicharan.chetpelly',
      name: 'Sai Charan Chetpelly',
      picture:
        'https://lh3.googleusercontent.com/a/AAcHTte9StptTJ32XuxH7PCoIyvTsUFX0VdiY9MuyU0254bg=s96-c',
      locale: 'en',
      updated_at: '2023-08-06T17:01:47.173Z',
      email: 'saicharan.chetpelly@gmail.com',
      email_verified: true,
      sub: 'google-oauth2|109240394770328938738'
    }
  })
}));
jest.spyOn(services, 'login').mockResolvedValue(mockLoginResponse as any);
jest.spyOn(services, "getUserFundsById").mockResolvedValue(mockUserFundResponse as any);

describe("CashAcceleration page component testcases", () => {
  jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockUser as any);
jest.spyOn(services, 'registerUser').mockResolvedValue(mockUserResponse as any);
  it("should render navbar and content as expected", () => {
    jest
      .spyOn(services, "getAllPaymentsOfUser")
      .mockResolvedValue(mockResponsePaymentData as any);
    render(<BrowserRouter><HomePage /></BrowserRouter>);
    const appName = screen.getByText("Seeder");
    expect(appName).toBeInTheDocument();
    
  });
  it("should render balance datacard of user", () => {
    jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockUserResponse as any);
jest.spyOn(services, 'registerUser').mockResolvedValue(mockUserResponse as any);
    jest
      .spyOn(services, "getAllPaymentsOfUser")
      .mockResolvedValue(mockResponsePaymentData as any);
    render(<BrowserRouter><HomePage /></BrowserRouter>);
    const balance = screen.getByText("New Cash Kick");
    expect(balance).toBeInTheDocument();
  });
});

const mockResponsePaymentData = {
  data: [
    {
      userId: 1,
      dueDate: "2023-12-13T06:19:34.516Z",
      status: "Upcoming",
      outstandingAmount: 411983.5104,
      expectedAmount: 37453.0464,
      id: 1,
    },
  ],
  status: 200,
};


describe("CashAcceleration page component testcases", () => {
  it("should render navbar and content as expected", () => {
    jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockUserResponse as any);
jest.spyOn(services, 'registerUser').mockResolvedValue(mockUserResponse as any);
    jest
      .spyOn(services, "getAllPaymentsOfUser")
      .mockResolvedValue(mockResponsePaymentData as any);
   
  });
  it("when user logs in first time using auth0", () => {
    jest
  .spyOn(services, 'getUserByEmail')
  .mockRejectedValueOnce(mockUserErrorResponse as any);
jest.spyOn(services, 'registerUser').mockResolvedValue(mockUserResponse as any);
    jest
      .spyOn(services, "getAllPaymentsOfUser")
      .mockResolvedValue(mockResponsePaymentData as any);
    render(<BrowserRouter><HomePage /></BrowserRouter>);
    const balance = screen.getByText("New Cash Kick");
    expect(balance).toBeInTheDocument();
   
  });
  it("should render balance datacard of user", () => {
    jest
  .spyOn(services, 'getUserByEmail')
  .mockResolvedValue(mockUserResponse as any);
jest.spyOn(services, 'registerUser').mockResolvedValue(mockUserResponse as any);
    jest
      .spyOn(services, "getAllPaymentsOfUser")
      .mockResolvedValue(mockResponsePaymentData as any);
    
    render(<BrowserRouter><HomePage /></BrowserRouter>);
    const balance = screen.getByText("New Cash Kick");
    expect(balance).toBeInTheDocument();
    const createCashkickBtn = screen.getByRole("button",{name:"New Cash Kick"});
    fireEvent.click(createCashkickBtn)
  });
  

});