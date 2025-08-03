import { screen, render } from "@testing-library/react";
import { Gif } from ".";

describe("Gif component testcases", () => {
  it("should render Gif component", () => {
    const src = "test.gif";
    render(<Gif src={src} alt="Test GIF" />);
    const gifElement = screen.getByAltText("Test GIF");
    expect(gifElement).toBeInTheDocument();
    expect(gifElement).toHaveAttribute("src", src);
  });

  it("should render Gif component with some props", () => {
    const src = "test.gif";
    const width = "172px";
    const height = "172px";
    const alt = "Test GIF";
    render(<Gif src={src} width={width} height={height} alt={alt} />);
    const gifElement = screen.getByAltText(alt);
    expect(gifElement).toBeInTheDocument();
    expect(gifElement).toHaveAttribute("src", src);
    expect(gifElement).toHaveAttribute("width", width);
    expect(gifElement).toHaveAttribute("height", height);
  });
});
