import { render, screen } from '@testing-library/react';
import { MuiCheckbox } from '.';

describe('CheckBox atoms testcases', () => {
  test('should render checkbox with default props', () => {
    render(<MuiCheckbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test("should render checked checkbox when 'checked' prop is passed as true", () => {
    render(<MuiCheckbox checked={true} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});