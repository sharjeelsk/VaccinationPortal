import React from 'react'
import "./TestHeader.scss"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Button from '@mui/material/Button'
function TestHeader() {
    return (
        <div>
           <div className="headerback">
            <div className="headert">
                
            
            <div className="row align-items-center justify-content-between headerti">
            <div>
            <MenuRoundedIcon  className="icon" />
            </div>

            <div>
                <h1 style={{color:"white"}}><span style={{color:"orange"}}>ontime</span>services</h1>
            </div>

            <div className="row">
            <InstagramIcon  className="icon" />
            <FacebookIcon   className="icon" />
            <TwitterIcon    className="icon" />
            </div>

            </div>
           </div>
           <div className="headercont">
               INTERIOR DESIGN
               <h1>Adipiscing Elit</h1>
               <h1>Duis Amet</h1>
               <p>Dolor enim aliqua eiusmod dolor sunt eu. Do est non voluptate adipisicing adipisicing pariatur occaecat consectetur magna esse. Incididunt minim dolore dolore consectetur proident excepteur in amet esse occaecat nostrud occaecat. Amet ullamco incididunt amet nostrud nisi duis duis esse est ullamco aliquip pariatur ut. Pariatur ea sunt aute tempor fugiat est qui fugiat sit sunt consequat. Nulla ea nulla labore non sint consectetur ipsum fugiat cillum voluptate. Nulla velit ipsum voluptate dolor consequat dolor veniam exercitation cupidatat magna dolore consectetur duis excepteur.</p>
               <Button variant="contained">ORDER NOW</Button>
           </div>
           </div>
        </div>
    )
}

export default TestHeader
