import React from "react";
import MuiChip from "@mui/material/Chip";
import { theme } from "../../../theme/theme";
import { SxProps } from "@mui/material";
interface ChipProps {
  label: string;
  textColor?: string;
  bgColor?: string;
  size?: "small" | "medium";
  sx?:SxProps
}
const Chip: React.FC<ChipProps> = ({
  label,
  textColor,
  bgColor,
  size,
  sx
}: ChipProps) => {
  return (
    <MuiChip
      label={label}
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: `${theme.spacing(2)}`,
        padding: "4px 8px",
        ".MuiChip-label":{
          padding:0
        },
        ...sx
      }}
      size={size}
    />
  );
};

export default Chip;
