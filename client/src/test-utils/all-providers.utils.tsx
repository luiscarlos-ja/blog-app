import App from "../App";
import { AuthProvider } from "../context/auth.context";
import { BrowserRouter } from "react-router-dom";

export const AllTheProviders = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App></App>
      </AuthProvider>
    </BrowserRouter>
  );
};
