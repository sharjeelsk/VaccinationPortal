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
            console.log(err);
            setLoading(false)
            setError("Something went wrong")
        })
    }
    return (
        <div className="homepage">
            <img className="background" src={page1} />



            <div className="shadow-lg form-div-home">
            <img src={logo} alt="ztv" style={{height:"10vh",width:"10vw"}} />
            <h1>ZEETV Vaccination Camp</h1>
            <p>
                Book your slot for free covid vaccination.
            <br />
                An OTP will be sent to your mobile number for verification
            </p>
            <form onSubmit = {handleSubmit(onSubmit)}>
            {!errors.phone?<TextField
            className="mobilenumberinput" 
            id="outlined-basic" label="Mobile Number"
            variant="outlined" {...register('phone',{required:true,maxLength:10})}
            />:
            <TextField
            error
            helperText="Enter a valid mobile number"
            className="mobilenumberinput" 
            id="outlined-basic" label="Mobile Number"
            variant="outlined" {...register('phone',{required:true,maxLength:10})}
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
            </div>
    )
}

export default Home
