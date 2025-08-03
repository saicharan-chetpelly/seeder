import React from "react";
import { Stack, styled } from "@mui/material";
import { YourContractsTable } from "../YourContractsTable";
import { MOCK_CONTRACT_DATA, YourContractsType } from "../../../constants";
import SummaryCard from "../SummaryCard";
import { separateNumberWithCommas } from "../../../utils/helper";
import { useUserContext } from "../../../utils/ThemeContext";

interface ChooseContractsProps {
  onSelectedContractsChange: (selectedContracts: YourContractsType[]) => void;
  areContractsSelected: boolean;
  selectedContracts: YourContractsType[];
  selectedAmount: number;
  onSliderChange: (event: Event, newValue: number) => void;
  handleResetButton:() => void;
  handleReviewCreditButton?: () => void;
  openNamecashKickModal?:() => void;
}

const StyledBox = styled(Stack)({
  flexDirection: "row",
  gap: "20px",
});

export const ChooseContracts = ({
  onSelectedContractsChange,
  areContractsSelected,
  selectedContracts,
  selectedAmount,
  onSliderChange,
  handleResetButton,
  handleReviewCreditButton,
  openNamecashKickModal
}: ChooseContractsProps) => {
  const {currUser} = useUserContext()
  return (
    <StyledBox>
      <YourContractsTable
        contractsData={MOCK_CONTRACT_DATA}
        selectedRows={selectedContracts}
        onSelectedContractsChange={onSelectedContractsChange} 
        areContractsSelected={areContractsSelected}      />
      <SummaryCard
        term={12}
        selectedcontracts={selectedContracts.length}
        review={!areContractsSelected}
        balanceAmount={separateNumberWithCommas(currUser.availableCredit)}
        areContractsSelected={areContractsSelected}
        maxValue={currUser.availableCredit}
        value={selectedAmount}
        onSliderChange={onSliderChange}
        handleResetButton={handleResetButton}
        openNamecashKickModal={openNamecashKickModal}
        handleReviewCreditButton={handleReviewCreditButton}
      />
    </StyledBox>
  );
};
