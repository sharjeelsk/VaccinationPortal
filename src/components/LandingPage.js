import React from 'react'
import Button from '@mui/material/Button'
import page1 from '../images/page1.jpg'
import "./LandingPage.scss"
import Footer from './Footer/Footer'
function LandingPage(props) {
    return (
        <div>
        <div className="landingpage">
            <img src={page1} alt="homepage banner" />
            <h1>In our fight against COVID-19, we are all together.</h1>
            <h2>Getting vaccinated is the only way to win this battle.</h2>
            <p>ZEE TV brings to you Vaccination Camp, an initiative to bring the life-saving vaccine to our viewers in a hassle free, safe way.</p>
            <button className="bookbutton" onClick={()=>props.history.push("/home")} variant="contained">Confirm Your Slot</button>
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage
