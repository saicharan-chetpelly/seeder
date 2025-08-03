import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Stack, styled } from "@mui/material";
import { theme } from "../../../theme/theme";
import ButtonComponent from "../../atoms/Button";
import TypographyComponent from "../../atoms/Typography";
import InfoCircle from "../../../../public/assets/images/info-circle.svg";
import {
  SUMMARY,
  TERM,
  SELECTED_CONTRACTS,
  PAY_BACK_AMOUNT,
  RATE,
  TOTAL_PAYOUT,
  SELECTED,
} from "../../../constants/index";
import Icon from "../../atoms/Image";
import { CustomSlider } from "../../atoms/Slider";
import { formatAmount } from "../../../utils/functions";

export interface Props {
  term?: number;
  selectedcontracts?: number;
  paybackamount?: string;
  rate?: string;
  payout?: string;
  handleClick?: () => void;
  review?: boolean;
  tableLength?: number;
  balanceAmount?: string;
  maxValue?: number;
  value: number;
  onSliderChange?: (event: Event, newValue: any) => void;
  handleResetButton?: () => void;
  handleReviewCreditButton?: () => void;
  areContractsSelected: boolean;
  openNamecashKickModal?: () => void;
}
interface ResuableSummaryCardProps {
  value:number;
}
const StyledGrid = styled(Grid)({
  backgroundColor: theme.palette.elevation.color1,
  width: "24.89vw",
  borderRadius: 12,
  marginLeft: "0.6rem",
});
const Grid2 = styled(Grid)({
  paddingTop: 17,
});
const Grid21 = styled(Grid)({
  paddingTop: 8,
});
const Grid3 = styled(Grid)({
  paddingTop: 10,
  paddingLeft: 32,
});
const Grid4 = styled(Grid)({
  paddingTop: 13,
});
const Grid5 = styled(Grid)({
  paddingTop: 20,
  paddingLeft: 32,
  paddingBottom: 32,
});
const Grid6 = styled(Grid)({
  paddingTop: 10,
  paddingLeft: 32,
  paddingRight: 41,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  display: "flex",
});
const Grid7 = styled(Grid)({
  paddingTop: 10,
  paddingBottom: 0,
  paddingLeft: 32,
  paddingRight: 41,
});
const Division = styled(Divider)({
  backgroundColor: theme.palette.grey[600],
});

const StyledButton = styled(ButtonComponent)({
  height: 60,
  width: "91%",
  borderRadius: 12,
  color: theme.palette.grey[500],
  textTransform: "none",
  "&:hover": {
    background: theme.palette.primary.main,
  },
  "&.Mui-disabled": {
    color: theme.palette.text.disabled,
    background: theme.palette.primary[600],
  },
});

const StyledButton2 = styled(ButtonComponent)({
  height: 31,
  width: 65,
  color: theme.palette.text.secondary,
  textTransform: "none",
  borderRadius: 12,
  backgroundColor: theme.palette.elevation.color2,
  "&:hover": {
    background: theme.palette.elevation.color2,
  },
});

export const ResuableSummaryGrid = (props: ResuableSummaryCardProps) => {
  return (
    <>
      <Grid3 item xs={7}>
        <TypographyComponent
          variant="body1"
          color={theme.palette.text.disabled}
          children={PAY_BACK_AMOUNT}
        />
      </Grid3>
      <Grid6 item xs={5}>
        <TypographyComponent
          variant="body1"
          color={theme.palette.text.primary}
          children={`$${formatAmount(props.value)}`}
        />
      </Grid6>
      <Grid3 item xs={7}>
        <TypographyComponent
          variant="body1"
          color={theme.palette.text.disabled}
          children={RATE}
        />
      </Grid3>
      <Grid6 item xs={5}>
        <TypographyComponent
          variant="caption"
          color={theme.palette.text.disabled}
          children={`(12.00%)`}
        />
        &nbsp;&nbsp;
        <TypographyComponent
          variant="body1"
          color={theme.palette.text.primary}
          children={`$${formatAmount(props.value * 0.12)}`}
        />
      </Grid6>
    </>
  );
};

