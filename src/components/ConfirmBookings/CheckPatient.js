import React from 'react'
import "./Global.scss"
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { SettingsSystemDaydreamTwoTone } from '@mui/icons-material';
function CheckPatient(props) {
    console.log(props);
    const [data,setData]=React.useState([])
    const [checked, setChecked] = React.useState([]);
    console.log(checked);
    React.useEffect(()=>{
        setData(props.location.state.results)
        let idarray = []
        if(data.length>0){
         idarray = data.map(item=>item.candidate.id)
        }else{
            idarray = props.location.state.results.map(item=>item.candidate.id)
        }
        setChecked(idarray)
    },[])
   const handleChange = (item)=>{
    if(checked.includes(item.candidate.id)){
        let array = checked.filter(e=>e!==item.candidate.id)
        setChecked(array)
    }else{
        setChecked([...checked,item.candidate.id])
    }
   
   }
   const handleSubmit = ()=>{
    axios.post(`${process.env.REACT_APP_LINK}/mark_as_vaccinated/`,{
        user_id:checked
    })
    .then(res=>{
        console.log(res.data);
        props.history.push('/choosecentre')
    })
    .catch(err=>{
        console.log(err);
    })
   }
   const handleSearch = (e)=>{
      if(e.length>0){
        if(data.length>0){
            let arr = data.filter(item=>item.candidate.user.mobile_no.slice(0,e.length)===e)
            setData(arr)
            let arrid = arr.map(item=>item.candidate.id)
            setChecked(arrid)
           }
      }else{
          setData(props.location.state.results)
          let arrid = props.location.state.results.map(item=>item.candidate.id)
          setChecked(arrid)
      }
    }
    return (
        <div>
            <div className="shadow-lg form-div">
                <h1>Select Vaccinated Patients</h1>
                <div style={{margin:"5% 0"}}>
                <TextField 
                fullWidth
                placeholder="Search by mobile number"
                variant="filled"
                onChange={(e)=>handleSearch(e.target.value)}
                />
                </div>

    {
data.length>0?(
    data.map(item=>(
        <FormGroup>
        <FormControlLabel 
    
        onChange={()=>{
        handleChange(item)
        }}
        control={<Checkbox defaultChecked />} label={`${item.candidate.first_name} ${item.candidate.last_name}`} />
      </FormGroup>
    ))
):null
    }
    <Button variant="contained" onClick={()=>handleSubmit()}>Submit</Button>
            </div>
        </div>
    )
}

export default CheckPatient
