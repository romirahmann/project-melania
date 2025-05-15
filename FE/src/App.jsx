import { RouterProvider } from "@tanstack/react-router";
import { router } from "./components/routes/Routes";
import { api, ApiUrl } from "./context/Urlapi";

function App() {
  const baseUrl = api;
  return (
    <>
      <ApiUrl.Provider value={baseUrl}>
        <RouterProvider router={router} basepath="/RS-MELANIA" />
      </ApiUrl.Provider>
    </>
  );
}

export default App;
