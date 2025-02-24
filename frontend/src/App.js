import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup"
import SendVerification from "./pages/SendVerification";
import ResetPassword from "./pages/ResetPassword";
import Ingredients from "./pages/Ingredients";
import Cooking from "./pages/Cooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Signin />} />
        <Route path={`/account/create`} element={<Signup />} />
        <Route path={`/verification`} element={<SendVerification />} />
        <Route path={`/password/reset`} element={<ResetPassword />} />
        <Route path={`/ingredients`} element={<Ingredients />} />
        <Route path={`/cooking`} element={<Cooking />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;