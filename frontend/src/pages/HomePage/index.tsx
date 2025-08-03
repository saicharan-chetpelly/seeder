import React, { useEffect, useState } from "react";
import { NAV_BAR_ITEMS } from "../../components/organisms/SideNav/NavBarUtils";
import NavBar from "../../components/organisms/SideNav";
import HomeTemplate from "../../components/templates/HomeTemplate";
import { Header } from "../../components/organisms/Header";

import {
  ADD_NEW_CASHKICK_BUTTON,
  CASHKICKHEADER,
  CASHKICK_LIMIT_EXCEEDED_MESSAGE,
  DUE_DATE_PROPS,
  MyPaymentType,
  OUTSTANDING_AMOUNT,
  REQUEST_CREDIT_INCREASE,
} from "../../constants";

import { MyPaymentTable } from "../../../src/components/organisms/YourPaymentTable";
import { Stack } from "@mui/material";
import { DataBlocks } from "../../components/organisms/DataBlock";
import NewCashkickCard from "../../components/molecules/NewCashKickCard";
import { usePayment } from "./hooks";
import { useUserContext } from "../../utils/ThemeContext";
import {
  calculateNoOfDaysToPay,
  formatDate,
  getTodaysDateYear,
  separateNumberWithCommas,
} from "../../utils/helper";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserByEmail, getUserFundsById, login, registerUser } from "../../services";
import Banner from "../../components/molecules/CongratulationCard";
import { useGreeting } from "./greeting";
import { theme } from "../../theme/theme";
import { useNavigate } from "react-router-dom";


export const HomePage = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const { currUser, handleUpdateCurrUser } = useUserContext();
  const { greeting } = useGreeting();
  const [dueDate, setDueDate] = useState<string>();
  const [outstandingAmount, setOutstandingAmount] = useState<number>(0);
  const [amountToPay, setAmountToPay] = useState<number>(0);
  const [daysLeftToPay, setDaysLeftToPay] = useState<string>("");
  const { fetchAllPaymentsOfUser, payments, loading, error, connected } =
    usePayment();
  useEffect(() => {
      fetchAllPaymentsOfUser(currUser.id);
  }, []);

  useEffect(() => {
    if (payments.length > 0) {
      const firstPaymentToPay: MyPaymentType = payments[0];
      setDueDate(formatDate(firstPaymentToPay.dueDate.dueDate));
      setOutstandingAmount(880000 - currUser.availableCredit);
      setAmountToPay((880000 - currUser.availableCredit) / 12);
      setDaysLeftToPay(calculateNoOfDaysToPay(new Date(firstPaymentToPay.dueDate.dueDate)));
    }
  }, [payments]);

  const modifiedDueDateProps = DUE_DATE_PROPS.map((item) => ({
    ...item,
    title: `Due - ${dueDate}`,
    caption: separateNumberWithCommas(amountToPay),
  }));

  const registerUserIfNeeded = async () => {
    try {
      if (user?.email && user?.name) {
        const email = user.email;
        const userResponse = await getUserByEmail(email);
        if(userResponse.status == 200){
          const loginResponse = await login(user.email, 'Password@123');
          const userFundId = userResponse.data.userFundDashboardId
          const userFundResponse = await getUserFundsById(userFundId,loginResponse.data);
          console.log("userFundResponse",userFundResponse)
          handleUpdateCurrUser(
            userResponse.data.id,
            userResponse.data.name,
            userResponse.data.email,
            userFundResponse.data.availableCredit
          );
        }
        const response = await login(email, 'Password@123');
        localStorage.setItem("token",response.data);
      }
    } catch (error:any) {
      console.log(error)
      if (user?.email && user?.name) {
        try {
          await registerUser({
            name: user.name,
            email: user.email,
            password: "Password@123"
          });
          const userResponse = await getUserByEmail(user.email);
          console.log("userResponse catch",userResponse)
          if(userResponse.status == 200){
            const loginResponse = await login(user.email, 'Password@123');
            const userFundId = userResponse.data.userFundDashboardId
            const userFundResponse = await getUserFundsById(userFundId,loginResponse.data);
            console.log("userFundResponse catch",userFundResponse)
            handleUpdateCurrUser(
              userResponse.data.id,
              userResponse.data.name,
              userResponse.data.email,
              userFundResponse.data.availableCredit
            );
          }
          const response = await login(user.email, 'Password@123');
          localStorage.setItem("token",response.data);
        } catch (error) {
          console.log('Registration error:', error);
        }
      }
    }
  };
  const handleCreateNewCashkick = () => {
    navigate("/newCashKick");
  }
  useEffect(() => {
    registerUserIfNeeded();
  }, [user]);

  return (
    <HomeTemplate
      sideNav={
        <NavBar
          activeElement={NAV_BAR_ITEMS[0].title}
          navBarItems={NAV_BAR_ITEMS}
        />
      }
      headerContent={<Header title={greeting} subtitle={getTodaysDateYear()} />}
      bodyContent={
        

          <Stack
            direction={"row"}
            gap={"1.46vw"}
            height={"259px"}
            alignItems={"center"}
          >
            {payments.length > 0 ? (
              <>
                <DataBlocks cardData={modifiedDueDateProps} daysLeftToPay={payments.length>0 ? daysLeftToPay : undefined}/>
                <DataBlocks
                  cardData={OUTSTANDING_AMOUNT}
                  outstandingAmount={outstandingAmount}
                />
              </>
            ) : (
              <Banner
                title={"Congratulations You are ready to start!"}
                description={
                  "You are approved for funding. We are ready to advice you upto"
                }
                uptoAmount={"$8.8M"}
                buttonName={"Learn More"}
              />
            )}
            <NewCashkickCard
              cashKickHeader={
                currUser.availableCredit > 0
                  ? CASHKICKHEADER
                  : CASHKICK_LIMIT_EXCEEDED_MESSAGE
              }
              balanceAmount={separateNumberWithCommas(currUser.availableCredit)}
              buttonLabel={
                currUser.availableCredit > 0
                  ? ADD_NEW_CASHKICK_BUTTON
                  : REQUEST_CREDIT_INCREASE
              }
              handleClick={handleCreateNewCashkick}
            />
          </Stack>
        
      }
      footerContent={
        <MyPaymentTable
          paymentData={payments}
          isLoading={loading}
          isError={error}
          isConnected={connected}
        />
      }
    />
  );
};