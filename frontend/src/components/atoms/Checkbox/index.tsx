import React from "react";
import { Checkbox, CheckboxProps, styled } from "@mui/material";
import UncheckedCheckbox from "../../../../public/assets/icons/unchecked_checkbox.svg";
import CheckedCheckbox from "../../../../public/assets/icons/checked-checkbox.svg";
import IntermedaiteCheckbox from "../../../../public/assets/icons/indeterminate_checkbox.svg";
import Image from "../Image";

const StyledCheckbox = styled(Checkbox)({
  "&.MuiCheckbox-root": {
    padding: 0,
  },
});

export const MuiCheckbox = (props: CheckboxProps) => {
  return (
    <StyledCheckbox
      icon={<Image src={UncheckedCheckbox} alt="unchecked-checkbox" />}
      checkedIcon={<Image src={CheckedCheckbox} alt="checked-checkbox" />}
      indeterminateIcon={
        <Image src={IntermedaiteCheckbox} alt="indeterminate-checkbox" />
      }
      disableRipple
      disableFocusRipple
      disableTouchRipple
      {...props}
    />
  );
};
