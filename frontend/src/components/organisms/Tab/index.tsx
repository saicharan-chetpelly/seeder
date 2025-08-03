import React from "react";
import { Button, Stack, styled } from "@mui/material";
import INFO from "../../../../public/assets/icons/info.svg";
import SYNC from "../../../../public/assets/icons/sync.svg";
import { theme } from "../../../theme/theme";

import { IconTypography } from "../../molecules/IconTypography";

import {
  MyCashKickType,
  MyContractsType,
} from "../.././../constants/index";
import { MyCashKickTable, MyContractsTable } from "./tabUtils";

export interface CashAccelerationProps {
  myCashkicksData:MyCashKickType[];
  myContractsData:MyContractsType[];
  activeTab:number;
  isLoading:boolean,
  isError:boolean,
  isConnected:boolean
}

const StyledStack = styled(Stack)({
  backgroundColor: `${theme.palette.elevation.color1}`,
  padding: "2rem",
  gap: "1.25rem",
  borderRadius: "0.75rem",
  border: `1px solid ${theme.palette.grey[300]}`,
});
const NormalTab = styled(Button)({
  height: "2.6875rem",
  padding: "0.75rem 1.5rem",
  borderRadius: "0.75rem",
  marginRight: "0.625rem",
  textTransform: "capitalize",
  backgroundColor: "#262529",
  border: `1px solid ${theme.palette.grey[600]}`,
  color: "#C9C8CC",
  "&:hover": {
    borderColor: "#B4A9FF`",
  },
});
const ActiveTab = styled(Button)({
  height: "2.6875rem",
  padding: "0.75rem 1.5rem",
  borderRadius: "0.75rem",
  marginRight: "0.75rem",
  textTransform: "none",
  background: `${theme.palette.primary[600]}`,
  border: `1px solid ${theme.palette.primary[400]}`,
  color: `${theme.palette.primary[400]}`,
  "&:hover": {
    borderColor: `${theme.palette.primary[400]}`,
    background: `${theme.palette.primary[600]}`,
  },
});
const CashAcceleration = ({myCashkicksData,myContractsData,activeTab,isError,isLoading,isConnected}: CashAccelerationProps) => {
  const [tabView, setTabView] = React.useState(activeTab);
  const handleTabView1 = () => {
    setTabView(1);
  };
  const handleTabView2 = () => {
    setTabView(2);
  };
  
  return (
    <StyledStack>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <IconTypography
          endIconSrc={INFO}
          endIconHeight="20px"
          endIconWidth="20px"
          label="Cash accleration"
          variant="h2"
          labelColor={theme.palette.text.primary}
          gap="8px"
        />
        {tabView === 1 ? (
          <IconTypography
            startIconSrc={SYNC}
            startIconHeight="20px"
            startIconWidth="20px"
            label="Sync Now"
            variant="body1"
            labelColor={theme.palette.primary[400]}
            gap="8px"
          />
        ) : (
          <></>
        )}
      </Stack>
      <Stack direction={"row"}>
        {tabView === 1 ? (
          <ActiveTab
            variant="outlined"
            onClick={handleTabView1}
            children={"My Contracts"}
          />
        ) : (
          <NormalTab
            variant="outlined"
            onClick={handleTabView1}
            children={"My Contracts"}
          />
        )}
        {tabView === 2 ? (
          <ActiveTab
            variant="outlined"
            onClick={handleTabView2}
            children={"My Cash Kicks"}
          />
        ) : (
          <NormalTab
            variant="outlined"
            onClick={handleTabView2}
            children={"My Cash Kicks"}
          />
        )}
      </Stack>
      {tabView === 1 ? (
        
          <MyContractsTable contractsData={myContractsData} isError={isError} isLoading={isLoading} isConnected={isConnected}/>
        
      ) : (
        <>
          {" "}
          <MyCashKickTable cashKickData={myCashkicksData} isError={isError} isLoading={isLoading} isConnected={isConnected}/>
        </>
      )}
    </StyledStack>
  );
};
export default CashAcceleration;
