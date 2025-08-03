import { screen, render } from "@testing-library/react";
import { IconTypography } from ".";
import AppLogo from "../../../../public/assets/images/app-logo.svg";

describe("IconTypography molecule testcases", () => {
  it("should render IconTypography component with startIcon", () => {
    render(
      <IconTypography
        startIconSrc={AppLogo}
        startIconAlt="app logo"
        startIconWidth="100px"
        startIconHeight="100px"
        label="Seeder"
      />
    );
    const title = screen.getByText("Seeder");
    expect(title).toBeInTheDocument();
    const icon = screen.getByAltText("app logo");
    expect(icon).toHaveAttribute("src", AppLogo);
  });
  it("should render IconTypography component with endIcon", () => {
    render(
      <IconTypography
        endIconSrc={AppLogo}
        endIconAlt="app logo"
        endIconWidth="100px"
        endIconHeight="100px"
        label="Seeder"
      />
    );
    const title = screen.getByText("Seeder");
    expect(title).toBeInTheDocument();
    const icon = screen.getByAltText("app logo");
    expect(icon).toHaveAttribute("src", AppLogo);
  });
});
