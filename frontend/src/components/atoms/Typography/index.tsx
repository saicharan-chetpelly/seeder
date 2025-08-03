import { Typography as MuiTypography, TypographyProps } from "@mui/material";
const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  ...props
}) => {
  return (
    <MuiTypography variant={variant} {...props}>
      {children}
    </MuiTypography>
  );
};
export default Typography;
