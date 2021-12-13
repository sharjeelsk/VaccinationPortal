import React from 'react'
import "./Footer.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
function Footer() {
    return (
        <div className="footerdiv">
            <p>Disclaimer</p>
            <p>Privacy and Policy</p>
            <p>Terms and Conditions</p>
            <p>© Zee Entertainment Enterprises Limited</p>
            <FacebookIcon sx={{margin:"0 1%"}} />
            <TwitterIcon sx={{margin:"0 1%"}}/>
            <YouTubeIcon sx={{margin:"0 1%"}}/>
            <InstagramIcon sx={{margin:"0 1%"}}/>
            <p style={{textAlign:"center"}}>Designed and developed by TechGeeks</p>
        </div>
    )
}

export default Footer
