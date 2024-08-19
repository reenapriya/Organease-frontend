
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import DashBoard from './components/Dashboard';
import CentreProfileForm from './components/CentreProfileForm';
import CentreProfileEdit from "./components/CentreProfileEdit";
import { useAuth } from './context/UserContext';
import PrivateRoute from './components/PrivateRoute';
import UnAuthorized from './components/UnAuthorized';
import HospitalProfile from './components/HospitalProfile';
import HospitalEdit from './components/HospitalEdit';
import AddOrgan from './components/AddOrgan';
import AddCategory from './components/AddCategory';
import MyCentre from './components/MyCentre';
import ShowOrgan from './components/ShowOrgan';
import OrganEdit from './components/OrganEdit';
import ShowCentre from './components/ShowCentre';
import CentreName from './components/CentreName';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PatientManager from "./redux/Component/PatientManager";
import PatientForm from "./redux/Component/PatientForm";
import Payment from './components/Payment';
import Request from "./components/Request";
import RequestHospitalSide from './components/RequestHospitalSide';
import CentreSideRequest from './components/CentreSideRequest';
import Success from "./components/Success";
import Failure from "./components/Failure";
import './App.css'; // Import your custom CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const state = useSelector((state) => state);
  const { user, dispatch, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

 const centreToast=()=>{
  toast("Your Account Successfully created !!!")
 }
const hospitalToast=()=>{
  toast("Your Account Successfully created !!!")

}



return (
  <div style={{ minHeight: '100vh' }}>
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Organease Project</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">DashBoard</Link>
                </li>
                {user?.role === 'Centre' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/add-item">Add Item</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/catShowOne/:id">My Centre</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/request-centre">Show Request</Link>
                    </li>
                  </>
                )}
                {user?.role === 'Hospital' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/show-centre">Show Centre</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/patient-form">Patient Form</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/request-hospital">Show Request</Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="#" onClick={handleLogout}>Logout</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
    <div className="container mt-4">
      <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/centreprofileform" element={
            <PrivateRoute permittedRoles={["Centre"]}>
              <CentreProfileForm toast={centreToast} />
            </PrivateRoute>
          } />
          <Route path="/centreprofileedit/:id" element={
            <PrivateRoute permittedRoles={["Centre"]}>
              <CentreProfileEdit />
            </PrivateRoute>
          } />
          <Route path="/hospitalprofile" element={
            <PrivateRoute permittedRoles={["Hospital"]}>
              <HospitalProfile toast={hospitalToast} />
            </PrivateRoute>
           } />
           <Route path="/hospitalprofileedit/:id" element={
            <PrivateRoute permittedRoles={["Hospital"]}>
              <HospitalEdit />
            </PrivateRoute>
          } />
          <Route path="/add-item" element={
            <PrivateRoute permittedRoles={['Centre']}>
              <AddCategory />
            </PrivateRoute>
          } />
          <Route path="/catShowOne/:id" element={
            <PrivateRoute permittedRoles={['Centre']}>
              <MyCentre />
            </PrivateRoute>
          } />
          <Route path="/organcreate/category/:oid" element={
            <PrivateRoute permittedRoles={['Centre']}>
              <AddOrgan />
            </PrivateRoute>
          } />
          <Route path="/organShow/category/:oid" element={
            <PrivateRoute permittedRoles={['Centre']}>
              <ShowOrgan />
            </PrivateRoute>
          } />
          <Route path="/organUpdate/category/:oid/organ/:id" element={
            <PrivateRoute permittedRoles={["Centre"]}>
              <OrganEdit />
              </PrivateRoute>
          } />
          <Route path="/my-centre" element={
            <PrivateRoute permittedRoles={["Centre"]}>
              <MyCentre />
            </PrivateRoute>} />
          <Route path="/show-centre" element={
            <PrivateRoute permittedRoles={["Hospital"]}>
              <ShowCentre />
            </PrivateRoute>
          } />
          <Route path="/showOne/:cid" element={
            <PrivateRoute permittedRoles={["Centre", "Hospital"]}>
              <CentreName />
            </PrivateRoute>
          } />
          <Route path="/patient-form" element={
            <PrivateRoute permittedRoles={["Hospital"]}>
              <PatientManager />
            </PrivateRoute>
          } />
          <Route path="/add-patient" element={
            <PrivateRoute permittedRoles={["Hospital"]}>
              <PatientForm />
            </PrivateRoute>
          } />
          <Route path="/edit-patient/:id" element={
            <PrivateRoute permittedRoles={["Hospital"]}>
              <PatientForm />
              </PrivateRoute>} />
          <Route path="/request/:oid/:id" element={
            <PrivateRoute permittedRoles={["Hospital"]}>
              <Request />
            </PrivateRoute>
          } />
          <Route path="/request" element={
            <PrivateRoute permittedRoles={["Hospital"]}>
              <Request />
            </PrivateRoute>
          } />
          <Route path="/request-hospital" element={
            <PrivateRoute permittedRoles={["Hospital"]}>
              <RequestHospitalSide />
            </PrivateRoute>
          } />
          <Route path="/request-centre" element={
            <PrivateRoute permittedRoles={["Centre"]}>
              <CentreSideRequest />
            </PrivateRoute>
          } />
          <Route path="/payment/:id" element={
            <PrivateRoute>
              <Payment/>
            </PrivateRoute>
          }/>
          <Route path="/success"  element={<Success/>}/>
          <Route path="/failure"  element={<Failure/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
      </Routes>
    </div>
  </div>
);


}

export default App;
