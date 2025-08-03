import React from "react";
import {  Box, styled } from "@mui/material";
import ButtonComponent from "../../atoms/Button";
import { theme } from "../../../theme/theme";
import Typography from "../../atoms/Typography";
import banner from "../../../../public/assets/images/banner.svg";
import money from "../../../../public/assets/images/money.svg";

interface PropsType {
  title: string;
  description: string;
  uptoAmount: string;
  buttonName: string;
  buttonOnClick?: React.MouseEventHandler<HTMLButtonElement>;
}
interface StyledParentDivProps {
  backgroundImg: string;
}
const StyledImage = styled("img")({
  width: "100%",
  height: "auto",
  maxWidth: "30%",
  objectFit: "cover",
});
const StyledBox = styled(Box)({
  display: "flex",
  width:"56vw",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundSize: "100%",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "12px",
  paddingRight: "45px",
});
const StyledParentDiv = styled("div")<StyledParentDivProps>(
  ({ backgroundImg }) => ({
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: "no-repeat",
  })
);
const StyledContentDiv = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  padding:"32px",
  [theme.breakpoints.between("md", "lg")]: {
    maxWidth: "80%",
  },
}));
const StyledHeading = styled(Typography)(() => ({
  color: `${theme.palette.grey[400]}`,
  width: "15rem",
  padding: `${theme.spacing(0)} ${theme.spacing(0)} ${theme.spacing(0.3125)} ${theme.spacing(1.5)}`
}));
const StyledDescriptionContainer = styled("div")({
  width: "19rem",
  padding: `${theme.spacing(0)} ${theme.spacing(0)} ${theme.spacing(2.25)} ${theme.spacing(1.5)}`,
  fontWeight: "700",
});
const StyledDescription = styled(Typography)(() => ({
  color: `${theme.palette.text.primary}`,
}));
const StyledUptoAmount = styled(Typography)(() => ({
  color:`${theme.palette.text.primary}`,
  fontWeight: theme.typography.title.fontWeight,
}));
const styledButton = { borderRadius: "12px",
padding: `${theme.spacing(5)} ${theme.spacing(10)} ${theme.spacing(5)} ${theme.spacing(10)}`,
border: `1px solid ${theme.palette.grey[500]}`,
width: "11.1875rem",
height: "4.185rem",
"&:hover": {
  border: `1px solid ${theme.palette.grey[500]}`,
},
"&:focus": {
  border: `1px solid ${theme.palette.grey[500]}`,
},
textTransform: "none",
};
const Banner = (props: PropsType) => {
  const { title, description, uptoAmount, buttonName, buttonOnClick } = props;
  return (
    <StyledBox>
      <StyledParentDiv backgroundImg={money} data-testid="banner">
        <StyledContentDiv>
          {title && <StyledHeading variant="h2">{title}</StyledHeading>}
          <p>
            <StyledDescriptionContainer>
              {description && (
                <StyledDescription variant="body1" as={"span"}>
                  {description}
                </StyledDescription>
              )}
              {uptoAmount && (
                <StyledUptoAmount variant="body1" as={"span"}>
                  {" " + uptoAmount}
                </StyledUptoAmount>
              )}
            </StyledDescriptionContainer>
          </p>
          <ButtonComponent variant="outlined" onClick={buttonOnClick} sx={styledButton}  label={buttonName} textColor= {theme.palette.text.primary}>
          </ButtonComponent>
        </StyledContentDiv>
      </StyledParentDiv>
      <StyledImage src={banner}/>
      </StyledBox>
  );
};
export default Banner;
