import React from 'react'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {useForm} from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import IconButton from '@mui/material/IconButton'
import "./ChooseVaccinationCentre.scss"
import axios from 'axios'
import {connect} from 'react-redux'
import logo from '../../images/logo.png'
import date from 'date-and-time'
function ChooseVaccinationCentre(props) {
    const [loading,setLoading]=React.useState(false)
    const [error,setError]=React.useState("")
    const [time,setTime]=React.useState("")
    const [data,setData]=React.useState([])

    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_LINK}/get_vaccine_centers/?user_id=${props.userInfo.id}`,{headers:{Authorization:props.user.token}})
        .then(res=>{
            console.log(res);
            if(res.data.length>0){
                setData(res.data)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    const handleSubmit = (item)=>{
       console.log(item.id) 
       
        axios.post(`${process.env.REACT_APP_LINK}/select_center/`,{user_id:props.userInfo.id,center_id:item.id,time_slot:time},{headers:{Authorization:props.user.token}})
        .then(res=>{
            console.log(res);
            if(Object.keys(res.data).length>3){
                props.history.push('/slotbooked',res.data)   
            }else if(res.data.details){
                setError(res.data.details)
            }
             
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const renderDate = (item)=>{
         //let end = "04-12-2021"
         //let start = "02-12-2021"
        let sd = `${item.start_date} 00:00:00`
        let startDate = date.parse(sd, 'DD-MM-YYYY HH:mm:ss');    
        let today  = new Date()
        //today.setHours(0,0,0,0);
        let endDate = date.parse(`${item.date} 21:00:00`, 'DD-MM-YYYY HH:mm:ss');
        //endDate = date.addDays(endDate,-1)
        console.log(today>=startDate && today<=endDate)
        if(today>=startDate && today<=endDate){
            return true;
        }else{
            return false
        }

    }
    return (
        <div>
           <div className="shadow-lg form-div">
           <img src={logo} alt="ztv" className="zeetvlogo" />
           <h1>ZEETV Vaccination Camp</h1>
           <p className="pheading">Choose Vaccination Centre</p>
           <p>Registered Mobile Number is {props.user.mobile_no}</p>
           
            {
                data.length>0?data.map((item,index)=>(
                    <div className="vaccinfodiv">
               <p className="venue">{item.name}</p>
               <p className="address">{item.address}</p>
               <p>Registration ends on: {item.date}</p>
               <hr />
               
              {renderDate(item)? <div>
               <p className="timeheading">Choose Time</p>
               <div className="row justify-content-center">
               {time==='09:00 AM - 10:00 AM'?<p className="activep" onClick={()=>setTime("")} >09:00 AM - 10:00 AM</p>:<p onClick={()=>setTime("09:00 AM - 10:00 AM")}>09:00 AM - 10:00 AM</p>}
               {time==='10:30 AM - 11:30 AM'?<p className="activep" onClick={()=>setTime("")} >10:30 AM - 11:30 AM</p>:<p onClick={()=>setTime("10:30 AM - 11:30 AM")}>10:30 AM - 11:30 AM</p>}
               {time==='12:00 PM - 01:00 PM'?<p className="activep" onClick={()=>setTime("")} >12:00 PM - 01:00 PM</p>:<p onClick={()=>setTime("12:00 PM - 01:00 PM")}>12:00 PM - 01:00 PM</p>}
               {time==='01:30 PM - 02:30 PM'?<p className="activep" onClick={()=>setTime("")} >01:30 PM - 02:30 PM</p>:<p onClick={()=>setTime("01:30 PM - 02:30 PM")}>01:30 PM - 02:30 PM</p>}
               {time==='03:00 PM - 04:00 PM'?<p className="activep" onClick={()=>setTime("")} >03:00 PM - 04:00 PM</p>:<p onClick={()=>setTime("03:00 PM - 04:00 PM")}>03:00 PM - 04:00 PM</p>}
               </div>
               </div>:null}


               {time===""?<Button disabled className="schedulebutton" variant = "contained">Schedule</Button>:<Button onClick={()=>handleSubmit(item)} className="schedulebutton" variant = "contained">Schedule</Button>}
           </div>
                )):<p>No Centres nearby</p>
            }
           {
            error.length>0?
            <Alert severity="error">{error}</Alert>
            :null
        }
            </div>  
        </div>
    )
}
const mapStateToProps = ({vaccUser})=>{
    return {
      user:vaccUser.user,
      userInfo:vaccUser.userInfo
    }
  }
export default connect(mapStateToProps)(ChooseVaccinationCentre)
