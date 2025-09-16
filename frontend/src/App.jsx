// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./component/Layout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";
import JoinUs from "./pages/JoinUS/JoinUs";
import CandidateList from "./pages/admin/CandidateList";
import CreateProduct from "./pages/admin/CreateProduct";
import ComingSoonPage from "./pages/ComingSoonPage";
import CreateJob from "./pages/employees/createJob";
import GetJob from "./pages/employees/GetJob";
import CandidateJobWise from "./pages/employees/CandidateJobWise";
import JobsPage from "./pages/employees/JobsPage";
import JobCandidatesPage from "./pages/employees/JobCandidatesPage";
import CandidateDetailsPage from "./pages/employees/CandidateDetailsPage";
import Login from "./Login";
import PrivacyPolicy from "./pages/quicklinks/PrivacyPolicy";
import RefundPolicy from "./pages/quicklinks/RefundPolicy";
import Disclaimer from "./pages/quicklinks/Disclaimer";
import TermsAndConditions from "./pages/quicklinks/TermsAndCondition";
import ReturnPolicy from "./pages/quicklinks/ReturnPolicy";

// Auth Helpers
const isAuthenticated = () => {
  return localStorage.getItem("auth") ? true : false;
};

const getRole = () => {
  return localStorage.getItem("role"); // "Admin" | "Employee" | "Customer"
};

// ✅ PrivateRoute now accepts multiple roles
function PrivateRoute({ children, roles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const userRole = getRole();
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/" />; // Unauthorized → send to home
  }

  return children;
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ComingSoonPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join/:jobId" element={<JoinUs />} />
          
          <Route path="/get-all-jobs" element={<GetJob />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/refund-policy" element={<RefundPolicy/>} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/return-policy" element={<ReturnPolicy/>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          {/* 🔒 Reserved Routes for Admin + Employee */}
          <Route
            path="/create-job"
            element={
              <PrivateRoute roles={["Admin", "Employee"]}>
                <CreateJob />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-product"
            element={
              <PrivateRoute roles={["Admin", "Employee"]}>
                <CreateProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute roles={["Admin", "Employee"]}>
                <JobsPage />
              </PrivateRoute>
            }
          />
          <Route path="/candidates" element={<PrivateRoute roles={["Admin", "Employee"]}>
               <CandidateList />
              </PrivateRoute>} />
          <Route
            path="/jobs/:jobId/candidates"
            element={
              <PrivateRoute roles={["Admin", "Employee"]}>
                <JobCandidatesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate/:candidateId"
            element={
              <PrivateRoute roles={["Admin", "Employee"]}>
                <CandidateDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/candidate-list"
            element={
              <PrivateRoute roles={["Admin", "Employee"]}>
                <CandidateJobWise />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
