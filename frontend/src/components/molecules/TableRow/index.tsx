import { Stack, styled } from "@mui/material";
import React from "react";

type TableRowGeneralPropsType = {
  id: number;
  title: string | React.ReactNode;
};

interface TableRowProps {
  data: TableRowGeneralPropsType[];
}
const StyledStack = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});
export const TableRow = ({ data }: TableRowProps) => {
  return (
    <StyledStack>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </StyledStack>
  );
};
