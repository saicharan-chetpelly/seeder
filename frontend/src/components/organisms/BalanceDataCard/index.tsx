import React from "react";
import { Box, Grid, Stack, styled } from "@mui/material";
import { DataBlock, DataBlockProps } from "../../molecules/DataBlock";
import NewCashkickCard from "../../molecules/NewCashKickCard";
import { theme } from "../../../theme/theme";
import { useUserContext } from "../../../utils/ThemeContext";
import { formatAvailableCredit, separateNumberWithCommas } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";

const StyledOuterStack = styled(Stack)({
  flexDirection: "row",
  height: "100%",
  gap: "1.46vw",
  justifyContent: "space-between",
});

const StyledBox = styled(Box)(({ isCard }: { isCard: boolean }) => ({
  width: "56vw",
  height:"auto",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.grey[300]}`,
  background: theme.palette.elevation.color1,
  padding: `${!isCard ? "3.32vw 2.34vw 3.32vw 2.34vw" : ""}`,
}));
interface BalanceDataCardProps {
  cardsData?: DataBlockProps[];
  card?: React.ReactNode;
  balance?:number;
}
export const BalanceDataCard = ({ cardsData, card,balance }: BalanceDataCardProps) => {
  const navigate = useNavigate();
  const {currUser} = useUserContext();
  const handleCreateNewCashkick = () => {
    navigate("/newCashKick");
  }
  return (
    <StyledOuterStack>
      <StyledBox isCard={card!=undefined}>
        <Grid
          container
          justifyContent={"space-between"}
        >
          {cardsData?.map((card,index) => (
            <Grid item md={3} xs={12} sm={1} key={card.title}>
              <DataBlock
                logoSrc={card.logoSrc}
                logoAlt={card.iconAlt}
                iconSrc={card.iconSrc}
                iconAlt={card.iconAlt}
                title={card.title}
                titleVariant={card.titleVariant}
                titleColor={card.titleColor}
                titleSx={card.titleSx}
                caption={index == 1 && balance ? formatAvailableCredit(balance) : card.caption}
                captionVariant={card.captionVariant}
                captionSx={card.captionSx}
                captionColor={card.captionColor}
                titleInfoGap={card.titleInfoGap}
                titleCaptionGap={card.titleCaptionGap}
              />
            </Grid>
          ))}
          {card}
        </Grid>
      </StyledBox>

      <NewCashkickCard
        cashKickHeader="Launch a new Cash Kick"
        balanceAmount= {separateNumberWithCommas(currUser.availableCredit)}
        buttonLabel={"New Cash Kick"}
        handleClick={handleCreateNewCashkick}
        disableButton={currUser.availableCredit<=0}
      />
    </StyledOuterStack>
  );
};
