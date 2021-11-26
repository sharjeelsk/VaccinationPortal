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


function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/verifyotp" component={VerifyOtp} />
      <Route path="/personalinfo" component={PersonalInfo} />
      <Route path="/accountdetails" component={AccountDetails} />
      <Route path="/choosedose" component={ChooseDose} />
      <Route path="/choosevaccinationcentre" component={ChooseVaccinationCentre} />
      <Route path="/slotbooked" component={SlotBooked} />
    </Switch>
  );
}

export default App;
