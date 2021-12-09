import React from 'react'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {useForm} from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import date from 'date-and-time'
import axios from 'axios'
import {connect} from 'react-redux'
import { storeUser } from '../redux/vaccUser/vaccUserActions';
import logo from '../../images/logo.png'
import moment from 'moment'
function PersonalInfo(props) {
  console.log(props);
    const [value, setValue] = React.useState(null);
    //console.log(props);
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [loading,setLoading]=React.useState(false)
    const [error,setError]=React.useState([])
    const [gender, setGender] = React.useState('');
    const [city,setCity]=React.useState("")
    console.log(city)
    const cityData = ["Mumbai","Delhi","Gurgaon","Pune","Nashik","Nagpur","Lucknow","Kanpur","Gorakhpur","Allahabad"]
  
    const onSubmit = (data,e)=>{
        let dob = date.format(value, 'DD/MM/YYYY');  
        let gend;
        //console.log(Object.values(value));
        if(dob==='aN/aN/0NaN'){
            setError('Enter a valid date')
        }else{
            setError("")
            if(gender===1){
            gend = 'Male'
            }else if(gender===2){
                gend = 'Female'
            }else if(gender===3){
                gend ='Others'
            }
            console.log(data);
           axios.post(`${process.env.REACT_APP_LINK}/save_details/`,{
             uid:data.aadhar,
             first_name:data.firstname,
             last_name:data.lastname,
             gender:gend,
             address:data.address,
             pin:data.pincode,
             city,
             dob,
             email:data.email,
             //aadhar:data.aadhar
           },{headers:{"Authorization":props.user.token}})
           .then(res=>{
             console.log(res);
             if(res.data.details==="Data saved"){
               //props.storeUser(res.data)
               props.history.push("/accountdetails")
             }
           })
           .catch((err)=>{
             console.log(err.response.data);
             if(Object.keys(err.response.data).length>0){
              setError(Object.keys(err.response.data))
             }
             //setError("something went wrong")
           })

        }
        
    }
    const handleChange = (event) => {
        setGender(event.target.value);
      };
    return (
        <div>
           <div className="shadow-lg form-div">
           <img src={logo} alt="ztv" className="zeetvlogo" />
           <h1>ZEETV Vaccination Camp</h1>
           <p className="pheading">Personal Information</p>
           <p>Please fill in all the details fully. 
This would be verified before vaccination.</p>
           <form onSubmit = {handleSubmit(onSubmit)}>
            {!errors.firstname?<TextField
            className="personalinfoinput" 
            id="outlined-basic" label="First Name"
            inputProps={{maxLength:46}}
            variant="outlined" {...register('firstname',{required:true})}
            />:
            <TextField
            error
            helperText="Enter a valid First Name"
            className="personalinfoinput" 
            id="outlined-basic" label="First Name"
            inputProps={{maxLength:46}}
            variant="outlined" {...register('firstname',{required:true})}
            />
            }

            {!errors.lastname?<TextField
            className="personalinfoinput" 
            inputProps={{maxLength:46}}
            id="outlined-basic" label="Last Name"
            variant="outlined" {...register('lastname',{required:true})}
            />:
            <TextField
            error
            inputProps={{maxLength:46}}
            helperText="Enter a valid Last Name"
            className="personalinfoinput" 
            id="outlined-basic" label="Last Name"
            variant="outlined" {...register('lastname',{required:true})}
            />
            }

<div style={{margin:"3% 0 0 0"}}>

<FormControl
className="genderInput" >
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value={1}>Male</MenuItem>
          <MenuItem value={2}>Female</MenuItem>
          <MenuItem value={3}>Others</MenuItem>
        </Select>
      </FormControl>
</div>
        <div style={{margin:"0% 0 3% 0"}}>
      <LocalizationProvider dateAdapter={AdapterDateFns} >
      <DatePicker
       inputFormat="dd/MM/yyyy"
        label="Date of birth"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField 
          
          sx={{width:'100%'}} {...params} />}
      />
    </LocalizationProvider>
    </div>

{!errors.address?<TextField
 inputProps={{maxLength:96}}
            className="personalinfoinput" 
            id="outlined-basic" label="Enter Address"
            variant="outlined" {...register('address',{required:true})}
           
            />:
            <TextField
            inputProps={{maxLength:96}}
            error
            helperText="Enter a valid Address"
            className="personalinfoinput" 
            id="outlined-basic" label="Enter Address"
            variant="outlined" {...register('address',{required:true})}
            
            />
            }

{/* {!errors.cowinid?<TextField
 inputProps={{maxLength:96}}
            className="personalinfoinput" 
            id="outlined-basic" label="Co-WIN Reference ID"
            variant="outlined" {...register('cowinid',{required:true})}
            onInput = {(e) =>{
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,14)
          }}
            />:
            <TextField
            inputProps={{maxLength:96}}
            error
            helperText="Enter a valid cowinid"
            className="personalinfoinput" 
            id="outlined-basic" label="Co-WIN Reference ID"
            variant="outlined" {...register('cowinid',{required:true})}
            onInput = {(e) =>{
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,14)
          }}
            />
            } */}


<div style={{margin:"4% 0 0 0"}}>

<FormControl
className="genderInput" >
        <InputLabel id="demo-simple-select-label">Vaccination City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="Vaccination City"
          onChange={(e)=>setCity(e.target.value)}
        >
          {cityData.map(item=>(
            <MenuItem value={item}>{item}</MenuItem>
          ))
          }
          
          
        </Select>
      </FormControl>
        
   
</div>


{!errors.pincode?<TextField
            className="personalinfoinput" 
            inputProps={{maxLength:6}}
            type="number"
            id="outlined-basic" label="Pincode"
            variant="outlined" {...register('pincode',{required:true})}
            onInput = {(e) =>{
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
          }}
            />:
            <TextField
            error
            helperText="Enter a valid Pincode"
            className="personalinfoinput" 
            id="outlined-basic" label="Pincode"
            inputProps={{maxLength:6}}
            type="number"
            variant="outlined" {...register('pincode',{required:true})}
            onInput = {(e) =>{
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
          }}
            />
            }

{!errors.email?<TextField
            className="personalinfoinput" 
            id="outlined-basic" label="Email"
            inputProps={{maxLength:96}}
            variant="outlined" {...register('email',{required:true})}
            />:
            <TextField
            error
            helperText="Enter a valid Email"
            className="personalinfoinput" 
            id="outlined-basic" label="Email"
            inputProps={{maxLength:96}}
            variant="outlined" {...register('email',{required:true})}
            />
            }

{!errors.aadhar?<TextField
            className="personalinfoinput" 
            type="number"
            inputProps={{maxLength:12}}
            id="outlined-basic" label="Aadhar Number"
            variant="outlined" {...register('aadhar',{required:true})}
            onInput = {(e) =>{
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
          }}
            />:
            <TextField
            error
            type="number"
            inputProps={{maxLength:12}}
            helperText="Enter a valid Aadhar Number"
            className="personalinfoinput" 
            id="outlined-basic" label="Aadhar Number"
            variant="outlined" {...register('aadhar',{required:true})}
            onInput = {(e) =>{
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
          }}
            />
            }


            {
            !loading?!errors.firstname && !errors.lastname &&  !errors.address &&  !errors.pincode &&  !errors.email &&  !errors.aadhar &&  gender!=="" && value!==null?
            <Button type="submit" className="submitbutton" variant="contained">Verify</Button>:
            <Button type="submit" disabled className="submitbutton" variant="contained">Verify</Button>
            :<CircularProgress />
        }
        {
            error.length>0?
            error.map(item=><Alert severity="error">Something is wrong with {item}</Alert>)
            :null
        }
            </form>
            </div>  
        </div>
    )
}

const mapStateToProps = ({vaccUser})=>{
  return {
    user:vaccUser.user
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
      storeUser:(user)=>dispatch(storeUser(user))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(PersonalInfo)
