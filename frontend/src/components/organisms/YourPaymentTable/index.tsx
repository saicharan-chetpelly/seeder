import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { theme } from "../../../theme/theme";
import Typography from "../../atoms/Typography";
import { Table } from "../../molecules/Table";
import InfoIcon from "../../../../public/assets/images/info-circle.svg";

import { MyPaymentType } from "../../../constants";
import { Box, Skeleton, Stack, styled } from "@mui/material";
import { IconTypography } from "../../../components/molecules/IconTypography";
import Chip from "../../../components/atoms/Chip";
import { ErrorOverlay, ConnectedOverlay } from "../Tab/tabUtils";
import { formatDate } from "../../../utils/helper";
import ImageWithTypographyAndButton from "../../molecules/ImageWithTypographyAndButton";
import ChequeImage from "../../../../public/assets/images/Cheque.svg";

interface MyPaymentProps {
  paymentData: MyPaymentType[];
  isLoading: boolean;
  isError: boolean;
  isConnected:boolean;
}

const StyledTableWrapper = styled("div")({
  width: "100%",
  height: "100%",
  overflowX: "auto",
});

const StyledStack = styled(Stack)({
  borderRadius: "12px",
  border: `1px solid ${theme.palette.grey[300]}`,
  height: "auto",
  gap: "20px",
  padding: "2.34vw 1vw 1.24vw 2.34vw",
  backgroundColor: `${theme.palette.elevation.color1}`,
});

export const myPaymentColumnData: GridColDef[] = [
  {
    field: "dueDate",
    headerName: "Due Date",
    flex: 1,
    editable: false,
    filterable: false,
    renderCell: (param) => (
      <Stack gap="2px">
        <Typography variant="body2" color={theme.palette.text.primary}>
          {formatDate(param.value.dueDate)}
        </Typography>
        <Typography variant="body2" color={theme.palette.text.disabled}>
          {param.value.fromDays}
        </Typography>
      </Stack>
    ),
  },

  {
    field: "status",
    headerName: "Status",
    flex: 1,
    editable: false,
    renderCell: (param) => (
      <Chip
        label={param.value}
        textColor={theme.palette.text.secondary}
        bgColor={theme.palette.elevation.color2}
      />
    ),
  },

  {
    field: "expectedAmount",
    flex: 1,
    headerName: "Expected Amount",
    editable: false,
    renderCell: (param) => (
      <Typography variant="body2" color={theme.palette.text.secondary}>
        {param.value}
      </Typography>
    ),
  },
  {
    field: "outstandingAmount",
    flex: 1,
    headerName: "Outstanding",
    renderCell: (param) => (
      <Typography variant="body2" color={theme.palette.text.secondary}>
        {param.value}
      </Typography>
    ),
  },
];
export const NoRowsOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <ImageWithTypographyAndButton
        image={ChequeImage}
        body={
          <Stack gap={"2px"} alignItems={"center"}>
            <Typography variant="h3" color={theme.palette.text.disabled}>
              You don’t have any payments pending
            </Typography>
          </Stack>
        }
      />
    </Stack>
  );
};
export const MyPaymentTable = ({
  paymentData,
  isError,
  isLoading,
  isConnected
}: MyPaymentProps) => {
  let overlayToShow;

if (isError) {
  overlayToShow = ErrorOverlay;
} else if (isConnected) {
  overlayToShow = ConnectedOverlay;
} else {
  overlayToShow = NoRowsOverlay;
}
  return (
    <StyledStack>
      <IconTypography
        label={"Your payments"}
        labelColor={theme.palette.text.primary}
        endIconSrc={InfoIcon}
        endIconAlt="info-icon"
        endIconHeight="16.67px"
        endIconWidth="16.67px"
        gap="8px"
        variant="h2"
      />
      <StyledTableWrapper>
        <div style={{ height: "50vh", width: "100%" }}>
          <Table
            rowHeight={62}
            columnHeaderHeight={44}
            columns={myPaymentColumnData}
            rows={paymentData}
            getRowId={(row) => row.id}
            checkboxSelection={false}
            width="100%"
            disableRowSelectionOnClick
            slots={{
              noRowsOverlay: overlayToShow,
              loadingOverlay: LoadingSkeleton,
            }}
            loading={isLoading}
          />
        </div>
      </StyledTableWrapper>
    </StyledStack>
  );
};
const LoadingSkeleton = () => (
  <Box
    sx={{
      height: "max-content",
    }}
  >
    {[...Array(10)].map((_) => (
      <Stack direction={"row"} gap={"50px"}>
        {[...Array(myPaymentColumnData.length)].map((_) => (
          <Skeleton
            variant="rectangular"
            sx={{ my: 4, mx: 1 }}
            animation="wave"
            width={"20%"}
          />
        ))}
      </Stack>
    ))}
  </Box>
);
