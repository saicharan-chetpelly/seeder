import React, { useEffect, useState } from "react";
import { Box, Stack, styled } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { theme } from "../../../theme/theme";
import Typography from "../../atoms/Typography";
import { Table } from "../../molecules/Table";
import { IconTypography } from "../../molecules/IconTypography";
import InfoIcon from "../../../../public/assets/images/info-circle.svg";
import { YourContractsType } from "../../../constants";
import { separateNumberWithCommas } from "../../../utils/helper";
import { useUserContext } from "../../../utils/ThemeContext";

interface YourContractsProps {
  contractsData: YourContractsType[];
  onSelectedContractsChange: (selectedContracts: YourContractsType[]) => void;
  areContractsSelected: boolean;
  selectedRows?: YourContractsType[];
}

const StyledStack = styled(Stack)({
  width: "51.2vw",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.grey[300]}`,
  height: "auto",
  gap: "20px",
  padding: "2.34vw 1vw 1.24vw 2.34vw",
  backgroundColor: `${theme.palette.elevation.color1}`,
});

const StyledTableWrapper = styled(Box)`
  width: 100%;
  overflow-x: scroll;
  height:100%;
  &::-webkit-scrollbar {
    height: 15px;
    background: ${theme.palette.elevation.color2};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.palette.grey[700]};
    border-radius: 100vw;
    border: 3.5px solid ${theme.palette.elevation.color2};
  }
  &::-webkit-scrollbar-track {
    background: ${theme.palette.elevation.color2};
    border-radius: 100vw;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.grey[700]};
  }
`;
export const myContractsColumnData: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    editable: false,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Typography variant="body2" color={theme.palette.text.primary}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    editable: false,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Typography variant="body2" color={theme.palette.text.secondary}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: "perPayment",
    headerName: "Per payment",
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <Typography variant="body2" color={theme.palette.text.secondary}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: "termLengthPercentage",
    headerName: "Term Length",
    flex: 1,
    editable: false,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Stack gap={"4px"}>
        <Typography variant="body2" color={theme.palette.text.secondary}>
          {params.row.termLength}
        </Typography>
        <Typography variant="caption" color={theme.palette.text.secondary}>
          {params.row.termPercentage}
        </Typography>
      </Stack>
    ),
  },
  {
    field: "partialAmountpaymentAmount",
    headerName: "Payment amount",
    flex: 1,
    editable: false,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Stack spacing={1}>
        <Typography variant="body2" color={theme.palette.text.secondary}>
          {params.row.partialAmount === 0
            ? `${separateNumberWithCommas(params.row.paymentAmount)}`
            : `${separateNumberWithCommas(params.row.partialAmount)}`}
        </Typography>
      </Stack>
    ),
  },
];

export const YourContractsTable = ({
  contractsData,
  onSelectedContractsChange,
  selectedRows: initialSelectedRows,
  areContractsSelected
}: YourContractsProps) => {
  const {currUser} = useUserContext()
  const [selectedRows, setSelectedRows] = useState<YourContractsType[]>(
    initialSelectedRows ?? []
  );
  const getAllSelectedContracts = (
    newValue: number,
    sortedContracts: YourContractsType[]
  ): YourContractsType[] => {
  
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
  useEffect(() => {
    setSelectedRows(initialSelectedRows ?? []);
  }, [initialSelectedRows]);
  const handleContractSelection = (selectionRow: GridRowId[]) => {
    const selectedContracts = contractsData.filter((contract) =>
      selectionRow.includes(contract.id)
    );

    const totalPaymentAmount = selectedContracts.reduce(
      (total, contract) => total + contract.paymentAmount,
      0
    );
    if (totalPaymentAmount <= currUser.availableCredit) {
      setSelectedRows(selectedContracts);
      onSelectedContractsChange(selectedContracts);
    } else {
      const validSelectedAmount = Math.min(currUser.availableCredit, totalPaymentAmount);
      const allSelectedContracts = getAllSelectedContracts(validSelectedAmount, selectedContracts);
  
      setSelectedRows(allSelectedContracts);
      onSelectedContractsChange(allSelectedContracts);
      }
  };

  return (
    <StyledStack>
      <IconTypography
        label={!areContractsSelected ? "Your Contracts" : "Selected contracts"}
        labelColor={theme.palette.text.primary}
        endIconSrc={InfoIcon}
        endIconAlt="info-icon"
        endIconHeight="16.67px"
        endIconWidth="16.67px"
        gap="8px"
        variant="h2"
      />
      <StyledTableWrapper>
        {!areContractsSelected ? (
          <Table
            rowHeight={62}
            columnHeaderHeight={44}
            columns={myContractsColumnData}
            rows={contractsData}
            getRowId={(row) => row.id}
            checkboxSelection={true}
            onRowSelectionModelChange={handleContractSelection}
            rowSelectionModel={selectedRows.map((contract) => contract.id)}
            width="50vw"
        />
        ) : (
          <Table
            rowHeight={62}
            columnHeaderHeight={44}
            columns={myContractsColumnData}
            rows={selectedRows}
            disableRowSelectionOnClick
            width="50vw"
        />
        )}
      </StyledTableWrapper>
    </StyledStack>
  );
};
