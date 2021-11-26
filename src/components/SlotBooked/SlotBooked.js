import React from 'react'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {useForm} from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import IconButton from '@mui/material/IconButton'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import "./SlotBooked.scss"
import logo from '../../images/logo.png'
function SlotBooked(props) {
    console.log(props);
    let data = props.location.state;
    
    return (
        <div>
           <div className="shadow-lg form-div">
           <img src={logo} alt="ztv" style={{height:"10vh",width:"10vw"}} />
           <h1>ZEETV Vaccination Camp</h1>
           <p className="slotbooked">Slot booked for {data.candidate.first_name}</p>
           <FactCheckOutlinedIcon sx={{fontSize:'5em',color:"#ff8400"}} />
           <div className="slotinfodiv">
               <p className="venue">{data.center.name}</p>
               <p className="address">{data.center.address}</p>
                <p>{data.center.city}</p>
               <p className="date">{data.center.date}</p>
               <p className="activetime">{data.time_slot}</p>
           </div>

           <Button onClick={()=>props.history.push("/accountdetails")} variant="text">Book another slot</Button>
            </div>  
        </div>
    )
}

export default SlotBooked
