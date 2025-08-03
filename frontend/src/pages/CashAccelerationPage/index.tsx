import React, { useEffect } from "react";
import { NAV_BAR_ITEMS } from "../../components/organisms/SideNav/NavBarUtils";
import NavBar from "../../components/organisms/SideNav";
import HomeTemplate from "../../components/templates/HomeTemplate";
import { Header } from "../../components/organisms/Header";
import { BalanceDataCard } from "../../components/organisms/BalanceDataCard";
import {
  BALANCE_DATA_CARD_PROPS,
  CASH_ACCELERATION_PAGE_HEADER,
  CASH_ACCELERATION_PAGE_SUB_HEADER,
} from "../../constants";
import CashAcceleration from "../../components/organisms/Tab";
import { useCashkick } from "./hooks";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../utils/ThemeContext";

export const CashAccelerationPage = () => {
  const {currUser} = useUserContext();
  const { state } = useLocation();
  const { activeTab } = state || {};
  const { fetchAllCashkicksOfUser, cashkicks,fetchAllContractsOfUser,contracts,error,loading,connected } = useCashkick(currUser.id);
  useEffect(() => {
    fetchAllCashkicksOfUser();
    fetchAllContractsOfUser();
  }, []);
  return (
    <HomeTemplate
      sideNav={
        <NavBar
          activeElement={NAV_BAR_ITEMS[1].title}
          navBarItems={NAV_BAR_ITEMS}
        />
      }
      headerContent={
        <Header
          title={CASH_ACCELERATION_PAGE_HEADER}
          subtitle={CASH_ACCELERATION_PAGE_SUB_HEADER}
        />
      }
      bodyContent={<BalanceDataCard cardsData={BALANCE_DATA_CARD_PROPS} balance={currUser.availableCredit}/>}
      footerContent={<CashAcceleration myCashkicksData={cashkicks} isLoading={loading} isError={error} isConnected={connected} myContractsData={contracts} activeTab={activeTab || 1}/>}
    />
  );
};
