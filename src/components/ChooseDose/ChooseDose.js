import React from 'react'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {useForm} from 'react-hook-form'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button'
import "./ChooseDose.scss"
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField'
import date from 'date-and-time'
import axios from 'axios'
import {connect} from 'react-redux'
import logo from '../../images/logo.png'
function ChooseDose(props) {
    console.log(props);
    
    const [loading,setLoading]=React.useState(false)
    const [error,setError]=React.useState("")
    const [dose,setDose]=React.useState('1')
    const [value, setValue] = React.useState(null);
    const handleSubmit = ()=>{
        //let doseDate = date.addDays(value,84)
        //doseDate = date.format(doseDate, 'YYYY/MM/DD HH:mm:ss');  
        setError("")

        const today = new Date(Date.now());
        const formatedToday = date.format(today, 'YYYY/MM/DD HH:mm:ss');  
        const yesterday = new Date(value);
        let doseDate = date.subtract(today, yesterday).toDays();
        console.log(doseDate);
        if(doseDate<84){
            setError("You are not eligible")
        }else{
            axios.get(`${process.env.REACT_APP_LINK}/book_slot/?dose=${dose}_dose&date=${formatedToday}&user_id=${props.userInfo.id}`,
            {headers:{Authorization:props.user.token}}
            )
            .then(res=>{
              console.log(res)
              if(res.status===200){
                props.history.push("/choosevaccinationcentre")
              }
            })
            .catch(err=>{
              setError("Something went wrong")
            })
        }
    }
    console.log(dose);
    return (
        <div>
           <div className="shadow-lg form-div">
           <img src={logo} alt="ztv" className="zeetvlogo" />
           <h1>ZEETV Vaccination Camp</h1>
           <p className="pheading">Choose Dose</p>
           <p>Registered Mobile Number is {props.user.mobile_no}</p>
           <FormControl 
           component="fieldset">
      <RadioGroup
      value={dose}
      onChange={(e)=>setDose(e.target.value)}
      row aria-label="gender" name="row-radio-buttons-group">
        <FormControlLabel value={1} control={<Radio />} label="First Dose" />
        <FormControlLabel value={2} control={<Radio />} label="Second Dose" />
      </RadioGroup>

    </FormControl>
    {
          dose==="2"?(
              <div style={{margin:"5% 0"}}>
                   <LocalizationProvider dateAdapter={AdapterDateFns} >
      <DatePicker
      
        label="First Dose Date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField sx={{width:'100%'}} {...params} />}
      />
    </LocalizationProvider>
                  <p style={{margin:"5% 3%"}}>As per government guideline,
 2nd dose would be administered after 84 days of first dose.</p>
            </div>
          ):null
      }
<div>
    {
            !loading?
            <Button onClick={()=>handleSubmit()} className="submitbutton" variant="contained">Book</Button>
            :<CircularProgress />
        }
        </div>
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
export default connect(mapStateToProps)(ChooseDose)
