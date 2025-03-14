import React from "react";
import {
 createBrowserRouter,
 RouterProvider,
} from "react-router-dom";

import { HomePage } from "./pages/home/home";
import { LoginPage } from "./pages/login/login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
 {
  path: "/",
  element: <LoginPage />,
 },
 {
  path: "/home",
  element: <ProtectedRoute element={<HomePage />} />,
 },
]);

function App() {
 return (
  <React.StrictMode>
   <AuthProvider>
    <RouterProvider router={router} />
   </AuthProvider>
  </React.StrictMode>
 );
}

export default App;
