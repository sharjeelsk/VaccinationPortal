import React from 'react'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {useForm} from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import {connect} from 'react-redux'
import { storeUser } from '../redux/vaccUser/vaccUserActions';
import logo from '../../images/logo.png'

function VerifyOtp(props) {
    console.log(props.location.state);
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [loading,setLoading]=React.useState(false)
    const [error,setError]=React.useState("")
    const onSubmit = (data,e)=>{
        console.log(data);
        if(props.location.state.otp.toString()===data.otp){
            setError("")
            console.log("verified");
            props.history.push("/personalinfo")
            props.storeUser(props.location.state)
        }else{
            setError("Invalid OTP")
        }
    }
    return (
        <div>
           <div className="shadow-lg form-div">
           <img src={logo} alt="ztv" style={{height:"10vh",width:"10vw"}} />
           <h1>ZEETV Vaccination Camp</h1>
           <p>An OTP has been sent to {props.location.state.mobile_no}</p>
           <form onSubmit = {handleSubmit(onSubmit)}>
            {!errors.otp?<TextField
            className="otpinput" 
            id="outlined-basic" label="Enter OTP"
            variant="outlined" {...register('otp',{required:true,maxLength:4})}
            />:
            <TextField
            error
            helperText="Enter a valid OTP"
            className="otpinput" 
            id="outlined-basic" label="Enter OTP"
            variant="outlined" {...register('otp',{required:true,maxLength:4})}
            />
            }
            <Button className="resendbutton" variant="text">Resend?</Button>
            {
            !loading?!errors.otp?
            <Button type="submit" className="submitbutton" variant="contained">Verify</Button>:
            <Button type="submit" disabled className="submitbutton" variant="contained">Verify</Button>
            :<CircularProgress />
        }
        {
            error.length>0?
            <Alert severity="error">{error}</Alert>
            :null
        }
            </form>
            </div>  
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return {
        storeUser:(user)=>dispatch(storeUser(user))
    }
}

export default connect(null,mapDispatchToProps)(VerifyOtp)
