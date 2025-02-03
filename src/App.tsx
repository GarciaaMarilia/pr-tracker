import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage } from "./pages/home/home";
import { LoginPage } from "./pages/login/login";

const router = createBrowserRouter([
 {
  path: "/",
  element: <LoginPage />,
 },
 {
  path: "/home",
  element: <HomePage />,
 },
]);

function App() {
 return <RouterProvider router={router} />;
}

export default App;
