import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import router from "./routes/router";

function App() {
  const matches = useMediaQuery("(max-width:480px)");
  return (
    <>
      <Toaster
        position={matches ? "top-center" : "bottom-right"}
        reverseOrder={true}
        toastOptions={{
          duration: 2000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