const SummaryCard = (props: Props) => {
  const [tableCount, setTableCount] = useState(0);

  useEffect(() => {
    setTableCount(props.selectedcontracts!);
  }, [props.selectedcontracts]);
  return (
    <Box data-testid="summary-card">
      <StyledGrid>
        <Grid2 container>
          <Grid3 item xs={5}>
            <TypographyComponent
              variant="h2"
              color={theme.palette.text.primary}
              children={SUMMARY}
            />
          </Grid3>
          <Grid4 item xs={1}>
            <Icon src={InfoCircle} alt={"img"} height="20px" width="20px" />
          </Grid4>
        </Grid2>
        <Grid2 container>
          <Grid3 item xs={7}>
            <TypographyComponent
              variant="body1"
              color={theme.palette.text.disabled}
              children={TERM}
            />
          </Grid3>
          <Grid6 item xs={5}>
            <TypographyComponent
              variant="body1"
              color={theme.palette.text.primary}
              children={`${props.term} months`}
            />
          </Grid6>
          <Grid3 item xs={7}>
            <TypographyComponent
              variant="body1"
              color={theme.palette.text.disabled}
              children={SELECTED_CONTRACTS}
            />
          </Grid3>
          <Grid6 item xs={5}>
            {props.review ? (
              <TypographyComponent
                variant="body1"
                color={theme.palette.text.primary}
                children={`${tableCount}`}
              />
            ) : (
              <TypographyComponent
                variant="body1"
                color={theme.palette.text.primary}
                children={`${props.selectedcontracts}`}
              />
            )}
          </Grid6>
          <Grid>
            {props.review ? (
              <Grid2 container>
                <Grid3 item xs={7}>
                  <TypographyComponent
                    variant="body1"
                    color={theme.palette.text.disabled}
                    children="Slide to autoselect"
                  />
                </Grid3>
                <Grid6 item xs={5}>
                  <StyledButton2
                    data-testid="reset"
                    label="Reset"
                    variant="text"
                    onClick={props.handleResetButton}
                    textColor={theme.palette.text.secondary}
                    disabled={props.value <= 0}
                  />
                </Grid6>
                <Grid3 item xs={12}>
                  <CustomSlider
                    data-testid="slider-element"
                    value={props.value}
                    max={props.maxValue}
                    onChange={props.onSliderChange}
                  />
                </Grid3>
                <Grid3 item>
                  <Stack direction="row">
                    <TypographyComponent
                      variant="body1"
                      color={theme.palette.primary[400]}
                      children={`$${formatAmount(props.value)} `}
                    />
                    &nbsp;
                    <TypographyComponent
                      variant="body1"
                      color={theme.palette.text.disabled}
                      children={SELECTED}
                    />
                    &nbsp;
                    <TypographyComponent
                      variant="caption2"
                      color={theme.palette.text.secondary}
                      children={`${props.balanceAmount}`}
                    />
                  </Stack>
                </Grid3>
                <ResuableSummaryGrid value={props.value}/>
              </Grid2>
            ) : (
              <Grid21 container>
                <ResuableSummaryGrid value={props.value}/>
              </Grid21>
            )}
          </Grid>
        </Grid2>
        <Grid7>
          <Division />
        </Grid7>
        <Grid2 container>
          <Grid3 item xs={7}>
            <TypographyComponent
              variant="h3"
              color={theme.palette.text.disabled}
              children={TOTAL_PAYOUT}
            />
          </Grid3>
          <Grid6 item xs={5}>
            <TypographyComponent
              variant="h2"
              color={theme.palette.text.primary}
              children={`$${formatAmount(
                props.value + parseFloat((0.12 * props.value).toFixed(2))
              )}`}
            />
          </Grid6>
        </Grid2>
        <Grid item>
          {props.review ? (
            <Grid5 item>
              <StyledButton
                data-testid="submitButton1"
                label={
                  props.areContractsSelected
                    ? "Submit Your Credit"
                    : "Review your credit"
                }
                variant="contained"
                onClick={
                  props.areContractsSelected
                    ? props.openNamecashKickModal
                    : props.handleReviewCreditButton
                }
                textColor={theme.palette.grey[500]}
                disabled={props.value <= 0}
              />
            </Grid5>
          ) : (
            <Grid5 item>
              <StyledButton
                data-testid="submitButton2"
                onClick={
                  props.areContractsSelected
                    ? props.openNamecashKickModal
                    : props.handleReviewCreditButton
                }
                label="Submit Your Credit"
                variant="contained"
                textColor={theme.palette.grey[500]}
              />
            </Grid5>
          )}
        </Grid>
      </StyledGrid>
    </Box>
  );
};
export default SummaryCard;
