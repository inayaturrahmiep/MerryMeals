//import React, { Component } from 'react'
// eslint-disable-next-line
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import HeaderComponent from "./component/HeaderComponent";
import FooterComponent from "./component/FooterComponent";
import HomeComponent from "./component/HomeComponent";
import PVRegisterComponent from "./component/PVRegisterComponent";
import LoginComponent from "./component/LoginComponent";
import MemberSignup from "./component/MemberSignup";
import DonateComponent from "./component/DonateComponent";
import FoodSafetyGuide from "./component/FoodSafetyGuide";
import PrivacyPolicy from "./component/PrivacyPolicy";
import AdminDashboard from "./component/AdminDashboard";
import { getCurrentUser } from "./service/MCRegisterService";
import Member from "./component/Member";
export const ACCESS_TOKEN = "accessToken";

function App(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);


  function loadCurrentlyLoggedInUser() {
    getCurrentUser()
    .then(response => {
      setCurrentUser(response);
      setAuthenticated(true);
      setRole(response.role);
    }).catch(error => {
    });    
  }

  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    setRole(null);
    toast.success("You're safely logged out!");
  }
  return (
    <div className="App">
      <Helmet>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBeP41nTw8QroOfvcCFR9bKIC-GUW7BLcs"></script>
      </Helmet>
      <Router>
        <HeaderComponent
          authenticated={authenticated}
          onLogout={handleLogout}
          currentUser={currentUser}
          role={role}
        ></HeaderComponent>

        <Switch>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route exact path="/memregistration" component={MemberSignup}></Route>
          <Route exact path="/donate" component={DonateComponent}></Route>
          <Route
            exact
            path="/pvregistration"
            component={PVRegisterComponent}
          ></Route>
          <Route
            exact
            path="/login"
            render={(props) => (
              <LoginComponent authenticated={authenticated} {...props} />
            )}
          ></Route>
          <Route
            exact
            path="/foodsafetyguide"
            component={FoodSafetyGuide}
          ></Route>
          <Route exact path="/privacypolicy" component={PrivacyPolicy}></Route>
          <Route
            exact
            path="/admindashboard"
            component={AdminDashboard}
          ></Route>
          <Route path='/member/:memberId' element={<Member/>}></Route>
          <Route path='members/:keyword' element={<AdminDashboard/>} />
        </Switch>

        <FooterComponent></FooterComponent>
      </Router>
      <ToastContainer
        autoclose={2500}
        theme="dark"
        limit={3}
        className="toast-position"
      />
    </div>
  );
}

export default App;
