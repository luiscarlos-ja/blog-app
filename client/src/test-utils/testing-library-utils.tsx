import { RenderOptions, render } from "@testing-library/react";
import { AllTheProviders } from "./all-providers.utils";

const renderWithContext = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
