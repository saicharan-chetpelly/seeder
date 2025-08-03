import React from "react";
import { Box, Grid, styled } from "@mui/material";
import { DataBlock, DataBlockProps } from "../../molecules/DataBlock";
import { theme } from "../../../theme/theme";
import { separateNumberWithCommas } from "../../../utils/helper";
import Typography from "../../atoms/Typography";



const StyledBox = styled(Box)(({ isCard }: { isCard: boolean }) => ({
  width: "45%",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.grey[300]}`,
  background: theme.palette.elevation.color1,
  padding: `${!isCard ? "32px 2.34vw 32px 2.34vw" : ""}`,
}));
interface BalanceDataCardProps {
    cardData?: DataBlockProps[];
  card?: React.ReactNode;
  outstandingAmount?:number;
  daysLeftToPay?:string;
}
const TypographySx = {
  backgroundColor: theme.palette.accent.pink,
  color: theme.palette.background.default,
  borderRadius: "4px",
  padding: "4px 8px",
  position: "absolute",
  right:0,
  top:0
};
export const DataBlocks = ({ cardData, card,outstandingAmount,daysLeftToPay }: BalanceDataCardProps) => {
  return (
   
      <StyledBox isCard={card!=undefined}>
        <Grid
          container
          gap="12px"
          position={"relative"}
          height={"100%"}
        >
          {cardData?.map((card) => (
            <Grid item key={card.title}>
              <DataBlock
                titleCaptionGap={card.titleCaptionGap}
                logoSrc={card.logoSrc}
                logoAlt={card.iconAlt}
                iconSrc={card.iconSrc}
                iconAlt={card.iconAlt}
                title={card.title}
                titleVariant={card.titleVariant}
                titleColor={card.titleColor}
                titleSx={card.titleSx}
                caption={outstandingAmount ? separateNumberWithCommas(outstandingAmount) : card.caption}
                captionVariant={card.captionVariant}
                captionSx={card.captionSx}
                captionColor={card.captionColor}
                titleInfoGap={card.titleInfoGap}
               
              />
              {daysLeftToPay && (
                  <Typography
                    variant="body2"
                    children={daysLeftToPay}
                    sx={TypographySx}
                  />
              )}
            </Grid>
          ))}
          {card}
        </Grid>
      </StyledBox>

   
  );
};
