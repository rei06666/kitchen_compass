import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup"
import SendVerification from "./pages/SendVerification";
import ResetPassword from "./pages/ResetPassword";
// import Top from "./views/Top"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Signin />} />
        <Route path={`/account/create`} element={<Signup />} />
        <Route path={`/verification`} element={<SendVerification />} />
        <Route path={`/password/reset`} element={<ResetPassword />} />
        {/* <Route path={`/Top`} element={<Top />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
export default App;