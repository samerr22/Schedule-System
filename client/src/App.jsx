import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import AddSchedule from "./pages/AddSchedule";
import ViewSchedule from "./pages/ViewSchedule";
import Updateschedule from "./pages/Updateschedule";
import Profile from "./components/Profile";


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/add" element={<AddSchedule />} />
        <Route path="/profile" element={< Profile/>} />
       

        <Route element={<PrivateRoute />}>
        <Route path="/ViewSchedule" element={< ViewSchedule/>} />
       
        </Route>

        <Route element={<OnlyAdminPrivateRoute />}>
        <Route path="/updateSch/:Id" element={< Updateschedule/>} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
