import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Home from './components/Home'
import VerifyOtp from './components/OTP/VerifyOtp'
import PersonalInfo from './components/PersonalInfo/PersonalInfo'
import "./App.scss"
import AccountDetails from './components/AccountDetails/AccountDetails'
import ChooseDose from './components/ChooseDose/ChooseDose'
import ChooseVaccinationCentre from './components/ChooseVaccinationCentre/ChooseVaccinationCentre'
import SlotBooked from './components/SlotBooked/SlotBooked'
import LandingPage from './components/LandingPage'
import CheckPatient from './components/ConfirmBookings/CheckPatient'
import ChooseCentre from './components/ConfirmBookings/ChooseCentre'
import TestHeader from './components/testheader/TestHeader'


function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Home} />
      <Route path="/verifyotp" component={VerifyOtp} />
      <Route path="/personalinfo" component={PersonalInfo} />
      <Route path="/accountdetails" component={AccountDetails} />
      <Route path="/choosedose" component={ChooseDose} />
      <Route path="/choosevaccinationcentre" component={ChooseVaccinationCentre} />
      <Route path="/slotbooked" component={SlotBooked} />
      <Route path="/checkpatient" component={CheckPatient} />
      <Route path="/choosecentre" component={ChooseCentre} />
      <Route path="/test-header" component={TestHeader} />
    </Switch>
  );
}

export default App;
