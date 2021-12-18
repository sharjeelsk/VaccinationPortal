import React from 'react'
import Button from '@mui/material/Button'
import {useForm} from 'react-hook-form'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import "./Home.scss"
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import page1 from '../images/page1.jpg'
import logo from '../images/logo.png'
import Footer from '../components/Footer/Footer'

function Home(props) {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [checked,setChecked]=React.useState(true)
    const [loading,setLoading]=React.useState(false)
    const [error,setError]=React.useState("")
    console.log(checked);
    const onSubmit = (data,e)=>{
        console.log(data);
        setLoading(true)
        setError("")
        //props.history.push('/verifyotp')
        axios.post(`${process.env.REACT_APP_LINK}/send_otp/`,{
            mobile_no:data.phone
        })
        .then(async res=>{
            console.log(res);
            setLoading(false)
            await props.history.push('/verifyotp',res.data)
        })
        .catch(err=>{
            //console.log(typeof(err.response));
            setLoading(false)
            setError("check your internet, if connected unblock the site from your firewall or call ISP")
        })
    }
    return (
        <div className="homepage">



            <div className="shadow-lg form-div-home">
            <img src={logo} alt="ztv" className="logozeetv" />
            <h1>ZEETV Vaccination Camp</h1>
            <p>
                <p className="bold">
                Confirm your slot for free Covid Vaccination.
                </p>
            <br />
                An OTP will be sent to your mobile number for verification
            </p>
            <form onSubmit = {handleSubmit(onSubmit)}>
            {!errors.phone?<TextField
             onInput = {(e) =>{
        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
    }}
            className="mobilenumberinput" 
            type="number"
            id="outlined-basic" label="Enter Mobile Number"
            variant="outlined" {...register('phone',{required:true,maxLength:10,minLength:10})}
            />:
            <TextField
            error
             onInput = {(e) =>{
        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
    }}
            type="number"
            helperText="Enter a valid mobile number"
            className="mobilenumberinput" 
            id="outlined-basic" label="Enter Mobile Number"
            variant="outlined" {...register('phone',{required:true,maxLength:10,minLength:10})}
            />
            }
            <FormGroup>
      <FormControlLabel 
      className="checkbox"
      onChange={()=>setChecked(!checked)}
      control={<Checkbox defaultChecked />} label="I agree to the Terms & Conditions" />
    </FormGroup>
            
            {
            !loading?!errors.phone && checked?
            <Button type="submit" className="submitbutton" variant="contained">Get OTP</Button>:
            <Button type="submit" disabled className="submitbutton" variant="contained">Get OTP</Button>
            :<CircularProgress />
        }
        {
            error.length>0?
            <Alert severity="error">{error}</Alert>
            :null
        }
            </form>
            </div>
            <Footer />
            </div>
    )
}

export default Home
