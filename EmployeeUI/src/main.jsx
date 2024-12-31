import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import UserProvider from "./UserProvider"; // Import the UserProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
