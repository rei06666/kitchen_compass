import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup"
import SendVerification from "./pages/SendVerification";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Signin />} />
        <Route path={`/account/create`} element={<Signup />} />
        <Route path={`/verification`} element={<SendVerification />} />
        <Route path={`/password/reset`} element={<ResetPassword />} />
        <Route path={`/home`} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;