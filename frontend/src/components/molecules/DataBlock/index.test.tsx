import { screen, render } from "@testing-library/react";
import { DataBlock } from ".";
import CalenderLogo from "../../../../public/assets/icons/calendar.svg";
import InfoIcon from "../../../../public/assets/images/info-circle.svg";
import { TERM_CAP } from "../../../constants";

describe("DataBlock component", () => {
  it("should renders datablock as expected", () => {
    render(
      <DataBlock
        logoSrc={CalenderLogo}
        logoAlt="calender-logo"
        iconSrc={InfoIcon}
        iconAlt="info-icon"
        title={TERM_CAP}
        titleVariant="body1"
        caption="12 months"
        captionVariant="h2"
      />
    );
    const title = screen.getByText(TERM_CAP);
    expect(title).toBeInTheDocument();
  });
});
