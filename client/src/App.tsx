import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { AuthProvider } from "./context/auth.context";
import ToastConfig from "./config/toast.config";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastConfig />
    </AuthProvider>
  )
}

export default App
