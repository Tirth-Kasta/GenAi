import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastConfig = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};

export default ToastConfig;
