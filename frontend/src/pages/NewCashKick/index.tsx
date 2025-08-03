import React, { useEffect, useState } from "react";
import { NAV_BAR_ITEMS } from "../../components/organisms/SideNav/NavBarUtils";
import NavBar from "../../components/organisms/SideNav";
import NewCashKickTemplate from "../../components/templates/NewCashKickTemplate";
import { Header } from "../../components/organisms/Header";
import { Box } from "@mui/material";
import {
  MOCK_CONTRACT_DATA,
  NEW_CASHKICK_SUBTITLE,
  NEW_CASHKICK_TITLE,
  YourContractsType,
} from "../../constants/index";
import { ChooseContracts } from "../../components/organisms/ChooseContracts";
import { IconTypography } from "../../components/molecules/IconTypography";
import arrow from "../../../public/assets/icons/arrow.svg";
import { theme } from "../../../src/theme/theme";
import { useNavigate } from "react-router-dom";
import { NameCashkick } from "../../components/organisms/CashKickName";
import CashKickSuccess from "../../components/organisms/CashkickSuccessModal";
import { generateRandomId } from "../../utils/helper";
import { CashKickContractsPropsType, CashKickProp } from "../../utils/interfaces/CashKick";
import { useUserContext } from "../../utils/ThemeContext";
import { createCashkickContract, createNewCashkick, updateAvailableCreditOfUser, updatePaymentsOfUser } from "../../services";
export const NewCashKick = () => {
  const navigate = useNavigate();
  const {currUser,handleUpdateAvailableCredit} = useUserContext();
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [selectedContracts, setSelectedContracts] = useState<
    YourContractsType[]
  >([]);
  const [newCashkickName, setNewCashkickName] = useState<string>("");
  const [areContractsSelected, setAreContractsSelected] = useState(false);
  const [nameCashKickModal, setNameCashKickModal] = useState(false);
  const [cashKickSuccessModal, setCashKickSuccessModal] = useState(false);

  const handleClick = () => {
    navigate("/homePage");
  };
  useEffect(() => {
    const totalPaymentAmount = selectedContracts.reduce(
      (total, contract) => total + (contract.partialAmount > 0 ? contract.partialAmount : contract.paymentAmount),
      0
    );
    setSelectedAmount(totalPaymentAmount);
  }, [selectedContracts]);
  const getAllSelectedContracts = (
    newValue: number,
    contracts: YourContractsType[]
  ): YourContractsType[] => {
    const sortedContracts = contracts
      .slice()
      .sort((a, b) => a.paymentAmount - b.paymentAmount);

    let totalPayment = 0;
    const selectedContracts: YourContractsType[] = [];

    for (const contract of sortedContracts) {
      if (totalPayment + contract.paymentAmount <= newValue) {
        selectedContracts.push(contract);
        totalPayment += contract.paymentAmount;
      } else {
        const remainingAmount = newValue - totalPayment;
        const updatedContract = {
          ...contract,
          partialAmount: remainingAmount,
        };
        selectedContracts.push(updatedContract);
        break;
      }
    }
    return selectedContracts;
  };

  const handleSlider = (event: Event, newValue: number) => {
    const validSelectedAmount = Math.min(newValue, currUser.availableCredit);
    setSelectedAmount(validSelectedAmount);
    const selectedContracts = getAllSelectedContracts(
      newValue,
      MOCK_CONTRACT_DATA
    );
    setSelectedContracts(selectedContracts);
  };

  const handleContractsSelectionChange = (
    selectedRows: YourContractsType[]
  ) => {
    setSelectedContracts(selectedRows);
  };

  const handleResetButton = () => {
    setSelectedContracts([]);
    setSelectedAmount(0);
  };
  const handleReviewCreditButton = () => {
    setAreContractsSelected(true);
  };
  const handleNewCashkickName = (newCashkickName: string) => {
    setNewCashkickName(newCashkickName);
  };
  const handleNameCashKickModal = () => {
    setNameCashKickModal(false);
    setCashKickSuccessModal(true);
  };
  const handleCancelCreateCashkick = () => {
    navigate("/homePage");
  }
  const handleCloseNameCashkick = () => {
    setNameCashKickModal(false);
    setCashKickSuccessModal(false);
  }

  const handleCreateCashkick = async() => {
    await createCashkick()
    navigate("/cashAcceleration",{state:{activeTab:2}});
  }
   
  const createCashkick = async() => {
    try{
      
      const newCashkickData:CashKickProp = {
        name: newCashkickName,
        status: "Pending",
        maturity: new Date(),
        totalFinanced: selectedAmount + selectedAmount*0.12,
        totalReceived: selectedAmount,
        userId: currUser.id
      }
      const response = await createNewCashkick(newCashkickData);
      const caskickContractsData:CashKickContractsPropsType[] = selectedContracts.map((contract:YourContractsType) => {
        return {
          id:generateRandomId(),
          cashkickId:response.data.id,
          contractId: contract.id
        }
      })
      await createCashkickContract(caskickContractsData);

      const updatedCreditBalance = currUser.availableCredit - (selectedAmount + selectedAmount*0.12)

      await updateAvailableCreditOfUser(updatedCreditBalance,currUser.id);
      handleUpdateAvailableCredit(currUser.availableCredit - (selectedAmount + selectedAmount*0.12));

      const newUpdatedOutstandingAmount = 880000 - updatedCreditBalance;

      await updatePaymentsOfUser(currUser.id,newUpdatedOutstandingAmount);
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <>
      {" "}
      <NewCashKickTemplate
        sideNav={
          <NavBar
            activeElement={NAV_BAR_ITEMS[1].title}
            navBarItems={NAV_BAR_ITEMS}
          />
        }
        headerContent={
          <Header title={NEW_CASHKICK_TITLE} subtitle={NEW_CASHKICK_SUBTITLE} />
        }
        bodyContent={
          <>
            <Box
              sx={{
                backgroundColor: "#201F24",
                color: theme.palette.text.primary,
                borderRadius: "12px",
                width: "4.5rem",
                height: "1.5rem",
                paddingTop: "6px",
                paddingLeft: "6px",
                cursor: "pointer",
                marginBottom: "3rem",
              }}
              onClick={handleClick}
            >
              <IconTypography
                label={"Back"}
                startIconSrc={arrow}
                variant="button1"
                gap="8px"
                labelColor="#E8E7F0"
              />
            </Box>

            <ChooseContracts
              onSelectedContractsChange={handleContractsSelectionChange}
              areContractsSelected={areContractsSelected}
              selectedContracts={selectedContracts}
              selectedAmount={selectedAmount}
              onSliderChange={handleSlider}
              handleResetButton={handleResetButton}
              openNamecashKickModal={() => setNameCashKickModal(true)}
              handleReviewCreditButton={handleReviewCreditButton}
            />
          </>
        }
      />
      <NameCashkick
        onNameChange={handleNewCashkickName}
        isOpen={nameCashKickModal}
        handleSubmit={handleNameCashKickModal}
        handleClose={handleCloseNameCashkick}
      />
      <CashKickSuccess isOpen={cashKickSuccessModal}
            handleClose={handleCancelCreateCashkick}
            handleViewCashKickClick={handleCreateCashkick}/>
    </>
  );
};
