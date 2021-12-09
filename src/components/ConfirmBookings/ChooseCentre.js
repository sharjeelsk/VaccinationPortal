import "./Global.scss"
import React from 'react'
import axios from 'axios'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'
function ChooseCentre(props) {
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_LINK}/get_all_centers/`)
        .then(res=>{
            console.log(res)
            if(res.data.length>0){
                setCentres(res.data)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    const [centre,setCentre]=React.useState("")
    const [centres,setCentres]=React.useState([])
    const handleSubmit = ()=>{
        if(centre!==""){
            //console.log(centres);
            let itm = centres.filter(item=>item.name===centre)
            console.log(itm);
            axios.get(`${process.env.REACT_APP_LINK}/get_bookings/?center=${itm[0].id}`)
            .then(res=>{
                console.log(res.data);
                props.history.push("/checkpatient",res.data)
            })
            .catch(err=>{
                console.log(err.response.data);
            })
        }
        
    }
    return (
        <div>
            <div className="shadow-lg form-div">
                <h1>Choose Centre for patient confirmations</h1>
                    <FormControl
className="genderInput" >
        <InputLabel id="demo-simple-select-label">Choose Vaccination Centre</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={centre}
          label="Choose Vaccination Centre"
          onChange={(e)=>setCentre(e.target.value)}
        >
            {
               centres.length>0?(
                   centres.map(item=>(
                       <MenuItem value={item.name}>{item.name}</MenuItem>
                   ))
               ):null
            }
          
        </Select>
</FormControl>
<Button onClick={()=>handleSubmit()} variant="contained">Submit</Button>
            </div>
        </div>
    )
}

export default ChooseCentre
