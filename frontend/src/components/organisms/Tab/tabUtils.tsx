import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { theme } from "../../../theme/theme";
import Typography from "../../atoms/Typography";
import { Table } from "../../molecules/Table";
import ImageWithTypographyAndButton from "../../molecules/ImageWithTypographyAndButton";
import { MyCashKickType, MyContractsType } from "../../../constants";
import Chip from "../../atoms/Chip";
import { Box, Skeleton, Stack } from "@mui/material";
import WarningImage from "../../../../public/assets/images/Warning.svg";
import CoinsBag from "../../../../public/assets/images/CoinsBag.svg";
import ChequeImage from "../../../../public/assets/images/Cheque.svg";
import FinancePlanningImage from "../../../../public/assets/images/finance-planning.svg";

interface MyContractsProps {
  contractsData: MyContractsType[];
  isLoading: boolean;
  isError: boolean;
  isConnected:boolean
}

interface MyCashKickProps {
  cashKickData: MyCashKickType[];
  isLoading: boolean;
  isError: boolean;
  isConnected:boolean
}

export const myContractColumnData: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    editable: false,
    filterable: false,
    renderCell: (param) => (
      <Typography variant="body2" color={theme.palette.text.primary}>
        {param.value}
      </Typography>
    ),
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    editable: false,
    renderCell: (param) => (
      <Typography variant="body2" color={theme.palette.text.disabled}>
        {param.value}
      </Typography>
    ),
    filterable: false,
  },
  {
    field: "perPayment",
    headerName: "Per payment",
    flex: 1,
    renderCell: (param) => (
      <Typography variant="body2" color={theme.palette.text.disabled}>
        {param.value}
      </Typography>
    ),
    sortable: false,
  },
  {
    field: "totalFinanced",
    headerName: "Total Financed",
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2" color={theme.palette.text.disabled}>
        -
      </Typography>
    ),
  },
  {
    field: "totalAvailable",
    headerName: "Total Available",
    flex: 1,
    editable: false,
    renderCell: (params) => (
      <Typography variant="body2" color={theme.palette.text.disabled}>
        {params.value}
      </Typography>
    ),
    filterable: false,
  },
];

export const myCashKick: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    editable: false,
    renderCell: (params) => (
      <Typography variant="body2" color={theme.palette.text.primary}>
        {params.value}
      </Typography>
    ),
    filterable: false,
    
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    editable: false,
    renderCell: (params) => (
      <Chip
        label={params.value}
        textColor={theme.palette.text.secondary}
        bgColor={theme.palette.elevation.color2}
      />
    ),
    filterable: false,

  },
  {
    field: "maturity",
    headerName: "Maturity",
    renderCell: (params) => (
      <Typography variant="body2" color={theme.palette.text.disabled}>
        {params.value}
      </Typography>
    ),
    flex: 1,

  },
  {
    field: "totalRecieved",
    headerName: "Total Recieved",
    flex: 1,
    editable: false,
    renderCell: (params) => (
      <Stack gap="2px">
        <Typography variant="body2" color={theme.palette.text.disabled}>
          {params.value}
        </Typography>
        <Typography variant="body2" color={theme.palette.text.disabled}>
          12% fee
        </Typography>
      </Stack>
    ),
    filterable: false,

  },
  {
    field: "totalFinanced",
    headerName: "Total Financed",
    flex: 1,
    editable: false,
    renderCell: (params) => (
      <Typography variant="body2" color={theme.palette.text.disabled}>
        {params.value}
      </Typography>
    ),
    filterable: false,

  },
];

export const MyContractsTable = ({
  contractsData,
  isError,
  isLoading,
  isConnected
}: MyContractsProps) => {
  let overlayToShow;

if (isError) {
  overlayToShow = ErrorOverlay;
} else if (isConnected) {
  overlayToShow = ConnectedOverlay;
} else {
  overlayToShow = contractsOverlayToShow;
}
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Table
        rowHeight={62}
        columnHeaderHeight={44}
        columns={myContractColumnData}
        rows={contractsData}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        checkboxSelection={false}
        width="100%"
        slots={{
          noRowsOverlay: overlayToShow,
          loadingOverlay: LoadingSkeleton,
        }}
        loading={isLoading}
      />
    </div>
  );
};

export const MyCashKickTable = ({ cashKickData,isConnected,isError,isLoading }: MyCashKickProps) => {
  let overlayToShow;

if (isError) {
  overlayToShow = ErrorOverlay;
} else if (isConnected) {
  overlayToShow = ConnectedOverlay;
} else {
  overlayToShow = NoRowsCashkickOverlay;
}

  return (
    <div style={{ height: 400, width: "100%" }}>
    <Table
      rowHeight={62}
      columnHeaderHeight={44}
      columns={myCashKick}
      rows={cashKickData}
      getRowId={(row) => row.id}
      checkboxSelection={false}
      disableRowSelectionOnClick
      width="100%"
      slots={{
        noRowsOverlay: overlayToShow,
        loadingOverlay: LoadingSkeleton,
      }}
      loading={isLoading}
    />
    </div>
  );
};
export const NoRowsCashkickOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <ImageWithTypographyAndButton
        image={ChequeImage}
        body={
          
            <Typography variant="h3" color={theme.palette.text.disabled}>
            You don’t have any Cash Kick
            </Typography>
           
        }
        buttonLabel="Launch A new cash kick"
      />
    </Stack>
  );
};
export const NoRowsOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <ImageWithTypographyAndButton
        image={ChequeImage}
        body={
          <Stack gap={"2px"} alignItems={"center"}>
            <Typography variant="h3" color={theme.palette.text.disabled}>
              You don't have any Cash Kick
            </Typography>
            <Typography variant="button1" color={theme.palette.primary[400]}>
              Launch A new cash kick
            </Typography>
          </Stack>
        }
        buttonLabel="Connect Now"
      />
    </Stack>
  );
};
export const contractsOverlayToShow = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <ImageWithTypographyAndButton
        image={FinancePlanningImage}
        body={
          <Stack gap={"2px"} alignItems={"center"}>
            <Typography variant="h3" color={theme.palette.text.disabled}>
            Connect your preferred payments or
            </Typography>
            <Typography variant="h3" color={theme.palette.text.disabled}>
            subscriptions platform to import contracts
            </Typography>
          </Stack>
        }
        buttonLabel="Connect Now"
      />
    </Stack>
  );
};
export const ErrorOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <ImageWithTypographyAndButton
        image={WarningImage}
        body={
          <Stack gap={"4px"} alignItems="center">
            <Typography variant="h3" color={theme.palette.grey[400]}>
              oops! Failed to connect
            </Typography>
            <Typography variant="h3" color={theme.palette.text.disabled}>
              Please contact customer support if this problem persists
            </Typography>
          </Stack>
        }
        buttonLabel="Retry"
      />
    </Stack>
  );
};
export const ConnectedOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <ImageWithTypographyAndButton
        image={CoinsBag}
        body={
          <Typography variant="h3" color={theme.palette.grey[400]}>
            Connected Succesfully!
          </Typography>
        }
      />
    </Stack>
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
        {[...Array(myContractColumnData.length)].map((_) => (
          <Skeleton
            data-testid="skeleton"
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