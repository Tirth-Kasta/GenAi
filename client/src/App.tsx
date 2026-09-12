import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { AuthProvider } from "./context/auth.context";
import ToastConfig from "./config/toast.config";
import { InterviewProvider } from "./context/interview.context";

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
        <ToastConfig />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
