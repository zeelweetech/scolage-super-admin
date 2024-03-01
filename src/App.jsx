import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import SignIn from "./SignIn";
import Forgot from "./Forgot";
import Dashboard from "./Dashboard";
import Colleges from "./Colleges";
import ScrollToTop from "../helper/ScrollToTop";
import Applicants from "./Applicants";
import StudentProf from "./components/StudentProf";
import Financial from "./Financial";
import AddCollege from "./AddCollege";
import CollegeProfile from "./CollegeProfile";
import Team from "./Team";
import TeamMember from "./components/TeamMember";
import Inbox from "./Inbox";
import GoDash from "./components/GoDash";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./PrivateRoute";
import Error404 from "./404";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import { LoadingBarProvider } from "./context/LoadingBarContext";
import ProgressBar from "./components/LoadingBar";

// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// axios.defaults.baseURL = 'https://random-data-api.com/api/v2';

function App() {
  const [progress, setProgress] = useState(50);
  return (
    <BrowserRouter>
      <LoadingBarProvider>
        <ProgressBar />
        <GlobalStyles />
        <ScrollToTop />

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontSize: "1.3rem",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<GoDash />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route element={<PrivateRoute />}>
            <Route  path="/dashboard" element={<Dashboard />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/college/:id" element={<CollegeProfile />} />
            <Route path="/applicants" element={<Applicants />} />
            <Route path="/student/:id" element={<StudentProf />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/add-college" element={<AddCollege />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/:id" element={<TeamMember />} />
            <Route path="/inbox" element={<Inbox />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </LoadingBarProvider>
    </BrowserRouter>
  );
}

export default App;
