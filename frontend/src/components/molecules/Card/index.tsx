import { Box, Paper, Stack, styled } from "@mui/material";
import { theme } from "../../../theme/theme";
import React from "react";
import Typography from "../../atoms/Typography/index";
import Image from "../../atoms/Image/index";

export interface EmailSentCardProps {
  email?: string;
  emailSentTo?: string;
  resetPasswordData?: string;
  passwordState: string;
  tickIcon: string;
}

const StyledPaper = styled(Paper)({
  padding: theme.spacing(6),
  paddingRight:"0px",
  backgroundColor: theme.palette.elevation.color1,
  borderRadius: theme.spacing(3),
  borderColor: theme.palette.grey[300],
});

const EmailSentCard: React.FC<EmailSentCardProps> = ({
  email,
  emailSentTo,
  resetPasswordData,
  passwordState,
  tickIcon
}) => {
  return (
    <StyledPaper elevation={1}>
      <Box>
        <Stack direction={"row"} spacing={2}>
          <Box>
            <Image src={tickIcon} alt="TickCircle"/>
          </Box>
          <Box width={"100%"}>
            <Stack spacing={"2px"}>
              <Box>
                <Typography variant="h3" color={theme.palette.text.primary}>
                  {passwordState}
                </Typography>
              </Box>
              <Box>
                <Typography
                  color={theme.palette.text.disabled}
                  data-testid="emailsentto"
                  variant="body2"
                >
                  {emailSentTo}
                  {email && (
                    <Box
                      component={"span"}
                      display={"inline"}
                      color={theme.palette.primary[400]}
                    >
                      {" " + email + " "}
                    </Box>
                  )}
                  {resetPasswordData}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </StyledPaper>
  );
};

export default EmailSentCard;