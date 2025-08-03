import { Box, Stack, Typography, styled } from "@mui/material";
import { theme } from "../../../theme/theme";
import ButtonComponent from "../../atoms/Button";
import TypographyComponent from "../../atoms/Typography";
import { CASH_ADVANCE, HAVE_UPTO } from "../../../constants/index";

export interface NewCashkickCardProps {
  balanceAmount: string;
  handleClick?: () => void;
  cashKickHeader?: string;
  buttonLabel: string;
  disableButton?:boolean;
}
const StyledButton = styled(ButtonComponent)({
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.Mui-disabled": {
    color: theme.palette.text.disabled,
    background: theme.palette.primary[600],
  },
});
const NewCashkickCard = (props: NewCashkickCardProps) => {
  return (
    <Stack
      bgcolor={theme.palette.elevation.color1}
      direction={"column"}
      alignItems={"center"}
      spacing={theme.spacing(5)}
      height="100%"
      border={`1px solid ${theme.palette.grey[300]}`}
      borderRadius={theme.spacing(3)}
      justifyContent={"center"}
      paddingLeft="2.34vw"
      paddingRight="2.34vw"
    >
      <Box>
      <Stack spacing={theme.spacing(3)}>
        <Box marginBottom={"12px"}>
          <TypographyComponent variant="h2" color={theme.palette.text.primary}>
            {props.cashKickHeader}
          </TypographyComponent>
        </Box>
        <Box>
          <TypographyComponent
            variant="body1"
            color={theme.palette.text.disabled}
          >
            {HAVE_UPTO}
            <Typography
              component="span"
              color={theme.palette.text.secondary}
              variant="body2"
            >
              {props.balanceAmount}
            </Typography>{" "}
            {CASH_ADVANCE}
          </TypographyComponent>
        </Box>
      </Stack>
      <StyledButton
        label={props.buttonLabel}
        fullWidth
        textColor={theme.palette.grey[500]}
        textVariant="button1"
        sx={{
          textTransform: "none",
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
          padding: `${theme.spacing(5)} ${theme.spacing(10)}`,
          borderRadius: theme.spacing(3),
          marginTop:"20px"
        }}
        data-testid="cashKickButton"
        onClick={props.handleClick}
        disabled={props.disableButton}
      ></StyledButton>
      </Box>
    </Stack>
  );
};

export default NewCashkickCard;
