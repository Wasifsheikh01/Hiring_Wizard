import { Routes, Route } from "react-router-dom";
import Home from "./component/home/home";
import Jobs from "./component/jobs/jobs";
import Login from "./component/logIn/logIn";
import Notfound from "./component/Notfound/notfound";
import ProtectedRoute from "./component/protectedRoute";
import JobsItemsDetails from "./component/jobsitemDetails";
const app = () => (
  <Routes>
    <Route path="/" element={<ProtectedRoute Component={Home} />}></Route>
    <Route path="/login" element={<ProtectedRoute Component={Login} />}></Route>
    <Route path="/jobs" element={<ProtectedRoute Component={Jobs} />}></Route>
    <Route path="/jobs/:id" element={<ProtectedRoute Component={JobsItemsDetails} />}></Route>

    <Route path="/*" element={<Notfound />}></Route>
  </Routes>
);
export default app;
